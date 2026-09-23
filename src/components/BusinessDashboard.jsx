// VOICEMART AI - Business Owner Command Center & Voice Query Analytics
import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingBag, Mic, BarChart3, Globe, Settings, 
  TrendingUp, Users, Clock, CheckCircle, Volume2, ArrowUpRight, Sparkles, Store, Phone, MapPin
} from 'lucide-react';
import { InventoryManager } from './InventoryManager';
import { OrdersManager } from './OrdersManager';

export function BusinessDashboard({
  products,
  orders,
  queryLogs,
  businessProfile,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateBusinessProfile,
  onPlayAudioText
}) {
  const [activeTab, setActiveTab] = useState('overview');

  // Metrics Calculations
  const totalProducts = products.length;
  const todayVoiceQueries = 245 + queryLogs.length;
  const customersServed = 188;
  const totalOrdersCount = orders.length;
  const conversionRate = "18.4%";
  const mostAskedProduct = "AeroSprint Running Shoes";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-950/95 border border-white/10 shadow-2xl backdrop-blur-xl mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-electric-500/20 text-electric-400">
              <Store className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              {businessProfile.name}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-3">
            <span>{businessProfile.businessType}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {businessProfile.location}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
            ● Voice Agent Online (6 Languages)
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/10 no-scrollbar">
        {[
          { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" />, count: totalProducts },
          { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" />, count: totalOrdersCount },
          { id: 'analytics', label: 'Voice Analytics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'queries', label: 'Voice Queries', icon: <Mic className="w-4 h-4" />, count: queryLogs.length },
          { id: 'languages', label: 'Languages', icon: <Globe className="w-4 h-4" /> },
          { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-electric-600 text-white shadow-lg shadow-electric-500/25 scale-105'
                : 'bg-navy-900/80 text-slate-400 hover:text-white hover:bg-navy-800 border border-white/5'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-navy-950 text-slate-400'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* 6 Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            <div className="glass-card rounded-2xl p-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Total Products
              </span>
              <p className="text-2xl font-black text-white font-display">{totalProducts}</p>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +4 this week
              </span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-2 border-electric-500/30">
              <span className="text-[11px] font-bold uppercase tracking-wider text-electric-300 block">
                Today's Voice Queries
              </span>
              <p className="text-2xl font-black text-electric-400 font-display">{todayVoiceQueries}</p>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +32% vs yesterday
              </span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Customers Served
              </span>
              <p className="text-2xl font-black text-white font-display">{customersServed}</p>
              <span className="text-[10px] text-slate-400">Via 6 Indian Languages</span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Total Orders
              </span>
              <p className="text-2xl font-black text-white font-display">{totalOrdersCount}</p>
              <span className="text-[10px] text-emerald-400 font-semibold">₹18,450 GMV</span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Conversion Rate
              </span>
              <p className="text-2xl font-black text-emerald-400 font-display">{conversionRate}</p>
              <span className="text-[10px] text-slate-400">High intent voice shoppers</span>
            </div>

            <div className="glass-card rounded-2xl p-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Top Requested
              </span>
              <p className="text-sm font-bold text-white truncate font-display">{mostAskedProduct}</p>
              <span className="text-[10px] text-amber-400 font-semibold">48 queries today</span>
            </div>

          </div>

          {/* Quick Analytics Previews */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Language Distribution */}
            <div className="lg:col-span-7 glass-panel rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-electric-400" />
                  <h3 className="text-base font-bold text-white font-display">
                    Voice Queries by Language
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">Today's Traffic</span>
              </div>

              <div className="space-y-3.5">
                {[
                  { name: 'Tamil (தமிழ்)', percentage: 42, queries: 103, color: 'bg-electric-500' },
                  { name: 'Hindi (हिन्दी)', percentage: 28, queries: 69, color: 'bg-neon-purple' },
                  { name: 'English', percentage: 18, queries: 44, color: 'bg-emerald-400' },
                  { name: 'Telugu (తెలుగు)', percentage: 6, queries: 15, color: 'bg-amber-400' },
                  { name: 'Malayalam (മലയാളം)', percentage: 4, queries: 10, color: 'bg-pink-400' },
                  { name: 'Kannada (ಕನ್ನಡ)', percentage: 2, queries: 4, color: 'bg-cyan-400' }
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-white">{item.name}</span>
                      <span className="font-mono text-slate-300">{item.queries} queries ({item.percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-navy-950 overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key Performance Signals */}
            <div className="lg:col-span-5 glass-panel rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white font-display">
                    AI Performance
                  </h3>
                </div>
                <span className="text-xs text-emerald-400 font-mono font-bold">Optimal 99.8%</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-navy-950 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Avg Latency</span>
                  <p className="text-xl font-black text-white font-mono">1.2 sec</p>
                  <span className="text-[10px] text-emerald-400">Fast NLP Response</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-navy-950 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Query Success</span>
                  <p className="text-xl font-black text-emerald-400 font-mono">94.2%</p>
                  <span className="text-[10px] text-slate-400">Accurate Matches</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-navy-950 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Voice vs Text</span>
                  <p className="text-xl font-black text-electric-300 font-mono">82% Voice</p>
                  <span className="text-[10px] text-slate-400">Speech Preferred</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-navy-950 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Follow-up Retention</span>
                  <p className="text-xl font-black text-neon-purple font-mono">3.4 Turns</p>
                  <span className="text-[10px] text-slate-400">Context Memory</span>
                </div>
              </div>

              {/* Working Hours summary card */}
              <div className="p-3 rounded-xl bg-navy-950/80 border border-white/5 text-xs text-slate-300 space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>Store Hours:</span>
                  <span className="text-electric-300 font-mono">{businessProfile.workingHours.weekdays}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Free Delivery Radius:</span>
                  <span className="text-emerald-400 font-semibold">{businessProfile.deliveryPolicy.freeRadiusKm} KM</span>
                </div>
              </div>

            </div>

          </div>

          {/* Recent Live Voice Queries Table */}
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-electric-400" />
                <h3 className="text-base font-bold text-white font-display">
                  Live Voice Query Stream
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('queries')}
                className="text-xs text-electric-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Full Query Log</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-400 uppercase font-mono tracking-wider border-b border-white/10 pb-2">
                  <tr>
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Voice Speech Transcript</th>
                    <th className="py-2.5 px-3">Language</th>
                    <th className="py-2.5 px-3">Extracted Intent</th>
                    <th className="py-2.5 px-3">Latency</th>
                    <th className="py-2.5 px-3">Confidence</th>
                    <th className="py-2.5 px-3 text-right">Audio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {queryLogs.slice(0, 5).map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-3 font-mono text-slate-400">{log.timestamp}</td>
                      <td className="py-3 px-3 font-medium text-white max-w-xs truncate">
                        "{log.query}"
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-navy-950 border border-white/5 text-[11px] font-bold text-electric-300">
                          {log.language}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono text-neon-purple text-[11px] font-semibold">
                          {log.intent}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400">{log.latency}</td>
                      <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">{log.confidence}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => onPlayAudioText(log.query)}
                          className="p-1 rounded-lg bg-navy-950 hover:bg-white/10 text-electric-400"
                          title="Replay Audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'products' && (
        <InventoryManager
          products={products}
          onAddProduct={onAddProduct}
          onUpdateProduct={onUpdateProduct}
          onDeleteProduct={onDeleteProduct}
        />
      )}

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <OrdersManager
          orders={orders}
          onUpdateStatus={onUpdateOrderStatus}
        />
      )}

      {/* TAB CONTENT: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                Comprehensive Voice Analytics
              </h3>
              <p className="text-xs text-slate-400">
                Detailed breakdowns of customer speech interactions, language trends, and peak hours
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
              Live Real-time Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Hourly Traffic Visualizer */}
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
                <Clock className="w-4 h-4 text-electric-400" />
                Hourly Voice Query Volume
              </h4>

              <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-white/10 pb-2">
                {[
                  { hour: '9 AM', count: 18 },
                  { hour: '11 AM', count: 42 },
                  { hour: '1 PM', count: 28 },
                  { hour: '3 PM', count: 24 },
                  { hour: '5 PM', count: 56 },
                  { hour: '7 PM', count: 68 },
                  { hour: '9 PM', count: 32 }
                ].map((bar) => (
                  <div key={bar.hour} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-mono text-electric-300 font-bold">{bar.count}</span>
                    <div
                      className="w-full bg-gradient-to-t from-electric-600 to-neon-purple rounded-t-lg transition-all duration-500 hover:brightness-125"
                      style={{ height: `${(bar.count / 70) * 120}px` }}
                    />
                    <span className="text-[10px] font-mono text-slate-400">{bar.hour}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 text-center">Peak Customer Shopping Hours: 6:00 PM – 8:30 PM</p>
            </div>

            {/* Top Searched Queries Breakdown */}
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Most Popular Search Terms
              </h4>

              <div className="space-y-3">
                {[
                  { term: 'Running Shoes under ₹1000', count: 48, category: 'Footwear', growth: '+28%' },
                  { term: 'Blue shirts in Cotton', count: 34, category: 'Clothing', growth: '+15%' },
                  { term: 'Kanchipuram Silk Saree', count: 29, category: 'Clothing', growth: '+40%' },
                  { term: 'Store closing time inquiry', count: 22, category: 'Policy', growth: '+10%' },
                  { term: 'Ponni Boiled Rice 5kg', count: 19, category: 'Grocery', growth: '+8%' }
                ].map((term, i) => (
                  <div key={i} className="p-3 rounded-xl bg-navy-950/80 border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-lg bg-electric-500/20 text-electric-400 flex items-center justify-center font-bold text-[10px]">
                        #{i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{term.term}</p>
                        <p className="text-[10px] text-slate-400">{term.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white font-mono">{term.count} queries</span>
                      <span className="block text-[10px] text-emerald-400 font-semibold">{term.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: QUERIES LOG */}
      {activeTab === 'queries' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-display text-white">
              Full Voice Query Logs
            </h3>
            <span className="text-xs font-mono text-slate-400">Total {queryLogs.length} Records</span>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden bg-navy-900/50">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-950 text-slate-400 uppercase font-mono tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Log ID</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">User Speech Query</th>
                  <th className="py-3 px-4">Language</th>
                  <th className="py-3 px-4">Intent</th>
                  <th className="py-3 px-4">Latency</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4 text-right">Replay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {queryLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{log.id}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{log.timestamp}</td>
                    <td className="py-3 px-4 font-semibold text-white">"{log.query}"</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-electric-500/15 text-electric-300 font-semibold text-[11px]">
                        {log.language}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-neon-purple text-[11px] font-bold">{log.intent}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{log.latency}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400 font-bold">{log.confidence}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onPlayAudioText(log.query)}
                        className="p-1.5 rounded-lg bg-navy-950 hover:bg-electric-500/20 text-electric-400 border border-white/5"
                        title="Replay Audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: LANGUAGES */}
      {activeTab === 'languages' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              Supported Indian Languages
            </h3>
            <p className="text-xs text-slate-400">
              Enable or configure natural speech recognition and AI response models for each language
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businessProfile.supportedLanguages.map((lang) => (
              <div key={lang.code} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{lang.name}</h4>
                      <p className="text-xs font-mono text-electric-300">{lang.label}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold font-mono">
                    Active ✓
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 pt-2 border-t border-white/5">
                  <div className="flex justify-between">
                    <span>Speech Code:</span>
                    <span className="font-mono text-white">{lang.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TTS Synthesis:</span>
                    <span className="text-emerald-400">Enabled</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Script Support:</span>
                    <span className="text-slate-300">Native & Transliterated</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl glass-panel rounded-3xl p-6 space-y-5 animate-in fade-in duration-200">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              Store Profile & Policy Settings
            </h3>
            <p className="text-xs text-slate-400">
              These details are ingested into the AI model to answer customer inquiries regarding store policies.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Business Name</label>
              <input
                type="text"
                value={businessProfile.name}
                onChange={(e) => onUpdateBusinessProfile({ ...businessProfile, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-electric-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Business Type</label>
                <input
                  type="text"
                  value={businessProfile.businessType}
                  onChange={(e) => onUpdateBusinessProfile({ ...businessProfile, businessType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-electric-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Phone Number</label>
                <input
                  type="text"
                  value={businessProfile.phone}
                  onChange={(e) => onUpdateBusinessProfile({ ...businessProfile, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-electric-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Store Address & Landmark</label>
              <input
                type="text"
                value={businessProfile.address}
                onChange={(e) => onUpdateBusinessProfile({ ...businessProfile, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-electric-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Weekday Working Hours</label>
                <input
                  type="text"
                  value={businessProfile.workingHours.weekdays}
                  onChange={(e) => onUpdateBusinessProfile({
                    ...businessProfile,
                    workingHours: { ...businessProfile.workingHours, weekdays: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-electric-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Weekend Working Hours</label>
                <input
                  type="text"
                  value={businessProfile.workingHours.weekends}
                  onChange={(e) => onUpdateBusinessProfile({
                    ...businessProfile,
                    workingHours: { ...businessProfile.workingHours, weekends: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-electric-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Return & Exchange Policy</label>
              <textarea
                rows={2}
                value={businessProfile.returnPolicy.conditions}
                onChange={(e) => onUpdateBusinessProfile({
                  ...businessProfile,
                  returnPolicy: { ...businessProfile.returnPolicy, conditions: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white focus:border-electric-500 outline-none"
              />
            </div>

            <div className="pt-2">
              <span className="text-xs text-emerald-400 font-semibold">
                ✓ Changes saved automatically to AI Knowledge Base
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
