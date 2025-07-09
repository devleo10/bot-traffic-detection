import { useState, useEffect } from 'react';
import { botDetector, DetectionResult } from '../utils/botDetection';

export interface BotDetectionState {
  isLoading: boolean;
  result: DetectionResult | null;
  error: string | null;
  isBot: boolean;
  needsCaptcha: boolean;
  isVerified: boolean;
  isTrustedConnection: boolean;
  connectionQuality: DetectionResult['connectionQuality'] | null;
}

export interface BotDetectionOptions {
  timeout?: number;
  botThreshold?: number;
  captchaThreshold?: number;
  enableCaching?: boolean;
  cacheExpiry?: number;
  skipVerificationForTrustedConnections?: boolean;
  connectionTrustThreshold?: number;
}

const DEFAULT_OPTIONS: Required<BotDetectionOptions> = {
  timeout: 3000,
  botThreshold: 0.7,
  captchaThreshold: 0.3,
  enableCaching: true,
  cacheExpiry: 24 * 60 * 60 * 1000,
  skipVerificationForTrustedConnections: true,
  connectionTrustThreshold: 0.6
};

export const useBotDetection = (options: BotDetectionOptions = {}) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  const [state, setState] = useState<BotDetectionState>({
    isLoading: true,
    result: null,
    error: null,
    isBot: false,
    needsCaptcha: false,
    isVerified: false,
    isTrustedConnection: false,
    connectionQuality: null
  });

  const checkCachedVerification = (): boolean => {
    if (!opts.enableCaching) return false;
    
    try {
      const cached = localStorage.getItem('bot-detection-verified');
      if (!cached) return false;
      
      const { timestamp, verified } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > opts.cacheExpiry;
      
      if (isExpired) {
        localStorage.removeItem('bot-detection-verified');
        return false;
      }
      
      return verified;
    } catch {
      return false;
    }
  };

  const cacheVerification = (verified: boolean) => {
    if (!opts.enableCaching) return;
    
    try {
      localStorage.setItem('bot-detection-verified', JSON.stringify({
        timestamp: Date.now(),
        verified
      }));
    } catch {
      // Ignore localStorage errors
    }
  };

  const runDetection = async () => {
    if (checkCachedVerification()) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isVerified: true,
        isBot: false,
        needsCaptcha: false,
        isTrustedConnection: true
      }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const detectionPromise = botDetector.detect();
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Detection timeout')), opts.timeout)
      );

      const result = await Promise.race([detectionPromise, timeoutPromise]);
      
      // Extract connection quality
      const connectionQuality = result.connectionQuality;
      const isTrustedConnection = connectionQuality && 
                                connectionQuality.trustScore >= opts.connectionTrustThreshold &&
                                connectionQuality.secure;
      
      // Determine if user is a bot
      const isBot = result.score >= opts.botThreshold;
      
      // Determine if captcha is needed
      // Skip captcha for trusted connections if the option is enabled
      const skipCaptcha = opts.skipVerificationForTrustedConnections && isTrustedConnection;
      const needsCaptcha = !isBot && !skipCaptcha && result.score >= opts.captchaThreshold;
      
      // Update state
      setState(prev => ({
        ...prev,
        isLoading: false,
        result,
        isBot,
        needsCaptcha,
        isVerified: !isBot && (!needsCaptcha || (skipCaptcha ? true : false)),
        isTrustedConnection: isTrustedConnection ? true : false,
        connectionQuality: connectionQuality || null
      }));

      // Cache verification if user is verified
      if (!isBot && (!needsCaptcha || skipCaptcha)) {
        cacheVerification(true);
      }

    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Detection failed',
        isBot: false,
        needsCaptcha: true,
        isVerified: false,
        isTrustedConnection: false,
        connectionQuality: null
      }));
    }
  };

  const handleCaptchaSuccess = () => {
    setState(prev => ({
      ...prev,
      needsCaptcha: false,
      isVerified: true,
      // If they pass CAPTCHA, they get a slight boost in connection trust
      connectionQuality: prev.connectionQuality ? {
        ...prev.connectionQuality,
        trustScore: Math.min(1, (prev.connectionQuality.trustScore || 0) + 0.1)
      } : null
    }));
    cacheVerification(true);
  };

  const handleCaptchaFailure = () => {
    setState(prev => ({
      ...prev,
      needsCaptcha: false,
      isBot: true,
      isVerified: false,
      isTrustedConnection: false,
      // If they fail CAPTCHA, they get marked as untrusted
      connectionQuality: prev.connectionQuality ? {
        ...prev.connectionQuality,
        trustScore: Math.max(0, (prev.connectionQuality.trustScore || 0) - 0.3)
      } : null
    }));
  };

  const retryDetection = () => {
    runDetection();
  };

  useEffect(() => {
    runDetection();
  }, []);

  return {
    ...state,
    handleCaptchaSuccess,
    handleCaptchaFailure,
    retryDetection
  };
};
