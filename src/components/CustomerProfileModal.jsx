// VOICEMART AI - Customer Profile & Session Memory Modal (Light SaaS Theme)
import React from 'react';
import { X, User, Phone, Globe, ShoppingBag, Clock, Sparkles, CheckCircle2, History } from 'lucide-react';

export function CustomerProfileModal({
  isOpen,
  onClose,
  orders,
  preferredLanguage,
  onSelectLanguage
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-slate-500 hover:text-slate-900 hover:bg-stone-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 border-b border-stone-100 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
            <User className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-xl font-bold font-display text-slate-900">Anand Raman</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Phone className="w-3 h-3 text-emerald-600" />
              <span>+91 98403 98765</span>
            </p>
            <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
              Verified Voice Customer
            </span>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Voice Preferences
          </span>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Default Language</span>
              <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-600" />
                <span>Tamil (தமிழ்)</span>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Session Memory</span>
              <p className="font-semibold text-emerald-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Active (3 Turns)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Previous Orders */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-indigo-600" />
              Recent Voice Orders
            </span>
            <span className="text-slate-600 font-medium">{orders.length} orders</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 font-mono">#{order.id}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate max-w-[200px] mt-0.5">
                    {order.items?.[0]?.name}
                  </p>
                </div>
                <span className="font-bold text-slate-900">
                  ₹{order.totalAmount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs transition-colors"
        >
          Done
        </button>

      </div>
    </div>
  );
}
