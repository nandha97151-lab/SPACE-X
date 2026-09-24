// VOICEMART AI - Centralized Voice Service (Audio Processing, Noise Suppression & VAD)
// Strictly supporting ONLY TWO languages:
// 1. English — en-IN
// 2. Tamil — ta-IN

export const LANGUAGES = {
  ENGLISH: {
    code: "en-IN",
    name: "English",
    speechRecognition: "en-IN",
    tts: "en-IN"
  },
  TAMIL: {
    code: "ta-IN",
    name: "தமிழ்",
    speechRecognition: "ta-IN",
    tts: "ta-IN"
  }
};

export const voiceConfig = {
  "ta-IN": {
    stt: "ta-IN",
    tts: "ta-IN",
    responseLanguage: "Tamil"
  },
  "en-IN": {
    stt: "en-IN",
    tts: "en-IN",
    responseLanguage: "English"
  }
};

const DEBUG = import.meta.env.DEV !== false;

export function voiceLog(tag, message, data) {
  if (!DEBUG) return;
  const styles = {
    VOICE: 'color:#6366f1;font-weight:bold',
    AUDIO: 'color:#10b981;font-weight:bold',
    VAD:   'color:#f59e0b;font-weight:bold',
    STT:   'color:#059669;font-weight:bold',
    TTS:   'color:#d97706;font-weight:bold',
    LANGUAGE: 'color:#7c3aed;font-weight:bold',
    AI:    'color:#0ea5e9;font-weight:bold',
    ERROR: 'color:#dc2626;font-weight:bold'
  };
  const style = styles[tag] || 'color:#64748b;font-weight:bold';
  if (data !== undefined) {
    console.log(`%c[${tag}]`, style, message, data);
  } else {
    console.log(`%c[${tag}]`, style, message);
  }
}

/**
 * Verify whether text contains Tamil script characters
 */
export function containsTamil(text) {
  if (!text || typeof text !== 'string') return false;
  return /[\u0B80-\u0BFF]/.test(text);
}

/**
 * Find Tamil TTS voice from available browser voices
 */
export function getTamilVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find(
    voice => voice.lang && voice.lang.toLowerCase().startsWith("ta")
  ) || null;
}

/**
 * Find English TTS voice
 */
export function getEnglishVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find(v => v.lang && v.lang.toLowerCase().replace('_', '-').includes('en-in')) ||
    voices.find(v => v.lang && v.lang.toLowerCase().startsWith('en')) ||
    null
  );
}

/**
 * Load voices asynchronously with onvoiceschanged handler
 */
export function loadVoices(maxWaitMs = 1500) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }
  const current = window.speechSynthesis.getVoices();
  if (current.length > 0) return Promise.resolve(current);

  return new Promise((resolve) => {
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(window.speechSynthesis.getVoices());
      }
    }, maxWaitMs);

    window.speechSynthesis.onvoiceschanged = () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        resolve(window.speechSynthesis.getVoices());
      }
    };
  });
}

/**
 * Audio Input Processing Engine:
 * - Hardware Noise Suppression
 * - Acoustic Echo Cancellation
 * - Automatic Gain Control
 * - High-pass rumble filter (cuts out AC/fan low hum < 85Hz)
 * - Real-time Voice Activity Detection (VAD) with adaptive noise floor
 */
class AudioProcessingPipeline {
  constructor() {
    this.mediaStream = null;
    this.audioContext = null;
    this.sourceNode = null;
    this.filterNode = null;
    this.analyserNode = null;
    this.vadInterval = null;
    this.isSpeechActive = false;
    this.noiseFloor = 0.01;
    this.speechThreshold = 0.035;
    this.lastSpeechTime = 0;
    this.onAudioLevel = null;
    this.onSpeechStateChange = null;
  }

  async initializeAudioStream({ onAudioLevel, onSpeechStateChange } = {}) {
    this.onAudioLevel = onAudioLevel;
    this.onSpeechStateChange = onSpeechStateChange;

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      voiceLog('AUDIO', 'navigator.mediaDevices.getUserMedia not available');
      return null;
    }

