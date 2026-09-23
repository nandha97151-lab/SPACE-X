// VOICEMART AI - 14-Step Interactive Hackathon Demo Mode (Light SaaS Theme)
import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, Play, Pause, SkipForward, RotateCcw, CheckCircle2, Mic, Volume2, 
  ShoppingBag, ArrowRight, Zap, Globe, AlertTriangle, Target, BarChart3, Database
} from 'lucide-react';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

const DEMO_STEPS = [
  {
    step: 1,
    title: "1. Language Selection",
    description: "Customer selects Tamil (தமிழ்) or relies on automatic spoken dialect & code-switching detection.",
    action: "Selected Language: Tamil (ta-IN)",
    voicePhrase: null,
    highlight: "Tamil (தமிழ்)"
  },
  {
    step: 2,
    title: "2. Customer Voice Speech",
    description: "Customer taps the central microphone and speaks in native Tamil with English loanwords.",
    action: "Speech Audio Captured",
    voicePhrase: "எனக்கு 1500 ரூபாய்க்குள்ள ஒரு black shirt வேண்டும்",
    meaning: "I need a black shirt under ₹1500",
    highlight: "Voice Input Ingested"
  },
  {
    step: 3,
    title: "3. Real-Time Language & Code-Switching Detection",
    description: "Unicode script inspection and token analysis classifies Tamil language with 98% confidence.",
    action: "Language: Tamil (98% confidence)",
    voicePhrase: null,
    highlight: "Tamil Detected ✓"
  },
  {
    step: 4,
    title: "4. Intent Classification",
    description: "NLP engine understands user intent is a product search with budget constraints.",
    action: "Intent: PRODUCT_SEARCH",
    voicePhrase: null,
    highlight: "Product Search ✓"
  },
  {
    step: 5,
    title: "5. Structured Slot & Entity Extraction",
    description: "Extracts Category: Shirts, PrimaryColor: Black, Budget: ≤ ₹1500, Gender: Men.",
    action: "Category: Shirts | Color: Black | Budget: ≤ ₹1500",
    voicePhrase: null,
    highlight: "Structured Query DTO Ready"
  },
  {
    step: 6,
    title: "6. Deterministic Search over 12,491 Dataset",
    description: "Queries the verified 12,491 product catalog enforcing strict price and color constraints.",
    action: "Searched 12,491 Products Catalog",
    voicePhrase: null,
    highlight: "12,491 Dataset Queried"
  },
  {
    step: 7,
    title: "7. Render Matching Products",
    description: "Presents verified items (Peter England Black Casual Shirt @ ₹1,199, Roadster Cotton Shirt @ ₹899).",
    action: "4 Verified Products Found",
    voicePhrase: null,
    highlight: "4 Verified Items Matched"
  },
  {
    step: 8,
    title: "8. Explainable Match Scoring",
    description: "Displays transparent Match Score: 95/100 (Category: 35%, Color: 20%, Price: 20%, Brand: 10%).",
    action: "Why this matches: ✓ Category, ✓ Color, ✓ Within Budget",
    voicePhrase: null,
    highlight: "Match Score: 95/100"
  },
  {
    step: 9,
    title: "9. Contextual Follow-up Query",
    description: "Customer asks: 'Show me the cheapest one' without repeating product details.",
    action: "Customer Follow-up: 'Show me the cheapest one'",
    voicePhrase: "Show me the cheapest one",
    meaning: "Show me the lowest priced shirt from previous results",
    highlight: "Context Memory Active"
  },
  {
    step: 10,
    title: "10. Session Memory & Lowest Price Isolation",
    description: "AI remembers previous 4 results and isolates the lowest priced shirt at ₹899.",
    action: "Isolated: Roadster Cotton Shirt (₹899)",
    voicePhrase: "மிகவும் குறைந்த விலையுள்ள தயாரிப்பு Roadster Cotton Shirt, இதன் விலை ₹899 மட்டுமே.",
    highlight: "Cheapest Item Isolated"
  },
  {
    step: 11,
    title: "11. Simulate a NO-MATCH Query",
    description: "Customer asks for an unrealistic combination: 'Do you have a black formal shirt under ₹200?'",
    action: "Zero Match Query: Budget ≤ ₹200",
    voicePhrase: "Do you have a black formal shirt under 200?",
    meaning: "Black formal shirt under ₹200",
    highlight: "0 Exact Matches Found"
  },
  {
    step: 12,
    title: "12. 'Why No Match?' Diagnostics & Constraint Relaxation",
    description: "Engine explains: 'Category available ✓ | Color available ✓ | Budget was the limiting constraint (Lowest available is ₹899)'.",
    action: "Diagnosis: Budget constraint caused mismatch",
    voicePhrase: "உங்கள் பட்ஜெட்டுக்குள் தயாரிப்பு கிடைக்கவில்லை. அருகிலுள்ள மாற்று தயாரிப்புகள் இதோ.",
    highlight: "Budget Constraint Isolated"
  },
  {
    step: 13,
    title: "13. Logging as UNMET DEMAND Signal",
    description: "System logs the zero-match query into the Merchant Demand Registry as an active UNMET DEMAND signal.",
    action: "Recorded: Black Formal Shirt (≤ ₹200) → UNMET",
    voicePhrase: null,
    highlight: "Unmet Demand Logged!"
  },
  {
    step: 14,
    title: "14. Business Intelligence & Actionable Recommendation",
    description: "Merchant Dashboard calculates Demand Score (88/100) and recommends adding budget SKUs in the ₹500–₹800 range!",
    action: "Actionable Insight: 'Consider adding budget SKUs to capture missed revenue'",
    voicePhrase: null,
    highlight: "Demand Intelligence Complete! 🎉"
  }
];

