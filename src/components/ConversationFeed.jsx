// VOICEMART AI - Multilingual Conversation Feed & Contextual History (Light SaaS Theme)
import React from 'react';
import { User, Bot, Volume2, Sparkles, ShoppingBag, ArrowRight, CornerDownRight, CheckCircle2 } from 'lucide-react';

export function ConversationFeed({
  messages,
  onPlayAudioText,
  onFollowUpClick,
  onOpenVoiceOrder
}) {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-4">
      <div className="flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Live Voice Conversation
        </span>
        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Context Memory Active
        </span>
      </div>

      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div key={msg.id || index} className="space-y-3">
            
            {/* Customer Message (Right/User) */}
            <div className="flex items-start justify-end gap-3">
              <div className="max-w-xl p-4 rounded-2xl rounded-tr-sm bg-indigo-600 text-white shadow-2xs space-y-1">
                <div className="flex items-center justify-between gap-3 text-[11px] text-indigo-100">
                  <span className="font-semibold flex items-center gap-1">
                    🎙 Customer ({msg.language?.name || 'Voice'})
                  </span>
                  <span className="font-mono text-[10px] opacity-75">{msg.timestamp || 'Just now'}</span>
                </div>
                <p className="text-sm sm:text-base font-medium">"{msg.query}"</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
            </div>

            {/* AI Assistant Message (Left/Bot) */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-5 h-5" />
              </div>
              
              <div className="max-w-xl p-4 rounded-2xl rounded-tl-sm bg-white border border-stone-200/80 text-slate-900 shadow-2xs space-y-3">
                <div className="flex items-center justify-between gap-3 text-xs text-slate-500 border-b border-stone-100 pb-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    🤖 VOICEMART AI Assistant
                  </span>
                  <button
                    onClick={() => onPlayAudioText(msg.speechText || msg.responseText, msg.language?.code || 'ta-IN')}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-all border border-indigo-100"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Audio</span>
                  </button>
                </div>

                <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                  "{msg.responseText}"
                </p>

                {/* If matching products found */}
                {msg.matchingProducts && msg.matchingProducts.length > 0 && (
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {msg.matchingProducts.length} Products Found in Store Catalog
                    </span>
                  </div>
                )}

                {/* If Order data is present */}
                {msg.orderData && (
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">Order Extraction Ready</span>
                      <span className="text-[11px] text-slate-500">Item: {msg.orderData.product?.name || msg.orderData.product?.ProductName}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                      <span>Size: {msg.orderData.size} | Qty: {msg.orderData.quantity}</span>
                      <span className="text-emerald-700 font-bold">Total: ₹{msg.orderData.totalAmount}</span>
                    </div>
                    <button
                      onClick={() => onOpenVoiceOrder(msg.orderData)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-2xs transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Confirm & Create Voice Order #{msg.orderData.orderCode}</span>
                    </button>
                  </div>
                )}

                {/* Smart Follow-Up Suggestions */}
                {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <CornerDownRight className="w-3 h-3 text-indigo-600" /> Suggested Follow-ups:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.followUpQuestions.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => onFollowUpClick(q)}
                          className="px-2.5 py-1 rounded-lg bg-stone-50 hover:bg-indigo-50 border border-stone-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 text-xs font-medium transition-all"
                        >
                          "{q}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
