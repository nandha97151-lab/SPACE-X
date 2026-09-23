// VOICEMART AI - Shopping Cart Drawer (Light SaaS Theme)
import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToOrder
}) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.price || item.Price || 0) * (item.quantity || 1), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-xl p-6 sm:p-7 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900">Your Cart</h3>
                  <p className="text-xs text-slate-500">{cart.length} item(s) selected</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-100 text-slate-500 hover:text-slate-900 hover:bg-stone-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Item List */}
            {cart.length > 0 ? (
              <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.id || item.ProductID}-${idx}`}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-3"
                  >
                    <img
                      src={item.image || item.Image}
                      alt={item.name || item.ProductName}
                      className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0 bg-white"
                    />

                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.name || item.ProductName}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Size: {item.selectedSize || 'Std'} • ₹{item.price || item.Price}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-white rounded-lg border border-stone-200 overflow-hidden text-xs">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                            className="px-2 py-0.5 text-slate-600 hover:bg-stone-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 font-bold text-slate-900">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-stone-100 font-bold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-100 flex items-center justify-center text-slate-400 border border-stone-200">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Cart is empty</h4>
                <p className="text-xs text-slate-500">Add products using natural voice or click 'Add to Cart'.</p>
              </div>
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-stone-100 space-y-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Local Delivery:</span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-stone-100">
                  <span>Total Amount:</span>
                  <span className="text-indigo-700 text-base font-black">₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onProceedToOrder({
                    product: cart[0],
                    size: cart[0].selectedSize || 'Standard',
                    quantity: cart[0].quantity,
                    totalAmount,
                    orderCode: `VM${Math.floor(1000 + Math.random() * 9000)}`
                  });
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Voice Order Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
