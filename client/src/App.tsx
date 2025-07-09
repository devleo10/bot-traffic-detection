import { useEffect, useState } from 'react';
import BotPage from './components/botpage/BotPage';
import UserPage from './components/userpage/UserPage';
import LoadingScreen from './components/LoadingScreen';
import CaptchaChallenge from './components/CaptchaChallenge';
import { useBotDetection } from './hooks/useBotDetection';
import { checkConnectionSecurity, getConnectionDebugInfo } from './utils/connectionSecurity';

function App() {
  const [loadingStage, setLoadingStage] = useState<'analyzing' | 'verifying' | 'redirecting'>('analyzing');
  const [advancedSecurityResult, setAdvancedSecurityResult] = useState<{
    skipBotCheck: boolean;
    skipCaptcha: boolean;
    isTrusted: boolean;
    trustScore: number;
    debugInfo: string;
  } | null>(null);
  
  // Run advanced connection security check before bot detection
  useEffect(() => {
    const checkAdvancedSecurity = async () => {
      try {
        // Get connection security information
        const connectionInfo = await checkConnectionSecurity();
        const debugInfo = await getConnectionDebugInfo();
        
        // Determine if we should skip different verification steps
        const trustScore = connectionInfo.trustScore;
        const isTrusted = trustScore >= 0.7 && connectionInfo.secure;
        const skipBotCheck = isTrusted && !connectionInfo.isVPN && !connectionInfo.isTorNetwork;
        const skipCaptcha = trustScore >= 0.5 && connectionInfo.secure;
        
        setAdvancedSecurityResult({
          skipBotCheck,
          skipCaptcha,
          isTrusted,
          trustScore,
          debugInfo
        });
        
        // For development testing only
        if (import.meta.env.DEV) {
          console.log('Advanced Security Check:', { 
            connectionInfo,
            skipBotCheck,
            skipCaptcha,
            isTrusted,
            trustScore
          });
        }
      } catch (error) {
        console.error('Error during advanced security check:', error);
        setAdvancedSecurityResult({
          skipBotCheck: false,
          skipCaptcha: false,
          isTrusted: false,
          trustScore: 0.3,
          debugInfo: 'Error during security check'
        });
      }
    };
    
    checkAdvancedSecurity();
  }, []);
  
  // If we haven't completed the advanced check yet, show a loading screen
  if (!advancedSecurityResult) {
    return <LoadingScreen stage="analyzing" progress={20} />;
  }
  
  // If connection is highly trusted, skip all verification and go straight to user page
  if (advancedSecurityResult.skipBotCheck) {
    // Skip bot detection for very trusted connections
    if (import.meta.env.DEV) {
      console.log('Skipping bot detection - trusted connection');
      console.log(advancedSecurityResult.debugInfo);
    }
    return <UserPage />;
  }
  
  // For doubtful connections, proceed with bot detection
  const {
    isLoading,
    isBot,
    needsCaptcha,
    isVerified,
    isTrustedConnection,
    connectionQuality,
    handleCaptchaSuccess,
    handleCaptchaFailure
  } = useBotDetection({
    timeout: 3000,
    botThreshold: 0.7,     // 0.7-1.0 = Bot (SaaS page) - lowered to catch more suspicious cases
    captchaThreshold: advancedSecurityResult.skipCaptcha ? 0.9 : 0.4, // Adjust captcha threshold based on connection trust
    enableCaching: true,   // Enable caching for trusted connections
    skipVerificationForTrustedConnections: true,  // Skip CAPTCHA for trusted connections
    connectionTrustThreshold: 0.6  // Threshold for trusted connections
  });

  // Update loading stage based on detection state
  useEffect(() => {
    if (needsCaptcha) {
      setLoadingStage('verifying');
    } else if (!isLoading && (isBot || isVerified)) {
      setLoadingStage('redirecting');
    }
  }, [isLoading, needsCaptcha, isBot, isVerified]);

  // Show loading screen during detection
  if (isLoading) {
    return <LoadingScreen stage={loadingStage} progress={50} />;
  }

  // Suspicious connection conditions that force bot page:
  // 1. Very slow connection
  // 2. Non-secure (HTTP) connection
  // 3. Detected VPN/TOR
  const forceBotPage = 
    (connectionQuality?.speed === 'slow' && advancedSecurityResult.trustScore < 0.4) || 
    (connectionQuality?.secure === false) ||
    advancedSecurityResult.trustScore < 0.2;
    
  if (forceBotPage) {
    // Very suspicious connection - show bot page
    if (import.meta.env.DEV) {
      console.log('Forced bot page due to suspicious connection:');
      console.log(advancedSecurityResult.debugInfo);
    }
    return <BotPage />;
  }

  // Show CAPTCHA verification if needed
  if (needsCaptcha && !advancedSecurityResult.skipCaptcha) {
    return (
      <CaptchaChallenge
        onSuccess={handleCaptchaSuccess}
        onFailure={handleCaptchaFailure}
      />
    );
  }

  // Show final redirect loading
  if (!isVerified && !isBot) {
    return <LoadingScreen stage="redirecting" progress={90} />;
  }

  // Route based on detection result
  if (isBot) {
    // Suspicious connection or identified bot - show SaaS page
    return <BotPage />;
  }

  // Log connection quality for debugging (only in development)
  if (import.meta.env.DEV && connectionQuality) {
    console.log('Connection quality:', connectionQuality);
    console.log('Trusted connection:', isTrustedConnection);
    console.log('Advanced security details:');
    console.log(advancedSecurityResult.debugInfo);
  }

  // Trusted or verified connection - show betting page
  return (
    <div className="relative">
      <UserPage />
    </div>
  );
}

export default App;