    try {
      // 1. Hardware & Driver-level Noise Suppression, Echo Cancellation, AGC
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
          autoGainControl: true,
          channelCount: 1
          // NOTE: sampleRate is NOT a valid getUserMedia constraint in Chrome/Safari
          // and causes stream acquisition failure on many devices. Removed intentionally.
        }
      });

      voiceLog('AUDIO', 'Clean microphone stream obtained with Noise Suppression + Echo Cancellation + AGC');

      // 2. Web Audio API Processing
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioContext = new AudioCtxClass();
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }

        this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream);

        // Highpass Filter: cuts low-frequency rumble (air conditioner, fan vibration, road hum < 85Hz)
        this.filterNode = this.audioContext.createBiquadFilter();
        this.filterNode.type = 'highpass';
        this.filterNode.frequency.setValueAtTime(85, this.audioContext.currentTime);
        this.filterNode.Q.setValueAtTime(0.7, this.audioContext.currentTime);

        this.analyserNode = this.audioContext.createAnalyser();
        this.analyserNode.fftSize = 512;
        this.analyserNode.smoothingTimeConstant = 0.3;

        this.sourceNode.connect(this.filterNode);
        this.filterNode.connect(this.analyserNode);

        // 3. Start VAD Loop
        this.startVADLoop();
      }

      return this.mediaStream;
    } catch (err) {
      voiceLog('ERROR', 'Error acquiring noise-suppressed microphone stream', err);
      return null;
    }
  }

  startVADLoop() {
    if (!this.analyserNode) return;
    const bufferLength = this.analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let sampleCount = 0;
    let initialNoiseSamples = [];

    this.vadInterval = setInterval(() => {
      this.analyserNode.getByteTimeDomainData(dataArray);

      // Calculate Root Mean Square (RMS) energy
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const normalized = (dataArray[i] - 128) / 128;
        sum += normalized * normalized;
      }
      const rms = Math.sqrt(sum / bufferLength);

      // Initial 400ms: calibrate ambient noise floor
      if (sampleCount < 15) {
        initialNoiseSamples.push(rms);
        sampleCount++;
        if (sampleCount === 15) {
          const avgNoise = initialNoiseSamples.reduce((a, b) => a + b, 0) / initialNoiseSamples.length;
          this.noiseFloor = Math.max(0.008, avgNoise);
          this.speechThreshold = Math.max(0.025, this.noiseFloor * 2.2);
          voiceLog('VAD', `Noise floor calibrated: ${this.noiseFloor.toFixed(4)}, Speech Threshold: ${this.speechThreshold.toFixed(4)}`);
        }
      }

      // Voice Activity Decision
      const isVoiceDetected = rms > this.speechThreshold;

      if (isVoiceDetected) {
        this.lastSpeechTime = Date.now();
        if (!this.isSpeechActive) {
          this.isSpeechActive = true;
          voiceLog('VAD', 'Speech onset detected (Voice Active)');
          if (this.onSpeechStateChange) this.onSpeechStateChange(true, rms);
        }
      } else {
        // Hangover time: 1400ms grace period to allow natural sentence pauses without cutting off
        const timeSinceSpeech = Date.now() - this.lastSpeechTime;
        if (this.isSpeechActive && timeSinceSpeech > 1400) {
          this.isSpeechActive = false;
          voiceLog('VAD', 'Speech finished (Silence detected after grace period)');
          if (this.onSpeechStateChange) this.onSpeechStateChange(false, rms);
        }
      }

      if (this.onAudioLevel) {
        this.onAudioLevel(rms, isVoiceDetected, this.isSpeechActive);
      }
    }, 40);
  }

  stop() {
    if (this.vadInterval) {
      clearInterval(this.vadInterval);
      this.vadInterval = null;
    }
    if (this.sourceNode) {
      try { this.sourceNode.disconnect(); } catch (e) {}
      this.sourceNode = null;
    }
    if (this.filterNode) {
      try { this.filterNode.disconnect(); } catch (e) {}
      this.filterNode = null;
    }
    if (this.analyserNode) {
      try { this.analyserNode.disconnect(); } catch (e) {}
      this.analyserNode = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try { this.audioContext.close(); } catch (e) {}
      this.audioContext = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => {
        try { track.stop(); } catch (e) {}
      });
      this.mediaStream = null;
    }
    this.isSpeechActive = false;
  }
}

