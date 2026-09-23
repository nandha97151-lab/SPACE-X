// VOICEMART AI - Web Speech API & MediaRecorder Audio Service (STT, TTS, Audio Recording)
// Production-grade resilient speech recognition engine with detailed console debugging

class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.currentLang = 'en-IN'; // Default speech recognition language
    this.lastTranscribedText = '';
    this.hasDispatchedResult = false;
    this.mediaStream = null;
    this.mediaRecorder = null;
    this.recordedAudioChunks = [];
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;

    this.initRecognition();
  }

  /**
   * Check if Web Speech API is supported in the current browser
   */
  isSupported() {
    if (typeof window === 'undefined') return false;
    const isSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    console.log('[VOICEMART Speech] SpeechRecognition browser support check:', isSupported);
    return isSupported;
  }

  /**
   * Query microphone permission state using Permissions API
   */
  async checkMicrophonePermission() {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
      return 'unknown';
    }
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
      console.log('[VOICEMART Speech] microphone permission state:', permissionStatus.state);
      permissionStatus.onchange = () => {
        console.log('[VOICEMART Speech] microphone permission state changed to:', permissionStatus.state);
      };
      return permissionStatus.state;
    } catch (e) {
      console.log('[VOICEMART Speech] Permissions API microphone query not available, state: prompt/unknown');
      return 'prompt';
    }
  }

  /**
   * Initialize or re-initialize SpeechRecognition instance
   */
  initRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      console.warn('[VOICEMART Speech] Web Speech API (SpeechRecognition / webkitSpeechRecognition) is not supported in this browser.');
      return;
    }

    try {
      // Clean up previous instance if any
      if (this.recognition) {
        try {
          this.recognition.abort();
        } catch (e) {}
      }

      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true; // Use continuous so natural speech pauses do not prematurely trigger no-speech
      this.recognition.interimResults = true; // Real-time feedback as user speaks
      this.recognition.maxAlternatives = 1;
      this.recognition.lang = this.currentLang || 'en-IN';
      console.log('[VOICEMART Speech] SpeechRecognition initialized with lang:', this.recognition.lang);
    } catch (e) {
      console.error('[VOICEMART Speech] SpeechRecognition initialization error:', e);
    }
  }

  /**
   * Start Speech-to-Text Recognition
   * Strictly started ONLY after direct user interaction (microphone button click)
   */
  async startListening({
    lang = 'en-IN',
    onStart,
    onResult,
    onInterim,
    onError,
    onEnd,
    onStateChange
  }) {
    if (typeof window === 'undefined') return;

    console.log('[VOICEMART Speech] startListening requested with language:', lang);

    // Cancel ongoing speech synthesis to avoid acoustic feedback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Prevent multiple instances from running concurrently
    if (this.isListening) {
      console.log('[VOICEMART Speech] Already listening. Stopping current session first.');
      this.stopListening();
    }

    // Check permission state in console
    await this.checkMicrophonePermission();

    if (!this.isSupported()) {
      const errorMsg = 'Speech recognition is not supported in this browser. Please open in Google Chrome or Microsoft Edge.';
      console.error('[VOICEMART Speech] recognition error: browser not supported');
      if (onError) onError({ code: 'browser-not-supported', message: errorMsg });
      if (onStateChange) onStateChange('error');
      return;
    }

    // Resolve BCP-47 Language Tag (Default: en-IN)
    let targetLang = lang;
    if (!targetLang || targetLang === 'auto') {
      targetLang = 'en-IN'; // Requirement 5: Default speech recognition language is en-IN
    }
    this.currentLang = targetLang;

    // Fresh initialization to clear any stale internal browser recognition state
    this.initRecognition();

    if (!this.recognition) {
      const errorMsg = 'Unable to initialize SpeechRecognition instance.';
      console.error('[VOICEMART Speech] recognition error: instance null');
      if (onError) onError({ code: 'init-failed', message: errorMsg });
      if (onStateChange) onStateChange('error');
      return;
    }

    this.recognition.lang = targetLang;
    this.lastTranscribedText = '';
    this.hasDispatchedResult = false;

    // Recognition Lifecycle Handlers
    this.recognition.onstart = () => {
      this.isListening = true;
      this.lastTranscribedText = '';
      this.hasDispatchedResult = false;
      console.log('[VOICEMART Speech] recognition started, language:', targetLang);
      if (onStart) onStart();
      if (onStateChange) onStateChange('listening');
    };

    this.recognition.onaudiostart = () => {
      console.log('[VOICEMART Speech] microphone stream started / audio capture active');
    };

    this.recognition.onsoundstart = () => {
      console.log('[VOICEMART Speech] sound detected by browser microphone');
    };

    this.recognition.onspeechstart = () => {
      console.log('[VOICEMART Speech] speech detected by recognition engine');
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        const text = item[0]?.transcript || '';
        if (item.isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }

      const activeText = finalTranscript || interimTranscript;
      if (activeText) {
        this.lastTranscribedText = activeText.trim();
        console.log('[VOICEMART Speech] recognition result received:', activeText.trim(), { isFinal: !!finalTranscript });
      }

      if (interimTranscript && onInterim) {
        onInterim(interimTranscript.trim());
      }

      // If final transcript reached
      if (finalTranscript && finalTranscript.trim()) {
        console.log('[VOICEMART Speech] transcript received (final):', finalTranscript.trim());
        this.hasDispatchedResult = true;
        if (onResult) {
          onResult(finalTranscript.trim());
        }
        if (onStateChange) onStateChange('success');
      }
    };

    this.recognition.onspeechend = () => {
      console.log('[VOICEMART Speech] speech ended / pause detected');
    };

    this.recognition.onsoundend = () => {
      console.log('[VOICEMART Speech] sound ended');
    };

    this.recognition.onaudioend = () => {
      console.log('[VOICEMART Speech] audio stream ended');
    };

    this.recognition.onerror = (event) => {
      console.error('[VOICEMART Speech] recognition error:', event.error, event);
      this.isListening = false;

      let userFacingError = null;

      switch (event.error) {
        case 'not-allowed':
        case 'permission-denied':
          userFacingError = {
            code: 'not-allowed',
            message: 'Microphone permission was denied. Please click the camera/microphone icon in your browser URL bar to allow microphone access.'
          };
          break;
        case 'no-speech':
          // Requirement 7: Only show "No speech detected" if recognition ended without receiving any speech transcript
          if (this.lastTranscribedText && !this.hasDispatchedResult) {
            console.log('[VOICEMART Speech] Dispatching accumulated transcript on no-speech event:', this.lastTranscribedText);
            this.hasDispatchedResult = true;
            if (onResult) onResult(this.lastTranscribedText);
            if (onStateChange) onStateChange('success');
            return;
          }
          userFacingError = {
            code: 'no-speech',
            message: 'No speech detected. Please tap the microphone and speak again.'
          };
          break;
        case 'audio-capture':
          userFacingError = {
            code: 'audio-capture',
            message: 'No microphone was found or the microphone is currently in use by another application.'
          };
          break;
        case 'network':
          userFacingError = {
            code: 'network',
            message: 'Speech recognition network error. Please check your internet connection or use text input.'
          };
          break;
        case 'aborted':
          console.log('[VOICEMART Speech] Recognition was aborted by user or session reset.');
          userFacingError = null; // Do not treat voluntary abort as an error banner
          break;
        case 'service-not-allowed':
          userFacingError = {
            code: 'service-not-allowed',
            message: 'Speech recognition service is disabled or not allowed on this device network.'
          };
          break;
        default:
          userFacingError = {
            code: event.error,
            message: `Voice input notice: ${event.error}`
          };
          break;
      }

      if (userFacingError) {
        if (onError) onError(userFacingError);
        if (onStateChange) onStateChange('error');
      }
    };

    this.recognition.onend = () => {
      console.log('[VOICEMART Speech] recognition ended');
      this.isListening = false;

      // Requirement 7: If recognition ended with an uncommitted transcript, dispatch it cleanly instead of error
      if (this.lastTranscribedText && this.lastTranscribedText.trim() && !this.hasDispatchedResult) {
        console.log('[VOICEMART Speech] Dispatching buffered transcript on recognition end:', this.lastTranscribedText);
        this.hasDispatchedResult = true;
        if (onResult) {
          onResult(this.lastTranscribedText.trim());
        }
        if (onStateChange) onStateChange('success');
      }

      if (onEnd) onEnd();
    };

    // Synchronous start call directly in user gesture context
    try {
      this.recognition.start();
      console.log('[VOICEMART Speech] recognition.start() called successfully');
    } catch (err) {
      console.error('[VOICEMART Speech] recognition start exception:', err);
      if (err.name === 'InvalidStateError') {
        // Recognition already started in background; restart cleanly
        try {
          this.recognition.abort();
          setTimeout(() => {
            try { this.recognition.start(); } catch (e) {}
          }, 60);
        } catch (e) {}
      } else if (onError) {
        onError({ code: 'start-error', message: err.message || 'Failed to start microphone.' });
        if (onStateChange) onStateChange('error');
      }
    }
  }

  /**
   * Stop Speech-to-Text Recognition
   */
  stopListening() {
    console.log('[VOICEMART Speech] stopListening() called');
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        try {
          this.recognition.abort();
        } catch (err) {}
      }
    }
    this.isListening = false;
  }

  /**
   * Requirement 17: Separate Audio Recording via MediaRecorder API
   */
  async startAudioRecording({ onStart, onDataAvailable, onError } = {}) {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (onError) onError('MediaDevices getUserMedia is not supported in this browser.');
      return null;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('[VOICEMART Speech] MediaRecorder audio stream started');

      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg';
      this.mediaRecorder = new MediaRecorder(this.mediaStream, { mimeType });
      this.recordedAudioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedAudioChunks.push(event.data);
          if (onDataAvailable) onDataAvailable(event.data);
        }
      };

      this.mediaRecorder.start(250); // Collect 250ms audio slices
      if (onStart) onStart();
      return this.mediaRecorder;
    } catch (e) {
      console.error('[VOICEMART Speech] MediaRecorder audio recording start error:', e);
      if (onError) onError(e.message || 'Microphone recording failed.');
      return null;
    }
  }

  /**
   * Stop Audio Recording and return audio Blob
   */
  async stopAudioRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.recordedAudioChunks, { type: this.mediaRecorder.mimeType || 'audio/webm' });
        console.log('[VOICEMART Speech] Audio recording complete. Blob size:', audioBlob.size, 'bytes');
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach(track => track.stop());
          this.mediaStream = null;
        }
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Synthesize Spoken Audio Output (TTS)
   */
  speak(text, { lang = 'en-IN', onStart, onEnd, onError } = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onError) onError('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (!text || !text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || 'en-IN';
    utterance.rate = 0.95; // Clear natural cadence
    utterance.pitch = 1.0;

    // Voice selection preference
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = (lang || 'en').split('-')[0].toLowerCase();
        const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix)) ||
          voices.find(v => v.lang.includes('en-IN')) ||
          voices.find(v => v.lang.includes('en-US'));

        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
      }
    } catch (e) {}

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('[VOICEMART Speech] TTS utterance error:', e);
      if (onError) onError(e);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechService = new SpeechService();
