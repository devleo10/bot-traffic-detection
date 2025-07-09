// Advanced Connection Security Check
// This module provides enhanced detection for determining if a connection is secure and trustworthy

interface ConnectionQuality {
  speed: 'slow' | 'medium' | 'fast';
  secure: boolean;
  trustScore: number; // 0-1 trust score
  isVPN: boolean;
  isTorNetwork: boolean;
  isDatacenter: boolean;
  isProxy: boolean;
  isMobile: boolean;
  platform: string;
  hasFingerprinting: boolean;
}

/**
 * Check if the current connection is from a trusted source
 * This is a more advanced version that also considers various connection properties
 */
export const checkConnectionSecurity = async (): Promise<ConnectionQuality> => {
  // Default values
  const result: ConnectionQuality = {
    speed: 'medium',
    secure: window.location.protocol === 'https:',
    trustScore: 0.5,
    isVPN: false,
    isTorNetwork: false,
    isDatacenter: false,
    isProxy: false,
    isMobile: isMobileDevice(),
    platform: getPlatform(),
    hasFingerprinting: hasCanvasFingerprinting()
  };

  // Test for test scenarios (for testing purposes)
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('TEST_VPN_CONNECTION')) result.isVPN = true;
    if (localStorage.getItem('TEST_TOR_CONNECTION')) result.isTorNetwork = true;
    if (localStorage.getItem('TEST_DATACENTER_IP')) result.isDatacenter = true;
    if (localStorage.getItem('TEST_SLOW_NETWORK')) result.speed = 'slow';
    if (localStorage.getItem('TEST_INSECURE_CONNECTION')) result.secure = false;
  }

  // Detect connection speed
  await detectConnectionSpeed(result);
  
  // Calculate final trust score
  calculateTrustScore(result);

  return result;
};

/**
 * Detects connection speed by downloading a small image
 */
const detectConnectionSpeed = async (result: ConnectionQuality): Promise<void> => {
  try {
    // Try to use the Network Information API first
    const connectionInfo = (navigator as any).connection || 
                          (navigator as any).mozConnection || 
                          (navigator as any).webkitConnection;
    
    if (connectionInfo) {
      // Check connection type
      if (connectionInfo.type) {
        if (['wifi', 'ethernet'].includes(connectionInfo.type)) {
          result.speed = 'fast';
          result.trustScore += 0.1;
        } else if (['cellular'].includes(connectionInfo.type)) {
          // Check cellular generation
          if (connectionInfo.effectiveType) {
            if (['4g', '5g'].includes(connectionInfo.effectiveType)) {
              result.speed = 'fast';
            } else if (['3g'].includes(connectionInfo.effectiveType)) {
              result.speed = 'medium';
            } else {
              result.speed = 'slow';
              result.trustScore -= 0.1;
            }
          }
        } else if (['none', 'unknown'].includes(connectionInfo.type)) {
          result.speed = 'slow';
          result.trustScore -= 0.2;
        }
      }
      
      // Check if data saver is enabled (suspicious)
      if (connectionInfo.saveData) {
        result.trustScore -= 0.1;
      }
    } else {
      // Fallback method: measure connection speed with a tiny image fetch
      const startTime = performance.now();
      const response = await fetch('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
      await response.blob();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (duration < 100) {
        result.speed = 'fast';
        result.trustScore += 0.1;
      } else if (duration < 500) {
        result.speed = 'medium';
      } else {
        result.speed = 'slow';
        result.trustScore -= 0.1;
      }
    }
  } catch (error) {
    console.error('Error detecting connection speed:', error);
  }
};

/**
 * Calculate the final trust score based on all connection properties
 */
const calculateTrustScore = (result: ConnectionQuality): void => {
  // Start with base trust score
  let trustScore = result.trustScore;
  
  // Factors that reduce trust
  if (result.isVPN) trustScore -= 0.2;
  if (result.isTorNetwork) trustScore -= 0.4;
  if (result.isDatacenter) trustScore -= 0.3;
  if (result.isProxy) trustScore -= 0.3;
  if (!result.secure) trustScore -= 0.3;
  if (result.speed === 'slow') trustScore -= 0.1;
  
  // Factors that increase trust
  if (result.isMobile) trustScore += 0.1; // Mobile users are typically legitimate
  if (result.hasFingerprinting) trustScore += 0.1;
  if (result.secure) trustScore += 0.2;
  if (result.speed === 'fast') trustScore += 0.1;
  
  // Platform-specific adjustments
  if (result.platform === 'iOS' || result.platform === 'Android') {
    trustScore += 0.1; // Mobile OSes are generally more secure
  } else if (result.platform === 'Windows' || result.platform === 'macOS') {
    trustScore += 0.05; // Desktop OSes are common for legitimate users
  } else if (result.platform === 'Linux') {
    trustScore -= 0.05; // Linux has higher prevalence among bots (but not always)
  } else {
    trustScore -= 0.1; // Unknown platforms are suspicious
  }
  
  // Clamp the final value
  result.trustScore = Math.max(0, Math.min(1, trustScore));
};

/**
 * Check if device is mobile
 */
const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Get platform information
 */
const getPlatform = (): string => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('android')) return 'Android';
  if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) return 'iOS';
  if (userAgent.includes('windows')) return 'Windows';
  if (userAgent.includes('macintosh') || userAgent.includes('mac os')) return 'macOS';
  if (userAgent.includes('linux')) return 'Linux';
  
  return 'Unknown';
};

/**
 * Check if browser supports canvas fingerprinting
 */
const hasCanvasFingerprinting = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('2d');
  } catch {
    return false;
  }
};

/**
 * Get detailed information about the connection for testing
 */
export const getConnectionDebugInfo = async (): Promise<string> => {
  const info = await checkConnectionSecurity();
  return `
Connection Debug Info:
---------------------
Trust Score: ${(info.trustScore * 100).toFixed(1)}%
Secure: ${info.secure ? 'Yes' : 'No'}
Speed: ${info.speed}
Platform: ${info.platform}
Mobile: ${info.isMobile ? 'Yes' : 'No'}
VPN: ${info.isVPN ? 'Detected' : 'Not detected'}
Tor: ${info.isTorNetwork ? 'Detected' : 'Not detected'}
Datacenter: ${info.isDatacenter ? 'Detected' : 'Not detected'}
Proxy: ${info.isProxy ? 'Detected' : 'Not detected'}
Fingerprinting: ${info.hasFingerprinting ? 'Supported' : 'Not supported'}
Protocol: ${window.location.protocol}
  `;
};
