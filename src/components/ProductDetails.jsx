// VOICEMART AI - Product Details Modal / Drawer
import React from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, CheckCircle2, Store } from 'lucide-react';

export function ProductDetails({ product, onClose, onAddToCart, language = 'en-IN' }) {
  if (!product) return null;
  const isTamil = language === 'ta-IN';

  const pName = product.ProductName || product.name || 'Product';
  const pPrice = product.Price ?? product.price ?? 0;
  const pOrigPrice = product.originalPrice || (pPrice > 100 ? Math.round(pPrice * 1.25) : null);
  const pImage = product.Image || product.image;
  const pCategory = product.Category || product.category || 'General';
  const pBrand = product.ProductBrand || product.brand || 'Cauvery Farm';
  const pRating = product.Rating || product.rating || 4.6;
  const pDesc = product.Description || product.description || '';
  const pStock = product.DemoStock || product.stock || 25;
  const pId = product.ProductID || product.id || 'PROD-01';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-stone-100 text-slate-600 transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
          <img
            src={pImage}
            alt={pName}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-xs font-bold text-slate-800 uppercase tracking-wider shadow-sm">
            {pCategory}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-indigo-600">{pBrand}</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{pRating} / 5.0</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {pName}
            </h3>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-2xl font-black text-slate-900 font-mono">
              ₹{pPrice}
            </span>
            {pOrigPrice && (
              <span className="text-sm text-slate-400 line-through">
                ₹{pOrigPrice}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              {isTamil ? 'சரிபார்க்கப்பட்ட விலை' : 'Verified Catalog Price'}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {pDesc}
          </p>

          {/* Store Info & Assurance */}
          <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Store className="w-4 h-4 text-indigo-600" />
              <span>{isTamil ? 'விற்பனையாளர்: ஸ்ரீ முருகன் சூப்பர்ஸ்டோர், தி. நகர்' : 'Seller: Sri Murugan Superstore, T. Nagar, Chennai'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isTamil ? `ஸ்டாக் உள்ளது: ${pStock} யூனிட்கள்` : `In Stock: ${pStock} units available`}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>{isTamil ? '45-90 நிமிடங்களில் ஹோம் டெலிவரி' : 'Express Home Delivery in 45-90 minutes'}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-200 text-slate-700 text-xs font-bold hover:bg-stone-100 transition-colors"
          >
            {isTamil ? 'மூடு' : 'Close'}
          </button>
          <button
            onClick={() => {
              if (onAddToCart) onAddToCart(product);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isTamil ? 'கார்ட்டில் சேர்' : 'Add to Cart'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
