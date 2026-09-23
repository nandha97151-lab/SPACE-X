// VOICEMART AI - Store Profile & Policy Settings View
import React from 'react';
import { Settings, Store, Phone, MapPin, Clock, RotateCcw, Check, Save } from 'lucide-react';

export function SettingsView({
  businessProfile,
  onUpdateBusinessProfile = () => {}
}) {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-200">
      
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Store Profile & Policy Settings
        </h3>
        <p className="text-xs text-slate-500">
          These details are ingested into the AI model to answer customer inquiries regarding store hours, delivery radius, and return policies.
        </p>
      </div>

      <div className="saas-panel p-6 sm:p-8 bg-white border border-stone-200/90 shadow-2xs space-y-6">
        
        {/* Section 1: Business Information */}
        <div className="space-y-4">
          <div className="border-b border-stone-100 pb-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Store className="w-4 h-4 text-indigo-600" />
              <span>Business Information</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-600 font-semibold">Store / Business Name</label>
              <input
                type="text"
                value={businessProfile.name}
                onChange={(e) => onUpdateBusinessProfile({ ...businessProfile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-600 font-semibold">Business Category</label>
              <input
                type="text"
                value={businessProfile.businessType}
                onChange={(e) => onUpdateBusinessProfile({ ...businessProfile, businessType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Location */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-stone-100 pb-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-600" />
              <span>Contact & Store Location</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-600 font-semibold">Primary Contact Phone</label>
              <input
                type="text"
                value={businessProfile.phone}
                onChange={(e) => onUpdateBusinessProfile({ ...businessProfile, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-600 font-semibold">City / Landmark</label>
              <input
                type="text"
                value={businessProfile.location}
                onChange={(e) => onUpdateBusinessProfile({ ...businessProfile, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="text-slate-600 font-semibold">Full Store Address</label>
            <input
              type="text"
              value={businessProfile.address}
              onChange={(e) => onUpdateBusinessProfile({ ...businessProfile, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
            />
          </div>
        </div>

        {/* Section 3: Operating Hours */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-stone-100 pb-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Operating Hours</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-600 font-semibold">Weekday Hours (Mon – Fri)</label>
              <input
                type="text"
                value={businessProfile.workingHours?.weekdays || '9:00 AM – 9:30 PM'}
                onChange={(e) => onUpdateBusinessProfile({
                  ...businessProfile,
                  workingHours: { ...businessProfile.workingHours, weekdays: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-600 font-semibold">Weekend Hours (Sat – Sun)</label>
              <input
                type="text"
                value={businessProfile.workingHours?.weekends || '8:30 AM – 10:00 PM'}
                onChange={(e) => onUpdateBusinessProfile({
                  ...businessProfile,
                  workingHours: { ...businessProfile.workingHours, weekends: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Return Policy */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-stone-100 pb-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-indigo-600" />
              <span>Return & Exchange Policy</span>
            </h4>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="text-slate-600 font-semibold">Policy Conditions</label>
            <textarea
              rows={3}
              value={businessProfile.returnPolicy?.conditions || '7-day easy exchange/return for unused items with original bill.'}
              onChange={(e) => onUpdateBusinessProfile({
                ...businessProfile,
                returnPolicy: { ...businessProfile.returnPolicy, conditions: e.target.value }
              })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
            />
          </div>
        </div>

        {/* Confirmation footer */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <Check className="w-4 h-4" />
            Changes sync automatically to AI Knowledge Base
          </span>
        </div>

      </div>

    </div>
  );
}
