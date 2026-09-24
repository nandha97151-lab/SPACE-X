// VOICEMART AI - Search Intent & Extracted Entity Inspector
import React from 'react';
import { Cpu, Tag, DollarSign, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

export function SearchIntent({ lastAIResult, language = 'en-IN' }) {
  if (!lastAIResult) return null;
  const isTamil = language === 'ta-IN';
  const entities = lastAIResult.extractedEntities || {};

  return (
    <div className="w-full rounded-2xl bg-white border border-stone-200/90 shadow-sm p-4 space-y-3 text-xs animate-in fade-in duration-200">
      
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-slate-900">
            {isTamil ? 'AI நோக்கம் & அளவுருக்கள்' : 'AI Intent & Search Parameters'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-[10px] uppercase font-mono">
            {lastAIResult.intent || 'PRODUCT_SEARCH'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{lastAIResult.language?.code || language}</span>
          </span>
        </div>
      </div>

      {/* Extracted Parameter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {entities.category && entities.category !== 'Any' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-slate-800 border border-stone-200 text-[11px] font-semibold">
            <Layers className="w-3 h-3 text-slate-500" />
            <span>Category: {entities.category}</span>
          </span>
        )}

        {entities.color && entities.color !== 'Any' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-slate-800 border border-stone-200 text-[11px] font-semibold">
            <Tag className="w-3 h-3 text-slate-500" />
            <span>Color: {entities.color}</span>
          </span>
        )}

        {entities.maxPrice && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold font-mono">
            <DollarSign className="w-3 h-3 text-emerald-600" />
            <span>Max Price: ₹{entities.maxPrice}</span>
          </span>
        )}

        {entities.brand && entities.brand !== 'Any' && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-slate-800 border border-stone-200 text-[11px] font-semibold">
            <span>Brand: {entities.brand}</span>
          </span>
        )}

        {entities.quantity && entities.quantity > 1 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-slate-800 border border-stone-200 text-[11px] font-semibold">
            <span>Qty: {entities.quantity}</span>
          </span>
        )}

        {entities.business && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-semibold">
            <span>Store: {entities.business}</span>
          </span>
        )}

        <span className="text-[10px] text-slate-400 font-mono ml-auto">
          Latency: {lastAIResult.executionTimeMs || 120}ms
        </span>
      </div>

    </div>
  );
}
