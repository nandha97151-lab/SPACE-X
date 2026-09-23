// VOICEMART AI - Main Navigation Bar with Demand Intelligence & Dataset Explorer
import React, { useState } from 'react';
import { 
  Mic, Globe, Sparkles, ShoppingBag, LayoutDashboard, Cpu, User, ChevronDown, 
  Check, Database, Target, HelpCircle, Layers
} from 'lucide-react';

const LANGUAGES = [
  { code: 'auto', name: 'Auto Detect Language', label: 'Auto Detect', flag: '✨' },
  { code: 'ta-IN', name: 'Tamil', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'en-IN', name: 'English', label: 'English', flag: '🌐' },
  { code: 'hi-IN', name: 'Hindi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te-IN', name: 'Telugu', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml-IN', name: 'Malayalam', label: 'മലയാളം', flag: '🇮🇳' },
  { code: 'kn-IN', name: 'Kannada', label: 'ಕನ್ನಡ', flag: '🇮🇳' }
];

export function Navbar({
  activeView,
  setActiveView,
  selectedLanguage,
  setSelectedLanguage,
  cartCount,
  onOpenCart,
  onOpenDemo,
  onOpenProfile
}) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const currentLangObj = LANGUAGES.find(l => l.code === selectedLanguage) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-navy-950/85 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveView('storefront')}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-electric-600 via-indigo-600 to-neon-purple p-[1px] shadow-lg shadow-electric-500/20">
            <div className="w-full h-full bg-navy-900 rounded-2xl flex items-center justify-center">
              <Mic className="w-6 h-6 text-electric-400 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-tight text-white flex items-center">
                VOICEMART<span className="text-electric-400 ml-1">AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-electric-500/10 text-electric-400 border border-electric-500/30">
                HACKMINT 26 • HACM176
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              "Speak Your Language. Find What You Need."
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden lg:flex items-center p-1.5 rounded-2xl bg-navy-900/80 border border-white/5 shadow-inner">
          <button
            onClick={() => setActiveView('storefront')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeView === 'storefront'
                ? 'bg-gradient-to-r from-electric-600 to-indigo-600 text-white shadow-md shadow-electric-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            Voice Storefront
          </button>

          <button
            onClick={() => setActiveView('demand')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeView === 'demand'
                ? 'bg-gradient-to-r from-electric-600 to-indigo-600 text-white shadow-md shadow-electric-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-neon-purple" />
            Demand Intelligence
          </button>

          <button
            onClick={() => setActiveView('dataset')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeView === 'dataset'
                ? 'bg-gradient-to-r from-electric-600 to-indigo-600 text-white shadow-md shadow-electric-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            12,491 Dataset
          </button>

          <button
            onClick={() => setActiveView('how-it-thinks')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeView === 'how-it-thinks'
                ? 'bg-gradient-to-r from-electric-600 to-indigo-600 text-white shadow-md shadow-electric-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            How It Thinks
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeView === 'dashboard'
                ? 'bg-gradient-to-r from-electric-600 to-indigo-600 text-white shadow-md shadow-electric-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </button>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Start 14-Step Hackathon Demo CTA */}
          <button
            onClick={onOpenDemo}
            className="relative group overflow-hidden flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-neon-purple via-indigo-600 to-electric-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-neon-purple/25 hover:shadow-neon-purple/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span className="font-extrabold tracking-wide">START DEMO</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-900 border border-white/10 hover:border-electric-500/40 text-slate-200 text-xs sm:text-sm font-medium transition-all shadow-sm"
              title="Select Input Language"
            >
              <Globe className="w-4 h-4 text-electric-400" />
              <span className="hidden sm:inline font-semibold">{currentLangObj.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-navy-900/95 backdrop-blur-2xl border border-electric-500/20 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 mb-1 flex items-center justify-between">
                  <span>🌐 Choose Language</span>
                </div>
                <div className="space-y-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedLanguage === lang.code
                          ? 'bg-electric-500/20 text-electric-300 border border-electric-500/30'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({lang.name})</span>
                      </div>
                      {selectedLanguage === lang.code && (
                        <Check className="w-3.5 h-3.5 text-electric-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-navy-900 border border-white/10 hover:border-electric-500/40 text-slate-200 hover:text-white transition-all"
            title="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-slate-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[11px] font-extrabold shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Customer Profile Trigger */}
          <button
            onClick={onOpenProfile}
            className="p-2.5 rounded-xl bg-navy-900 border border-white/10 hover:border-electric-500/40 text-slate-200 hover:text-white transition-all"
            title="Customer Profile & Session"
          >
            <User className="w-5 h-5 text-slate-300" />
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around px-2 py-2 border-t border-white/5 bg-navy-900/60 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveView('storefront')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
            activeView === 'storefront' ? 'bg-electric-500 text-white' : 'text-slate-300'
          }`}
        >
          Storefront
        </button>
        <button
          onClick={() => setActiveView('demand')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
            activeView === 'demand' ? 'bg-electric-500 text-white' : 'text-slate-300'
          }`}
        >
          Demand Intel
        </button>
        <button
          onClick={() => setActiveView('dataset')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
            activeView === 'dataset' ? 'bg-electric-500 text-white' : 'text-slate-300'
          }`}
        >
          12.4k Dataset
        </button>
        <button
          onClick={() => setActiveView('how-it-thinks')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
            activeView === 'how-it-thinks' ? 'bg-electric-500 text-white' : 'text-slate-300'
          }`}
        >
          How It Thinks
        </button>
        <button
          onClick={() => setActiveView('dashboard')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
            activeView === 'dashboard' ? 'bg-electric-500 text-white' : 'text-slate-300'
          }`}
        >
          Dashboard
        </button>
      </div>
    </header>
  );
}
