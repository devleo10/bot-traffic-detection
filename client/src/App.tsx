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
    handleCaptchaSuccess,
    handleCaptchaFailure
  } = useBotDetection({
    timeout: 3000,
    botThreshold: 0.9,     // 0.9-1.0 = Bot (SaaS page) - made even higher
    captchaThreshold: 0.05, // 0.05-0.9 = CAPTCHA challenge - made very low to trigger easily
    enableCaching: false   // Disabled caching for testing - 0.0-0.05 = Human (User page)
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

  // Route to appropriate page based on detection result
  if (isBot) {
    // Bot detected - show business/SaaS page
    return <BotPage />;
  }

  return (
    <div className="relative">
      <UserPage />
    </div>
  );  // Desktop users see the betting page
}

export default App;