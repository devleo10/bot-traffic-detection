import {
  Shield,
  Zap,
  Users,
  Trophy,
  Star,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Smartphone,
  Lock
} from 'lucide-react';
import heroImage from '../../assets/img.png';
import logo from '../../assets/img.png';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden font-display relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 backdrop-blur-sm bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <img src={logo} alt="MK WORLD" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              MK WORLD
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-wide relative group bg-transparent border-none cursor-pointer">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-wide relative group bg-transparent border-none cursor-pointer">
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-wide relative group bg-transparent border-none cursor-pointer">
              Get Started
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-wide relative group bg-transparent border-none cursor-pointer">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20" id="hero">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-7xl md:text-9xl lg:text-10xl font-black mb-8 leading-none tracking-tighter animate-fade-in-up">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
                  MOST TRUSTED
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent animate-bounce-subtle">
                  ALL SPORT ONE SITE
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto lg:mx-0 leading-relaxed font-light tracking-wide animate-fade-in-up delay-300">
                GET YOUR SPORT'S ID NOW
                <br />
                <span className="text-yellow-400 font-bold">10% WELCOME BENEFIT</span>
                <br />
                
                <span className="text-yellow-400 font-bold">5% EVERY FILL</span>
                <br />
                <span className="text-red-400 font-semibold">LIMITED OFFER</span>
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

            {/* Right Column - Hero Image */}
            <div className="relative group lg:-mt-16">
              <div className="relative z-10 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20">
                <img
                  src={heroImage}
                  alt="Sports Betting Dashboard"
                  className="w-full h-auto transform group-hover:scale-105 transition-all duration-700 filter group-hover:brightness-110"
                />
                {/* Overlay gradient for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-purple-900/30 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 mt-20">
            <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="text-5xl md:text-6xl font-black text-purple-400 mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-300">$50M+</div>
              <div className="text-gray-300 font-medium tracking-wide">Total Winnings Paid</div>
            </div>
            <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-pink-500/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 delay-100">
              <div className="text-5xl md:text-6xl font-black text-pink-400 mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-300">2.5M+</div>
              <div className="text-gray-300 font-medium tracking-wide">Active Users</div>
            </div>
            <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 delay-200">
              <div className="text-5xl md:text-6xl font-black text-green-400 mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-300">99.9%</div>
              <div className="text-gray-300 font-medium tracking-wide">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="px-6 py-4 bg-red-900/30 border-y border-red-500/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-sm md:text-base font-medium text-red-200 max-w-4xl">
              <span className="font-bold text-yellow-300 block mb-2">DISCLAIMER:</span>
              This website is only for 18+ users. If you are from Andhra Pradesh, Telengana, Orissa, Assam, Sikkim or Nagaland please leave the website immediately. Be aware of money frauds - we only deal via WhatsApp. No Real Money involvement.
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-black/20 backdrop-blur-sm" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tighter">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Why Choose
              </span>
              <br />
              <span className="text-white">MK WORLD?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-purple-200 transition-colors duration-300">100% Legal & Secure</h3>
              <p className="text-gray-300 leading-relaxed font-light tracking-wide group-hover:text-gray-200 transition-colors duration-300">Licensed and regulated. Your funds are protected with bank-level security.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 delay-75">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-purple-200 transition-colors duration-300">Instant Payouts</h3>
              <p className="text-gray-300 leading-relaxed font-light tracking-wide group-hover:text-gray-200 transition-colors duration-300">Lightning-fast withdrawals. Get your winnings in minutes, not days.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 delay-150">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-purple-200 transition-colors duration-300">Best Odds</h3>
              <p className="text-gray-300 leading-relaxed font-light tracking-wide group-hover:text-gray-200 transition-colors duration-300">Industry-leading odds with advanced analytics to maximize your winnings.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 delay-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-purple-200 transition-colors duration-300">Mobile First</h3>
              <p className="text-gray-300 leading-relaxed font-light tracking-wide group-hover:text-gray-200 transition-colors duration-300">Seamless experience across all devices. Bet anywhere, anytime.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 delay-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-purple-200 transition-colors duration-300">24/7 Support</h3>
              <p className="text-gray-300 leading-relaxed font-light tracking-wide group-hover:text-gray-200 transition-colors duration-300">Round-the-clock customer support from betting experts.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 delay-[375ms]">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight group-hover:text-purple-200 transition-colors duration-300">Huge Bonuses</h3>
              <p className="text-gray-300 leading-relaxed font-light tracking-wide group-hover:text-gray-200 transition-colors duration-300">Welcome bonus up to $1,000 plus weekly rewards and promotions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-center mb-16 tracking-tighter">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Trusted by Winners
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed font-light tracking-wide">"Best betting platform I've ever used. The odds are incredible and payouts are instant!"</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MJ</span>
                </div>
                <div>
                  <div className="font-bold tracking-wide">Mike Johnson</div>
                  <div className="text-sm text-gray-400 font-medium tracking-wide">Professional Bettor</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed font-light tracking-wide">"Finally, a legal betting site that actually cares about its users. Highly recommended!"</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SR</span>
                </div>
                <div>
                  <div className="font-bold tracking-wide">Sarah Rodriguez</div>
                  <div className="text-sm text-gray-400 font-medium tracking-wide">Sports Analyst</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed font-light tracking-wide">"Won big on my first week! The analytics tools are game-changing."</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DK</span>
                </div>
                <div>
                  <div className="font-bold tracking-wide">David Kim</div>
                  <div className="text-sm text-gray-400 font-medium tracking-wide">Data Scientist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50" id="cta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tighter">
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Ready to Win?
            </span>
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            Join thousands of winners who've already discovered the future of sports betting.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <button className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-black text-2xl tracking-wider overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
              <span className="relative z-10 flex items-center space-x-3">
                <span>Claim $1,000 Bonus</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-30 group-hover:opacity-60 blur transition-opacity duration-300"></div>
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="font-medium tracking-wide">No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="font-medium tracking-wide">100% Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="font-medium tracking-wide">Fully Licensed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black/40 backdrop-blur-sm border-t border-white/10" id="footer">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Want to run ads like this?
            </h2>
            <a 
              href="https://wa.me/918690900994" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl font-bold text-lg tracking-wider overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 flex items-center space-x-3"
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

export default App;