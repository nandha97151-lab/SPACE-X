// VOICEMART AI - Interactive AI System Architecture Visualizer (Light SaaS Theme)
import React, { useState } from 'react';
import { 
  Mic, Globe, Cpu, Database, Volume2, User, ArrowDown, Sparkles, Server, CheckCircle2, Terminal, Code
} from 'lucide-react';

export function ArchitectureView() {
  const [activeStage, setActiveStage] = useState(3); // Default highlighting AI NLP Engine

  const stages = [
    {
      id: 0,
      title: "1. Customer Voice Input",
      subtitle: "Microphone & Web Audio Stream",
      icon: <Mic className="w-5 h-5 text-indigo-600" />,
      tag: "Speech In",
      description: "Customer speaks query naturally in Tamil, Hindi, English, Telugu, Malayalam, or Kannada using microphone or headset.",
      tech: "HTML5 MediaDevices / Web Audio API AnalyserNode",
      payload: {
        audioStream: "AudioBuffer(44.1kHz, 16-bit PCM)",
        sampleRate: 44100,
        volumeLevel: "0.82 RMS"
      }
    },
    {
      id: 1,
      title: "2. Speech Recognition (STT)",
      subtitle: "Multilingual Speech-to-Text",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      tag: "Speech → Text",
      description: "Converts real-time acoustic phonemes into raw text transcript with interim results and low-latency continuous streaming.",
      tech: "Web Speech API (ta-IN, hi-IN, te-IN, ml-IN, kn-IN, en-IN)",
      payload: {
        rawTranscript: "எனக்கு 1000 ரூபாய்க்குள் ஒரு நல்ல ஷூ வேண்டும்",
        confidence: 0.98,
        isFinal: true
      }
    },
    {
      id: 2,
      title: "3. Language Detection",
      subtitle: "Unicode Script & Transliteration Classifier",
      icon: <Globe className="w-5 h-5 text-emerald-600" />,
      tag: "Lang Detect",
      description: "Inspects Unicode blocks (Tamil \\u0B80-\\u0BFF, Devanagari \\u0900-\\u097F) and romanized phonetic tokens to identify language family with confidence score.",
      tech: "Custom Fast Unicode Regex + Phonetic Classifier",
      payload: {
        detectedLanguage: "Tamil (தமிழ்)",
        isoCode: "ta-IN",
        script: "Tamil",
        confidence: 0.98
      }
    },
    {
      id: 3,
      title: "4. AI NLP Intent & Entity Engine",
      subtitle: "Semantic Parsing & Budget Extraction",
      icon: <Cpu className="w-5 h-5 text-purple-600" />,
      tag: "Core NLP",
      description: "Classifies user intent (Product Search, Store Policy, Create Order, Follow-up) and extracts structured slots (Category, Price Limit <= 1000, Color, Size, Brand, Quantity).",
      tech: "Transformer / Regex Slot Extraction & Session Context Manager",
      payload: {
        intent: "PRODUCT_SEARCH",
        entities: {
          category: "Footwear / Shoes",
          priceLimit: "<= 1000",
          color: "Any",
          size: "Any",
          quantity: 1
        },
        contextMemoryTurns: 3
      }
    },
    {
      id: 4,
      title: "5. Business Database & Service Routing",
      subtitle: "Inventory Search & Store Policy Index",
      icon: <Database className="w-5 h-5 text-indigo-600" />,
      tag: "DB Query",
      description: "Routes query to either Product Inventory Search with price and category filtering or Business FAQ store policies.",
      tech: "PostgreSQL / IndexedDB / LocalStorage Multi-Index DB",
      payload: {
        sqlQuery: "SELECT * FROM products WHERE category = 'Footwear' AND price <= 1000 AND in_stock = true",
        matchedCount: 4,
        latency: "42ms"
      }
    },
    {
      id: 5,
      title: "6. AI Multilingual Response Generation",
      subtitle: "Localized Natural Language Synthesis",
      icon: <Server className="w-5 h-5 text-amber-600" />,
      tag: "AI Output",
      description: "Generates concise, natural conversational response in the customer's native language along with follow-up suggestions.",
      tech: "Multilingual NLG Engine with Dynamic Price Interpolation",
      payload: {
        responseText: "₹1000க்குள் 4 shoes கிடைத்துள்ளன.",
        suggestedFollowUp: ["இதில் எது குறைந்த விலை?", "அளவுகள் எவை உள்ளன?"]
      }
    },
    {
      id: 6,
      title: "7. Text-to-Speech & Customer Audio",
      subtitle: "Natural Voice Audio Feedback",
      icon: <Volume2 className="w-5 h-5 text-emerald-600" />,
      tag: "Text → Speech",
      description: "Synthesizes natural voice audio in Tamil, Hindi, or English and plays it back directly to the customer's speakers.",
      tech: "window.speechSynthesis Utterance API (Pitch: 1.0, Rate: 0.95)",
      payload: {
        audioStatus: "Playing",
        voiceEngine: "Tamil India (ta-IN)",
        durationSec: 2.8
      }
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
          <Cpu className="w-3.5 h-3.5" />
          <span>System Pipeline & Technology Stack</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
          VOICEMART AI Architecture
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Click through each stage of the 7-step voice processing pipeline to inspect real-time data payloads and NLP representations.
        </p>
      </div>

      {/* Interactive Flow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Pipeline Steps Column */}
        <div className="lg:col-span-6 space-y-3">
          {stages.map((stage) => (
            <div
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                activeStage === stage.id
                  ? 'bg-white border-indigo-600 shadow-sm ring-1 ring-indigo-600 scale-[1.01]'
                  : 'bg-white border-stone-200/80 hover:border-stone-300 shadow-2xs'
              }`}
            >
              <div className={`p-2.5 rounded-xl bg-stone-50 border border-stone-200 shrink-0 ${
                activeStage === stage.id ? 'bg-indigo-50 border-indigo-200' : ''
              }`}>
                {stage.icon}
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    {stage.title}
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-slate-600 border border-stone-200">
                    {stage.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{stage.subtitle}</p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Detailed Stage Inspector & JSON Payload */}
        <div className="lg:col-span-6 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-5">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  {stages[activeStage].icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Selected Pipeline Stage</span>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {stages[activeStage].title}
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                Latency &lt; 50ms
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Functional Role:</span>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                  {stages[activeStage].description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Underlying Technology / Protocol:</span>
                <p className="text-xs font-mono font-semibold text-indigo-700">
                  {stages[activeStage].tech}
                </p>
              </div>

              {/* Real-time Stage Data Payload */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-600" />
                    Data Transfer Object (DTO)
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">application/json</span>
                </div>
                <div className="p-4 rounded-xl bg-stone-900 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner">
                  <pre>{JSON.stringify(stages[activeStage].payload, null, 2)}</pre>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Architecture Legend */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 text-xs text-slate-600 flex items-center justify-between shadow-2xs">
            <span className="flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-600" />
              <span>Modular API Architecture ready for FastAPI / Python backend</span>
            </span>
            <span className="text-emerald-700 font-semibold">100% Production Ready</span>
          </div>
        </div>

      </div>

    </div>
  );
}
