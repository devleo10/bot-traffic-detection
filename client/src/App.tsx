import { useEffect, useState } from 'react';
import BotPage from './components/botpage/BotPage';
import UserPage from './components/userpage/UserPage';
import LoadingScreen from './components/LoadingScreen';
import CaptchaChallenge from './components/CaptchaChallenge';
import { useBotDetection } from './hooks/useBotDetection';

function App() {
  const [loadingStage, setLoadingStage] = useState<'analyzing' | 'verifying' | 'redirecting'>('analyzing');
  const [showDebug, setShowDebug] = useState(false);
  
  const {
    isLoading,
    isBot,
    needsCaptcha,
    isVerified,
    result,
    handleCaptchaSuccess,
    handleCaptchaFailure,
    forceRoute
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

  // Debug panel for testing
  const DebugPanel = () => (
    <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs z-50">
      <div className="mb-2 font-bold">Debug Info:</div>
      <div>Score: {result?.score?.toFixed(3) || 'N/A'}</div>
      <div>Is Bot: {isBot ? 'Yes' : 'No'}</div>
      <div>Needs Captcha: {needsCaptcha ? 'Yes' : 'No'}</div>
      <div>Is Verified: {isVerified ? 'Yes' : 'No'}</div>
      <div className="mt-2 space-y-1">
        <button onClick={() => forceRoute('captcha')} className="block w-full bg-blue-600 px-2 py-1 rounded text-xs">Force Captcha</button>
        <button onClick={() => forceRoute('bot')} className="block w-full bg-red-600 px-2 py-1 rounded text-xs">Force Bot</button>
        <button onClick={() => forceRoute('user')} className="block w-full bg-green-600 px-2 py-1 rounded text-xs">Force User</button>
        <button onClick={() => setShowDebug(false)} className="block w-full bg-gray-600 px-2 py-1 rounded text-xs">Hide</button>
      </div>
    </div>
  );

  // Show CAPTCHA verification if needed
  if (needsCaptcha) {
    return (
      <>
        {showDebug && <DebugPanel />}
        <CaptchaChallenge
          onSuccess={handleCaptchaSuccess}
          onFailure={handleCaptchaFailure}
          onSkip={() => forceRoute('bot')}
        />
      </>
    );
  }

  // Show final redirect loading
  if (!isVerified && !isBot) {
    return <LoadingScreen stage="redirecting" progress={90} />;
  }

  // Route to appropriate page based on detection result
  if (isBot) {
    // Bot detected - show business/SaaS page
    return (
      <>
        {showDebug && <DebugPanel />}
        <BotPage />
      </>
    );
  }

  return (
    <>
      {showDebug && <DebugPanel />}
      <div className="relative">
        <UserPage />
        <button 
          onClick={() => setShowDebug(true)}
          className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs opacity-50 hover:opacity-100"
        >
          Debug
        </button>
      </div>
    </>
  );  // Desktop users see the betting page
}

export default App;