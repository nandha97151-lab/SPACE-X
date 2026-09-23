// VOICEMART AI - Dedicated Voice Assistant (Hero Experience with Full Lifecycle Handling)
import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Volume2, Sparkles, Send, Play, Square, Info, 
  CheckCircle2, ArrowRight, CornerDownLeft, AlertCircle, RefreshCw
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { DEMO_PRESET_QUERIES } from '../services/inventoryData';

export function VoiceAssistant({
  assistantState, // 'idle' | 'listening' | 'processing' | 'responding' | 'success' | 'error'
  setAssistantState,
  onProcessQuery,
  currentLanguage = 'en-IN',
  interimTranscript,
  setInterimTranscript,
  lastAIResult,
  onPlayAudio,
  isPlayingAudio
}) {
  const [inputText, setInputText] = useState('');
  const [micErrorObj, setMicErrorObj] = useState(null); // { code, message }
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const autoFinishTimerRef = useRef(null);

  useEffect(() => {
    setIsBrowserSupported(speechService.isSupported());
  }, []);

  // Real-time Waveform Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const renderWaveform = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 36;
      const barWidth = canvas.width / numBars - 3;
      const centerY = canvas.height / 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 4;

        if (assistantState === 'listening') {
          const time = Date.now() * 0.007;
          barHeight = 10 + Math.sin(time + i * 0.35) * 16 + Math.cos(time * 0.5 + i * 0.25) * 12;
        } else if (assistantState === 'processing') {
          const time = Date.now() * 0.009;
          barHeight = 8 + Math.abs(Math.sin(time + i * 0.4)) * 22;
        } else if (assistantState === 'responding' || isPlayingAudio) {
          const time = Date.now() * 0.006;
          barHeight = 8 + Math.sin(time + i * 0.5) * 16 + Math.cos(time * 0.7 + i * 0.3) * 8;
        } else {
          barHeight = 4 + Math.sin(i * 0.4) * 2;
        }

        const x = i * (barWidth + 3);
        const y = centerY - barHeight / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (assistantState === 'listening') {
          gradient.addColorStop(0, '#E11D48'); // Rose
          gradient.addColorStop(1, '#4F46E5'); // Indigo
        } else if (assistantState === 'processing') {
          gradient.addColorStop(0, '#D97706'); // Amber
          gradient.addColorStop(1, '#4F46E5');
        } else if (assistantState === 'responding' || isPlayingAudio) {
          gradient.addColorStop(0, '#059669'); // Emerald
          gradient.addColorStop(1, '#4F46E5');
        } else {
          gradient.addColorStop(0, '#CBD5E1');
          gradient.addColorStop(1, '#E2E8F0');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (autoFinishTimerRef.current) {
        clearTimeout(autoFinishTimerRef.current);
      }
    };
  }, [assistantState, isPlayingAudio]);

  const activeTranscriptRef = useRef('');

  const handleMicClick = () => {
    setMicErrorObj(null);

    // If already listening, stop and process what was gathered
    if (assistantState === 'listening') {
      speechService.stopListening();
      const currentText = activeTranscriptRef.current || inputText;
      if (currentText && currentText.trim()) {
        setAssistantState('processing');
        onProcessQuery(currentText.trim());
      } else {
        setAssistantState('idle');
      }
      return;
    }

    if (!isBrowserSupported) {
      setMicErrorObj({
        code: 'browser-not-supported',
        message: 'Speech recognition is not supported in this browser. Please open in Google Chrome, Microsoft Edge, or use text search below.'
      });
      return;
    }

    const langCode = (!currentLanguage || currentLanguage === 'auto') ? 'en-IN' : currentLanguage;

    activeTranscriptRef.current = '';
    setAssistantState('listening');
    setInterimTranscript('');

    speechService.startListening({
      lang: langCode,
      onStart: () => {
        setAssistantState('listening');
        setMicErrorObj(null);
      },
      onInterim: (text) => {
        activeTranscriptRef.current = text;
        setInterimTranscript(text);
        setInputText(text); // Requirement 10: Put transcript into existing input field
      },
      onResult: (finalText) => {
        if (!finalText || !finalText.trim()) return;
        activeTranscriptRef.current = finalText.trim();
        setInterimTranscript('');
        setInputText(finalText.trim()); // Requirement 10: Put transcript into existing input field
        setAssistantState('processing');
        onProcessQuery(finalText.trim());
      },
      onError: (err) => {
        console.warn('[VOICEMART VoiceAssistant] Received mic error:', err);
        setMicErrorObj(err);
        setAssistantState('idle');
      },
      onEnd: () => {
        const textToProcess = activeTranscriptRef.current;
        if (textToProcess && textToProcess.trim()) {
          setAssistantState('processing');
          onProcessQuery(textToProcess.trim());
        } else {
          setAssistantState('idle');
        }
      },
      onStateChange: (state) => {
        if (state === 'error') {
          // Keep error banner visible
        }
      }
    });
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setAssistantState('processing');
    onProcessQuery(inputText.trim());
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Central Interactive Voice Card */}
      <div className="saas-panel p-8 sm:p-12 text-center relative overflow-hidden bg-white border border-stone-200 shadow-sm">
        
        <div className="max-w-xl mx-auto space-y-6">
          
          {/* Status Badge (Requirement 12: Clearly indicates idle, listening, processing, success, error) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            {assistantState === 'idle' && (
              <span className="bg-stone-100 text-slate-700 border border-stone-200 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Ready • Tap Microphone to speak</span>
              </span>
            )}
            {assistantState === 'listening' && (
              <span className="bg-rose-50 text-rose-700 border border-rose-200 px-4 py-1.5 rounded-full flex items-center gap-2 font-bold animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>Listening Active • Speak into microphone now...</span>
              </span>
            )}
            {assistantState === 'processing' && (
              <span className="bg-amber-50 text-amber-800 border border-amber-200 px-4 py-1.5 rounded-full flex items-center gap-2 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                <span>Processing speech & searching 12,491 dataset...</span>
              </span>
            )}
            {assistantState === 'responding' && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-1.5 rounded-full flex items-center gap-2 font-bold">
                <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>Audio Assistant Responding</span>
              </span>
            )}
          </div>

          {/* Large Central Microphone Button with Light Ripple Rings */}
          <div className="relative flex items-center justify-center my-4">
            
            {assistantState === 'listening' && (
              <>
                <div className="pulse-ring-light"></div>
                <div className="pulse-ring-light"></div>
                <div className="pulse-ring-light"></div>
              </>
            )}

            <button
              onClick={handleMicClick}
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                assistantState === 'listening'
                  ? 'bg-rose-600 text-white scale-110 shadow-rose-200 ring-4 ring-rose-200 animate-pulse'
                  : assistantState === 'processing'
                  ? 'bg-amber-500 text-white scale-105 shadow-amber-200 ring-4 ring-amber-100'
                  : assistantState === 'responding'
                  ? 'bg-emerald-600 text-white scale-105 shadow-emerald-200 ring-4 ring-emerald-100'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 active:scale-95 shadow-indigo-200'
              }`}
              title={assistantState === 'listening' ? 'Stop Listening & Search' : 'Click to Speak'}
            >
              {assistantState === 'listening' ? (
                <MicOff className="w-10 h-10 sm:w-12 sm:h-12" />
              ) : assistantState === 'processing' ? (
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-spin-slow" />
              ) : (
                <Mic className="w-10 h-10 sm:w-12 sm:h-12" />
              )}
            </button>
          </div>

          {/* Dynamic Spoken Text & Prompt Display */}
          <div className="space-y-2 min-h-[52px]">
            {assistantState === 'idle' && (
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  How can I help you today?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Speak in English, Tamil, Hindi, Telugu, Malayalam, Kannada, or mixed dialects.
                </p>
              </div>
            )}

            {assistantState === 'listening' && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-rose-700">Capturing live voice audio stream</p>
                <div className="inline-block px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 font-semibold text-sm sm:text-base shadow-2xs">
                  {interimTranscript || inputText || "Listening... Speak your product request (e.g. 'black shirt under 1500')"}
                </div>
                <div>
                  <button
                    onClick={() => {
                      speechService.stopListening();
                      if (inputText.trim()) {
                        setAssistantState('processing');
                        onProcessQuery(inputText.trim());
                      } else {
                        setAssistantState('idle');
                      }
                    }}
                    className="mt-1 text-xs font-bold text-indigo-700 hover:underline"
                  >
                    Done speaking? Click here to search
                  </button>
                </div>
              </div>
            )}

            {assistantState === 'processing' && (
              <div className="space-y-1">
                <p className="text-sm font-bold text-amber-700">Searching 12,491 verified catalog...</p>
                <p className="text-xs text-slate-500">Normalizing query tokens and matching price & attributes</p>
              </div>
            )}

            {assistantState === 'responding' && lastAIResult && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-left space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-700">
                    <span className="flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4" /> Spoken Answer ({lastAIResult.language?.name || 'Verified'})
                    </span>
                    <button
                      onClick={onPlayAudio}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1 shadow-2xs"
                    >
                      {isPlayingAudio ? (
                        <>
                          <Square className="w-3 h-3 fill-current" /> Stop
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" /> Play Audio
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                    "{lastAIResult.responseText}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Audio Waveform Canvas Visualizer */}
          <div className="w-full max-w-sm mx-auto h-12 rounded-xl bg-stone-50 border border-stone-200 p-2 flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={340}
              height={40}
              className="w-full h-full"
            />
          </div>

          {/* Text Input Form Fallback (Requirement 10: Put transcript into input field) */}
          <form onSubmit={handleManualSubmit} className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Or type/edit query here (e.g. black shirt under 1500)..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <span>Search</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Error & Diagnostic Banner (Requirement 9) */}
          {micErrorObj && (
            <div className={`flex items-start gap-2.5 text-xs p-3.5 rounded-xl text-left border ${
              micErrorObj.code === 'not-allowed' ? 'bg-rose-50 border-rose-200 text-rose-800' :
              micErrorObj.code === 'no-speech' ? 'bg-amber-50 border-amber-200 text-amber-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold block">
                  {micErrorObj.code === 'not-allowed' ? 'Microphone Permission Needed' :
                   micErrorObj.code === 'no-speech' ? 'No Speech Detected' : 'Voice Input Notice'}
                </span>
                <p>{micErrorObj.message}</p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Preset Voice Query Suggestion Chips */}
      <div className="saas-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              One-Click Multilingual Voice Presets
            </h4>
            <p className="text-xs text-slate-500">Instant one-tap speech triggers for English, Tamil, Hindi, Telugu, Malayalam & Kannada</p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500">1-Click Test</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEMO_PRESET_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(q.query);
                setAssistantState('processing');
                onProcessQuery(q.query);
              }}
              className="p-3.5 rounded-xl bg-white hover:bg-indigo-50/50 border border-stone-200 hover:border-indigo-300 text-left transition-all shadow-2xs group"
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-indigo-600">{q.languageLabel}</span>
                <span className="text-slate-400 font-mono text-[10px]">{q.intent}</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-950">
                "{q.query}"
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                {q.meaning}
              </p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
