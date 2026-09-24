// VOICEMART AI - Web Speech API & MediaRecorder Audio Service (STT, TTS, Audio Recording)
// Production-grade resilient speech recognition engine — Tamil (ta-IN) first-class support
// Debug logging: [VOICE] [STT] [TTS] [LANGUAGE] [AI]

// ─────────────────────────────────────────────────────────────────
// LANGUAGE CONFIG — BCP-47 codes, TTS voice hints, STT labels
// ─────────────────────────────────────────────────────────────────
export const LANGUAGE_CONFIG = {
  'ta-IN': {
    name: 'Tamil',
    label: 'தமிழ்',
    voiceKeywords: ['tamil', 'ta-in', 'ta_in', 'india tamil'],
    ttsRate: 0.9,
    ttsPitch: 1.0,
    noSpeechMessage: 'பேச்சு கண்டறியப்படவில்லை. மீண்டும் முயற்சிக்கவும்.',
    permissionDeniedMessage: 'மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது. URL பட்டியில் அனுமதி கொடுக்கவும்.',
    ttsFailMessage: 'தமிழ் குரல் இந்த சாதனத்தில் கிடைக்கவில்லை.',
    listeningLabel: 'கேட்கிறேன்...',
    processingLabel: 'புரிந்துகொள்கிறேன்...',
    respondingLabel: 'பதில் சொல்கிறேன்...',
    errorLabel: 'மீண்டும் முயற்சிக்கவும்',
    idleLabel: 'பேச தட்டவும்'
  },
  'en-IN': {
    name: 'English',
    label: 'English',
    voiceKeywords: ['english', 'en-in', 'en_in', 'india'],
    ttsRate: 0.95,
    ttsPitch: 1.0,
    noSpeechMessage: 'No speech detected. Please tap the microphone and speak again.',
    permissionDeniedMessage: 'Microphone permission denied. Click the lock icon in your browser URL bar.',
    ttsFailMessage: 'Voice response is currently unavailable. Please try again.',
    listeningLabel: 'Listening...',
    processingLabel: 'Processing...',
    respondingLabel: 'Responding...',
    errorLabel: 'Try Again',
    idleLabel: 'Tap to speak'
  }
};

// ─────────────────────────────────────────────────────────────────
// Structured debug logger
// ─────────────────────────────────────────────────────────────────
const DEBUG = import.meta.env.DEV !== false; // always true in dev, false in prod build

function log(tag, message, data) {
  if (!DEBUG) return;
  const prefix = `%c[${tag}]`;
  const style = {
    VOICE:    'color:#6366f1;font-weight:bold',
    STT:      'color:#059669;font-weight:bold',
    TTS:      'color:#d97706;font-weight:bold',
    LANGUAGE: 'color:#7c3aed;font-weight:bold',
    AI:       'color:#0ea5e9;font-weight:bold',
    ERROR:    'color:#dc2626;font-weight:bold'
  }[tag] || 'color:#64748b;font-weight:bold';

  if (data !== undefined) {
    console.log(prefix, style, message, data);
  } else {
    console.log(prefix, style, message);
  }
}

// ─────────────────────────────────────────────────────────────────
// Resolve language code to a safe BCP-47 string (ONLY en-IN and ta-IN)
// ─────────────────────────────────────────────────────────────────
export function resolveLanguageCode(lang) {
  if (!lang) return 'en-IN';
  const bare = lang.trim();
  if (bare === 'ta' || bare === 'ta-IN') return 'ta-IN';
  return 'en-IN';
}

