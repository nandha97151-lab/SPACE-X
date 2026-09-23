// VOICEMART AI - Voice Order Creation & Confirmation Modal (Light SaaS Theme)
import React, { useState } from 'react';
import { X, CheckCircle2, ShoppingBag, Sparkles, MapPin, Phone, User, CreditCard, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export function VoiceOrderModal({
  orderData, // { product, size, quantity, totalAmount, orderCode }
  onClose,
  onOrderConfirmed
}) {
  if (!orderData) return null;

  const [quantity, setQuantity] = useState(orderData.quantity || 1);
  const [size, setSize] = useState(orderData.size || (orderData.product?.sizes ? orderData.product.sizes[0] : 'Standard'));
  const [customerName, setCustomerName] = useState('Anand Raman');
  const [customerPhone, setCustomerPhone] = useState('+91 98403 98765');
  const [address, setAddress] = useState('12, South Usman Road, T. Nagar, Chennai - 600017');
  const [paymentMethod, setPaymentMethod] = useState('UPI (GPay / PhonePe)');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const unitPrice = orderData.product?.price || orderData.product?.Price || 0;
  const total = unitPrice * quantity;

  const handleConfirm = () => {
    const finalOrder = {
      id: orderData.orderCode || `VM${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      language: "Tamil / English (Voice)",
      items: [
        {
          name: orderData.product.name || orderData.product.ProductName,
          size,
          quantity,
          price: unitPrice
        }
      ],
      totalAmount: total,
      status: "Confirmed",
      orderType: "Voice Order",
      deliveryAddress: address,
      paymentMethod,
      timestamp: "Just now"
    };

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setCreatedOrder(finalOrder);
    setIsSuccess(true);
    if (onOrderConfirmed) {
      onOrderConfirmed(finalOrder);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-slate-500 hover:text-slate-900 hover:bg-stone-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="space-y-5">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Voice Order Checkout</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                Confirm Your Order
              </h2>
              <p className="text-xs text-slate-500">
                Extracted directly from natural voice conversation
              </p>
            </div>

            {/* Extracted Product Summary Card */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center gap-4">
              <img
                src={orderData.product?.image || orderData.product?.Image}
                alt={orderData.product?.name || orderData.product?.ProductName}
                className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0 bg-white"
              />
              <div className="flex-1 overflow-hidden">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {orderData.product?.name || orderData.product?.ProductName}
                </h4>
                <p className="text-xs text-indigo-700 font-bold">
                  ₹{unitPrice} each
                </p>
                
                {/* Size & Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-500">Size:</span>
                    <span className="font-semibold text-slate-900 bg-white px-2 py-0.5 rounded border border-stone-200">
                      {size}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">Qty:</span>
                    <div className="flex items-center bg-white rounded-lg border border-stone-200 overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2.5 py-0.5 text-slate-600 hover:bg-stone-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-slate-900">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2.5 py-0.5 text-slate-600 hover:bg-stone-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer & Delivery Details */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-indigo-600" /> Customer Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 font-medium flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-indigo-600" /> Phone Number
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Delivery Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 font-medium flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-amber-600" /> Payment Option
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
                >
                  <option>UPI (GPay / PhonePe / Paytm)</option>
                  <option>Cash on Delivery (COD)</option>
                  <option>Credit / Debit Card on Delivery</option>
                </select>
              </div>
            </div>

            {/* Total Calculation */}
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Total Payable Amount:</span>
                <p className="text-xl font-bold text-slate-900 font-display">₹{total}</p>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Free Local Delivery ✓
              </span>
            </div>

            {/* Confirm CTA */}
            <button
              onClick={handleConfirm}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Confirm Order (Generate #{orderData.orderCode || 'VM1024'})</span>
            </button>

          </div>
        ) : (
          /* Success Screen */
          <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Order Placed Successfully!
              </span>
              <h2 className="text-2xl font-bold font-display text-slate-900">
                Order #{createdOrder?.id}
              </h2>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, {createdOrder?.customerName}! Your voice order has been dispatched to the merchant's live dashboard.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Item:</span>
                <span className="font-bold text-slate-900">{orderData.product?.name || orderData.product?.ProductName}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Quantity & Size:</span>
                <span className="font-semibold text-slate-900">{quantity} unit(s) • Size {size}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Amount:</span>
                <span className="font-bold text-emerald-700 text-sm">₹{total}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Delivery:</span>
                <span className="font-semibold text-amber-700">Within 45 to 60 Mins</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SMS and WhatsApp updates sent to {customerPhone}</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
