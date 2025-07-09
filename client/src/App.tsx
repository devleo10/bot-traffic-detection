import { useEffect, useState } from 'react';
import BotPage from './components/botpage/BotPage';
import UserPage from './components/userpage/UserPage';
import LoadingScreen from './components/LoadingScreen';
import CaptchaChallenge from './components/CaptchaChallenge';
import { useBotDetection } from './hooks/useBotDetection';

function App() {
  const [loadingStage, setLoadingStage] = useState<'analyzing' | 'verifying' | 'redirecting'>('analyzing');
  
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
    botThreshold: 0.9,     // 0.9-1.0 = Bot (SaaS page) - made even higher
    captchaThreshold: 0.05, // 0.05-0.9 = CAPTCHA challenge - made very low to trigger easily
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

  // Show CAPTCHA verification if needed
  if (needsCaptcha) {
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
  }

  // Trusted or verified connection - show betting page
  return (
    <div className="relative">
      <UserPage />
    </div>
  );
}

export default App;