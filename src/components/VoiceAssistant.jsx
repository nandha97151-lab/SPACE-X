// VOICEMART AI - Voice Assistant (Auto-Greet -> Auto-Listen -> Silence = Auto-Search)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic, MicOff, Volume2, Sparkles, Play, Square, Info,
  CornerDownLeft, AlertCircle, ShieldCheck, Activity, Terminal
} from 'lucide-react';
import {
  voiceService, LANGUAGES, containsTamil,
  getTamilVoice, getEnglishVoice, voiceLog
} from '../services/voiceService';
import { DEMO_PRESET_QUERIES } from '../services/inventoryData';

// Greeting text per language
const GREETINGS = {
  'en-IN': 'Hello! Welcome to VoiceMart AI — your voice assistant for local businesses. How can I help you today?',
  'ta-IN': '\u0bb5\u0ba3\u0b95\u0bcd\u0b95\u0bae\u0bcd! VoiceMart AI \u0b95\u0bcd\u0b95\u0bc1 \u0bb5\u0bb0\u0bb5\u0bc7\u0bb1\u0bcd\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd. \u0ba8\u0bbe\u0ba9\u0bcd \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b95\u0bc1\u0bb0\u0bb2\u0bcd \u0b89\u0ba4\u0bb5\u0bbf\u0baf\u0bbe\u0bb3\u0bb0\u0bcd. \u0b8e\u0baa\u0bcd\u0baa\u0b9f\u0bbf \u0b89\u0ba4\u0bb5\u0bb2\u0bbe\u0bae\u0bcd?'
};