// ─────────────────────────────────────────────────────────────────
// TTS Voice Selection — Tamil-first strategy
// Loads voices with retry on Chrome (voices load async)
// ─────────────────────────────────────────────────────────────────
function selectBestVoice(lang, voices) {
  if (!voices || voices.length === 0) return null;

  const targetLang = resolveLanguageCode(lang);
  const config = LANGUAGE_CONFIG[targetLang];
  const keywords = config?.voiceKeywords || [targetLang.split('-')[0].toLowerCase()];

  log('TTS', `Selecting voice for lang=${targetLang}`, { available: voices.map(v => `${v.name} [${v.lang}]`) });

  // 1. Exact BCP-47 match (e.g. ta-IN)
  let voice = voices.find(v => v.lang.toLowerCase() === targetLang.toLowerCase());
  if (voice) { log('TTS', `Voice selected (exact): ${voice.name} [${voice.lang}]`); return voice; }

  // 2. Language-prefix match (e.g. "ta" prefix)
  const prefix = targetLang.split('-')[0].toLowerCase();
  voice = voices.find(v => v.lang.toLowerCase().startsWith(prefix + '-'));
  if (voice) { log('TTS', `Voice selected (prefix ${prefix}-): ${voice.name} [${voice.lang}]`); return voice; }

  // 3. Keyword scan in voice name/lang (for Tamil: "tamil", "ta_in", etc.)
  voice = voices.find(v => keywords.some(kw => v.name.toLowerCase().includes(kw) || v.lang.toLowerCase().includes(kw)));
  if (voice) { log('TTS', `Voice selected (keyword): ${voice.name} [${voice.lang}]`); return voice; }

  // 4. If Tamil is requested and NO Tamil voice exists — do NOT fall back to English silently
  if (targetLang === 'ta-IN') {
    log('TTS', 'WARNING: No Tamil TTS voice found in browser. Tamil speech may sound incorrect.', {
      requested: targetLang,
      availableVoices: voices.map(v => `${v.name} [${v.lang}]`)
    });
    // Return null so the caller can decide — do NOT auto-select English voice for Tamil
    return null;
  }

  // 5. For non-Tamil: best-effort English fallback
  voice = voices.find(v => v.lang.includes('en-IN')) || voices.find(v => v.lang.includes('en'));
  if (voice) { log('TTS', `Voice fallback (English): ${voice.name} [${voice.lang}]`); return voice; }

  return null;
}

// Load voices with retry for Chrome async loading
async function loadVoicesAsync(maxWaitMs = 2000) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];

  let voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) return voices;

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(window.speechSynthesis.getVoices());
    }, maxWaitMs);

    window.speechSynthesis.onvoiceschanged = () => {
      clearTimeout(timeout);
      resolve(window.speechSynthesis.getVoices());
    };
  });
}