class VoiceService {
  constructor() {
    this.recognition = null;
    this.audioPipeline = new AudioProcessingPipeline();
    this.isListening = false;
    this.currentLanguage = "en-IN";
    this.activeTranscript = "";
    this.hasDispatched = false;
    this.cachedVoices = [];
    this.speechStarted = false;
    this.silenceTimer = null;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
        voiceLog('TTS', `Voices loaded: ${this.cachedVoices.length} voices available`);
      };
    }
  }

  isSTTSupported() {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  isTTSSupported() {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
  }

  /**
   * Start microphone listening in selected language with hardware noise suppression
   * @param {string} language - "ta-IN" or "en-IN"
   * @param {object} callbacks - { onStart, onInterim, onResult, onError, onEnd, onAudioLevel }
   */
  async startListening(language = "en-IN", { onStart, onInterim, onResult, onError, onEnd, onAudioLevel } = {}) {
    const selectedLanguage = language === "ta-IN" ? "ta-IN" : "en-IN";
    this.currentLanguage = selectedLanguage;

    if (!this.isSTTSupported()) {
      const err = {
        code: "browser-unsupported",
        message: selectedLanguage === "ta-IN"
          ? "உங்கள் உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. Google Chrome அல்லது Microsoft Edge பயன்படுத்தவும்."
          : "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
      };
      voiceLog('ERROR', err.message);
      if (onError) onError(err);
      return;
    }

    // Cancel any active speech synthesis before listening
    this.stopSpeaking();

    // Stop existing recognition if running
    if (this.isListening) {
      this.stopListening();
      await new Promise(r => setTimeout(r, 100));
    }

    // 1. Activate hardware noise suppression, acoustic echo cancellation & AGC
    await this.audioPipeline.initializeAudioStream({
      onAudioLevel: (rms, isVoice, isActive) => {
        if (onAudioLevel) onAudioLevel(rms, isVoice, isActive);
      },
      onSpeechStateChange: (isSpeaking) => {
        if (isSpeaking) {
          this.speechStarted = true;
          if (this.silenceTimer) {
            clearTimeout(this.silenceTimer);
            this.silenceTimer = null;
          }
        } else if (this.speechStarted && this.activeTranscript && this.activeTranscript.trim()) {
          // User spoke and then paused beyond hangover time -> gracefully stop and process
          voiceLog('VAD', 'User finished sentence, finalizing transcript');
          this.silenceTimer = setTimeout(() => {
            if (this.isListening) {
              this.stopListening();
            }
          }, 300);
        }
      }
    });

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    // Exact configuration as specified
    this.recognition.lang = selectedLanguage;
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 2;

    this.activeTranscript = "";
    this.hasDispatched = false;
    this.speechStarted = false;

    voiceLog('VOICE', `startListening() called with language: ${selectedLanguage}`);
    voiceLog('STT', `Language: ${selectedLanguage}`);

    this.recognition.onstart = () => {
      this.isListening = true;
      voiceLog('STT', `Microphone recording started [${selectedLanguage}]`);
      if (onStart) onStart();
    };

    this.recognition.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const item = event.results[i];
        const text = item[0]?.transcript || "";
        if (item.isFinal) {
          final += text;
        } else {
          interim += text;
        }
      }

      if (interim) {
        this.activeTranscript = interim;
        this.speechStarted = true;
        if (onInterim) onInterim(interim);

        // Reset silence timer on every speech token
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
          this.silenceTimer = null;
        }

        // Auto-search trigger: person kept quiet for 1.2s -> start search immediately
        this.silenceTimer = setTimeout(() => {
          if (this.isListening && !this.hasDispatched && this.activeTranscript && this.activeTranscript.trim()) {
            const query = this.activeTranscript.trim();
            this.hasDispatched = true;
            voiceLog('STT', `Silence detected (person kept quiet for 1.2s) -> auto-submitting search: "${query}"`);
            this.stopListening();
            if (onResult) onResult(query);
          }
        }, 1200);
      }

      if (final && final.trim()) {
        if (this.silenceTimer) {
          clearTimeout(this.silenceTimer);
          this.silenceTimer = null;
        }
        if (this.hasDispatched) return;
        const cleanFinal = final.trim();
        this.activeTranscript = cleanFinal;
        this.hasDispatched = true;

        const isTamil = containsTamil(cleanFinal);
        voiceLog('STT', `Language: ${selectedLanguage}`);
        voiceLog('STT', `Transcript: ${cleanFinal}`);
        voiceLog('STT', `Contains Tamil: ${isTamil}`);

        this.stopListening();
        if (onResult) onResult(cleanFinal);
      }
    };

    this.recognition.onerror = (event) => {
      voiceLog('ERROR', `SpeechRecognition error: ${event.error}`, event);
      this.isListening = false;
      this.audioPipeline.stop();

      let msg = "";
      if (selectedLanguage === "ta-IN") {
        switch (event.error) {
          case 'not-allowed':
          case 'permission-denied':
            msg = "மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது. பிரவுசர் முகவரி பட்டியில் மைக் அனுமதியை இயக்கவும்.";
            break;
          case 'no-speech':
            // If VAD captured text before no-speech, dispatch it
            if (this.activeTranscript && !this.hasDispatched) {
              this.hasDispatched = true;
              if (onResult) onResult(this.activeTranscript.trim());
              return;
            }
            msg = "பேச்சு கேட்கவில்லை. மைக்ரோஃபோனை மீண்டும் அழுத்தி பேசவும்.";
            break;
          case 'audio-capture':
            msg = "மைக்ரோஃபோன் கண்டறியப்படவில்லை அல்லது பிற செயலி பயன்படுத்துகிறது.";
            break;
          case 'network':
            msg = "இணைய இணைப்பு பிழை. இணையத்தை சரிபார்க்கவும் அல்லது தட்டச்சு செய்யவும்.";
            break;
          case 'aborted':
            msg = "";
            break;
          default:
            msg = `குரல் உள்ளீட்டு பிழை: ${event.error}`;
        }
      } else {
        switch (event.error) {
          case 'not-allowed':
          case 'permission-denied':
            msg = "Microphone permission denied. Please allow microphone access in your browser.";
            break;
          case 'no-speech':
            if (this.activeTranscript && !this.hasDispatched) {
              this.hasDispatched = true;
              if (onResult) onResult(this.activeTranscript.trim());
              return;
            }
            msg = "No speech detected. Please tap the microphone and speak again.";
            break;
          case 'audio-capture':
            msg = "No microphone found or device is busy.";
            break;
          case 'network':
            msg = "Speech recognition network error. Check connection or type query.";
            break;
          case 'aborted':
            msg = "";
            break;
          default:
            msg = `Voice input error: ${event.error}`;
        }
      }

      if (msg && onError) {
        onError({ code: event.error, message: msg });
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.audioPipeline.stop();
      voiceLog('STT', `Recognition session ended [${selectedLanguage}]`);

      // If finished without final result callback but have buffered transcript
      if (!this.hasDispatched && this.activeTranscript && this.activeTranscript.trim()) {
        const buffered = this.activeTranscript.trim();
        this.hasDispatched = true;
        voiceLog('STT', `Dispatching buffered transcript on end: ${buffered}`);
        if (onResult) onResult(buffered);
      }

      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch (err) {
      voiceLog('ERROR', 'Failed to call recognition.start()', err);
      this.audioPipeline.stop();
      if (onError) onError({ code: err.name || 'start-failed', message: err.message });
    }
  }

  /**
   * Stop microphone listening and audio processing
   */
  stopListening() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    this.audioPipeline.stop();
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        try { this.recognition.abort(); } catch (ignore) {}
      }
      this.recognition = null;
    }
    this.isListening = false;
    voiceLog('VOICE', 'stopListening() executed');
  }

  /**
   * Speak text in chosen language (ta-IN or en-IN)
   * @param {string} text - Spoken response
   * @param {string} language - "ta-IN" or "en-IN"
   * @param {object} callbacks - { onStart, onEnd, onError, onNoTamilVoice }
   */
  async speak(text, language = "en-IN", { onStart, onEnd, onError, onNoTamilVoice } = {}) {
    if (!this.isTTSSupported()) {
      voiceLog('ERROR', 'TTS not supported in this browser');
      if (onError) onError(new Error("Speech synthesis not supported"));
      return;
    }

    const selectedLanguage = language === "ta-IN" ? "ta-IN" : "en-IN";

    // Cancel existing speech
    this.stopSpeaking();

    if (!text || !text.trim()) {
      if (onEnd) onEnd();
      return;
    }

    await loadVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage;

    if (selectedLanguage === "ta-IN") {
      const tamilVoice = getTamilVoice();

      if (tamilVoice) {
        utterance.voice = tamilVoice;
        utterance.lang = "ta-IN";
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        voiceLog('TTS', `Selected Tamil voice: ${tamilVoice.name} [${tamilVoice.lang}]`);
      } else {
        // No Tamil voice exists on this browser/OS
        console.error("No Tamil TTS voice available", window.speechSynthesis.getVoices());
        voiceLog('TTS', "No Tamil TTS voice available on this device/browser");

        // Inform user in Tamil
        const warning = "தமிழ் குரல் இந்த சாதனத்தில் கிடைக்கவில்லை.";
        if (onNoTamilVoice) {
          onNoTamilVoice(warning);
        }

        // Keep utterance.lang = "ta-IN" so browser native speech engine may handle it,
        // but NEVER switch to an English voice.
        utterance.lang = "ta-IN";
        utterance.rate = 0.88;
      }
    } else {
      const englishVoice = getEnglishVoice();
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      utterance.lang = "en-IN";
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      voiceLog('TTS', `Selected English voice: ${utterance.voice?.name || 'Default'}`);
    }

    utterance.onstart = () => {
      voiceLog('TTS', `Speaking started [${selectedLanguage}]: "${text.substring(0, 50)}..."`);
      if (onStart) onStart();
    };

    utterance.onend = () => {
      voiceLog('TTS', 'Speaking finished');
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      voiceLog('ERROR', `TTS utterance error: ${event.error}`, event);
      if (selectedLanguage === "ta-IN" && onNoTamilVoice) {
        onNoTamilVoice("தமிழ் குரல் பிழை அல்லது இந்த சாதனத்தில் குரல் கிடைக்கவில்லை.");
      }
      if (onError) onError(event);
      if (onEnd) onEnd();
    };

    try {
      window.speechSynthesis.speak(utterance);
      // Fix Chrome pausing synthesis
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      voiceLog('ERROR', 'speechSynthesis.speak() exception', e);
      if (onError) onError(e);
      if (onEnd) onEnd();
    }
  }

  /**
   * Stop any current speech synthesis
   */
  stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }
}

export const voiceService = new VoiceService();

// Standalone functional exports
export function startListening(language, callbacks) {
  return voiceService.startListening(language, callbacks);
}

export function stopListening() {
  return voiceService.stopListening();
}

export function speak(text, language, callbacks) {
  return voiceService.speak(text, language, callbacks);
}

export function stopSpeaking() {
  return voiceService.stopSpeaking();
}
