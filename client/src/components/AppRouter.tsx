import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BotPage from '../components/botpage/BotPage';
import UserPage from '../components/userpage/UserPage';
import LoadingScreen from '../components/LoadingScreen';
import CaptchaChallenge from '../components/CaptchaChallenge';
import { useSecurityRouter } from '../hooks/useSecurityRouter';

// Component for the root route that handles security checks and routing
function SecurityGateway() {
  const {
    loadingStage,
    shouldShowLoading,
    shouldShowCaptcha,
    isRouting,
    handleCaptchaSuccess,
    handleCaptchaFailure
  } = useSecurityRouter();

  // Show loading screen during initial security analysis
  if (shouldShowLoading || isRouting) {
    return <LoadingScreen stage={loadingStage} progress={50} />;
  }

  // Show CAPTCHA verification if needed
  if (shouldShowCaptcha) {
    return (
      <CaptchaChallenge
        onSuccess={handleCaptchaSuccess}
        onFailure={handleCaptchaFailure}
      />
    );
  }

  // If we reach here, redirect to user page as fallback
  return <Navigate to="/user" replace />;
}

// Protected User Page component
function ProtectedUserPage() {
  return (
    <div className="relative">
      <UserPage />
    </div>
  );
}

// Bot/SaaS Page component
function BotPageRoute() {
  return <BotPage />;
}

// Main Router component
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root route - handles security checks and routing */}
        <Route path="/" element={<SecurityGateway />} />
        
        {/* User route - for legitimate users */}
        <Route path="/user" element={<ProtectedUserPage />} />
        
        {/* Bot route - for bots and suspicious connections */}
        <Route path="/bot" element={<BotPageRoute />} />
        
        {/* Catch all other routes and redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
