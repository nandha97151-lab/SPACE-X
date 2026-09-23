// VOICEMART AI - Product Card Component
import React from 'react';
import { Star, CheckCircle, ShoppingBag, Eye, Mic, Zap, AlertTriangle } from 'lucide-react';

export function ProductCard({
  product,
  onViewProduct,
  onAddToCart,
  onAskAI,
  onVoiceOrderNow
}) {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group h-full">
      
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Tag */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy-900/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-electric-300 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-rose-500/90 text-white text-[10px] font-extrabold tracking-tight shadow-md">
            {discountPercent}% OFF
          </span>
        )}

        {/* Stock Status Badge */}
        <div className="absolute bottom-3 left-3">
          {product.stock > 10 ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-[11px] font-bold text-emerald-400">
              <CheckCircle className="w-3 h-3" />
              <span>✓ In Stock ({product.stock})</span>
            </span>
          ) : product.stock > 0 ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-950/80 backdrop-blur-md border border-amber-500/30 text-[11px] font-bold text-amber-400">
              <AlertTriangle className="w-3 h-3" />
              <span>Only {product.stock} left!</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/80 backdrop-blur-md border border-rose-500/30 text-[11px] font-bold text-rose-400">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1 group-hover:text-electric-300 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-white/5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-extrabold text-white font-display">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            ID: {product.id}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          
          <button
            onClick={() => onViewProduct(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-navy-950 hover:bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>View Product</span>
          </button>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-electric-600/20 hover:bg-electric-600/40 border border-electric-500/40 text-xs font-bold text-electric-300 hover:text-white transition-all shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

        </div>

        {/* Secondary AI Voice Actions */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            onClick={() => onAskAI(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-navy-950/80 hover:bg-neon-purple/20 border border-white/5 hover:border-neon-purple/40 text-[11px] font-medium text-slate-300 hover:text-neon-purple transition-all"
          >
            <Mic className="w-3 h-3 text-neon-purple" />
            <span>Ask AI</span>
          </button>

          <button
            onClick={() => onVoiceOrderNow(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600/20 to-electric-600/20 hover:from-emerald-600/40 hover:to-electric-600/40 border border-emerald-500/30 text-[11px] font-bold text-emerald-300 hover:text-white transition-all"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Voice Order</span>
          </button>
        </div>

      </div>

    </div>
  );
}
