import { useState, useEffect } from 'react';
import { botDetector, DetectionResult } from '../utils/botDetection';

export interface BotDetectionState {
  isLoading: boolean;
  result: DetectionResult | null;
  error: string | null;
  isBot: boolean;
  needsCaptcha: boolean;
  isVerified: boolean;
}

export interface BotDetectionOptions {
  timeout?: number;
  botThreshold?: number;
  captchaThreshold?: number;
  enableCaching?: boolean;
  cacheExpiry?: number;
}

const DEFAULT_OPTIONS: Required<BotDetectionOptions> = {
  timeout: 3000,
  botThreshold: 0.7,
  captchaThreshold: 0.3,
  enableCaching: true,
  cacheExpiry: 24 * 60 * 60 * 1000
};

export const useBotDetection = (options: BotDetectionOptions = {}) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  const [state, setState] = useState<BotDetectionState>({
    isLoading: true,
    result: null,
    error: null,
    isBot: false,
    needsCaptcha: false,
    isVerified: false
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
        needsCaptcha: false
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
      
      const isBot = result.score >= opts.botThreshold;
      const needsCaptcha = !isBot; // Always require captcha unless it's a bot

      setState(prev => ({
        ...prev,
        isLoading: false,
        result,
        isBot,
        needsCaptcha,
        isVerified: !isBot && !needsCaptcha
      }));

      if (!isBot && !needsCaptcha) {
        cacheVerification(true);
      }

    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Detection failed',
        isBot: false,
        needsCaptcha: true,
        isVerified: false
      }));
    }
  };

  const handleCaptchaSuccess = () => {
    setState(prev => ({
      ...prev,
      needsCaptcha: false,
      isVerified: true
    }));
    cacheVerification(true);
  };

  const handleCaptchaFailure = () => {
    setState(prev => ({
      ...prev,
      needsCaptcha: false,
      isBot: true,
      isVerified: false
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
