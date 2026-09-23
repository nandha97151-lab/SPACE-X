// VOICEMART AI - Explainable Product Card with Match Score & Evidence
import React, { useState } from 'react';
import { 
  CheckCircle2, ChevronDown, ChevronUp, ShoppingBag, Eye, Mic, Zap, ShieldCheck, Info 
} from 'lucide-react';

export function ExplainableProductCard({
  product,
  onViewProduct,
  onAddToCart,
  onAskAI,
  onVoiceOrderNow
}) {
  const [showExplanation, setShowExplanation] = useState(false);

  const score = product.matchScore || 85;
  const scoreColor = score >= 85 
    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : score >= 70 
    ? 'text-indigo-700 bg-indigo-50 border-indigo-200'
    : 'text-amber-700 bg-amber-50 border-amber-200';

  return (
    <div className="saas-card overflow-hidden flex flex-col group h-full bg-white border border-stone-200/80 hover:border-stone-300 transition-all duration-200">
      
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={product.Image || product.image}
          alt={product.ProductName || product.name}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Category Tag */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-stone-200/80 text-[10px] font-bold text-slate-700 uppercase tracking-wider shadow-2xs">
          {product.Category || product.category}
        </span>

        {/* Match Score Badge */}
        <div className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-bold tracking-tight shadow-2xs flex items-center gap-1 ${scoreColor}`}>
          <span>Match: {score}/100</span>
        </div>

        {/* Simulated Demo Stock Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs border border-stone-200/80 text-[10px] font-mono text-slate-700 shadow-2xs">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>DEMO STOCK: {product.DemoStock || product.stock || 15} units</span>
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Brand & Gender */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold text-indigo-600">{product.ProductBrand || product.brand}</span>
            <span className="text-[10px] font-mono bg-stone-100 px-2 py-0.5 rounded-md text-slate-600 border border-stone-200/60">
              {product.Gender || 'Unisex'} • {product.PrimaryColor || product.color}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.ProductName || product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.Description || product.description}
          </p>
        </div>

        {/* Price & Product ID */}
        <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">
              ₹{product.Price || product.price}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">
              Verified Price
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            ID: {product.ProductID || product.id}
          </span>
        </div>

        {/* Explainable Matching Breakdown */}
        <div className="pt-1">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 text-[11px] font-medium text-slate-700 transition-colors"
          >
            <span className="flex items-center gap-1.5 text-indigo-600 font-semibold">
              <Info className="w-3.5 h-3.5" />
              <span>Why this matches ({product.matchReasons ? product.matchReasons.length : 3} signals)</span>
            </span>
            {showExplanation ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {showExplanation && (
            <div className="mt-2 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 text-[11px] space-y-1.5 animate-in fade-in duration-150">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Deterministic Match Evidence:
              </span>
              {(product.matchReasons && product.matchReasons.length > 0 ? product.matchReasons : [
                `✓ Category matched: ${product.Category || 'Product'}`,
                `✓ Color matched: ${product.PrimaryColor || 'Color'}`,
                `✓ Within verified budget`
              ]).map((reason, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-slate-800 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onViewProduct(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-slate-700 transition-all shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>Details</span>
          </button>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-2xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Secondary Voice Actions */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            onClick={() => onAskAI(product)}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200/80 text-[11px] font-medium text-slate-600 hover:text-indigo-600 transition-all"
          >
            <Mic className="w-3 h-3 text-indigo-600" />
            <span>Ask AI</span>
          </button>

          <button
            onClick={() => onVoiceOrderNow(product)}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold text-emerald-700 transition-all"
          >
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Voice Order</span>
          </button>
        </div>

      </div>

    </div>
  );
}
