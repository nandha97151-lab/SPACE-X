// VOICEMART AI - Product Catalog & Real-time Filter Grid (12,491 Products)
import React, { useState, useMemo } from 'react';
import { ExplainableProductCard } from './ExplainableProductCard';
import { ConstraintRelaxationBanner } from './ConstraintRelaxationBanner';
import { Search, Sparkles, X, RotateCcw, Package, Database } from 'lucide-react';

const CATEGORIES = [
  'All Products',
  'Shirts',
  'T-Shirts',
  'Formal Shoes',
  'Sports & Casual Shoes',
  'Jeans',
  'Kurtas & Ethnic',
  'Sarees',
  'Trousers',
  'Dresses',
  'Watches',
  'Bags & Luggage'
];

export function ProductCatalog({
  products,
  activeFilterVoice,
  mismatchAnalysis,
  onResetVoiceFilter,
  onRelaxConstraint,
  onViewProduct,
  onAddToCart,
  onAskAI,
  onVoiceOrderNow
}) {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedGender, setSelectedGender] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(4000);

  // Filtered product subset calculation
  const displayedProducts = useMemo(() => {
    let list = activeFilterVoice && activeFilterVoice.length > 0 ? activeFilterVoice : products;

    return list.filter((p) => {
      // Category
      if (selectedCategory !== 'All Products') {
        const cat = p.Category || p.category;
        if (!cat || !cat.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }
      // Gender
      if (selectedGender !== 'All') {
        const gen = p.Gender || p.gender;
        if (gen && gen !== selectedGender && gen !== 'Unisex') {
          return false;
        }
      }
      // Price
      const price = p.Price || p.price;
      if (price > maxPrice) {
        return false;
      }
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const searchBlob = (p.SearchableText || `${p.ProductName || p.name} ${p.ProductBrand || p.brand} ${p.Category || p.category} ${p.PrimaryColor || p.color} ${p.Description || p.description}`).toLowerCase();
        if (!searchBlob.includes(q)) return false;
      }
      return true;
    });
  }, [products, activeFilterVoice, selectedCategory, selectedGender, maxPrice, searchQuery]);

  // Paginated display subset for smooth UI rendering
  const paginatedList = displayedProducts.slice(0, 32);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Constraint Relaxation "Why No Match?" Banner if active */}
      {mismatchAnalysis && (
        <ConstraintRelaxationBanner
          mismatchAnalysis={mismatchAnalysis}
          onRelaxConstraint={onRelaxConstraint}
        />
      )}

      {/* Voice Result Banner if active */}
      {activeFilterVoice && activeFilterVoice.length > 0 && !mismatchAnalysis && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">Voice Query Filter Active</p>
              <p className="text-sm font-semibold text-slate-900">
                Displaying {displayedProducts.length} verified products from 12,491 dataset matching your speech query
              </p>
            </div>
          </div>
          <button
            onClick={onResetVoiceFilter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-xs font-bold text-slate-700 transition-all shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Show Full Catalog</span>
          </button>
        </div>
      )}

      {/* Top Search & Filter Bar */}
      <div className="saas-panel p-6 space-y-5">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Browse Verified Catalog</h3>
            <p className="text-xs text-slate-500">12,491 products indexed for voice & text retrieval</p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shirts, shoes, brands..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:border-indigo-600 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-stone-50 text-slate-600 hover:bg-stone-100 hover:text-slate-900 border border-stone-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Controls (Gender, Price slider) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
              <span className="text-slate-500 font-medium">Gender:</span>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="bg-transparent text-slate-900 font-bold outline-none cursor-pointer"
              >
                <option value="All">All Genders</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
              <span className="text-slate-500 font-medium">Budget:</span>
              <span className="font-bold text-slate-900 font-mono">≤ ₹{maxPrice}</span>
              <input
                type="range"
                min="300"
                max="6000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-20 accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          <span className="text-xs font-mono font-semibold text-slate-500">
            {displayedProducts.length.toLocaleString()} matching records
          </span>

        </div>

      </div>

      {/* Product Cards Grid */}
      {paginatedList.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedList.map((product) => (
              <ExplainableProductCard
                key={product.ProductID || product.id}
                product={product}
                onViewProduct={onViewProduct}
                onAddToCart={onAddToCart}
                onAskAI={onAskAI}
                onVoiceOrderNow={onVoiceOrderNow}
              />
            ))}
          </div>

          {displayedProducts.length > 32 && (
            <p className="text-xs text-slate-400 text-center font-mono pt-2">
              Showing top 32 of {displayedProducts.length.toLocaleString()} matching products. Speak or filter to refine search.
            </p>
          )}
        </div>
      ) : (
        <div className="saas-panel py-16 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-100 flex items-center justify-center text-slate-400">
            <Package className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-slate-900">No products found for this filter</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your price range, selected category, or speak a natural query.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All Products');
              setSelectedGender('All');
              setMaxPrice(4000);
              setSearchQuery('');
              if (onResetVoiceFilter) onResetVoiceFilter();
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
