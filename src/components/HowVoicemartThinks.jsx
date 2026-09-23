// VOICEMART AI - "How VOICEMART Thinks" & AI Hallucination Protection Architecture (Light SaaS Theme)
import React from 'react';
import { 
  Cpu, Database, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Zap, AlertCircle, 
  Terminal, Sparkles, Server, FileText, ArrowDown
} from 'lucide-react';

export function HowVoicemartThinks() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
          <Cpu className="w-3.5 h-3.5" />
          <span>Judge-Facing Technical Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
          How VOICEMART Thinks
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          The clear architectural separation between <strong>AI Natural Speech Understanding</strong> and the <strong>Deterministic Business Decision Engine</strong>.
        </p>
      </div>

      {/* AI Hallucination Protection Guarantee */}
      <div className="p-7 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              AI Hallucination Protection Guarantee
            </h3>
            <p className="text-xs text-emerald-800 font-medium">
              Zero Artificial Hallucinations: All recommendations are strictly grounded in verified catalog data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          
          <div className="p-4 rounded-xl bg-white border border-rose-200 shadow-2xs space-y-2">
            <span className="text-rose-700 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <XCircle className="w-4 h-4" /> Traditional LLM Chatbots (Risky)
            </span>
            <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
              <li>Invents products, fake discounts, and non-existent inventory.</li>
              <li>Ignores hard price boundaries and business policies.</li>
              <li>Generates generic textual answers without recording merchant intelligence.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-2">
            <span className="text-emerald-800 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> VOICEMART AI Architecture (Verified)
            </span>
            <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
              <li><strong>Deterministic Verification:</strong> Verifies every price and SKU against the 12,491 dataset.</li>
              <li><strong>Explainable Scoring:</strong> Computes transparent 0–100 match weights (Category 35%, Color 20%, Price 20%, Brand 10%).</li>
              <li><strong>Demand Intelligence:</strong> Converts customer queries into structured unmet demand signals.</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Two-Column Comparison: AI Layer vs Business Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: AI Natural Language Layer */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Layer 1</span>
              <h3 className="text-base font-bold text-slate-900 font-display">AI Natural Speech & Understanding</h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">1. Multilingual Speech Recognition (STT)</span>
              <p className="text-slate-600">Captures acoustic voice streams in Tamil, Hindi, Telugu, Malayalam, Kannada, and English with interim phonetic transcription.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">2. Code-Switching & Dialect Detection</span>
              <p className="text-slate-600">Identifies mixed-language speech (e.g. <em>"Enakku black shirt venum under 1500"</em>) and normalizes intent tokens.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">3. Structured Slot & Entity Extraction</span>
              <p className="text-slate-600">Extracts category, budget, color, gender, and quantity into a clean typed query DTO without making assumptions.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">4. Multilingual Text-to-Speech (TTS)</span>
              <p className="text-slate-600">Synthesizes natural spoken responses matching the customer's native regional language.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Deterministic Business Engine */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">Layer 2</span>
              <h3 className="text-base font-bold text-slate-900 font-display">Deterministic Business Decision Engine</h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">1. Exact Catalog Filtering & Hard Bounds</span>
              <p className="text-slate-600">Queries the 12,491 product dataset directly. Enforces strict price limits and verifies actual inventory availability.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">2. Weighted Match Scoring (0–100)</span>
              <p className="text-slate-600">Applies configured weights (Category: 35%, Color: 20%, Price: 20%, Brand: 10%, Similarity: 15%) for explainable results.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">3. Constraint Relaxation & Diagnostics</span>
              <p className="text-slate-600">When 0 matches exist, isolates the exact limiting constraint (e.g. Budget) and computes closest valid alternatives.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">4. Demand Intelligence & Opportunity Scoring</span>
              <p className="text-slate-600">Logs every interaction into the Demand Registry to detect unmet demand and calculate trend percentages for store owners.</p>
            </div>
          </div>
        </div>

      </div>

      {/* End-to-End Visual Example Walkthrough for Judges */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-6">
        <div className="border-b border-stone-100 pb-3">
          <h3 className="text-base font-bold font-display text-slate-900">
            End-to-End Execution Trace Example
          </h3>
          <p className="text-xs text-slate-500">Step-by-step trace of how a customer query transforms into business intelligence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          
          <div className="p-4 rounded-xl bg-stone-50 border border-indigo-200 space-y-2">
            <span className="text-[10px] font-bold text-indigo-700 uppercase">Step 1 • Voice In</span>
            <p className="text-slate-900 font-sans font-semibold">"எனக்கு 1500 ரூபாய்க்குள்ள ஒரு black shirt வேண்டும்"</p>
            <span className="text-[10px] text-slate-500 block font-mono">Audio Stream → Tamil (ta-IN)</span>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-purple-200 space-y-2">
            <span className="text-[10px] font-bold text-purple-700 uppercase">Step 2 • AI Slot DTO</span>
            <div className="text-[11px] text-slate-700 space-y-0.5 font-mono">
              <p>Category: <span className="text-emerald-700 font-bold">Shirts</span></p>
              <p>Color: <span className="text-amber-800 font-bold">Black</span></p>
              <p>Price: <span className="text-indigo-700 font-bold">≤ ₹1500</span></p>
            </div>
            <span className="text-[10px] text-slate-500 block">Intent: Product Search</span>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-emerald-200 space-y-2">
            <span className="text-[10px] font-bold text-emerald-800 uppercase">Step 3 • DB Verification</span>
            <p className="text-slate-900 font-sans font-semibold">4 Verified Items Matched in 12,491 Catalog</p>
            <span className="text-[10px] text-emerald-700 font-bold font-mono">Match Score: 95/100</span>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-amber-200 space-y-2">
            <span className="text-[10px] font-bold text-amber-800 uppercase">Step 4 • Demand Signal</span>
            <p className="text-slate-900 font-sans font-semibold">Logged to Merchant Demand Registry</p>
            <span className="text-[10px] text-amber-700 font-bold font-mono">Status: FULFILLED ✓</span>
          </div>

        </div>
      </div>

    </div>
  );
}
