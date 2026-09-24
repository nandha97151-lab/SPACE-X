// VOICEMART AI - Fixed Desktop Navigation Sidebar (Light SaaS Theme)
import React from 'react';
import { 
  Home, Mic, ShoppingBag, Package, Store, Target, Database, Cpu, Settings, 
  Sparkles, Globe, ShieldCheck, ChevronRight, X, Layers
} from 'lucide-react';

export function Sidebar({
  activeView,
  setActiveView,
  ordersCount = 0,
  isMobileOpen = false,
  setIsMobileOpen,
  onCloseMobile,
  onOpenDemo = () => {}
}) {
  const closeDrawer = () => {
    if (onCloseMobile) onCloseMobile();
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const navSections = [
    {
      label: 'DISCOVERY',
      items: [
        { id: 'home', label: 'Overview', icon: Home, badge: null },
        { id: 'voice', label: 'Voice Assistant', icon: Mic, badge: 'Hero AI', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
      ]
    },
    {
      label: 'STORE & PRODUCTS',
      items: [
        { id: 'products', label: 'Products Catalog', icon: ShoppingBag, badge: '12.4k', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        { id: 'orders', label: 'Orders', icon: Package, badge: ordersCount > 0 ? `${ordersCount}` : null, badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
        { id: 'inventory', label: 'Inventory Manager', icon: Layers, badge: null },
        { id: 'services', label: 'Store FAQ & Services', icon: Store, badge: null }
      ]
    },
    {
      label: 'BUSINESS INTELLIGENCE',
      items: [
        { id: 'demand', label: 'Demand Intelligence', icon: Target, badge: 'Live Signals', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
        { id: 'dataset', label: 'Datasets & Catalog', icon: Database, badge: 'Updated', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
      ]
    },
    {
      label: 'SYSTEM & ARCHITECTURE',
      items: [
        { id: 'how-it-thinks', label: 'How It Thinks', icon: Cpu, badge: 'Verified', badgeColor: 'bg-slate-100 text-slate-700 border-slate-200' },
        { id: 'architecture', label: '7-Step Architecture', icon: Globe, badge: null },
        { id: 'settings', label: 'Store Settings', icon: Settings, badge: null }
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-stone-200 select-none">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-stone-100">
        <div 
          onClick={() => {
            setActiveView('home');
            closeDrawer();
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                VOICEMART<span className="text-indigo-600">AI</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                HACM176
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate">
              Multilingual Voice Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar">
        {navSections.map((sec) => (
          <div key={sec.label} className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {sec.label}
            </p>
            <div className="space-y-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      closeDrawer();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-indigo-50/80 text-indigo-700 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${item.badgeColor || 'bg-stone-100 text-slate-600 border-stone-200'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Start 14-Step Demo Button inside sidebar */}
        <div className="pt-2 px-2">
          <button
            onClick={() => {
              onOpenDemo();
              closeDrawer();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">14-Step Demo</p>
                <p className="text-[10px] text-indigo-200 font-medium">Judge Walkthrough</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer Status */}
      <div className="p-4 border-t border-stone-100 bg-stone-50/50">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-medium text-slate-600">Speech AI Engine</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
            6 Languages
          </span>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
            onClick={closeDrawer}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <button
              onClick={closeDrawer}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
