// Bot Detection Utility
// Comprehensive bot detection system with multiple detection methods

export interface DetectionResult {
  score: number; // 0.0 (human) to 1.0 (bot)
  confidence: number; // How confident we are in the score
  reasons: string[]; // Reasons for the score
  method: string; // Primary detection method used
  connectionQuality?: {
    speed: 'slow' | 'medium' | 'fast';
    secure: boolean;
    trustScore: number; // 0-1 trust score
  };
}

export class BotDetector {
  private detectionMethods: Array<() => Promise<Partial<DetectionResult>>> = [];
  private whitelistedBots = [
    'googlebot',
    'bingbot',
    'slurp', // Yahoo
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot'
  ];

  constructor() {
    this.initializeDetectionMethods();
  }

  private initializeDetectionMethods() {
    this.detectionMethods = [
      this.detectUserAgent.bind(this),
      this.detectJavaScriptExecution.bind(this),
      this.detectCanvasFingerprint.bind(this),
      this.detectWebGL.bind(this),
      this.detectViewportProperties.bind(this),
      this.detectTimingAnalysis.bind(this),
      this.detectDOMManipulation.bind(this),
      this.detectLocalStorage.bind(this),
      this.detectMouseBehavior.bind(this),
      this.detectConnectionQuality.bind(this), // New method
      this.detectNavigatorProperties.bind(this) // New method
    ];
  }