export function HackathonDemoModal({
  isOpen,
  onClose,
  onApplyDemoToStore,
  onOpenDemandDashboard
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(true);

  const step = DEMO_STEPS[currentStepIndex];

  // Auto progression timer
  useEffect(() => {
    if (!isOpen || !isPlayingAuto) return;

    const timer = setTimeout(() => {
      if (currentStepIndex < DEMO_STEPS.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        setIsPlayingAuto(false);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [isOpen, isPlayingAuto, currentStepIndex]);

  // Audio synthesis triggers
  useEffect(() => {
    if (!isOpen) return;

    if (currentStepIndex === 13) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    if (step.voicePhrase) {
      speechService.speak(step.voicePhrase, {
        lang: step.voicePhrase.includes('Show') || step.voicePhrase.includes('Do you') ? 'en-IN' : 'ta-IN'
      });
    }
  }, [currentStepIndex, isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsPlayingAuto(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-stone-200 shadow-xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-slate-500 hover:text-slate-900 hover:bg-stone-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  VOICEMART AI • 14-Step Judge Demo
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  HACM176
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Voice Input → 12,491 Catalog Search → Explainability → Unmet Demand Intelligence
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
            Step {step.step} of 14
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
            style={{ width: `${(step.step / 14) * 100}%` }}
          />
        </div>

        {/* Step Highlight Card */}
        <div className="p-6 rounded-xl bg-stone-50/70 border border-stone-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              {step.title}
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {step.highlight}
            </span>
          </div>

          <p className="text-sm text-slate-800 font-medium leading-relaxed">
            {step.description}
          </p>

          {/* Voice Speech Box */}
          {step.voicePhrase && (
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold flex items-center gap-1.5 text-indigo-700">
                  <Volume2 className="w-4 h-4" /> Spoken Audio Phrase:
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">SpeechSynthesis</span>
              </div>
              <p className="text-base font-bold text-slate-900">"{step.voicePhrase}"</p>
              {step.meaning && (
                <p className="text-xs text-slate-500 italic">Interpretation: "{step.meaning}"</p>
              )}
            </div>
          )}

          {/* Action indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Action: {step.action}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingAuto ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-600 hover:text-slate-900 transition-colors"
              title="Restart Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-xs font-semibold text-slate-700"
            >
              Back
            </button>

            {currentStepIndex < DEMO_STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs transition-colors"
              >
                <span>Next Step</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  if (onOpenDemandDashboard) onOpenDemandDashboard();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs transition-colors"
              >
                <BarChart3 className="w-4 h-4 text-white" />
                <span>Open Demand Intelligence Dashboard</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
