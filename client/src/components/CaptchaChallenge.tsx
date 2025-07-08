import React from 'react';
import ImageCaptcha from './ImageCaptcha';

interface CaptchaChallengeProps {
  onSuccess: () => void;
  onFailure: () => void;
  onSkip?: () => void;
}

const CaptchaChallenge: React.FC<CaptchaChallengeProps> = ({ 
  onSuccess, 
  onFailure, 
  onSkip 
}) => {
  return (
    <ImageCaptcha
      onSuccess={onSuccess}
      onFailure={onFailure}
      onRetry={onSkip}
    />
  );
};

export default CaptchaChallenge;