  // Main detection method
  async detect(): Promise<DetectionResult> {
    const results = await Promise.allSettled(
      this.detectionMethods.map((method) => method())
    );

    let totalScore = 0;
    let totalConfidence = 0;
    let allReasons: string[] = [];
    let methodsUsed: string[] = [];
    let connectionQuality: DetectionResult['connectionQuality'] = {
      speed: 'medium',
      secure: window.location.protocol === 'https:',
      trustScore: 0.5
    };

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        const { 
          score = 0, 
          confidence = 0, 
          reasons = [], 
          method = `method-${index}`, 
          connectionQuality: detectedConnectionQuality 
        } = result.value;
        
        if (score && confidence) {
          totalScore += score * confidence;
          totalConfidence += confidence;
        }
        
        if (reasons.length > 0) {
          allReasons.push(...reasons);
        }
        
        if (method) {
          methodsUsed.push(method);
        }
        
        // Update connection quality if available
        if (detectedConnectionQuality) {
          connectionQuality = detectedConnectionQuality;
        }
      }
    });

    const finalScore = totalConfidence > 0 ? totalScore / totalConfidence : 0.5;
    const finalConfidence = Math.min(totalConfidence / this.detectionMethods.length, 1);

    const finalResult = {
      score: Math.max(0, Math.min(1, finalScore)),
      confidence: finalConfidence,
      reasons: allReasons,
      method: methodsUsed.join(', '),
      connectionQuality
    };

    return finalResult;
  }

  // User Agent Analysis
  private async detectUserAgent(): Promise<Partial<DetectionResult>> {
    const userAgent = navigator.userAgent.toLowerCase();
    let score = 0;
    const reasons: string[] = [];

    // Check for whitelisted bots first
    const isWhitelisted = this.whitelistedBots.some(bot => userAgent.includes(bot));
    if (isWhitelisted) {
      return {
        score: 0, // Allow whitelisted bots to see user content for SEO
        confidence: 0.9,
        reasons: ['Whitelisted search engine bot'],
        method: 'user-agent-whitelist'
      };
    }

    // Common bot indicators
    const botIndicators = [
      'bot', 'crawler', 'spider', 'scraper', 'parser', 'fetcher',
      'monitor', 'checker', 'validator', 'tester', 'scanner'
    ];

    botIndicators.forEach(indicator => {
      if (userAgent.includes(indicator)) {
        score += 0.8;
        reasons.push(`User agent contains bot indicator: ${indicator}`);
      }
    });

    // Headless browser detection
    if (userAgent.includes('headless') || userAgent.includes('phantom')) {
      score += 0.9;
      reasons.push('Headless browser detected');
    }

    // Suspicious user agent patterns
    if (userAgent.length < 50 || userAgent.split(' ').length < 5) {
      score += 0.3;
      reasons.push('Suspicious user agent pattern');
    }

    return {
      score: Math.min(score, 1),
      confidence: 0.7,
      reasons,
      method: 'user-agent'
    };
  }

  // JavaScript Execution Detection
  private async detectJavaScriptExecution(): Promise<Partial<DetectionResult>> {
    const startTime = performance.now();
    
    // Test basic JavaScript capabilities
    const tests = [
      () => typeof window !== 'undefined',
      () => typeof document !== 'undefined',
      () => typeof localStorage !== 'undefined',
      () => typeof sessionStorage !== 'undefined',
      () => typeof setTimeout !== 'undefined',
      () => typeof Math.random !== 'undefined'
    ];

    const passedTests = tests.filter(test => {
      try {
        return test();
      } catch {
        return false;
      }
    }).length;

    const executionTime = performance.now() - startTime;
    let score = 0;
    const reasons: string[] = [];

    if (passedTests < tests.length) {
      score += 0.6;
      reasons.push(`Failed ${tests.length - passedTests} JavaScript tests`);
    }

    if (executionTime < 0.1) {
      score += 0.3;
      reasons.push('Suspiciously fast JavaScript execution');
    }

    return {
      score,
      confidence: 0.8,
      reasons,
      method: 'javascript-execution'
    };
  }

  // Canvas Fingerprinting
  private async detectCanvasFingerprint(): Promise<Partial<DetectionResult>> {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        return {
          score: 0.4,
          confidence: 0.5,
          reasons: ['Canvas context not available'],
          method: 'canvas-unavailable'
        };
      }

      // Draw complex pattern
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('BotDetection🤖', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Canvas fingerprint', 4, 17);

      const fingerprint = canvas.toDataURL();
      const reasons: string[] = [];
      let score = 0;

      // Check for common bot canvas signatures
      if (fingerprint === 'data:,' || fingerprint.length < 100) {
        score += 0.8;
        reasons.push('Invalid or empty canvas fingerprint');
      }

      // Check for default/common fingerprints
      const commonFingerprints = [
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmAl',
      ];

      if (commonFingerprints.some(fp => fingerprint.startsWith(fp))) {
        score += 0.6;
        reasons.push('Common bot canvas fingerprint detected');
      }

      return {
        score,
        confidence: 0.9,
        reasons,
        method: 'canvas-fingerprint'
      };
    } catch {
      return {
        score: 0.5,
        confidence: 0.3,
        reasons: ['Canvas fingerprinting failed'],
        method: 'canvas-error'
      };
    }
  }

  // WebGL Detection
  private async detectWebGL(): Promise<Partial<DetectionResult>> {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        return {
          score: 0.3,
          confidence: 0.4,
          reasons: ['WebGL not supported'],
          method: 'webgl-unsupported'
        };
      }

      // Type assertion for WebGL context
      const webglContext = gl as WebGLRenderingContext;
      const renderer = webglContext.getParameter(webglContext.RENDERER);
      const vendor = webglContext.getParameter(webglContext.VENDOR);
      
      let score = 0;
      const reasons: string[] = [];

      // Check for headless indicators
      if (renderer.includes('SwiftShader') || renderer.includes('llvmpipe')) {
        score += 0.7;
        reasons.push('Headless WebGL renderer detected');
      }

      if (vendor.includes('Brian Paul') || vendor.includes('Mesa')) {
        score += 0.5;
        reasons.push('Virtual WebGL vendor detected');
      }

      return {
        score,
        confidence: 0.8,
        reasons,
        method: 'webgl'
      };
    } catch {
      return {
        score: 0.4,
        confidence: 0.3,
        reasons: ['WebGL detection failed'],
        method: 'webgl-error'
      };
    }
  }

  // Viewport Properties Detection
  private async detectViewportProperties(): Promise<Partial<DetectionResult>> {
    const reasons: string[] = [];
    let score = 0;

    // Check for suspicious viewport properties
    if (window.outerWidth === 0 || window.outerHeight === 0) {
      score += 0.6;
      reasons.push('Zero viewport dimensions');
    }

    if (window.innerWidth === window.outerWidth && window.innerHeight === window.outerHeight) {
      score += 0.4;
      reasons.push('Suspicious viewport equality');
    }

    // Check screen properties
    if (screen.width === 0 || screen.height === 0) {
      score += 0.7;
      reasons.push('Invalid screen dimensions');
    }

    // Very common bot resolutions
    const botResolutions = ['1024x768', '800x600', '1280x1024'];
    const currentResolution = `${screen.width}x${screen.height}`;
    
    if (botResolutions.includes(currentResolution)) {
      score += 0.2;
      reasons.push('Common bot screen resolution');
    }

    return {
      score,
      confidence: 0.6,
      reasons,
      method: 'viewport'
    };
  }

  // Timing Analysis
  private async detectTimingAnalysis(): Promise<Partial<DetectionResult>> {
    const start = performance.now();
    
    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 1));
    
    const end = performance.now();
    const duration = end - start;
    
    let score = 0;
    const reasons: string[] = [];

    if (duration < 0.5) {
      score += 0.3;
      reasons.push('Suspiciously fast timing execution');
    }

    return {
      score,
      confidence: 0.4,
      reasons,
      method: 'timing'
    };
  }

  // DOM Manipulation Test
  private async detectDOMManipulation(): Promise<Partial<DetectionResult>> {
    try {
      const testElement = document.createElement('div');
      testElement.style.position = 'absolute';
      testElement.style.left = '-9999px';
      testElement.style.width = '1px';
      testElement.style.height = '1px';
      testElement.innerHTML = 'test';
      
      document.body.appendChild(testElement);
      
      const computed = window.getComputedStyle(testElement);
      const canModifyDOM = computed.width === '1px';
      
      document.body.removeChild(testElement);
      
      return {
        score: canModifyDOM ? 0 : 0.5,
        confidence: 0.7,
        reasons: canModifyDOM ? [] : ['Cannot properly manipulate DOM'],
        method: 'dom-manipulation'
      };
    } catch {
      return {
        score: 0.6,
        confidence: 0.5,
        reasons: ['DOM manipulation test failed'],
        method: 'dom-error'
      };
    }
  }

  // Local Storage Test
  private async detectLocalStorage(): Promise<Partial<DetectionResult>> {
    try {
      const testKey = 'bot-detection-test';
      const testValue = Math.random().toString();
      
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      
      const works = retrieved === testValue;
      
      return {
        score: works ? 0 : 0.3,
        confidence: 0.5,
        reasons: works ? [] : ['Local storage not functioning properly'],
        method: 'local-storage'
      };
    } catch {
      return {
        score: 0.4,
        confidence: 0.4,
        reasons: ['Local storage test failed'],
        method: 'local-storage-error'
      };
    }
  }

  // Mouse Behavior Detection (initial setup)
  private async detectMouseBehavior(): Promise<Partial<DetectionResult>> {
    // This is a placeholder for mouse behavior tracking
    // In a real implementation, you'd track mouse movements over time
    return new Promise(resolve => {
      const mouseData = {
        movements: 0,
        clicks: 0,
        startTime: Date.now()
      };

      const trackMouse = (_e: MouseEvent) => {
        mouseData.movements++;
      };

      const trackClick = (_e: MouseEvent) => {
        mouseData.clicks++;
      };

      document.addEventListener('mousemove', trackMouse);
      document.addEventListener('click', trackClick);

      // Quick check for immediate bot detection
      setTimeout(() => {
        document.removeEventListener('mousemove', trackMouse);
        document.removeEventListener('click', trackClick);

        const hasMouseActivity = mouseData.movements > 0 || mouseData.clicks > 0;
        
        resolve({
          score: hasMouseActivity ? 0 : 0.2,
          confidence: 0.3,
          reasons: hasMouseActivity ? [] : ['No mouse activity detected'],
          method: 'mouse-behavior'
        });
      }, 100);
    });
  }

  // Connection Quality Detection
  private async detectConnectionQuality(): Promise<Partial<DetectionResult>> {
    try {
      const connectionInfo = (navigator as any).connection || 
                            (navigator as any).mozConnection || 
                            (navigator as any).webkitConnection;
      
      let connectionQuality = {
        speed: 'medium' as 'slow' | 'medium' | 'fast',
        secure: window.location.protocol === 'https:',
        trustScore: 0.5
      };
      
      // Check if we can get connection info
      if (connectionInfo) {
        // Check connection type
        if (connectionInfo.type) {
          if (['wifi', 'ethernet'].includes(connectionInfo.type)) {
            connectionQuality.speed = 'fast';
            connectionQuality.trustScore += 0.2;
          } else if (['cellular'].includes(connectionInfo.type)) {
            // Check cellular generation
            if (connectionInfo.effectiveType) {
              if (['4g', '5g'].includes(connectionInfo.effectiveType)) {
                connectionQuality.speed = 'fast';
                connectionQuality.trustScore += 0.1;
              } else if (['3g'].includes(connectionInfo.effectiveType)) {
                connectionQuality.speed = 'medium';
              } else {
                connectionQuality.speed = 'slow';
                connectionQuality.trustScore -= 0.1;
              }
            }
          } else if (['none', 'unknown'].includes(connectionInfo.type)) {
            connectionQuality.speed = 'slow';
            connectionQuality.trustScore -= 0.2;
          }
        }
        
        // Check if data saver is enabled (suspicious)
        if (connectionInfo.saveData) {
          connectionQuality.trustScore -= 0.1;
        }
      } else {
        // Measure connection speed with a tiny image fetch
        const startTime = performance.now();
        const response = await fetch('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
        await response.blob();
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (duration < 100) {
          connectionQuality.speed = 'fast';
          connectionQuality.trustScore += 0.1;
        } else if (duration < 500) {
          connectionQuality.speed = 'medium';
        } else {
          connectionQuality.speed = 'slow';
          connectionQuality.trustScore -= 0.1;
        }
      }
      
      // HTTPS check
      if (connectionQuality.secure) {
        connectionQuality.trustScore += 0.2;
      } else {
        connectionQuality.trustScore -= 0.3; // Heavily penalize non-HTTPS
      }
      
      // Clamp trust score
      connectionQuality.trustScore = Math.max(0, Math.min(1, connectionQuality.trustScore));
      
      return {
        score: connectionQuality.trustScore < 0.3 ? 0.6 : 0, // Only score as bot-like if very low trust
        confidence: 0.7,
        reasons: connectionQuality.trustScore < 0.3 ? ['Suspicious connection quality'] : [],
        method: 'connection-quality',
        connectionQuality
      };
    } catch (error) {
      return {
        score: 0.1, // Small penalty for errors
        confidence: 0.3,
        reasons: ['Connection quality check failed'],
        method: 'connection-quality-error',
        connectionQuality: {
          speed: 'medium',
          secure: window.location.protocol === 'https:',
          trustScore: 0.4
        }
      };
    }
  }
  
  // Navigator Properties Detection (for device trust)
  private async detectNavigatorProperties(): Promise<Partial<DetectionResult>> {
    try {
      const reasons: string[] = [];
      let trustScore = 0.5;
      let score = 0;
      
      // Check device memory
      if ('deviceMemory' in navigator) {
        const memory = (navigator as any).deviceMemory;
        if (memory < 2) {
          trustScore -= 0.1;
        } else if (memory > 4) {
          trustScore += 0.1;
        }
      }
      
      // Check hardwareConcurrency (CPU cores)
      if ('hardwareConcurrency' in navigator) {
        const cores = navigator.hardwareConcurrency;
        if (cores < 2) {
          trustScore -= 0.1;
          reasons.push('Suspiciously low CPU cores');
        } else if (cores > 4) {
          trustScore += 0.1;
        }
      }
      
      // Check for service worker support (legitimate browsers)
      if ('serviceWorker' in navigator) {
        trustScore += 0.1;
      } else {
        trustScore -= 0.2;
        reasons.push('No service worker support');
      }
      
      // Check for legitimate language settings
      if (navigator.languages && navigator.languages.length > 0) {
        trustScore += 0.1;
      } else if (!navigator.language) {
        trustScore -= 0.2;
        reasons.push('Missing language settings');
        score += 0.3;
      }
      
      // Check if cookies are enabled
      if (navigator.cookieEnabled) {
        trustScore += 0.1;
      } else {
        trustScore -= 0.1;
        reasons.push('Cookies disabled');
      }
      
      // Calculate final score
      if (trustScore < 0.3) {
        score += 0.4;
        reasons.push('Suspicious navigator properties');
      }
      
      return {
        score,
        confidence: 0.6,
        reasons,
        method: 'navigator-properties',
        connectionQuality: {
          speed: 'medium',
          secure: window.location.protocol === 'https:',
          trustScore: Math.max(0, Math.min(1, trustScore))
        }
      };
    } catch {
      return {
        score: 0.1,
        confidence: 0.3,
        reasons: ['Navigator properties check failed'],
        method: 'navigator-properties-error'
      };
    }
  }
}

// Export singleton instance
export const botDetector = new BotDetector();
