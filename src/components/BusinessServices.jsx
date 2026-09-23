// VOICEMART AI - Business Services & Store Policies Voice FAQ
import React from 'react';
import { Clock, Truck, RotateCcw, CreditCard, Mic } from 'lucide-react';
import { STORE_POLICIES_FAQ } from '../services/inventoryData';

export function BusinessServices({ onQueryService, selectedLanguage }) {
  const langKey = selectedLanguage?.startsWith('ta') ? 'ta'
    : selectedLanguage?.startsWith('hi') ? 'hi'
    : selectedLanguage?.startsWith('te') ? 'te'
    : selectedLanguage?.startsWith('ml') ? 'ml'
    : selectedLanguage?.startsWith('kn') ? 'kn'
    : 'en';

  const icons = {
    'store_hours': <Clock className="w-5 h-5 text-indigo-600" />,
    'home_delivery': <Truck className="w-5 h-5 text-emerald-600" />,
    'return_policy': <RotateCcw className="w-5 h-5 text-purple-600" />,
    'payment_methods': <CreditCard className="w-5 h-5 text-amber-600" />
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900">
          Store Services & Business Policies
        </h3>
        <p className="text-xs text-slate-500">
          Our voice assistant answers questions about store timings, delivery coverage, payment, and returns in your native language.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {STORE_POLICIES_FAQ.map((faq) => {
          const localizedAnswer = faq.answer[langKey] || faq.answer.en;
          return (
            <div
              key={faq.id}
              className="saas-card p-5 flex flex-col justify-between space-y-4 bg-white border border-stone-200/80 shadow-2xs"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-center">
                  {icons[faq.topic] || <Clock className="w-5 h-5 text-indigo-600" />}
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {faq.question}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {localizedAnswer}
                </p>
              </div>

              <button
                onClick={() => onQueryService(faq.question)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-stone-50 hover:bg-indigo-50 border border-stone-200 text-xs font-bold text-slate-700 hover:text-indigo-700 transition-all shadow-2xs"
              >
                <Mic className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ask AI in Voice</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
