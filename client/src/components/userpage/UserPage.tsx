import {
  Shield,
  Zap,
  Users,
  Trophy,
  DollarSign,
  Smartphone,
} from 'lucide-react';
import heroImage from '../../assets/img.png'; // Using the correct case-sensitive filename
import logo from '../../assets/img.png';

function UserPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden font-display relative">
      {/* Main Background - Dark Green with Texture */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-950 via-green-900 to-gray-900"></div>
      
      {/* Faded Pattern Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800/20 via-transparent to-green-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(34,197,94,0.05)_0%,transparent_40%)]"></div>
      </div>

      {/* Texture Overlay */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-800/10 to-transparent transform skew-y-12"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-green-700/10 to-transparent transform -skew-y-12"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-transparent to-green-900/20"></div>
      </div>

      {/* Subtle Animated Elements */}
      <div className="fixed inset-0 overflow-hidden opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-600/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-green-500/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>
      
      {/* Dark Overlay for Better Contrast */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none"></div>
      
      {/* Navigation - Just the logo */}
      <nav className="relative z-50 px-6 py-4 backdrop-blur-sm bg-black/20 border-b border-green-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3 group">
            <img src={logo} alt="MK WORLD" className="h-12 w-12 rounded-full object-cover ring-2 ring-green-400/50 shadow-lg shadow-green-500/20" />
            <span className="text-2xl font-black bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent animate-pulse tracking-tight">
              MK WORLD
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center" id="hero">
        {/* Hero Background Image covering entire section */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-soft-light filter blur-[0.5px]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-800/40 to-black/70"></div>
        </div>
        
        <div className="relative z-10 w-full px-6">
          <div className="max-w-7xl mx-auto text-center lg:text-left">
            <h1 className="text-7xl md:text-9xl lg:text-10xl font-black mb-8 leading-none tracking-tighter animate-fade-in-up">
              <span className="bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent animate-pulse">
                MOST TRUSTED
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text text-transparent animate-bounce-subtle">
                ALL SPORT ONE SITE
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-green-100 mb-12 max-w-4xl mx-auto lg:mx-0 leading-relaxed font-light tracking-wide animate-fade-in-up delay-300">
              GET YOUR SPORT'S ID NOW
              <br />
              <span className="text-green-300 font-bold">10% WELCOME BENEFIT</span>
              <br />
              <span className="text-green-300 font-bold">5% EVERY FILL</span>
              <br />
              <span className="text-lime-400 font-semibold">LIMITED OFFER</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-500">
              <a 
                href="https://wa.me/918690900994" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative px-10 py-5 bg-green-600 hover:bg-green-700 rounded-xl font-black text-xl tracking-wider overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 flex items-center space-x-3"
              >
                <span className="relative z-10">CHAT WITH US ON WHATSAPP</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="relative px-6 py-4 bg-black/60 border-y border-green-700/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-sm md:text-base font-medium text-green-100 max-w-4xl">
              <span className="font-bold text-lime-300 block mb-2">DISCLAIMER:</span>
              This website is only for 18+ users. If you are from Andhra Pradesh, Telengana, Orissa, Assam, Sikkim or Nagaland please leave the website immediately. Be aware of money frauds - we only deal via WhatsApp. No Real Money involvement.
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-20 bg-black/40 backdrop-blur-sm" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tighter">
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Why Choose
              </span>
              <br />
              <span className="text-white">MK WORLD?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-green-200 transition-colors duration-300">100% Legal & Secure</h3>
              <p className="text-green-100/80 leading-relaxed font-light tracking-wide group-hover:text-green-100 transition-colors duration-300">Licensed and regulated. Your funds are protected with bank-level security.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 delay-75 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-green-200 transition-colors duration-300">Instant Payouts</h3>
              <p className="text-green-100/80 leading-relaxed font-light tracking-wide group-hover:text-green-100 transition-colors duration-300">Lightning-fast withdrawals. Get your winnings in minutes, not days.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 delay-150 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-green-200 transition-colors duration-300">Best Odds</h3>
              <p className="text-green-100/80 leading-relaxed font-light tracking-wide group-hover:text-green-100 transition-colors duration-300">Industry-leading odds with advanced analytics to maximize your winnings.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 delay-200 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-green-200 transition-colors duration-300">Mobile First</h3>
              <p className="text-green-100/80 leading-relaxed font-light tracking-wide group-hover:text-green-100 transition-colors duration-300">Seamless experience across all devices. Bet anywhere, anytime.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 delay-300 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-green-200 transition-colors duration-300">24/7 Support</h3>
              <p className="text-green-100/80 leading-relaxed font-light tracking-wide group-hover:text-green-100 transition-colors duration-300">Round-the-clock customer support from betting experts.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 delay-[375ms] backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-green-200 transition-colors duration-300">Huge Bonuses</h3>
              <p className="text-green-100/80 leading-relaxed font-light tracking-wide group-hover:text-green-100 transition-colors duration-300">Welcome bonus up to $1,000 plus weekly rewards and promotions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 bg-black/60 backdrop-blur-sm border-t border-green-700/30" id="footer">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Want to run ads like this?
            </h2>
            <a 
              href="https://wa.me/918690900994" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl font-bold text-lg tracking-wider overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 flex items-center space-x-3"
            >
              <span className="relative z-10">Contact Us on WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserPage;