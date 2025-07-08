import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface ImageCaptchaProps {
  onSuccess: () => void;
  onFailure: () => void;
  onRetry?: () => void;
}

const ImageCaptcha: React.FC<ImageCaptchaProps> = ({ 
  onSuccess, 
  onFailure, 
  onRetry 
}) => {
  const [captchaText, setCaptchaText] = useState<string>('');
  const [captchaImage, setCaptchaImage] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState<'success' | 'failure' | null>(null);
  const maxAttempts = 3;

  // Generate random CAPTCHA text
  const generateCaptcha = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    generateCaptchaImage(result);
    setUserInput('');
  }, []);

  // Generate distorted CAPTCHA image
  const generateCaptchaImage = (text: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 80;

    // Background with noise
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise lines
    for (let i = 0; i < 8; i++) {
      ctx.strokeStyle = `hsl(${Math.random() * 360}, 50%, 70%)`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Add noise dots
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 50%, 50%)`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 3,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    // Draw text with distortion
    const fontSize = 24;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textBaseline = 'middle';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const x = 20 + i * 25 + Math.random() * 10 - 5;
      const y = canvas.height / 2 + Math.random() * 10 - 5;
      const rotation = (Math.random() - 0.5) * 0.5;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 30%)`;
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    setCaptchaImage(canvas.toDataURL());
  };

  // Verify user input
  const verifyCaptcha = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const isCorrect = userInput.toUpperCase() === captchaText.toUpperCase();
    
    if (isCorrect) {
      setShowResult('success');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setShowResult('failure');
      setAttempts(prev => prev + 1);
      
      setTimeout(() => {
        if (attempts + 1 >= maxAttempts) {
          onFailure();
        } else {
          setShowResult(null);
          generateCaptcha();
        }
        setIsSubmitting(false);
      }, 2000);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.length > 0 && !isSubmitting) {
      verifyCaptcha();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Security Verification</h2>
          <p className="text-gray-600">Please enter the characters shown in the image</p>
        </div>

        {/* CAPTCHA Image */}
        <div className="mb-6">
          <div className="bg-gray-100 border-2 border-gray-200 rounded-lg p-4 flex justify-center items-center mb-4">
            {captchaImage ? (
              <img 
                src={captchaImage} 
                alt="CAPTCHA Challenge" 
                className="max-w-full h-auto select-none"
                draggable={false}
              />
            ) : (
              <div className="w-48 h-20 bg-gray-200 animate-pulse rounded"></div>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Attempts: {attempts}/{maxAttempts}</span>
            <button
              onClick={generateCaptcha}
              disabled={isSubmitting}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 disabled:text-gray-400"
            >
              <RefreshCw className="w-4 h-4" />
              <span>New Image</span>
            </button>
          </div>
        </div>

        {/* Input Field */}
        <div className="mb-6">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="Enter the characters above"
            maxLength={6}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-center text-lg font-mono tracking-widest uppercase focus:border-blue-500 focus:outline-none"
            disabled={isSubmitting}
            autoComplete="off"
          />
          <p className="text-xs text-gray-500 mt-2 text-center">
            Not case sensitive • Letters and numbers only
          </p>
        </div>

        {/* Result display */}
        {showResult && (
          <div className={`mb-4 p-3 rounded-lg text-center ${
            showResult === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {showResult === 'success' ? (
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Verification successful!</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <XCircle className="w-5 h-5" />
                <span>Incorrect code. Please try again.</span>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex space-x-3">
          <button
            onClick={verifyCaptcha}
            disabled={userInput.length === 0 || isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify</span>
            )}
          </button>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Skip verification
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCaptcha;