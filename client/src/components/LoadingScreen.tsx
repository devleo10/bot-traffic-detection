import { Loader2, Shield, Bot, User } from 'lucide-react';

type StageType = 'analyzing' | 'verifying' | 'redirecting';
type ColorType = 'blue' | 'green' | 'purple';

interface LoadingScreenProps {
  stage: StageType;
  progress?: number;
}

const LoadingScreen = ({ stage, progress = 0 }: LoadingScreenProps) => {
  const getStageInfo = (): {
    icon: typeof Shield;
    title: string;
    subtitle: string;
    color: ColorType;
  } => {
    switch (stage) {
      case 'analyzing':
        return {
          icon: Shield,
          title: 'Analyzing Request',
          subtitle: 'Checking security parameters...',
          color: 'blue' as const
        };
      case 'verifying':
        return {
          icon: User,
          title: 'Verifying Identity',
          subtitle: 'Please complete the verification...',
          color: 'green' as const
        };
      case 'redirecting':
        return {
          icon: Bot,
          title: 'Redirecting',
          subtitle: 'Loading appropriate content...',
          color: 'purple' as const
        };
      default:
        return {
          icon: Shield,
          title: 'Loading',
          subtitle: 'Please wait...',
          color: 'blue' as const
        };
    }
  };

  const { icon: Icon, title, subtitle, color } = getStageInfo();

  const colorClasses: Record<ColorType, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <div className="mb-8">
          {/* Main Icon with Rotating Loader */}
          <div className="relative inline-flex items-center justify-center">
            <Loader2 className="w-20 h-20 text-gray-600 animate-spin" />
            <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-r ${colorClasses[color]} rounded-full opacity-20 animate-pulse`}></div>
            <Icon className="absolute w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title and Subtitle */}
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400 text-lg mb-8">{subtitle}</p>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="w-80 mx-auto mb-6">
            <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-300 ease-out`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-gray-400 text-sm mt-2">{progress.toFixed(0)}% complete</div>
          </div>
        )}

        {/* Security Indicators */}
        <div className="flex items-center justify-center space-x-6 text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Secure Connection</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
            <span className="text-sm">Protected Content</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
            <span className="text-sm">Smart Routing</span>
          </div>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm">
        <p>Powered by Advanced Security Systems</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
