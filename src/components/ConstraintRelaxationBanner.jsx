// VOICEMART AI - Constraint Relaxation & "Why No Match?" Diagnostics Banner
import React from 'react';
import { AlertCircle, SlidersHorizontal, Sparkles, ArrowRight, Check, X } from 'lucide-react';

export function ConstraintRelaxationBanner({
  mismatchAnalysis,
  onRelaxConstraint
}) {
  if (!mismatchAnalysis) return null;

  const {
    limitingConstraint,
    diagnosis,
    categoryAvailable,
    colorAvailable,
    budgetAvailable,
    lowestPriceAvailable,
    relaxationOptions
  } = mismatchAnalysis;

  return (
    <div className="w-full mb-8 p-6 rounded-2xl bg-amber-50/60 border border-amber-200/90 shadow-2xs space-y-4 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/60 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                No Exact Catalog Match Found
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                Unmet Demand Logged
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              "Why No Match?" Diagnostic Engine analyzed your constraint boundaries.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 bg-amber-100/70 px-3 py-1.5 rounded-xl border border-amber-200">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Limiting Factor: {limitingConstraint} Constraint</span>
        </div>
      </div>

      {/* 3-Point Diagnostic Verification Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        
        <div className="p-3 rounded-xl bg-white border border-amber-200/60 flex items-center justify-between shadow-2xs">
          <span className="text-slate-600 font-medium">Category in Catalog:</span>
          {categoryAvailable ? (
            <span className="font-bold text-emerald-700 flex items-center gap-1 font-mono">
              <Check className="w-3.5 h-3.5" /> Available ✓
            </span>
          ) : (
            <span className="font-bold text-rose-700 flex items-center gap-1 font-mono">
              <X className="w-3.5 h-3.5" /> Unavailable ✕
            </span>
          )}
        </div>

        <div className="p-3 rounded-xl bg-white border border-amber-200/60 flex items-center justify-between shadow-2xs">
          <span className="text-slate-600 font-medium">Color Variation:</span>
          {colorAvailable ? (
            <span className="font-bold text-emerald-700 flex items-center gap-1 font-mono">
              <Check className="w-3.5 h-3.5" /> Available ✓
            </span>
          ) : (
            <span className="font-bold text-rose-700 flex items-center gap-1 font-mono">
              <X className="w-3.5 h-3.5" /> Unavailable ✕
            </span>
          )}
        </div>

        <div className="p-3 rounded-xl bg-white border border-amber-200/60 flex items-center justify-between shadow-2xs">
          <span className="text-slate-600 font-medium">Price / Budget Fit:</span>
          {budgetAvailable ? (
            <span className="font-bold text-emerald-700 flex items-center gap-1 font-mono">
              <Check className="w-3.5 h-3.5" /> Fit ✓
            </span>
          ) : (
            <span className="font-bold text-amber-800 flex items-center gap-1 font-mono">
              <X className="w-3.5 h-3.5" /> Exceeds (Min ₹{lowestPriceAvailable})
            </span>
          )}
        </div>

      </div>

      {/* Explanation Text */}
      <div className="p-3.5 rounded-xl bg-white border border-amber-200/70 text-xs text-slate-800 leading-relaxed shadow-2xs">
        <strong className="text-amber-800">Diagnosis: </strong>
        {diagnosis}
      </div>

      {/* Smart Relaxation Action Buttons */}
      {relaxationOptions && relaxationOptions.length > 0 && (
        <div className="pt-1 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Relax Constraints to view closest available alternatives:
          </span>

          <div className="flex flex-wrap gap-2">
            {relaxationOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => onRelaxConstraint(opt.type, opt.relaxedQuery?.maxPrice || opt.relaxedQuery?.color)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-50 border border-stone-200 hover:border-indigo-300 text-xs font-semibold text-slate-800 hover:text-indigo-700 transition-all shadow-2xs"
              >
                <span>{opt.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
