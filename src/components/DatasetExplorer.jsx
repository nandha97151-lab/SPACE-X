// VOICEMART AI - 12,491 Product Dataset Explorer & CSV Ingestion Engine (Light SaaS Theme)
import React, { useState, useMemo } from 'react';
import { 
  Database, Upload, CheckCircle2, AlertCircle, Search, Filter, Layers, DollarSign, 
  Tag, Package, BarChart3, RefreshCw, Sparkles, FileSpreadsheet
} from 'lucide-react';
import { datasetStore } from '../services/datasetService.js';

export function DatasetExplorer({ onDatasetReloaded }) {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [maxPrice, setMaxPrice] = useState(6000);
  const [uploadStatus, setUploadStatus] = useState(null);

  const stats = datasetStore.getStats();
  const health = datasetStore.getHealth();
  const allProducts = datasetStore.getAllProducts();

  const brands = useMemo(() => ['All', ...Object.keys(stats.brandDistribution).slice(0, 15)], [stats]);
  const categories = useMemo(() => ['All', ...Object.keys(stats.categoryDistribution)], [stats]);
  const colors = useMemo(() => ['All', ...Object.keys(stats.colorDistribution).slice(0, 10)], [stats]);

  // Filtered dataset view (paginated to 40 for ultra smooth UI performance)
  const filtered = useMemo(() => {
    return allProducts.filter(p => {
      if (selectedBrand !== 'All' && p.ProductBrand !== selectedBrand) return false;
      if (selectedCategory !== 'All' && p.Category !== selectedCategory) return false;
      if (selectedGender !== 'All' && p.Gender !== selectedGender) return false;
      if (selectedColor !== 'All' && p.PrimaryColor !== selectedColor) return false;
      if (p.Price > maxPrice) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return p.SearchableText.includes(q);
      }
      return true;
    });
  }, [allProducts, selectedBrand, selectedCategory, selectedGender, selectedColor, maxPrice, search]);

  const displayedSubset = filtered.slice(0, 40);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = datasetStore.ingestCSV(content);
        if (res.success) {
          setUploadStatus({
            type: 'success',
            message: `Successfully ingested ${res.count} products from uploaded CSV!`
          });
          if (onDatasetReloaded) onDatasetReloaded();
        } else {
          setUploadStatus({
            type: 'error',
            message: res.error || 'Failed to parse CSV file.'
          });
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-7 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Database className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
              Product Dataset Explorer ({stats.totalProducts.toLocaleString()} Records)
            </h1>
          </div>
          <p className="text-sm text-slate-500 pl-10">
            Source of Truth Catalog with verified product fields, brand taxonomy, and deterministic categories
          </p>
        </div>

        {/* CSV Ingestion Dropzone Button */}
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs cursor-pointer transition-all self-start">
          <Upload className="w-4 h-4" />
          <span>Upload Custom Product CSV</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {uploadStatus && (
        <div className={`p-4 rounded-xl border text-xs font-semibold flex items-center justify-between ${
          uploadStatus.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <span>{uploadStatus.message}</span>
          <button onClick={() => setUploadStatus(null)} className="underline ml-4">Dismiss</button>
        </div>
      )}

      {/* Dataset Health Summary & Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Products</span>
          <p className="text-2xl font-black text-slate-900 font-display">{stats.totalProducts.toLocaleString()}</p>
          <span className="text-xs text-emerald-600 font-semibold">100% Ingested</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Valid Schema Rows</span>
          <p className="text-2xl font-black text-emerald-700 font-display">{health.validRows.toLocaleString()}</p>
          <span className="text-xs text-slate-500">{health.reviewRows} reviewed</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Average Price</span>
          <p className="text-2xl font-black text-slate-900 font-display">₹{stats.averagePrice}</p>
          <span className="text-xs text-slate-500">Range: ₹{stats.minPrice}–₹{stats.maxPrice}</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Brands</span>
          <p className="text-2xl font-black text-indigo-600 font-display">{stats.brandCount}</p>
          <span className="text-xs text-slate-500">Peter England, HRX, etc.</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Color Palette</span>
          <p className="text-2xl font-black text-purple-600 font-display">{stats.colorCount}</p>
          <span className="text-xs text-slate-500">Indexed for Natural Voice</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Categories</span>
          <p className="text-2xl font-black text-amber-700 font-display">{stats.categoryCount}</p>
          <span className="text-xs text-slate-500">Deterministic Mapping</span>
        </div>

      </div>

      {/* Dataset Schema Columns Validator Box */}
      <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-slate-900">Dataset Normalized Schema Fields:</span>
        </div>
        <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
          {['ProductID', 'ProductName', 'ProductBrand', 'Gender', 'Price (INR)', 'NumImages', 'Description', 'PrimaryColor', 'Category'].map((field) => (
            <span key={field} className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-slate-700 font-medium">
              {field}
            </span>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search across 12,491 products..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-600 transition-all"
            />
          </div>

          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Showing {filtered.length.toLocaleString()} matching records
          </span>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          <div className="space-y-1">
            <label className="text-slate-600 font-medium">Brand Filter</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-800 outline-none focus:bg-white focus:border-indigo-600"
            >
              {brands.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-600 font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-800 outline-none focus:bg-white focus:border-indigo-600"
            >
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-600 font-medium">Gender</label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-800 outline-none focus:bg-white focus:border-indigo-600"
            >
              <option>All</option>
              <option>Men</option>
              <option>Women</option>
              <option>Boys</option>
              <option>Girls</option>
              <option>Unisex</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-600 font-medium">Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-800 outline-none focus:bg-white focus:border-indigo-600"
            >
              {colors.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

        </div>
      </div>

      {/* Interactive Catalog Table */}
      <div className="rounded-2xl border border-stone-200/80 overflow-hidden bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-slate-600 uppercase font-semibold tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3.5 px-4">Product ID</th>
                <th className="py-3.5 px-4">Product Name & Brand</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Gender</th>
                <th className="py-3.5 px-4">Primary Color</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Simulated Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-slate-800">
              {displayedSubset.map((p) => (
                <tr key={p.ProductID} className="hover:bg-stone-50/60">
                  <td className="py-3.5 px-4 font-mono text-indigo-700 font-bold">{p.ProductID}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{p.ProductName}</span>
                    <span className="text-[11px] text-slate-500">{p.ProductBrand}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{p.Category}</td>
                  <td className="py-3.5 px-4 text-slate-600">{p.Gender}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-slate-700 text-[11px]">
                      {p.PrimaryColor}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">₹{p.Price}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-700">{p.DemoStock} units</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center font-medium">
        Showing first 40 records for real-time responsiveness. Total indexed in memory: {allProducts.length.toLocaleString()} records.
      </p>

    </div>
  );
}
