import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBotDetection } from '../hooks/useBotDetection';
import { checkConnectionSecurity } from '../utils/connectionSecurity';

export const useSecurityRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingStage, setLoadingStage] = useState<'analyzing' | 'verifying' | 'redirecting'>('analyzing');
  const [advancedSecurityResult, setAdvancedSecurityResult] = useState<{
    skipBotCheck: boolean;
    skipCaptcha: boolean;
    isTrusted: boolean;
    trustScore: number;
  } | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Run advanced connection security check before bot detection
  useEffect(() => {
    // Only run security check on initial load or if we're on the root path
    if (!isInitialLoad && location.pathname !== '/') {
      return;
    }
    
    const checkAdvancedSecurity = async () => {
      try {
        // Get connection security information
        const connectionInfo = await checkConnectionSecurity();
        
        // Determine if we should skip different verification steps
        const trustScore = connectionInfo.trustScore;
        const isTrusted = trustScore >= 0.7 && connectionInfo.secure;
        const skipBotCheck = isTrusted && !connectionInfo.isVPN && !connectionInfo.isTorNetwork;
        const skipCaptcha = trustScore >= 0.5 && connectionInfo.secure;
        
        setAdvancedSecurityResult({
          skipBotCheck,
          skipCaptcha,
          isTrusted,
          trustScore
        });
        
        // Immediate routing for highly trusted connections
        if (skipBotCheck) {
          navigate('/user', { replace: true });
          setIsInitialLoad(false);
          return;
        }
        
        setIsInitialLoad(false);
      } catch (error) {
        console.error('Error during advanced security check:', error);
        setAdvancedSecurityResult({
          skipBotCheck: false,
          skipCaptcha: false,
          isTrusted: false,
          trustScore: 0.3
        });
        setIsInitialLoad(false);
      }
    };
    
    checkAdvancedSecurity();
  }, [navigate, location.pathname, isInitialLoad]);
  
  // For doubtful connections, proceed with bot detection
  const botDetectionResult = useBotDetection({
    timeout: 3000,
    botThreshold: 0.7,
    captchaThreshold: advancedSecurityResult?.skipCaptcha ? 0.9 : 0.4,
    enableCaching: true,
    skipVerificationForTrustedConnections: true,
    connectionTrustThreshold: 0.6
  });

  const {
    isLoading,
    isBot,
    needsCaptcha,
    isVerified,
    connectionQuality,
    handleCaptchaSuccess,
    handleCaptchaFailure
  } = botDetectionResult;

  // Update loading stage based on detection state
  useEffect(() => {
    if (needsCaptcha) {
      setLoadingStage('verifying');
    } else if (!isLoading && (isBot || isVerified)) {
      setLoadingStage('redirecting');
    }
  }, [isLoading, needsCaptcha, isBot, isVerified]);

  // Handle routing based on detection results
  useEffect(() => {
    if (!advancedSecurityResult || isInitialLoad) return;
    
    // Skip if we're already on the correct route
    if (location.pathname === '/user' || location.pathname === '/bot') {
      return;
    }
    
    // Suspicious connection conditions that force bot page
    const forceBotPage = 
      (connectionQuality?.speed === 'slow' && advancedSecurityResult.trustScore < 0.4) || 
      (connectionQuality?.secure === false) ||
      advancedSecurityResult.trustScore < 0.2;
      
    if (forceBotPage) {
      navigate('/bot', { replace: true });
      return;
    }

    // Route based on detection result
    if (isBot) {
      navigate('/bot', { replace: true });
    } else if (isVerified) {
      navigate('/user', { replace: true });
    }
  }, [
    advancedSecurityResult, 
    isBot, 
    isVerified, 
    connectionQuality, 
    navigate, 
    location.pathname,
    isInitialLoad
  ]);

  // Custom CAPTCHA handlers that navigate after success/failure
  const handleCaptchaSuccessWithRouting = () => {
    handleCaptchaSuccess();
    navigate('/user', { replace: true });
  };

  const handleCaptchaFailureWithRouting = () => {
    handleCaptchaFailure();
    navigate('/bot', { replace: true });
  };

  return {
    // Security state
    advancedSecurityResult,
    isInitialLoad,
    loadingStage,
    
    // Bot detection state
    ...botDetectionResult,
    
    // Custom handlers
    handleCaptchaSuccess: handleCaptchaSuccessWithRouting,
    handleCaptchaFailure: handleCaptchaFailureWithRouting,
    
    // Routing helpers
    shouldShowLoading: !advancedSecurityResult || isLoading,
    shouldShowCaptcha: needsCaptcha && advancedSecurityResult && !advancedSecurityResult.skipCaptcha,
    isRouting: isInitialLoad
  };
};
