// VOICEMART AI - Business Information Card
import React from 'react';
import { Store, Star, MapPin, Clock, Phone, Truck, ShieldCheck, ExternalLink } from 'lucide-react';

export function BusinessCard({ business, language = 'en-IN', onViewBusiness }) {
  if (!business) return null;
  const isTamil = language === 'ta-IN';

  return (
    <div className="w-full rounded-2xl bg-white border border-stone-200/90 shadow-sm p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* Header with Store Name & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {business.name}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                {isTamil ? 'சரிபார்க்கப்பட்ட கடை' : 'Verified Store'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {business.tagline || business.businessType}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>4.9 / 5.0</span>
          <span className="text-amber-600 text-[11px] font-normal">(500+ {isTamil ? 'மதிப்பீடுகள்' : 'reviews'})</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        
        {/* Location / Address */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/60">
          <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block mb-0.5">
              {isTamil ? 'முகவரி / இருப்பிடம்' : 'Location & Address'}
            </span>
            <p className="text-slate-600 leading-relaxed">
              {business.address || business.location}
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/60">
          <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block mb-0.5">
              {isTamil ? 'திறக்கும் நேரம்' : 'Opening Hours'}
            </span>
            <p className="text-slate-600">
              {business.workingHours?.weekdays || '9:00 AM – 9:30 PM'}
            </p>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
              ● {isTamil ? 'இப்போது திறந்துள்ளது' : 'Open Now'}
            </span>
          </div>
        </div>

        {/* Contact Phone */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/60">
          <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block mb-0.5">
              {isTamil ? 'தொடர்பு எண்' : 'Contact Phone'}
            </span>
            <p className="text-slate-900 font-semibold font-mono">
              {business.phone || '+91 98401 54321'}
            </p>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {isTamil ? 'வாட்ஸ்அப் & அழைப்பு வசதி' : 'WhatsApp & Calls supported'}
            </span>
          </div>
        </div>

      </div>

      {/* Delivery & Assurance */}
      {business.deliveryPolicy && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs">
          <div className="flex items-center gap-2 text-indigo-900 font-medium">
            <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              {isTamil
                ? 'ஹோம் டெலிவரி: 12 கி.மீ சுற்றளவில் 45-90 நிமிடங்களில் டெலிவரி செய்யப்படும்.'
                : 'Fast Home Delivery: Delivered within 45 to 90 minutes within 12 km radius.'}
            </span>
          </div>
          <span className="font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs">
            {business.deliveryPolicy.deliveryFee || 'Free above ₹499'}
          </span>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <a
          href={`tel:${business.phone || '+919840154321'}`}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-slate-600" />
          <span>{isTamil ? 'அழைக்கவும்' : 'Call Store'}</span>
        </a>
        <button
          onClick={() => onViewBusiness ? onViewBusiness(business) : null}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
        >
          <span>{isTamil ? 'கடை விவரங்கள்' : 'View Store Catalog'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
