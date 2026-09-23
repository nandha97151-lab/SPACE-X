// VOICEMART AI - Product Detail Modal with Multilingual Descriptions (Light SaaS Theme)
import React, { useState } from 'react';
import { X, Star, CheckCircle, ShoppingBag, Mic, Zap, Shield, Truck, RotateCcw, Globe } from 'lucide-react';

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onAskAI,
  onVoiceOrderNow
}) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : 'Default');
  const [activeDescLang, setActiveDescLang] = useState('ta'); // default Tamil

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-stone-200 shadow-xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-slate-500 hover:text-slate-900 border border-stone-200 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 relative bg-stone-100 flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-full">
          <img
            src={product.image || product.Image}
            alt={product.name || product.ProductName}
            className="w-full h-full object-cover object-center"
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-xs font-semibold text-indigo-700 uppercase shadow-2xs">
            {product.category || product.Category}
          </span>
          {discountPercent > 0 && (
            <span className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-2xs">
              {discountPercent}% SAVINGS
            </span>
          )}
        </div>

        {/* Right: Details & Multilingual Descriptions */}
        <div className="md:w-1/2 p-6 sm:p-7 overflow-y-auto space-y-5 flex-1">
          
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-indigo-700">{product.brand || product.ProductBrand}</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating || 4.5}</span>
                <span className="text-slate-400 font-normal">({product.reviewsCount || 42} reviews)</span>
              </div>
            </div>

            <h2 className="text-xl font-bold font-display text-slate-900 leading-snug">
              {product.name || product.ProductName}
            </h2>

            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-2xl font-black text-slate-900 font-display">
                ₹{product.price || product.Price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                ✓ In Stock ({product.stock || product.DemoStock || 8} units)
              </span>
            </div>
          </div>

          {/* Multilingual Description Switcher */}
          <div className="space-y-2 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 border-b border-stone-200 pb-2">
              <span className="flex items-center gap-1.5 text-indigo-700">
                <Globe className="w-3.5 h-3.5" /> Regional Language Description
              </span>
              <div className="flex items-center gap-1">
                {['ta', 'hi', 'en', 'te'].map((code) => (
                  <button
                    key={code}
                    onClick={() => setActiveDescLang(code)}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors ${
                      activeDescLang === code
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-500 hover:text-slate-900 bg-white border border-stone-200'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              {activeDescLang === 'en'
                ? (product.description || product.Description)
                : product.translations?.[activeDescLang] || (product.description || product.Description)}
            </p>
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Select Size / Option:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedSize === s
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-stone-50 border border-stone-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Available Colors:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                      selectedColor === c
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-300 font-semibold'
                        : 'bg-white text-slate-600 hover:bg-stone-50 border border-stone-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Store Promises */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-stone-100 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>7 Days Return</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>100% Verified</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onAddToCart({ ...product, selectedSize, selectedColor });
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-2xs transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  onVoiceOrderNow({ ...product, selectedSize, selectedColor });
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-2xs transition-all"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Quick Voice Order</span>
              </button>
            </div>

            <button
              onClick={() => {
                onAskAI(product);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-indigo-700 text-xs font-semibold transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>Ask AI Voice Assistant About This Product</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
