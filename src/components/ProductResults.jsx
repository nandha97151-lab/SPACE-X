// VOICEMART AI - Dynamic Product & Business Results Section
// Automatically displayed below voice conversation
import React from 'react';
import { Sparkles, ShoppingBag, AlertCircle, RefreshCw, Star, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BusinessCard } from './BusinessCard';

export function ProductResults({
  products = [],
  businessInfo = null,
  query = '',
  language = 'en-IN',
  isLoading = false,
  error = null,
  onViewProduct,
  onAddToCart,
  onAskAI,
  onVoiceOrderNow,
  onViewBusiness
}) {
  const isTamil = language === 'ta-IN';

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="w-full rounded-2xl bg-white border border-stone-200/90 p-10 text-center space-y-4 shadow-sm animate-pulse">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
          <RefreshCw className="w-6 h-6 animate-spin" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-slate-900">
            {isTamil ? 'பொருட்களை தேடிக்கொண்டிருக்கிறேன்...' : 'Searching verified products...'}
          </h4>
          <p className="text-xs text-slate-500">
            {isTamil ? '12,491 தயாரிப்புகளின் தரவுத்தளத்தில் தேடப்படுகிறது' : 'Querying 12,491 verified catalog records'}
          </p>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="w-full rounded-2xl bg-rose-50 border border-rose-200 p-6 text-center space-y-2 text-rose-800">
        <AlertCircle className="w-8 h-8 mx-auto text-rose-600" />
        <h4 className="text-sm font-bold">
          {isTamil ? 'பொருட்களை பெற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.' : 'Could not fetch products. Please try again.'}
        </h4>
        <p className="text-xs text-rose-600">{error.message || String(error)}</p>
      </div>
    );
  }

  // If there's business info and no specific products requested
  if (businessInfo && (!products || products.length === 0)) {
    return (
      <section className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>{isTamil ? 'கடை விவரங்கள்' : 'Store Information'}</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">1 Store Found</span>
        </div>
        <BusinessCard business={businessInfo} language={language} onViewBusiness={onViewBusiness} />
      </section>
    );
  }

  // 3. No Results State
  if ((!products || products.length === 0) && !businessInfo && query) {
    return (
      <div className="w-full rounded-2xl bg-white border border-stone-200/90 p-8 text-center space-y-3 shadow-sm animate-in fade-in duration-200">
        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-800">
            {isTamil
              ? 'இந்த தேடலுக்கு பொருத்தமான பொருட்கள் கிடைக்கவில்லை.'
              : 'No matching products found for this search.'}
          </h4>
          <p className="text-xs text-slate-500">
            {isTamil
              ? 'வேறு முக்கிய சொற்களை அல்லது அதிக பட்ஜெட்டை கொண்டு பேசவும்.'
              : 'Try relaxing your price budget or searching by another category.'}
          </p>
        </div>
      </div>
    );
  }

  // If completely idle with no query
  if (!products || products.length === 0) {
    return null;
  }

  // 4. Results State
  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-400">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <span>{isTamil ? 'உங்களுக்கு பொருத்தமான பொருட்கள்' : 'Recommended Products'}</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-mono font-bold">
              {products.length} {isTamil ? 'பொருட்கள்' : 'items'}
            </span>
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {isTamil ? 'கடை: ஸ்ரீ முருகன் சூப்பர்ஸ்டோர்' : 'Store: Sri Murugan Superstore'}
        </span>
      </div>

      {/* Business Card if also present */}
      {businessInfo && (
        <div className="mb-4">
          <BusinessCard business={businessInfo} language={language} onViewBusiness={onViewBusiness} />
        </div>
      )}

      {/* Responsive Product Cards Grid (3-4 desktop, 2 tablet, 1 mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {products.map((product, index) => {
          const pName = product.ProductName || product.name || 'Product';
          const pPrice = product.Price ?? product.price ?? 0;
          const pOrigPrice = product.originalPrice || (pPrice > 100 ? Math.round(pPrice * 1.25) : null);
          const pImage = product.Image || product.image || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80';
          const pCategory = product.Category || product.category || 'General';
          const pBrand = product.ProductBrand || product.brand || 'Cauvery Farm';
          const pRating = product.Rating || product.rating || 4.6;
          const pDesc = product.Description || product.description || '';
          const pStock = product.DemoStock || product.stock || 25;
          const pId = product.ProductID || product.id || `PROD-${index}`;

          const discount = pOrigPrice ? Math.round(((pOrigPrice - pPrice) / pOrigPrice) * 100) : 0;

          return (
            <div
              key={pId}
              style={{ animationDelay: `${index * 80}ms` }}
              className="rounded-2xl bg-white border border-stone-200/90 hover:border-indigo-300/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group animate-in fade-in slide-in-from-bottom-2"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <img
                  src={pImage}
                  alt={pName}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-stone-200/80 text-[10px] font-bold text-slate-800 uppercase tracking-wider shadow-2xs">
                  {pCategory}
                </span>

                {discount > 0 && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold tracking-tight shadow-sm">
                    {discount}% OFF
                  </span>
                )}

                <div className="absolute bottom-2.5 left-2.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs border border-stone-200/80 text-[10px] font-mono text-emerald-700 shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>In Stock ({pStock})</span>
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-indigo-700">{pBrand}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{pRating}</span>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {pName}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {pDesc}
                  </p>
                </div>

                {/* Price */}
                <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-slate-900 font-mono">
                      ₹{pPrice}
                    </span>
                    {pOrigPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{pOrigPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ID: {pId}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onViewProduct ? onViewProduct(product) : null}
                    className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isTamil ? 'பார்வை' : 'View Details'}</span>
                  </button>
                  <button
                    onClick={() => onAddToCart ? onAddToCart(product) : null}
                    className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isTamil ? 'கார்ட்டில் சேர்' : 'Add to Cart'}</span>
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
