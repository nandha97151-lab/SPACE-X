// VOICEMART AI - Live Orders Management for Local Businesses
import React from 'react';
import { ShoppingBag, CheckCircle2, Clock, Truck, Phone, MapPin, Mic, ArrowRight } from 'lucide-react';

export function OrdersManager({ orders, onUpdateStatus }) {
  const statusColors = {
    'Confirmed': 'bg-blue-50 text-blue-700 border-blue-200',
    'Processing': 'bg-amber-50 text-amber-700 border-amber-200',
    'Delivered': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Cancelled': 'bg-rose-50 text-rose-700 border-rose-200'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Customer Orders</h3>
          <p className="text-xs text-slate-500">
            Real-time incoming customer orders generated via natural voice conversations & cart checkout
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
          {orders.length} Total Orders
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="saas-card p-5 bg-white border border-stone-200/90 space-y-4 shadow-2xs"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/70 flex items-center justify-center font-black font-mono text-xs">
                  #{order.id}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{order.customerName}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      <Mic className="w-3 h-3 text-indigo-600" /> {order.orderType || 'Voice Order'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" /> {order.customerPhone}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">{order.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${statusColors[order.status] || statusColors.Confirmed}`}>
                  {order.status}
                </span>

                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-800 outline-none cursor-pointer hover:bg-stone-100"
                >
                  <option value="Confirmed">Mark Confirmed</option>
                  <option value="Processing">Mark Processing</option>
                  <option value="Delivered">Mark Delivered</option>
                  <option value="Cancelled">Mark Cancelled</option>
                </select>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Order Items:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {order.items?.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-500">Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono font-bold text-slate-900">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Information */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate max-w-md">{order.deliveryAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Total Amount:</span>
                <span className="text-base font-black text-slate-900 font-mono">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
