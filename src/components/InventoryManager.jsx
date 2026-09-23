// VOICEMART AI - Business Owner Inventory Management (Full CRUD)
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Package, X } from 'lucide-react';

export function InventoryManager({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Footwear',
    price: '',
    originalPrice: '',
    stock: 20,
    brand: '',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    description: '',
    sizes: '7, 8, 9, 10',
    colors: 'Black, Blue',
    keywords: ''
  });

  const categories = ['All', 'Footwear', 'Clothing', 'Electronics', 'Grocery', 'Restaurant', 'Pharmacy'];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const formatted = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price) * 1.3,
      stock: Number(formData.stock),
      sizes: typeof formData.sizes === 'string' ? formData.sizes.split(',').map(s => s.trim()) : formData.sizes,
      colors: typeof formData.colors === 'string' ? formData.colors.split(',').map(c => c.trim()) : formData.colors,
      keywords: typeof formData.keywords === 'string' ? formData.keywords.split(',').map(k => k.trim()) : []
    };

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, formatted);
      setEditingProduct(null);
    } else {
      onAddProduct(formatted);
      setIsAdding(false);
    }

    setFormData({
      name: '',
      category: 'Footwear',
      price: '',
      originalPrice: '',
      stock: 20,
      brand: '',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      description: '',
      sizes: '7, 8, 9, 10',
      colors: 'Black, Blue',
      keywords: ''
    });
  };

  const handleEditClick = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name || p.ProductName,
      category: p.category || p.Category,
      price: p.price || p.Price,
      originalPrice: p.originalPrice || '',
      stock: p.stock || p.DemoStock || 20,
      brand: p.brand || p.ProductBrand,
      image: p.image || p.Image,
      description: p.description || p.Description,
      sizes: Array.isArray(p.sizes) ? p.sizes.join(', ') : '',
      colors: Array.isArray(p.colors) ? p.colors.join(', ') : '',
      keywords: Array.isArray(p.keywords) ? p.keywords.join(', ') : ''
    });
    setIsAdding(true);
  };

  const filtered = products.filter(p => {
    const cat = p.category || p.Category;
    const name = p.name || p.ProductName || '';
    const brand = p.brand || p.ProductBrand || '';
    if (categoryFilter !== 'All' && cat !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return name.toLowerCase().includes(q) || brand.toLowerCase().includes(q) || (cat && cat.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Product Inventory Management
          </h3>
          <p className="text-xs text-slate-500">
            Add new items, update prices, manage demo stock, and edit voice keywords
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAdding(!isAdding);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs transition-all self-start"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? 'Close Form' : 'Add New Product'}</span>
        </button>
      </div>

      {/* Add / Edit Form Modal */}
      {isAdding && (
        <form onSubmit={handleFormSubmit} className="saas-panel p-6 bg-white border border-indigo-200 shadow-sm space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-600" />
              <span>{editingProduct ? `Edit Product: ${editingProduct.name || editingProduct.ProductName}` : 'Add New Product to Store'}</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-600 font-medium">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Nike Air Zoom Pegasus"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 font-medium">Brand Name</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g. Puma, Raymond, Roadster"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 font-medium">Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="899"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 font-medium">Original MRP (₹)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="1499"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 font-medium">Current Stock Quantity *</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="25"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-600 font-medium">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 font-medium">Sizes / Variants (Comma separated)</label>
              <input
                type="text"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                placeholder="S, M, L, XL or 7, 8, 9"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="text-slate-600 font-medium">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of product features..."
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-2xs"
            >
              {editingProduct ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-stone-200/80">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-stone-50 text-slate-600 hover:bg-stone-100 border border-stone-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter table..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="saas-panel overflow-hidden bg-white border border-stone-200/80">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-slate-500 uppercase font-mono tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-slate-700">
              {filtered.slice(0, 30).map((product) => {
                const pId = product.id || product.ProductID;
                const pName = product.name || product.ProductName;
                const pBrand = product.brand || product.ProductBrand;
                const pCat = product.category || product.Category;
                const pPrice = product.price || product.Price;
                const pStock = product.stock || product.DemoStock || 15;
                const pImage = product.image || product.Image;

                return (
                  <tr key={pId} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={pImage}
                          alt={pName}
                          className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{pName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{pBrand} • {pId}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-stone-100 text-slate-700 font-semibold text-[11px] border border-stone-200">
                        {pCat}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      ₹{pPrice}
                    </td>

                    <td className="py-3 px-4 font-mono">
                      {pStock} units
                    </td>

                    <td className="py-3 px-4">
                      {pStock > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold text-[10px] border border-rose-200">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(pId)}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