// ─────────────────────────────────────────────────────────────────
// SpeechService Class
// ─────────────────────────────────────────────────────────────────
class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.currentLang = 'en-IN';
    this.lastTranscribedText = '';
    this.hasDispatchedResult = false;
    this.mediaStream = null;
    this.mediaRecorder = null;
    this.recordedAudioChunks = [];
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;

    // TTS audio element for external TTS providers (future use)
    this._ttsAudio = null;

    this.initRecognition();
  }

  // ──────────────────────────────────────────────────────────────
  // Browser Support Check
  // ──────────────────────────────────────────────────────────────
  isSupported() {
    if (typeof window === 'undefined') return false;
    const supported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    log('STT', `Browser SpeechRecognition support: ${supported}`);
    return supported;
  }

  isTTSSupported() {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
  }

  // ──────────────────────────────────────────────────────────────
  // Microphone Permission Check
  // ──────────────────────────────────────────────────────────────
  async checkMicrophonePermission() {
    if (typeof navigator === 'undefined' || !navigator.permissions) return 'unknown';
    try {
      const status = await navigator.permissions.query({ name: 'microphone' });
      log('VOICE', `Microphone permission state: ${status.state}`);
      status.onchange = () => log('VOICE', `Microphone permission changed to: ${status.state}`);
      return status.state;
    } catch (e) {
      log('VOICE', 'Permissions API not available — assuming prompt state');
      return 'prompt';
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Get UI labels for current language
  // ──────────────────────────────────────────────────────────────
  getLanguageLabels(langCode) {
    return LANGUAGE_CONFIG[langCode] || LANGUAGE_CONFIG['en-IN'];
  }

  // ──────────────────────────────────────────────────────────────
  // Initialize SpeechRecognition for a specific language
  // IMPORTANT: continuous=false + interimResults=true is most reliable for Tamil
  // continuous=true causes Tamil to loop or cut off in Chrome
  // ──────────────────────────────────────────────────────────────
  initRecognition(lang = 'en-IN') {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      console.warn('[STT] Web Speech API not supported in this browser.');
      return;
    }

    try {
      if (this.recognition) {
        try { this.recognition.abort(); } catch (e) {}
        this.recognition = null;
      }

      const targetLang = resolveLanguageCode(lang);
      this.recognition = new SpeechRecognitionClass();

      // ── CRITICAL FIX: continuous=false is MORE reliable for Tamil STT ──
      // continuous=true causes issues: Tamil recognition times out, sends empty results,
      // or loops incorrectly. With continuous=false, Chrome correctly finalises Tamil.
      this.recognition.continuous = false;
      this.recognition.interimResults = true;   // show live Tamil text while speaking
      this.recognition.maxAlternatives = 3;      // get more alternatives for better Tamil matching

      // ── CRITICAL FIX: explicitly set the FULL BCP-47 code ta-IN, NOT just "ta" ──
      this.recognition.lang = targetLang;
      this.currentLang = targetLang;

      log('STT', `SpeechRecognition initialised`, { lang: targetLang, continuous: false, interimResults: true });
    } catch (e) {
      console.error('[STT] SpeechRecognition init error:', e);
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Start Listening
  // ──────────────────────────────────────────────────────────────
  async startListening({ lang = 'en-IN', onStart, onResult, onInterim, onError, onEnd, onStateChange } = {}) {
    if (typeof window === 'undefined') return;

    const targetLang = resolveLanguageCode(lang);
    log('VOICE', `startListening requested`, { selectedLanguage: targetLang });
    log('STT', `Recognition requested for language: ${targetLang}`);

    // Stop any current speech synthesis to avoid acoustic feedback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Stop any current TTS audio element
    if (this._ttsAudio) {
      try { this._ttsAudio.pause(); this._ttsAudio.currentTime = 0; } catch (e) {}
    }

    // Prevent multiple concurrent sessions
    if (this.isListening) {
      log('STT', 'Already listening — stopping current session first');
      this.stopListening();
      await new Promise(r => setTimeout(r, 150));
    }

    // Check microphone permission
    const permState = await this.checkMicrophonePermission();
    if (permState === 'denied') {
      const labels = this.getLanguageLabels(targetLang);
      if (onError) onError({ code: 'not-allowed', message: labels.permissionDeniedMessage });
      if (onStateChange) onStateChange('error');
      return;
    }

    if (!this.isSupported()) {
      const msg = 'Speech recognition is not supported. Please use Google Chrome or Microsoft Edge.';
      log('ERROR', msg);
      if (onError) onError({ code: 'browser-not-supported', message: msg });
      if (onStateChange) onStateChange('error');
      return;
    }

    // Re-initialise recognition with the correct target language
    this.initRecognition(targetLang);

    if (!this.recognition) {
      const msg = 'Unable to initialise SpeechRecognition.';
      log('ERROR', msg);
      if (onError) onError({ code: 'init-failed', message: msg });
      if (onStateChange) onStateChange('error');
      return;
    }

    this.lastTranscribedText = '';
    this.hasDispatchedResult = false;

    // ── STT Event Handlers ──────────────────────────────────────

    this.recognition.onstart = () => {
      this.isListening = true;
      this.lastTranscribedText = '';
      this.hasDispatchedResult = false;
      log('STT', `Recognition started`, { language: targetLang });
      if (onStart) onStart();
      if (onStateChange) onStateChange('listening');
    };

    this.recognition.onaudiostart = () => log('STT', 'Microphone audio stream active');
    this.recognition.onsoundstart = () => log('STT', 'Sound detected by microphone');
    this.recognition.onspeechstart = () => log('STT', 'Speech detected by recognition engine');

    this.recognition.onresult = (event) => {
      let interimText = '';
      let finalText = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        // Use best alternative (index 0); could also check alternatives for Tamil ambiguity
        const transcript = result[0]?.transcript || '';

        if (result.isFinal) {
          finalText += transcript;
        } else {
          interimText += transcript;
        }
      }

      // Show interim Tamil text immediately
      if (interimText) {
        this.lastTranscribedText = interimText.trim();
        log('STT', `Interim transcript: "${interimText.trim()}"`, { language: targetLang });
        if (onInterim) onInterim(interimText.trim());
      }

      // Dispatch final transcript immediately when received
      if (finalText && finalText.trim()) {
        this.lastTranscribedText = finalText.trim();
        log('STT', `Final transcript: "${finalText.trim()}"`, { language: targetLang });
        log('LANGUAGE', `Detected/Selected language: ${targetLang}`);
        this.hasDispatchedResult = true;
        if (onResult) onResult(finalText.trim());
        if (onStateChange) onStateChange('success');
      }
    };

    this.recognition.onspeechend = () => log('STT', 'Speech ended / natural pause detected');
    this.recognition.onsoundend = () => log('STT', 'Sound ended');
    this.recognition.onaudioend = () => log('STT', 'Audio stream ended');

    this.recognition.onerror = (event) => {
      log('ERROR', `STT recognition error: ${event.error}`, event);
      this.isListening = false;

      const labels = this.getLanguageLabels(targetLang);
      let userError = null;

      switch (event.error) {
        case 'not-allowed':
        case 'permission-denied':
          userError = { code: 'not-allowed', message: labels.permissionDeniedMessage };
          break;

        case 'no-speech':
          // If we have buffered text, dispatch it rather than showing an error
          if (this.lastTranscribedText && !this.hasDispatchedResult) {
            log('STT', `Dispatching buffered transcript on no-speech: "${this.lastTranscribedText}"`);
            this.hasDispatchedResult = true;
            if (onResult) onResult(this.lastTranscribedText.trim());
            if (onStateChange) onStateChange('success');
            return;
          }
          userError = { code: 'no-speech', message: labels.noSpeechMessage };
          break;

        case 'audio-capture':
          userError = {
            code: 'audio-capture',
            message: 'No microphone found or microphone is in use by another application.'
          };
          break;

        case 'network':
          userError = {
            code: 'network',
            message: 'Speech recognition network error. Check internet or use text input.'
          };
          break;

        case 'aborted':
          log('STT', 'Recognition aborted (voluntary)');
          userError = null; // Not an error shown to user
          break;

        case 'service-not-allowed':
          userError = {
            code: 'service-not-allowed',
            message: 'Speech recognition service is not allowed on this device or network.'
          };
          break;

        default:
          userError = { code: event.error, message: `Voice input issue: ${event.error}` };
      }

      if (userError) {
        if (onError) onError(userError);
        if (onStateChange) onStateChange('error');
      }
    };

    this.recognition.onend = () => {
      log('STT', 'Recognition session ended');
      this.isListening = false;

      // Dispatch any uncommitted buffered transcript
      if (this.lastTranscribedText && this.lastTranscribedText.trim() && !this.hasDispatchedResult) {
        log('STT', `Dispatching buffered transcript on session end: "${this.lastTranscribedText.trim()}"`);
        this.hasDispatchedResult = true;
        if (onResult) onResult(this.lastTranscribedText.trim());
        if (onStateChange) onStateChange('success');
      }

      if (onEnd) onEnd();
    };

    // ── Start Recognition ────────────────────────────────────────
    try {
      this.recognition.start();
      log('STT', `recognition.start() called`, { language: targetLang });
    } catch (err) {
      log('ERROR', `recognition.start() exception: ${err.name}`, err);
      if (err.name === 'InvalidStateError') {
        // Already started — abort and retry
        try {
          this.recognition.abort();
          await new Promise(r => setTimeout(r, 80));
          try { this.recognition.start(); } catch (e2) { log('ERROR', 'Retry start failed', e2); }
        } catch (e) {}
      } else {
        if (onError) onError({ code: 'start-error', message: err.message || 'Failed to start microphone.' });
        if (onStateChange) onStateChange('error');
      }
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Stop Listening
  // ──────────────────────────────────────────────────────────────
  stopListening() {
    log('STT', 'stopListening() called');
    if (this.recognition && this.isListening) {
      try { this.recognition.stop(); }
      catch (e) { try { this.recognition.abort(); } catch (err) {} }
    }
    this.isListening = false;
  }

  // ──────────────────────────────────────────────────────────────
  // TTS — Speak with Tamil-first voice selection
  // ──────────────────────────────────────────────────────────────
  async speak(text, { lang = 'en-IN', onStart, onEnd, onError } = {}) {
    if (!this.isTTSSupported()) {
      log('ERROR', 'Speech synthesis not supported in this browser');
      if (onError) onError('Speech synthesis not supported');
      return;
    }

    const targetLang = resolveLanguageCode(lang);
    const config = LANGUAGE_CONFIG[targetLang] || LANGUAGE_CONFIG['en-IN'];

    log('TTS', `speak() requested`, { language: targetLang, textLength: text?.length });
    log('TTS', `Text: "${text?.substring(0, 80)}${text?.length > 80 ? '...' : ''}"`);

    // Cancel any currently speaking utterance
    window.speechSynthesis.cancel();
    if (this._ttsAudio) {
      try { this._ttsAudio.pause(); this._ttsAudio.currentTime = 0; } catch (e) {}
    }

    if (!text || !text.trim()) {
      log('TTS', 'Empty text — skipping TTS');
      if (onEnd) onEnd();
      return;
    }

    // Load voices (Chrome loads voices asynchronously)
    const voices = await loadVoicesAsync(1500);
    log('TTS', `Available voices count: ${voices.length}`);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLang;
    utterance.rate = config.ttsRate;
    utterance.pitch = config.ttsPitch;

    const selectedVoice = selectBestVoice(targetLang, voices);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      log('TTS', `Voice assigned: ${selectedVoice.name} [${selectedVoice.lang}]`);
    } else if (targetLang === 'ta-IN') {
      // No Tamil voice found — still attempt with lang set correctly
      // Browser may use a built-in Tamil engine even without a named voice
      log('TTS', 'No named Tamil voice found — using default Tamil engine if available', {
        language: targetLang,
        text: text.substring(0, 60),
        provider: 'Web Speech API',
        note: 'Browser may use system Tamil voice'
      });
      // DO NOT reassign utterance.lang — keep it as ta-IN
      // DO NOT fall back to English voice
    }

    log('TTS', `Requested language: ${targetLang}`, { voice: selectedVoice?.name || 'default', rate: utterance.rate });

    utterance.onstart = () => {
      log('TTS', 'Playback started', { language: targetLang, voice: utterance.voice?.name });
      if (onStart) onStart();
    };

    utterance.onend = () => {
      log('TTS', 'Playback completed');
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      log('ERROR', `TTS utterance error`, {
        language: targetLang,
        text: text.substring(0, 60),
        voice: selectedVoice?.name,
        provider: 'Web Speech API',
        error: e.error || e
      });

      // For Tamil TTS errors: show Tamil error message, do NOT switch to English
      if (targetLang === 'ta-IN' && e.error !== 'interrupted') {
        log('TTS', config.ttsFailMessage);
        // Fire onError with Tamil message so UI can display it
        if (onError) onError({
          code: 'tts-tamil-failed',
          message: config.ttsFailMessage,
          language: targetLang
        });
      } else {
        if (onError) onError(e);
      }
      if (onEnd) onEnd();
    };

    // Handle Chrome speechSynthesis bug: sometimes doesn't start
    // Fix: use a small timeout if synthesis gets stuck
    const speakWithFallback = () => {
      window.speechSynthesis.speak(utterance);
      log('TTS', 'Audio generated — speak() called on Web Speech API');

      // Chrome workaround: if synthesis is paused due to page visibility, resume it
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    };

    speakWithFallback();
  }

  // ──────────────────────────────────────────────────────────────
  // Stop Speaking
  // ──────────────────────────────────────────────────────────────
  stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      log('TTS', 'Speech synthesis cancelled');
    }
    if (this._ttsAudio) {
      try { this._ttsAudio.pause(); this._ttsAudio.currentTime = 0; } catch (e) {}
    }
  }

  // ──────────────────────────────────────────────────────────────
  // MediaRecorder — Separate Audio Recording (unchanged from original)
  // ──────────────────────────────────────────────────────────────
  async startAudioRecording({ onStart, onDataAvailable, onError } = {}) {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (onError) onError('MediaDevices getUserMedia is not supported in this browser.');
      return null;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      log('VOICE', 'MediaRecorder audio stream started');

      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg';
      this.mediaRecorder = new MediaRecorder(this.mediaStream, { mimeType });
      this.recordedAudioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedAudioChunks.push(event.data);
          if (onDataAvailable) onDataAvailable(event.data);
        }
      };

      this.mediaRecorder.start(250);
      if (onStart) onStart();
      return this.mediaRecorder;
    } catch (e) {
      log('ERROR', 'MediaRecorder start error', e);
      if (onError) onError(e.message || 'Microphone recording failed.');
      return null;
    }
  }

  async stopAudioRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.recordedAudioChunks, { type: this.mediaRecorder.mimeType || 'audio/webm' });
        log('VOICE', `Audio recording complete`, { blobSize: audioBlob.size });
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach(track => track.stop());
          this.mediaStream = null;
        }
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  // ──────────────────────────────────────────────────────────────
  // Cleanup — call on component unmount
  // ──────────────────────────────────────────────────────────────
  cleanup() {
    log('VOICE', 'Cleaning up speech service resources');
    this.stopListening();
    this.stopSpeaking();
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }
    this.mediaRecorder = null;
    this.recordedAudioChunks = [];
  }
}

export const speechService = new SpeechService();

// LANGUAGE_CONFIG and resolveLanguageCode are already exported above as named exports.
