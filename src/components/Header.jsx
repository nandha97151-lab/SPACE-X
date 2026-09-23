// VOICEMART AI - Top Header Bar (Light SaaS Theme)
import React, { useState } from 'react';
import { 
  Menu, Globe, Sparkles, ShoppingBag, User, ChevronDown, Check, Mic
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

const VIEW_TITLES = {
  'home': { title: 'Store Overview', subtitle: 'Real-time performance, voice telemetry, and quick customer queries' },
  'voice': { title: 'Voice Assistant', subtitle: 'Multilingual natural speech assistant powered by verified 12,491 product catalog' },
  'products': { title: 'Product Catalog', subtitle: 'Browse 12,491 verified products with deterministic weighted matching' },
  'orders': { title: 'Store Orders', subtitle: 'Manage customer voice and storefront order fulfillment' },
  'inventory': { title: 'Inventory Management', subtitle: 'Real-time catalog stock management, SKU pricing, and CRUD controls' },
  'services': { title: 'Store Services & FAQ', subtitle: 'Business hours, delivery radius, return policies, and UPI payments' },
  'demand': { title: 'Demand Intelligence', subtitle: 'Unmet demand detection, demand score ranking, and inventory trend signals' },
  'dataset': { title: '12,491 Product Dataset', subtitle: 'Source of truth catalog explorer, validation health, and custom CSV ingestion' },
  'how-it-thinks': { title: 'How VOICEMART Thinks', subtitle: 'AI speech understanding layer vs deterministic business decision engine' },
  'architecture': { title: '7-Step Architecture Pipeline', subtitle: 'Technical data flow from microphone acoustic stream to verified audio synthesis' },
  'settings': { title: 'Store Settings & Policies', subtitle: 'Configure business profile, working hours, and voice agent policies' }
};

export function Header({
  activeView,
  selectedLanguage,
  setSelectedLanguage,
  cartCount = 0,
  onOpenCart = () => {},
  onOpenDemo = () => {},
  onOpenProfile = () => {},
  onToggleMobileMenu = () => {},
  onToggleMobileSidebar
}) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const toggleMobile = onToggleMobileSidebar || onToggleMobileMenu;
  const currentLangObj = LANGUAGES.find(l => l.code === selectedLanguage) || LANGUAGES[0];
  const viewInfo = VIEW_TITLES[activeView] || VIEW_TITLES['home'];

  return (
    <header className="sticky top-0 z-20 w-full bg-white/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Page Breadcrumb Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobile}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-stone-100 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{viewInfo.title}</span>
            </h1>
            <p className="hidden md:block text-xs text-slate-500 font-medium">
              {viewInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions & Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* 14-Step Demo Button */}
          <button
            onClick={onOpenDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 text-xs font-bold transition-all shadow-2xs hover:scale-102 active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">14-Step</span> Demo
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white border border-stone-200 hover:border-stone-300 text-slate-700 text-xs font-semibold transition-all shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{currentLangObj.label}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-stone-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-stone-100 mb-1">
                  🌐 Select Language
                </div>
                <div className="space-y-0.5">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                        selectedLanguage === lang.code
                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                          : 'text-slate-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {selectedLanguage === lang.code && (
                        <Check className="w-3.5 h-3.5 text-indigo-600" />
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
            className="relative p-2 sm:px-3 sm:py-2 rounded-xl bg-white border border-stone-200 hover:border-stone-300 text-slate-700 text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Customer Profile Button */}
          <button
            onClick={onOpenProfile}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5"
            aria-label="Customer Profile"
          >
            <User className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Profile</span>
          </button>

        </div>

      </div>
    </header>
  );
}