export function VoiceAssistant({
  assistantState, setAssistantState, onProcessQuery,
  currentLanguage = 'en-IN', onSelectLanguage,
  interimTranscript, setInterimTranscript,
  lastAIResult, onPlayAudio, isPlayingAudio
}) {
  const [inputText, setInputText]             = useState('');
  const [micErrorObj, setMicErrorObj]         = useState(null);
  const [showDebugPanel, setShowDebugPanel]   = useState(false);
  const [activeVoiceName, setActiveVoiceName] = useState('Detecting...');
  const [audioLevel, setAudioLevel]           = useState(0);
  const [isVoiceActive, setIsVoiceActive]     = useState(false);
  const [isGreeting, setIsGreeting]           = useState(false);
  const [greetingDone, setGreetingDone]       = useState(false);
  const [permState, setPermState]             = useState('unknown');

  const canvasRef           = useRef(null);
  const animFrameRef        = useRef(null);
  const activeTranscriptRef = useRef('');
  const hasDispatchedRef    = useRef(false);
  const hasGreetedRef       = useRef(false);
  const isListeningRef      = useRef(false);
  const silenceTimeoutRef   = useRef(null);
  const prevLangRef         = useRef(currentLanguage);

  const isTamil = currentLanguage === 'ta-IN';

  // Check mic permission
  useEffect(() => {
    if (navigator?.permissions) {
      navigator.permissions.query({ name: 'microphone' })
        .then(s => { setPermState(s.state); s.onchange = () => setPermState(s.state); })
        .catch(() => setPermState('prompt'));
    }
  }, []);

  // Load TTS voice name
  useEffect(() => {
    const update = () => {
      const v = isTamil ? getTamilVoice() : getEnglishVoice();
      setActiveVoiceName(v ? v.name + ' (' + v.lang + ')' : (isTamil ? 'System Tamil' : 'System English'));
    };
    update();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = update;
    }
  }, [currentLanguage, isTamil]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      voiceService.stopListening();
      voiceService.stopSpeaking();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 36;
      const bw = canvas.width / bars - 3;
      const cy = canvas.height / 2;
      for (let i = 0; i < bars; i++) {
        let h = 4;
        const t = Date.now();
        if (assistantState === 'listening') {
          const em = Math.max(1, audioLevel * 180);
          h = Math.min(36, (6 + Math.sin(t * 0.007 + i * 0.35) * 8 + Math.cos(t * 0.0035 + i * 0.25) * 6) * (em > 2 ? 1.6 : 1));
        } else if (assistantState === 'processing') {
          h = 6 + Math.abs(Math.sin(t * 0.009 + i * 0.4)) * 18;
        } else if (isGreeting || assistantState === 'responding' || isPlayingAudio) {
          h = 6 + Math.sin(t * 0.006 + i * 0.5) * 14 + Math.cos(t * 0.0042 + i * 0.3) * 6;
        } else {
          h = 4 + Math.sin(i * 0.4) * 2;
        }
        const x = i * (bw + 3), y = cy - h / 2;
        const g = ctx.createLinearGradient(0, y, 0, y + h);
        if (isGreeting || assistantState === 'responding' || isPlayingAudio) {
          g.addColorStop(0, '#059669'); g.addColorStop(1, '#4F46E5');
        } else if (assistantState === 'listening') {
          g.addColorStop(0, isVoiceActive ? '#E11D48' : '#6366F1'); g.addColorStop(1, '#4F46E5');
        } else if (assistantState === 'processing') {
          g.addColorStop(0, '#D97706'); g.addColorStop(1, '#4F46E5');
        } else {
          g.addColorStop(0, '#CBD5E1'); g.addColorStop(1, '#E2E8F0');
        }
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.roundRect(x, y, bw, h, 2); ctx.fill();
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [assistantState, isPlayingAudio, audioLevel, isVoiceActive, isGreeting]);

  // ── Core: start listening + silence auto-submits ──────────────────────────
  const startListeningNow = useCallback((langOverride) => {
    const lang = langOverride || currentLanguage;
    if (isListeningRef.current) return;
    if (!voiceService.isSTTSupported()) {
      setMicErrorObj({ code: 'unsupported', message: 'Speech recognition not supported. Use Google Chrome.' });
      return;
    }
    isListeningRef.current      = true;
    activeTranscriptRef.current = '';
    hasDispatchedRef.current    = false;
    setMicErrorObj(null);
    setAssistantState('listening');
    setInterimTranscript('');

    voiceService.startListening(lang, {
      onStart: () => { isListeningRef.current = true; setAssistantState('listening'); },
      onInterim: (text) => {
        activeTranscriptRef.current = text;
        setInterimTranscript(text);
        setInputText(text);

        // Auto-search trigger: person kept quiet for 1.2s -> start search immediately
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }
        silenceTimeoutRef.current = setTimeout(() => {
          if (!hasDispatchedRef.current && activeTranscriptRef.current && activeTranscriptRef.current.trim()) {
            const query = activeTranscriptRef.current.trim();
            hasDispatchedRef.current = true;
            isListeningRef.current = false;
            setInterimTranscript('');
            setInputText(query);
            voiceLog('STT', 'Person kept quiet (1.2s silence) -> auto-starting search: ' + query);
            voiceService.stopListening();
            setAssistantState('processing');
            onProcessQuery(query);
          }
        }, 1200);
      },
      // SILENCE DETECTED -> Web Speech API fires onResult (final) then onEnd automatically
      onResult: (finalText) => {
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
        if (!finalText || !finalText.trim()) return;
        if (hasDispatchedRef.current) return;
        isListeningRef.current   = false;
        hasDispatchedRef.current = true;
        activeTranscriptRef.current = finalText.trim();
        setInterimTranscript('');
        setInputText(finalText.trim());
        voiceLog('STT', 'Silence detected — auto-submitting: ' + finalText.trim());
        setAssistantState('processing');
        onProcessQuery(finalText.trim());
      },
      // If onResult was not fired but we have buffered text -> dispatch on end (silence fallback)
      onEnd: () => {
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
        isListeningRef.current = false;
        if (!hasDispatchedRef.current) {
          const text = activeTranscriptRef.current;
          if (text && text.trim()) {
            hasDispatchedRef.current = true;
            voiceLog('STT', 'onEnd fallback auto-submit: ' + text.trim());
            setAssistantState('processing');
            onProcessQuery(text.trim());
          } else {
            setAssistantState('idle');
          }
        }
      },
      onError: (err) => {
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
        isListeningRef.current = false;
        setMicErrorObj(err);
        setAssistantState('idle');
      },
      onAudioLevel: (rms, isVoice) => { setAudioLevel(rms); setIsVoiceActive(isVoice); }
    });
  }, [currentLanguage, onProcessQuery, setAssistantState, setInterimTranscript]);

  // ── Auto-Greet: speak greeting in selected language, then auto-listen ─────
  const greetAndListen = useCallback((lang) => {
    const useLang = lang || currentLanguage;
    if (hasGreetedRef.current) return;
    hasGreetedRef.current = true;
    const text = GREETINGS[useLang] || GREETINGS['en-IN'];
    setIsGreeting(true);
    setAssistantState('responding');
    voiceService.speak(text, useLang, {
      onStart: () => { setIsGreeting(true); setAssistantState('responding'); },
      onEnd: () => {
        setIsGreeting(false);
        setGreetingDone(true);
        setAssistantState('idle');
        setTimeout(() => startListeningNow(useLang), 600);
      },
      onError: () => { setIsGreeting(false); setGreetingDone(true); setAssistantState('idle'); setTimeout(() => startListeningNow(useLang), 600); },
      onNoTamilVoice: () => { setIsGreeting(false); setGreetingDone(true); setAssistantState('idle'); setTimeout(() => startListeningNow(useLang), 600); }
    });
  }, [currentLanguage, setAssistantState, startListeningNow]);

  // Auto-greet on first mount
  useEffect(() => {
    if (hasGreetedRef.current) return;
    const t = setTimeout(() => greetAndListen(currentLanguage), 1000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-greet when language is switched
  useEffect(() => {
    if (prevLangRef.current === currentLanguage) return;
    prevLangRef.current = currentLanguage;
    hasGreetedRef.current = false;
    voiceService.stopListening();
    voiceService.stopSpeaking();
    isListeningRef.current = false;
    setAssistantState('idle');
    setGreetingDone(false);
    setIsGreeting(false);
    const t = setTimeout(() => greetAndListen(currentLanguage), 400);
    return () => clearTimeout(t);
  }, [currentLanguage, greetAndListen, setAssistantState]);

  // Manual mic button
  const handleMicClick = () => {
    setMicErrorObj(null);
    if (isGreeting) return;
    if (assistantState === 'listening') {
      voiceService.stopListening();
      isListeningRef.current = false;
      const text = activeTranscriptRef.current || inputText;
      if (text && text.trim()) { setAssistantState('processing'); onProcessQuery(text.trim()); }
      else setAssistantState('idle');
      return;
    }
    startListeningNow();
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setAssistantState('processing');
    onProcessQuery(inputText.trim());
  };

  const micDisabled = isGreeting || assistantState === 'processing' || assistantState === 'responding';
  const isWaiting   = !greetingDone && !isGreeting && assistantState === 'idle';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">

      {/* Central Voice Card */}
      <div className="saas-panel p-6 sm:p-10 text-center relative overflow-hidden bg-white border border-stone-200 shadow-sm">
        <div className="max-w-xl mx-auto space-y-5">

          {/* Language Selector */}
          <div className="flex items-center justify-center gap-2">
            {['en-IN', 'ta-IN'].map((lang) => (
              <button key={lang} onClick={() => onSelectLanguage && onSelectLanguage(lang)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 ${currentLanguage === lang ? 'bg-indigo-600 text-white ring-2 ring-indigo-300' : 'bg-stone-100 text-slate-700 hover:bg-stone-200'}`}>
                <span>&#127470;&#127475;</span>
                <span>{lang === 'en-IN' ? 'English' : '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd'}</span>
              </button>
            ))}
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            {isWaiting && (
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 py-1.5 rounded-full text-xs flex items-center gap-2 font-medium animate-pulse">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                {isTamil ? '\u0ba4\u0baf\u0bbe\u0bb0\u0bbe\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd...' : 'Starting up...'}
              </span>
            )}
            {isGreeting && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 rounded-full text-xs flex items-center gap-2 font-bold animate-pulse">
                <Volume2 className="w-3.5 h-3.5" />
                {isTamil ? '\u0bb5\u0bb0\u0bb5\u0bc7\u0bb1\u0bcd\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd...' : 'Greeting you...'}
              </span>
            )}
            {assistantState === 'idle' && greetingDone && (
              <span className="bg-stone-100 text-slate-700 border border-stone-200 px-4 py-1.5 rounded-full text-xs flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {isTamil ? '\u0ba4\u0baf\u0bbe\u0bb0\u0bcd \u2022 \u0baa\u0bc7\u0b9a\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd' : 'Ready \u2022 Speak — silence triggers search'}
              </span>
            )}
            {assistantState === 'listening' && (
              <span className="bg-rose-50 text-rose-700 border border-rose-200 px-4 py-1.5 rounded-full text-xs flex items-center gap-2 font-bold animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                \uD83C\uDF99 {isTamil ? '\u0b95\u0bc7\u0b9f\u0bcd\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd... (\u0bae\u0bc1\u0b9f\u0bbf\u0ba9\u0bbe\u0bb2\u0bcd \u0ba4\u0ba3\u0bc8\u0b95\u0bcd\u0b95 = \u0ba4\u0bc7\u0b9f\u0bc1\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd)' : 'Listening... (stop speaking = auto-search)'}
              </span>
            )}
            {assistantState === 'processing' && (
              <span className="bg-amber-50 text-amber-800 border border-amber-200 px-4 py-1.5 rounded-full text-xs flex items-center gap-2 font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                {isTamil ? '\u0baa\u0bc1\u0bb0\u0bbf\u0ba8\u0bcd\u0ba4\u0bc1\u0b95\u0bca\u0bb3\u0bcd\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd...' : 'Processing query...'}
              </span>
            )}
            {assistantState === 'responding' && !isGreeting && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-1.5 rounded-full text-xs flex items-center gap-2 font-bold">
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                {isTamil ? '\u0baa\u0ba4\u0bbf\u0bb2\u0bcd \u0b9a\u0bca\u0bb2\u0bcd\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd...' : 'Responding...'}
              </span>
            )}
          </div>

          {/* Big Mic Button */}
          <div className="relative flex items-center justify-center my-3">
            {assistantState === 'listening' && (
              <><div className="pulse-ring-light" /><div className="pulse-ring-light" /></>
            )}
            <button onClick={handleMicClick} disabled={micDisabled}
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                micDisabled       ? 'bg-slate-300 text-slate-500 cursor-not-allowed' :
                assistantState === 'listening'  ? 'bg-rose-600 text-white scale-110 ring-4 ring-rose-200 animate-pulse' :
                assistantState === 'processing' ? 'bg-amber-500 text-white scale-105' :
                'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 active:scale-95 shadow-indigo-200'
              }`}>
              {isGreeting
                ? <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
                : assistantState === 'listening'
                ? <MicOff className="w-10 h-10 sm:w-12 sm:h-12" />
                : assistantState === 'processing'
                ? <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 animate-spin" />
                : <Mic className="w-10 h-10 sm:w-12 sm:h-12" />}
            </button>
          </div>

          {/* Dynamic Content */}
          <div className="space-y-2 min-h-[60px]">
            {isWaiting && <p className="text-sm text-slate-400 animate-pulse">{isTamil ? 'VoiceMart AI \u0ba4\u0bca\u0b9f\u0b99\u0bcd\u0b95\u0bc1\u0b95\u0bbf\u0bb1\u0ba4\u0bc1...' : 'VoiceMart AI is starting up...'}</p>}

            {isGreeting && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-1">
                <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5"><Volume2 className="w-3.5 h-3.5" />{isTamil ? 'AI \u0bb5\u0bb0\u0bb5\u0bc7\u0bb1\u0bcd\u0baa\u0bc1\u0bb0\u0bc8' : 'AI Greeting'}</p>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">&quot;{GREETINGS[currentLanguage] || GREETINGS['en-IN']}&quot;</p>
                <p className="text-[11px] text-emerald-600 font-medium">{isTamil ? '\u0baa\u0bc7\u0b9a\u0bbf\u0baf \u0baa\u0bbf\u0bb1\u0b95\u0bc1 \u0ba4\u0b9e\u0bcd\u0b9a\u0bc1 \u0b87\u0bb0\u0bc1\u0ba8\u0bcd\u0ba4\u0bbe\u0bb2\u0bcd \u0ba4\u0bc7\u0b9f\u0bc1\u0bb5\u0bc7\u0ba9\u0bcd' : 'I will start listening automatically after this'}
                </p>
              </div>
            )}

            {assistantState === 'idle' && greetingDone && (
              <div className="space-y-2">
                <p className="text-base sm:text-lg font-bold text-slate-900">
                  {isTamil ? '\u0baa\u0bc7\u0b9a\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u2014 \u0ba4\u0ba3\u0bc8\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd\u0baa\u0bcb\u0ba4\u0bc1 \u0ba4\u0bc7\u0b9f\u0bc1\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd!' : 'Speak — I\'ll search automatically when you stop!'}
                </p>
                <p className="text-xs text-slate-500">
                  {isTamil ? '\u0b89\u0ba4\u0bbe: "\u0b8e\u0ba9\u0b95\u0bcd\u0b95\u0bc1 \u0b85\u0bb0\u0bbf\u0b9a\u0bbf \u0bb5\u0bc7\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bcd", "\u0b87\u0ba8\u0bcd\u0ba4 \u0b95\u0b9f\u0bc8 \u0b8e\u0b99\u0bcd\u0b95\u0bc7 \u0b87\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1?"' : 'e.g. "I need rice", "Show shirts under 500 rupees", "Where is this store?"'}
                </p>
                <button onClick={() => startListeningNow()}
                  className="mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all">
                  <Mic className="w-3.5 h-3.5" />
                  {isTamil ? '\u0baa\u0bc7\u0b9a\u0ba4\u0bc1\u0b9f\u0b99\u0bcd\u0b95\u0bc1' : 'Start Speaking'}
                </button>
              </div>
            )}

            {assistantState === 'listening' && (
              <div className="space-y-2">
                <div className="px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-slate-900 font-semibold text-sm min-h-[40px]">
                  {interimTranscript || inputText || (isTamil ? '\u0b95\u0bc7\u0b9f\u0bcd\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd...' : 'Listening...')}
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {isTamil ? '\u0baa\u0bc7\u0b9a\u0bbf \u0bae\u0bc1\u0b9f\u0bbf\u0ba4\u0bcd\u0ba4\u0bc1 \u0ba4\u0ba3\u0bc8\u0ba4\u0bcd\u0ba4\u0bbe\u0bb2\u0bcd \u0ba4\u0bc7\u0b9f\u0bc1\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd' : 'Stop speaking and I will auto-search for you'}
                </p>
                <button onClick={handleMicClick} className="text-xs font-bold text-indigo-700 hover:underline">
                  {isTamil ? '\u0baa\u0bc7\u0b9a\u0bbf \u0bae\u0bc1\u0b9f\u0bbf\u0ba8\u0bcd\u0ba4\u0ba4\u0bbe? \u0b87\u0b99\u0bcd\u0b95\u0bc7 \u0b85\u0bb4\u0bc1\u0ba4\u0bcd\u0ba4\u0bb5\u0bc1\u0bae\u0bcd' : 'Done speaking? Tap here to search now'}
                </button>
              </div>
            )}

            {assistantState === 'processing' && <p className="text-sm font-bold text-amber-700">{isTamil ? '\u0baa\u0bca\u0bb0\u0bc1\u0b9f\u0bcd\u0b95\u0bb3\u0bc8 \u0ba4\u0bc7\u0b9f\u0bbf\u0b95\u0bcd\u0b95\u0bca\u0ba3\u0bcd\u0b9f\u0bbf\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd...' : 'Searching verified catalog...'}</p>}

            {assistantState === 'responding' && !isGreeting && lastAIResult && (
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-700">
                  <span className="flex items-center gap-1.5"><Volume2 className="w-4 h-4" /> Spoken Answer ({lastAIResult.language?.name || 'AI'})</span>
                  <button onClick={onPlayAudio} className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs flex items-center gap-1">
                    {isPlayingAudio ? <><Play className="w-3 h-3" /> Stop</> : <><Play className="w-3 h-3" /> Play</>}
                  </button>
                </div>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">&quot;{lastAIResult.responseText}&quot;</p>
              </div>
            )}
          </div>

          {/* Waveform */}
          <div className="w-full max-w-sm mx-auto h-11 rounded-xl bg-stone-50 border border-stone-200 p-2 overflow-hidden">
            <canvas ref={canvasRef} width={340} height={36} className="w-full h-full" />
          </div>

          {/* Text fallback */}
          <form onSubmit={handleManualSubmit} className="flex items-center gap-2 pt-1">
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
              placeholder={isTamil ? '\u0b85\u0bb2\u0bcd\u0bb2\u0ba4\u0bc1 \u0b87\u0b99\u0bcd\u0b95\u0bc7 \u0ba4\u0b9f\u0bcd\u0b9f\u0b9a\u0bcd\u0b9a\u0bc1 \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0bb5\u0bc1\u0bae\u0bcd...' : 'Or type your query here...'}
              className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all" />
            <button type="submit" disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs transition-all flex items-center gap-1.5">
              <span>Search</span><CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Mic error */}
          {micErrorObj && (
            <div className="flex items-start gap-2.5 text-xs p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Microphone Notice</span>
                <p>{micErrorObj.message}</p>
                {(micErrorObj.code === 'not-allowed' || micErrorObj.code === 'permission-denied') && (
                  <p className="mt-1 font-semibold">{isTamil ? 'URL \u0baa\u0b9f\u0bcd\u0b9f\u0bbf\u0baf\u0bbf\u0bb2\u0bcd \uD83D\uDD12 \u2192 Microphone \u2192 Allow \u0b85\u0bb4\u0bc1\u0ba4\u0bcd\u0ba4\u0bb5\u0bc1\u0bae\u0bcd.' : 'Click the lock \uD83D\uDD12 in your URL bar \u2192 Microphone \u2192 Allow.'}</p>
                )}
              </div>
            </div>
          )}

          {/* First-time hint */}
          {permState === 'prompt' && !greetingDone && (
            <div className="flex items-start gap-2 text-xs p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p><strong>{isTamil ? '\u0bae\u0bc1\u0ba4\u0bb2\u0bcd\u0bae\u0bc1\u0bb1\u0bc8: ' : 'First time: '}</strong>
              {isTamil ? 'AI \u0baa\u0bc7\u0b9a\u0bbf\u0baf\u0ba4\u0bc1\u0bae\u0bcd \u0bae\u0bc8\u0b95\u0bcd \u0b85\u0ba8\u0bc1\u0bae\u0ba4\u0bbf \u0b95\u0bc7\u0b9f\u0bcd\u0b95\u0bc1\u0bae\u0bcd \u2014 Allow \u0b85\u0bb4\u0bc1\u0ba4\u0bcd\u0ba4\u0bb5\u0bc1\u0bae\u0bcd.' : "After the greeting, your browser will ask for mic permission \u2014 click Allow to continue."}</p>
            </div>
          )}

          {/* Status bar */}
          <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 font-medium pt-1">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold"><ShieldCheck className="w-3.5 h-3.5" /><span>Noise Suppression Active</span></span>
            <span>•</span>
            <span className="flex items-center gap-1 text-indigo-600 font-semibold"><Activity className="w-3.5 h-3.5" /><span>Auto-Search on Silence</span></span>
          </div>

        </div>
      </div>

      {/* Debug Panel */}
      <div className="saas-panel p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 font-mono text-emerald-400 font-bold">
            <Terminal className="w-4 h-4" /><span>Voice Pipeline Telemetry</span>
          </div>
          <button onClick={() => setShowDebugPanel(!showDebugPanel)} className="text-[11px] text-slate-400 hover:text-white underline font-mono">
            {showDebugPanel ? 'Hide' : 'Show'} Debug
          </button>
        </div>
        {showDebugPanel && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono">
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60"><span className="text-slate-400 block text-[10px]">Language:</span><span className="text-indigo-400 font-bold">{isTamil ? '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd (ta-IN)' : 'English (en-IN)'}</span></div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60"><span className="text-slate-400 block text-[10px]">Mic Permission:</span><span className={`font-bold ${permState === 'granted' ? 'text-emerald-400' : permState === 'denied' ? 'text-rose-400' : 'text-amber-400'}`}>{permState}</span></div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60"><span className="text-slate-400 block text-[10px]">State:</span><span className="text-emerald-400 font-bold capitalize">{isGreeting ? 'greeting' : assistantState}</span></div>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60"><span className="text-slate-400 block text-[10px]">TTS Voice:</span><span className="text-slate-200 truncate block text-[10px]">{activeVoiceName}</span></div>
            <div className="col-span-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60"><span className="text-slate-400 block text-[10px]">Transcript:</span><span className="text-amber-300 font-bold break-all">{interimTranscript || inputText || lastAIResult?.query || 'None'}</span></div>
            <div className="col-span-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60"><span className="text-slate-400 block text-[10px]">AI Response:</span><span className="text-cyan-300 font-bold line-clamp-1">{lastAIResult?.responseText || 'None'}</span></div>
          </div>
        )}
      </div>

      {/* 1-Click Test Queries */}
      <div className="saas-panel p-5 space-y-3 bg-white border border-stone-200">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isTamil ? '1-\u0b95\u0bbf\u0bb3\u0bbf\u0b95\u0bcd \u0b95\u0bc1\u0bb0\u0bb2\u0bcd \u0bae\u0bbe\u0ba4\u0bbf\u0bb0\u0bbf \u0b9a\u0bcb\u0ba4\u0ba9\u0bc8\u0b95\u0bb3\u0bcd' : '1-Click Voice Test Queries'}</span>
          </h4>
          <span className="text-[11px] font-mono text-slate-400">Instant Tests</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {DEMO_PRESET_QUERIES.map((q, idx) => (
            <button key={idx} onClick={() => { setInputText(q.query); if (onSelectLanguage && q.lang) onSelectLanguage(q.lang); setAssistantState('processing'); onProcessQuery(q.query); }}
              className="p-3 rounded-xl bg-stone-50 hover:bg-indigo-50/60 border border-stone-200/80 hover:border-indigo-300 text-left transition-all group">
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="font-bold text-indigo-600">{q.languageLabel}</span>
                <span className="text-slate-400 font-mono text-[9px] uppercase">{q.intent}</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-950">&quot;{q.query}&quot;</p>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">{q.meaning}</p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
