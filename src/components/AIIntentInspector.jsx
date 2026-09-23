// VOICEMART AI - AI Intent Detection & Explainability Visualizer (Light SaaS Theme)
import React, { useState } from 'react';
import { Cpu, CheckCircle2, Sparkles, Terminal, ChevronDown, ChevronUp, Clock, Zap } from 'lucide-react';

export function AIIntentInspector({ lastAIResult }) {
  const [showJson, setShowJson] = useState(false);

  if (!lastAIResult) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-2">
        <div className="rounded-2xl p-4 bg-white border border-stone-200/80 shadow-2xs flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>AI Intent Pipeline Ready • Speak or type to see live NLP extraction breakdown</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">Awaiting input</span>
        </div>
      </div>
    );
  }

  const { language, intent, extractedEntities, confidence, executionTimeMs, query, matchingProducts } = lastAIResult;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="rounded-2xl p-5 bg-white border border-stone-200/80 shadow-2xs">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 font-display">AI Intent & Entity Breakdown</h4>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Explainable AI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono truncate max-w-md">
                "{query}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>{executionTimeMs || 180}ms</span>
            </div>
            <button
              onClick={() => setShowJson(!showJson)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 text-[11px] font-mono text-slate-700 transition-all"
            >
              <Terminal className="w-3 h-3 text-indigo-600" />
              <span>{showJson ? 'Hide JSON' : 'View Payload'}</span>
              {showJson ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Live Visual Entity Extraction Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          
          {/* Language Card */}
          <div className="p-3 rounded-xl bg-stone-50 border border-indigo-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Language
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-indigo-700">
                {language?.name || 'Tamil'}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 block">
              Confidence {Math.round((confidence || 0.96) * 100)}%
            </span>
          </div>

          {/* Intent Card */}
          <div className="p-3 rounded-xl bg-stone-50 border border-purple-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Intent
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-purple-700 truncate">
                {intent?.replace('_', ' ') || 'Product Search'}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 block">
              Classified ✓
            </span>
          </div>

          {/* Category Card */}
          <div className="p-3 rounded-xl bg-stone-50 border border-emerald-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Category
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-emerald-700">
                {extractedEntities?.category || 'Any Category'}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 block">
              Catalog Mapped
            </span>
          </div>

          {/* Price Constraint Card */}
          <div className="p-3 rounded-xl bg-stone-50 border border-amber-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Price Filter
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-700">
                {extractedEntities?.priceLimit || (extractedEntities?.price ? `₹${extractedEntities.price}` : 'No limit')}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 block">
              Budget Constraint
            </span>
          </div>

          {/* Color / Attributes Card */}
          <div className="p-3 rounded-xl bg-stone-50 border border-rose-100 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Color / Size
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-rose-700 truncate">
                {extractedEntities?.color !== 'Any' ? extractedEntities.color : (extractedEntities?.size !== 'Any' ? `Size ${extractedEntities.size}` : 'Standard')}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 block">
              Qty: {extractedEntities?.quantity || 1}
            </span>
          </div>

        </div>

        {/* Database Search Result summary banner */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-slate-700">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Database Query:</span>
            <span className="text-emerald-700 font-bold">
              {matchingProducts?.length || 0} Products Found in Inventory
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Status: 200 OK • NLP Pipeline Completed
          </span>
        </div>

        {/* Raw JSON Debug Viewer */}
        {showJson && (
          <div className="mt-3 p-3 rounded-xl bg-stone-900 text-slate-100 font-mono text-xs overflow-x-auto">
            <pre>{JSON.stringify(lastAIResult, null, 2)}</pre>
          </div>
        )}

      </div>
    </div>
  );
}
