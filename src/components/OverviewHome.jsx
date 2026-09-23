// VOICEMART AI - Clean SaaS Home Overview (Robust Fallbacks)
import React from 'react';
import { 
  Mic, Sparkles, TrendingUp, ShoppingBag, Package, Store, Target, Database, 
  ArrowRight, Volume2, Globe, Clock, Zap, CheckCircle2
} from 'lucide-react';
import { DEMO_PRESET_QUERIES } from '../services/inventoryData.js';
import { demandService } from '../services/demandAnalyticsService.js';

export function OverviewHome({
  businessProfile = { name: 'VOICEMART Store' },
  productsCount = 12491,
  ordersCount = 0,
  queryLogs = [],
  onNavigateTo = () => {},
  onNavigateView,
  onStartVoice = () => {},
  onSelectQuery = () => {},
  onPlayAudioText = () => {}
}) {
  const navigate = onNavigateView || onNavigateTo;
  const liveSignals = demandService.getLiveDemandSignals();
  const metrics = demandService.getDemandMetrics();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Welcome & Primary Voice Action Card */}
      <div className="saas-panel p-6 sm:p-8 bg-gradient-to-br from-white via-white to-indigo-50/30 border border-stone-200/90 shadow-2xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-bold text-indigo-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{businessProfile?.name || 'VOICEMART Store'} • Voice Assistant Active</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Speak Your Language. <br className="hidden sm:block" />
            <span className="text-indigo-600">Find What You Need.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
            Customer voice interactions in Tamil, Hindi, Telugu, Malayalam, Kannada, and English are automatically verified against your 12,491 product catalog and converted into actionable demand intelligence.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                if (onStartVoice) onStartVoice();
                else navigate('voice');
              }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-2xs transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>Open Voice Assistant</span>
            </button>

            <button
              onClick={() => navigate('demand')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-stone-50 text-slate-700 font-semibold text-xs sm:text-sm border border-stone-200 transition-all shadow-2xs"
            >
              <Target className="w-4 h-4 text-indigo-600" />
              <span>View Demand Signals</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Live Demand Signals Ticker */}
      <div className="saas-card p-4 bg-stone-50/70 border border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
          <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Live Customer Signals:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          {liveSignals.map((sig, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg bg-white border border-stone-200 text-slate-700 shadow-2xs">
              {sig}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Four Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="saas-card p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Products Indexed</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">{productsCount.toLocaleString()}</p>
          <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Ingested Catalog
          </span>
        </div>

        <div className="saas-card p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Voice Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">{metrics.totalQueries}</p>
          <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 6 Indian Languages
          </span>
        </div>

        <div className="saas-card p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Fulfillment Rate</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            {Math.round((metrics.fulfilledQueries / (metrics.totalQueries || 1)) * 100)}%
          </p>
          <span className="text-xs font-medium text-slate-500">
            {metrics.fulfilledQueries} Verified Matches
          </span>
        </div>

        <div className="saas-card p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">{ordersCount}</p>
          <span className="text-xs font-medium text-indigo-600">
            Voice & Cart Orders
          </span>
        </div>

      </div>

      {/* 4. One-Click Voice Query Chips */}
      <div className="saas-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Try Natural Multilingual Queries</h3>
            <p className="text-xs text-slate-500">Click any preset customer query to test the speech understanding and catalog search</p>
          </div>
          <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            Zero Hallucination
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEMO_PRESET_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectQuery(q.query, q.language);
                navigate('voice');
              }}
              className="p-3 rounded-xl bg-white hover:bg-indigo-50/50 border border-stone-200 hover:border-indigo-300 text-left transition-all shadow-2xs group"
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-indigo-600">{q.languageLabel}</span>
                <span className="text-slate-400 font-mono">{q.intent}</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-900">
                "{q.query}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Recent Voice Query Stream */}
      <div className="saas-panel p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Recent Customer Voice Inquiries</h3>
          </div>
          <button
            onClick={() => navigate('demand')}
            className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Full Query Logs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 text-slate-500 uppercase font-mono tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">User Spoken Query</th>
                <th className="py-2.5 px-3">Language</th>
                <th className="py-2.5 px-3">Intent</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3 text-right">Replay Audio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-slate-700">
              {(queryLogs || []).slice(0, 5).map((log) => (
                <tr key={log.id} className="hover:bg-stone-50/60">
                  <td className="py-3 px-3 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="py-3 px-3 font-medium text-slate-900 max-w-xs truncate">
                    "{log.query}"
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-[11px] font-semibold text-slate-700">
                      {log.language}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-indigo-600 text-[11px] font-semibold">{log.intent}</td>
                  <td className="py-3 px-3 font-mono text-emerald-600 font-bold">{log.confidence}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onPlayAudioText(log.query)}
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-indigo-50 text-indigo-600 transition-colors"
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
  );
}
