// VOICEMART AI - Dedicated Conversation Panel (Dialogue Feed)
import React from 'react';
import { Mic, Volume2, Play, Square, Sparkles, User, Bot, Clock } from 'lucide-react';

export function ConversationPanel({
  messages = [],
  isPlayingAudio = false,
  playingMessageId = null,
  onPlayAudioText,
  language = 'en-IN'
}) {
  const isTamil = language === 'ta-IN';

  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl bg-white border border-stone-200/90 shadow-sm p-5 space-y-4 animate-in fade-in duration-300">
      
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">
            {isTamil ? 'குரல் உரையாடல் பதிவு' : 'Live Voice Conversation'}
          </h3>
        </div>
        <span className="text-[11px] font-mono font-medium text-slate-400">
          {messages.length} {isTamil ? 'உரையாடல்கள்' : 'exchanges'}
        </span>
      </div>

      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
        {messages.map((msg) => {
          const isMsgPlaying = isPlayingAudio && playingMessageId === msg.id;

          return (
            <div key={msg.id} className="space-y-2.5 p-3.5 rounded-xl bg-stone-50/70 border border-stone-200/60">
              
              {/* User Utterance */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-slate-600">
                      {isTamil ? 'பயனர்' : 'User'}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    "{msg.query}"
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start gap-2.5 pl-2 sm:pl-3 pt-2 border-t border-stone-200/40">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-700">
                      VOICEMART AI ({msg.language?.name || (isTamil ? 'தமிழ்' : 'English')})
                    </span>

                    {msg.speechText && (
                      <button
                        onClick={() => onPlayAudioText ? onPlayAudioText(msg.speechText, msg.language?.code || language, msg.id) : null}
                        className="px-2 py-0.5 rounded-md bg-white border border-stone-200 hover:border-indigo-400 text-indigo-600 text-[11px] font-bold flex items-center gap-1 transition-all shadow-2xs"
                      >
                        {isMsgPlaying ? (
                          <>
                            <Square className="w-3 h-3 fill-current text-rose-600" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-current text-indigo-600" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-slate-800 font-medium leading-relaxed">
                    {msg.responseText}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
