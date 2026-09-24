// VOICEMART AI - Dual Dataset Explorer & CSV Ingestion Engine (Light SaaS Theme)
import React, { useState, useMemo } from 'react';
import { 
  Database, Upload, CheckCircle2, AlertCircle, Search, Filter, Layers, DollarSign, 
  Tag, Package, BarChart3, RefreshCw, Sparkles, FileSpreadsheet, ShoppingBag, 
  CreditCard, Banknote, Star, Calendar, User
} from 'lucide-react';
import { datasetStore } from '../services/datasetService.js';
import { customerPurchaseStore } from '../services/customerPurchaseService.js';

export function DatasetExplorer({ onDatasetReloaded }) {
  const [activeTab, setActiveTab] = useState('purchases'); // 'purchases' | 'catalog'
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [maxPrice, setMaxPrice] = useState(6000);
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [uploadStatus, setUploadStatus] = useState(null);

  // Catalog stats
  const stats = datasetStore.getStats();
  const health = datasetStore.getHealth();
  const allProducts = datasetStore.getAllProducts();

  // Customer purchase stats & records
  const custStats = customerPurchaseStore.getStats();
  const allTransactions = customerPurchaseStore.getAllTransactions();

  const brands = useMemo(() => ['All', ...Object.keys(stats.brandDistribution || {}).slice(0, 15)], [stats]);
  const categories = useMemo(() => ['All', ...Object.keys(stats.categoryDistribution || {})], [stats]);
  const colors = useMemo(() => ['All', ...Object.keys(stats.colorDistribution || {}).slice(0, 10)], [stats]);

  // Filtered customer transactions
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(t => {
      if (paymentFilter !== 'All' && t.paymentMethod !== paymentFilter) return false;
      if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchCust = t.customerId.toLowerCase().includes(q);
        const matchItem = t.item.toLowerCase().includes(q);
        const matchCat = t.category.toLowerCase().includes(q);
        const matchMethod = t.paymentMethod.toLowerCase().includes(q);
        if (!matchCust && !matchItem && !matchCat && !matchMethod) return false;
      }
      return true;
    });
  }, [allTransactions, paymentFilter, selectedCategory, search]);

  const displayedTransactions = filteredTransactions.slice(0, 50);

  // Filtered product catalog view
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      if (selectedBrand !== 'All' && p.ProductBrand !== selectedBrand) return false;
      if (selectedCategory !== 'All' && p.Category !== selectedCategory) return false;
      if (selectedGender !== 'All' && p.Gender !== selectedGender) return false;
      if (selectedColor !== 'All' && p.PrimaryColor !== selectedColor) return false;
      if (p.Price > maxPrice) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (p.SearchableText || '').includes(q);
      }
      return true;
    });
  }, [allProducts, selectedBrand, selectedCategory, selectedGender, selectedColor, maxPrice, search]);

  const displayedProducts = filteredProducts.slice(0, 40);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = datasetStore.ingestCSV(content);
        if (res.success) {
          const isCust = res.datasetType === 'customerPurchases';
          setUploadStatus({
            type: 'success',
            message: `Successfully ingested ${res.count} records from ${file.name}! (${isCust ? 'Customer Purchases Dataset' : 'Product Catalog'})`
          });
          if (isCust) setActiveTab('purchases');
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
              Enterprise Dataset Intelligence & Catalog
            </h1>
          </div>
          <p className="text-sm text-slate-500 pl-10">
            Unified data platform containing Customer Purchase Transactions and 12,491 Normalized Retail Catalog items
          </p>
        </div>

        {/* CSV Ingestion Dropzone Button */}
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs cursor-pointer transition-all self-start">
          <Upload className="w-4 h-4" />
          <span>Upload Any CSV Dataset</span>
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

      {/* Dataset Tabs Switcher */}
      <div className="flex border-b border-stone-200 gap-2">
        <button
          onClick={() => { setActiveTab('purchases'); setSearch(''); }}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'purchases'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Purchases Dataset</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-mono">
            {allTransactions.length.toLocaleString()} rows
          </span>
        </button>

        <button
          onClick={() => { setActiveTab('catalog'); setSearch(''); }}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'catalog'
              ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-xl'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog Dataset</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-slate-600 font-mono">
            {allProducts.length.toLocaleString()} items
          </span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: CUSTOMER PURCHASES DATASET
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'purchases' && (
        <div className="space-y-6">
          {/* Customer Purchases Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Transactions</span>
              <p className="text-2xl font-black text-slate-900 font-display">{custStats.totalTransactions.toLocaleString()}</p>
              <span className="text-xs text-emerald-600 font-semibold">100% Ingested</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Unique Customers</span>
              <p className="text-2xl font-black text-indigo-600 font-display">{custStats.uniqueCustomers}</p>
              <span className="text-xs text-slate-500">Ref IDs verified</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Revenue</span>
              <p className="text-2xl font-black text-emerald-700 font-display">${custStats.totalRevenueUSD.toLocaleString()}</p>
              <span className="text-xs text-slate-500">₹{custStats.totalRevenueINR.toLocaleString()}</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Purchase</span>
              <p className="text-2xl font-black text-slate-900 font-display">${custStats.avgOrderUSD}</p>
              <span className="text-xs text-slate-500">Per transaction</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Rating</span>
              <p className="text-2xl font-black text-amber-600 font-display flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500 inline" />
                {custStats.avgRating}
              </p>
              <span className="text-xs text-slate-500">Verified reviews</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Payment Methods</span>
              <p className="text-sm font-bold text-slate-800">
                <span className="text-emerald-700">Cash: {custStats.paymentMethods.Cash}</span>
              </p>
              <p className="text-xs text-indigo-600 font-semibold">
                Cards: {custStats.paymentMethods['Credit Card']}
              </p>
            </div>
          </div>

          {/* Schema Badge */}
          <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-900">Customer Purchase Schema Columns:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {['Customer Reference ID', 'Item Purchased', 'Purchase Amount (USD)', 'Date Purchase', 'Review Rating', 'Payment Method'].map((f) => (
                <span key={f} className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 font-medium">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customer ID (e.g. 4018) or item..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-600 transition-all"
                />
              </div>

              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                Showing {filteredTransactions.length.toLocaleString()} matching transactions
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-600 font-medium">Payment Method</label>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-800 outline-none focus:bg-white focus:border-indigo-600"
                >
                  <option value="All">All Payment Methods</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 font-medium">Item Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-800 outline-none focus:bg-white focus:border-indigo-600"
                >
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 font-medium">Quick Reset</label>
                <button
                  onClick={() => { setSearch(''); setPaymentFilter('All'); setSelectedCategory('All'); }}
                  className="w-full px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 font-medium text-xs transition-all"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="rounded-2xl border border-stone-200/80 overflow-hidden bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-slate-600 uppercase font-semibold tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-4">Customer Ref ID</th>
                    <th className="py-3.5 px-4">Item Purchased</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Purchase Amount</th>
                    <th className="py-3.5 px-4">Date Purchase</th>
                    <th className="py-3.5 px-4">Review Rating</th>
                    <th className="py-3.5 px-4">Payment Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-slate-800">
                  {displayedTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-stone-50/60">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-700">
                        <span className="px-2 py-1 rounded bg-indigo-50 border border-indigo-100">
                          #{t.customerId}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{t.item}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{t.id}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{t.category}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">${t.amountUSD.toLocaleString()}</span>
                        <span className="text-[11px] text-slate-400">₹{t.amountINR.toLocaleString()}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">{t.date}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {t.rating.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          t.paymentMethod === 'Cash'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {t.paymentMethod === 'Cash' ? <Banknote className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}
                          {t.paymentMethod}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center font-medium">
            Displaying first 50 transactions of {filteredTransactions.length.toLocaleString()} records for optimal rendering performance.
          </p>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: PRODUCT CATALOG DATASET (12,491 ITEMS)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
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
              <span className="text-xs text-slate-500">Top Brands Indexed</span>
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

          {/* Filter Bar */}
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
                Showing {filteredProducts.length.toLocaleString()} matching records
              </span>
            </div>

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
                    <th className="py-3.5 px-4">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-slate-800">
                  {displayedProducts.map((p) => (
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
      )}

    </div>
  );
}
