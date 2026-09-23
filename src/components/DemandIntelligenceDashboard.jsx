// VOICEMART AI - Demand Intelligence & Business Owner Command Center (Light SaaS Theme)
import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, AlertTriangle, Sparkles, Layers, Activity, Users, ShoppingBag, 
  Clock, Globe, Filter, ArrowUpRight, CheckCircle2, ChevronRight, Zap, Target, Search, Mic, Volume2
} from 'lucide-react';
import { demandService } from '../services/demandAnalyticsService.js';

export function DemandIntelligenceDashboard({ onPlayAudioText }) {
  const [timeFilter, setTimeFilter] = useState('All time');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'unmet' | 'heatmap' | 'trends' | 'history'

  const metrics = demandService.getDemandMetrics();
  const opportunities = demandService.getUnmetDemandOpportunities();
  const trendsResult = demandService.getDemandTrends();
  const recommendations = demandService.getBusinessRecommendations();
  const liveSignals = demandService.getLiveDemandSignals();
  const queryEvents = demandService.getEvents();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner: Business Intelligence Command Center */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-7 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Activity className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
              Demand Intelligence & Analytics
            </h1>
          </div>
          <p className="text-sm text-slate-500 pl-10">
            Convert customer voice conversations into actionable inventory & demand signals
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200 text-xs">
          {['Today', '7 days', '30 days', 'All time'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t)}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                timeFilter === t ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Live Demand Signals Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900">
          <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Live Customer Demand Signals (Observed Data):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          {liveSignals.map((signal, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg bg-white border border-indigo-100 text-indigo-900 shadow-2xs">
              {signal}
            </span>
          ))}
        </div>
      </div>

      {/* 5 Main Executive KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Voice Queries</span>
          <p className="text-2xl font-black text-slate-900 font-display">{metrics.totalQueries}</p>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Live Audio Stream
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Unique Customers</span>
          <p className="text-2xl font-black text-slate-900 font-display">{metrics.uniqueCustomers}</p>
          <span className="text-xs text-slate-500">6 Indian Languages</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-2xs space-y-1 bg-rose-50/30">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">Unmet Requests</span>
          <p className="text-2xl font-black text-rose-700 font-display">{metrics.unmetRequests}</p>
          <span className="text-xs text-rose-600 font-semibold">Missed Catalog Searches</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-2xs space-y-1 bg-amber-50/30">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Unmet Demand Rate</span>
          <p className="text-2xl font-black text-amber-700 font-display">{metrics.unmetDemandRate}</p>
          <span className="text-xs text-slate-500">Inventory Gap Signal</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Top Category</span>
          <p className="text-lg font-bold text-slate-900 truncate font-display">{metrics.topCategory}</p>
          <span className="text-xs text-indigo-600 font-semibold">{metrics.topColor} • {metrics.topPriceRange}</span>
        </div>

      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Demand Overview & Recommendations' },
          { id: 'unmet', label: 'Unmet Demand Opportunity Table' },
          { id: 'heatmap', label: 'Demand Heatmap' },
          { id: 'trends', label: 'Demand Trends & Growth' },
          { id: 'history', label: 'Voice Query History Logs' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeSubTab === tab.id
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-stone-100 text-slate-600 hover:text-slate-900 hover:bg-stone-200/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: OVERVIEW & ACTIONABLE RECOMMENDATIONS */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Actionable Business Recommendations */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Evidence-Based Business Recommendations
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Derived from Real Voice Inquiries</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="p-4 rounded-xl bg-stone-50/70 border border-stone-200/70 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        rec.urgency === 'HIGH' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                        rec.urgency === 'MEDIUM' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {rec.urgency} OPPORTUNITY
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 font-display">{rec.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      <strong className="text-slate-800">Evidence: </strong>{rec.evidence}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                    ⚡ <strong>Action: </strong>{rec.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Analytics Breakdown Visualizers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Language Share */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-600" />
                Customer Voice Queries by Language
              </h4>

              <div className="space-y-3">
                {Object.entries(metrics.languageDistribution).map(([lang, count]) => {
                  const pct = Math.round((count / metrics.totalQueries) * 100);
                  return (
                    <div key={lang} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-800">{lang}</span>
                        <span className="text-slate-500 font-medium">{count} queries ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Fulfilled vs Unmet Ratio */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                Catalog Search Fulfillment Ratio
              </h4>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <span className="text-xs font-semibold text-emerald-800 uppercase">Fulfilled Searches</span>
                  <p className="text-3xl font-black text-emerald-900 font-display">{metrics.fulfilledQueries}</p>
                  <span className="text-xs text-emerald-700">Catalog Match Found</span>
                </div>

                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-1">
                  <span className="text-xs font-semibold text-rose-800 uppercase">Unmet Demand</span>
                  <p className="text-3xl font-black text-rose-900 font-display">{metrics.unmetRequests}</p>
                  <span className="text-xs text-rose-700">Potential Missed Revenue</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUB-TAB 2: UNMET DEMAND OPPORTUNITY TABLE */}
      {activeSubTab === 'unmet' && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-5 animate-in fade-in duration-200">
          <div>
            <h3 className="text-base font-bold font-display text-slate-900">
              Unmet Demand Opportunity Table
            </h3>
            <p className="text-xs text-slate-500">
              Demand Score formula = Request Frequency × Unmet Ratio × Recency Weight (Normalized 0–100)
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-slate-600 uppercase font-medium tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-4">Requested Product / Combination</th>
                    <th className="py-3.5 px-4">Requests</th>
                    <th className="py-3.5 px-4">Available Matches</th>
                    <th className="py-3.5 px-4">Unmet Inquiries</th>
                    <th className="py-3.5 px-4">Demand Score</th>
                    <th className="py-3.5 px-4">Typical Budget</th>
                    <th className="py-3.5 px-4">Recommended Merchant Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-slate-800">
                  {opportunities.map((opp, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/60">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{opp.name}</td>
                      <td className="py-3.5 px-4 font-medium">{opp.requests}</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700">{opp.fulfilled}</td>
                      <td className="py-3.5 px-4 font-semibold text-rose-700">{opp.unmet}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                          opp.demandScore >= 80 ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          opp.demandScore >= 60 ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {opp.demandScore}/100
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{opp.typicalBudget}</td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs">{opp.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: DEMAND HEATMAP */}
      {activeSubTab === 'heatmap' && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-base font-bold font-display text-slate-900">
                Category & Color Demand Heatmap
              </h3>
              <p className="text-xs text-slate-500">
                Visualizing high-intensity customer interest areas across product categories
              </p>
            </div>
            <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              Filter: {timeFilter}
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(metrics.categoryDistribution).map(([cat, count]) => {
              const maxCount = Math.max(...Object.values(metrics.categoryDistribution));
              const intensity = Math.round((count / maxCount) * 100);
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-900">{cat}</span>
                    <span className="text-slate-500">{count} inquiries ({intensity}% demand intensity)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden flex items-center p-0.5 border border-stone-200/60">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${intensity}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: DEMAND TREND DETECTION */}
      {activeSubTab === 'trends' && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-5 animate-in fade-in duration-200">
          <div>
            <h3 className="text-base font-bold font-display text-slate-900">
              Demand Trend Detection
            </h3>
            <p className="text-xs text-slate-500">
              Period-over-period customer interest calculations (safeguarded against artificial trends)
            </p>
          </div>

          {trendsResult.hasEnoughData ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trendsResult.trends.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-50/70 border border-stone-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-display">{t.product}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      t.direction === 'INCREASING' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {t.direction === 'INCREASING' ? `↑ +${t.growthPct}%` : 'STABLE'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Current Period:</span>
                      <span className="text-slate-900 font-bold">{t.currentPeriod} requests</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Previous Period:</span>
                      <span className="text-slate-500">{t.prevPeriod} requests</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 pt-2 border-t border-stone-200 font-sans">
                    {t.insight}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <p>{trendsResult.message}</p>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 5: VOICE QUERY HISTORY LOGS */}
      {activeSubTab === 'history' && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-base font-bold font-display text-slate-900">
                Voice Query History & Audit Trail
              </h3>
              <p className="text-xs text-slate-500">Complete log of all customer voice & text query events</p>
            </div>
            <span className="text-xs text-slate-500 font-medium">{queryEvents.length} Total Events</span>
          </div>

          <div className="rounded-xl border border-stone-200 overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-slate-600 uppercase font-medium tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Language</th>
                    <th className="py-3 px-4">Customer Speech Query</th>
                    <th className="py-3 px-4">Extracted Filters</th>
                    <th className="py-3 px-4">Matches</th>
                    <th className="py-3 px-4">Demand Status</th>
                    <th className="py-3 px-4 text-right">Replay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-slate-800">
                  {queryEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-stone-50/60">
                      <td className="py-3 px-4 text-slate-500 text-[11px]">{evt.timestamp}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[11px] border border-indigo-100">
                          {evt.language}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs truncate">"{evt.query}"</td>
                      <td className="py-3 px-4 text-[11px] text-slate-600">
                        {evt.color !== 'Any' ? evt.color : ''} {evt.category} {evt.maxPrice ? `(≤₹${evt.maxPrice})` : ''}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">{evt.matchedCount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          evt.status === 'FULFILLED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {evt.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onPlayAudioText && onPlayAudioText(evt.query)}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-indigo-600 transition-colors"
                          title="Replay query speech"
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

    </div>
  );
}
