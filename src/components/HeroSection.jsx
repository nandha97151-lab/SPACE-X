// VOICEMART AI - Hero Section
import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, ArrowRight, ShieldCheck, Zap, Volume2, Store, Search } from 'lucide-react';
import { DEMO_PRESET_QUERIES } from '../services/inventoryData';

export function HeroSection({ onStartVoice, onSelectQuery, onOpenDemo }) {
  const [activeStep, setActiveStep] = useState(0);

  // Dynamic cycling simulation for hero mockup
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-8 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-electric-600/20 via-neon-purple/20 to-neon-cyan/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading & Value Prop */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-electric-500/30 text-xs font-semibold text-electric-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Problem HACM176 • Speech AI & Business</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-400">Production Prototype</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.15]">
            Talk to Your <br className="hidden sm:block" />
            <span className="text-gradient-primary">Local Business.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Ask about products, prices, availability, and services using your own native language. 
            Powered by multilingual speech recognition and conversational intelligence.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onStartVoice}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-electric-600 via-indigo-600 to-neon-purple text-white font-bold text-base shadow-xl shadow-electric-500/30 hover:shadow-electric-500/50 hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span>Start Voice Search</span>
            </button>

            <button
              onClick={onOpenDemo}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-navy-900 border border-white/15 hover:border-electric-400 text-slate-200 hover:text-white font-semibold text-base transition-all hover:bg-navy-800"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>10-Step Interactive Demo</span>
            </button>
          </div>

          {/* Feature Highlights Pill Row */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-xl mx-auto lg:mx-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-electric-500/10 text-electric-400">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">6+ Languages</p>
                <p className="text-[10px] text-slate-400">Tamil, Hindi, etc.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-neon-purple/10 text-neon-purple">
                <Store className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Real Inventory</p>
                <p className="text-[10px] text-slate-400">Live Stock & Prices</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Voice Orders</p>
                <p className="text-[10px] text-slate-400">Instant #VM Codes</p>
              </div>
            </div>
          </div>

          {/* Quick Voice Query Chips */}
          <div className="space-y-2 pt-2 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>⚡ Try one-click voice queries:</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {DEMO_PRESET_QUERIES.slice(0, 4).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectQuery(q.query, q.language)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900/90 border border-white/10 hover:border-electric-400/50 text-slate-300 hover:text-white text-xs transition-all hover:scale-[1.02] shadow-sm group"
                >
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-electric-500/20 text-electric-400">
                    {q.languageLabel.split(' ')[0]}
                  </span>
                  <span className="font-medium group-hover:text-electric-300 font-sans">{q.query}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Animated AI Assistant Interface Mockup */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-electric-500/30 via-neon-purple/20 to-transparent shadow-2xl">
            <div className="rounded-[22px] bg-navy-900/90 backdrop-blur-2xl border border-white/10 p-6 space-y-6">
              
              {/* Header inside mockup */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-bold text-slate-400 ml-2">VOICEMART AI LIVE AGENT</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ONLINE
                </span>
              </div>

              {/* State 0: Listening */}
              <div className={`p-4 rounded-2xl border transition-all duration-500 ${
                activeStep === 0 ? 'bg-electric-500/10 border-electric-500/40 shadow-lg' : 'bg-navy-950/40 border-white/5 opacity-60'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-electric-500/20 flex items-center justify-center text-electric-400">
                    <Mic className={`w-5 h-5 ${activeStep === 0 ? 'animate-pulse' : ''}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400">VOICE INPUT CAPTURED</p>
                    <p className="text-sm font-semibold text-white">"எனக்கு 1000 ரூபாய்க்குள் ஒரு ஷூ வேண்டும்"</p>
                  </div>
                </div>
              </div>

              {/* State 1: Language & Intent Extraction */}
              <div className={`p-4 rounded-2xl border transition-all duration-500 ${
                activeStep === 1 ? 'bg-neon-purple/10 border-neon-purple/40 shadow-lg' : 'bg-navy-950/40 border-white/5 opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neon-purple flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> AI INTENT DETECTED
                  </span>
                  <span className="text-[10px] font-mono bg-navy-950 px-2 py-0.5 rounded text-slate-300">Tamil (தமிழ்) 98%</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="px-2.5 py-1.5 rounded-lg bg-navy-950/80 text-slate-300 border border-white/5">
                    Category: <span className="text-emerald-400 font-bold">Footwear / Shoes</span>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-navy-950/80 text-slate-300 border border-white/5">
                    Price: <span className="text-amber-400 font-bold">≤ ₹1,000</span>
                  </div>
                </div>
              </div>

              {/* State 2 & 3: Results & Spoken Output */}
              <div className={`p-4 rounded-2xl border transition-all duration-500 ${
                activeStep >= 2 ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg' : 'bg-navy-950/40 border-white/5 opacity-60'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5" /> 4 PRODUCTS FOUND IN INVENTORY
                  </p>
                  <span className="text-[10px] font-bold text-slate-400">Response in Tamil</span>
                </div>

                <div className="p-3 rounded-xl bg-navy-950/90 border border-white/10 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-white">"₹1000க்குள் 4 shoes கிடைத்துள்ளன."</p>
                    <p className="text-[11px] text-slate-400">AeroSprint Running Shoes @ ₹899</p>
                  </div>
                  <div className="p-2 rounded-xl bg-electric-500/20 text-electric-400 animate-pulse">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {[0, 1, 2, 3].map((step) => (
                  <button
                    key={step}
                    onClick={() => setActiveStep(step)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeStep === step ? 'w-8 bg-electric-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
