// VOICEMART AI - Main Application Entry & State Orchestrator (Modern Light SaaS Architecture)
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewHome } from './components/OverviewHome';
import { VoiceAssistant } from './components/VoiceAssistant';
import { AIIntentInspector } from './components/AIIntentInspector';
import { ConversationFeed } from './components/ConversationFeed';
import { ProductCatalog } from './components/ProductCatalog';
import { OrdersManager } from './components/OrdersManager';
import { InventoryManager } from './components/InventoryManager';
import { BusinessServices } from './components/BusinessServices';
import { DemandIntelligenceDashboard } from './components/DemandIntelligenceDashboard';
import { DatasetExplorer } from './components/DatasetExplorer';
import { HowVoicemartThinks } from './components/HowVoicemartThinks';
import { ArchitectureView } from './components/ArchitectureView';
import { SettingsView } from './components/SettingsView';
import { HackathonDemoModal } from './components/HackathonDemoModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { VoiceOrderModal } from './components/VoiceOrderModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

import { ProductResults } from './components/ProductResults';
import { ConversationPanel } from './components/ConversationPanel';
import { SearchIntent } from './components/SearchIntent';

import { processVoiceQuery } from './services/nlpEngine';
import { speechService } from './services/speechService';
import { voiceService, LANGUAGES } from './services/voiceService';
import { storageService } from './services/storageService';
import { datasetStore } from './services/datasetService';
import { searchProducts } from './services/searchEngine';

const APP_DEBUG = import.meta.env.DEV !== false;
function appLog(tag, msg, data) {
  if (!APP_DEBUG) return;
  const styles = { VOICE: 'color:#6366f1;font-weight:bold', TTS: 'color:#d97706;font-weight:bold', AI: 'color:#0ea5e9;font-weight:bold' };
  const style = styles[tag] || 'color:#64748b;font-weight:bold';
  data !== undefined ? console.log(`%c[${tag}]`, style, msg, data) : console.log(`%c[${tag}]`, style, msg);
}

export default function App() {
  // Navigation & View: 'home' | 'voice' | 'products' | 'orders' | 'inventory' | 'services' | 'demand' | 'dataset' | 'how-it-thinks' | 'architecture' | 'settings'
  const [activeView, setActiveView] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('ta-IN');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Assistant & Speech States
  const [assistantState, setAssistantState] = useState('idle'); // 'idle' | 'listening' | 'processing' | 'responding'
  const [interimTranscript, setInterimTranscript] = useState('');
  const [lastAIResult, setLastAIResult] = useState(null);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeFilterVoice, setActiveFilterVoice] = useState(null);

  // Persistent Domain States (Initialized from Dataset Store of 12,491 items)
  const [products, setProducts] = useState(() => datasetStore.getAllProducts());
  const [orders, setOrders] = useState(() => storageService.getOrders());
  const [queryLogs, setQueryLogs] = useState(() => storageService.getQueryLogs());
  const [businessProfile, setBusinessProfile] = useState(() => storageService.getBusinessProfile());
  const [cart, setCart] = useState(() => storageService.getCart());

  // Modals & Drawers
  const [activeProductDetail, setActiveProductDetail] = useState(null);
  const [activeVoiceOrder, setActiveVoiceOrder] = useState(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync cart to storage
  useEffect(() => {
    storageService.saveCart(cart);
  }, [cart]);

  // Main Voice / Text Query Processing Pipeline
  const handleProcessQuery = (queryText) => {
    if (!queryText || !queryText.trim()) {
      setAssistantState('idle');
      return;
    }

    setAssistantState('processing');

    // Conversational Context from last messages
    const context = {
      lastMatchingProducts: lastAIResult?.matchingProducts || [],
      lastCategory: lastAIResult?.extractedEntities?.category || null,
      historyLength: conversationMessages.length
    };

    // Execute Multilingual NLP Engine
    setTimeout(() => {
      const result = processVoiceQuery(queryText, products, context);
      setLastAIResult(result);

      // Log Query for Business Analytics
      const newLog = storageService.logQuery({
        query: queryText,
        language: result.language,
        intent: result.intent,
        latency: `${result.executionTimeMs}ms`,
        confidence: `${Math.round(result.confidence * 100)}%`,
        status: 'Success'
      });
      setQueryLogs(prev => [newLog, ...prev]);

      // Add to Conversation Feed
      const userMsg = {
        id: `MSG-${Date.now()}`,
        query: queryText,
        language: result.language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        responseText: result.responseText,
        speechText: result.speechText,
        matchingProducts: result.matchingProducts,
        orderData: result.orderData,
        followUpQuestions: result.followUpQuestions
      };
      setConversationMessages(prev => [userMsg, ...prev]);

      // Update Filter if matching items found
      if (result.matchingProducts && result.matchingProducts.length > 0 && result.intent !== 'FOLLOW_UP_CHEAPEST' && result.intent !== 'CREATE_ORDER') {
        setActiveFilterVoice(result.matchingProducts);
      } else if (result.mismatchAnalysis?.closestAlternatives) {
        // Show closest alternatives if exact match failed
        setActiveFilterVoice(result.mismatchAnalysis.closestAlternatives);
      }

      // If Order intent detected, trigger voice order modal
      if (result.orderData) {
        setActiveVoiceOrder(result.orderData);
      }

      // ── Synthesize Tamil / English Spoken Audio Output ──
      const responseLangCode = result.language?.code || selectedLanguage || 'ta-IN';
      appLog('TTS', `Requested language: ${responseLangCode}`, {
        voice: 'auto-select',
        provider: 'Web Speech API',
        textLength: result.speechText?.length
      });

      setIsPlayingAudio(true);
      voiceService.speak(result.speechText, responseLangCode, {
        onStart: () => {
          appLog('TTS', 'Playback started', { language: responseLangCode });
          setIsPlayingAudio(true);
        },
        onEnd: () => {
          setIsPlayingAudio(false);
          setAssistantState('idle');
        },
        onError: (err) => {
          appLog('TTS', `TTS error for language ${responseLangCode}`, err);
          setIsPlayingAudio(false);
          setAssistantState('idle');
        },
        onNoTamilVoice: (warning) => {
          setToast({ message: warning, type: 'warning' });
        }
      });

    }, 280);
  };

  // Constraint Relaxation Handler
  const handleRelaxConstraint = (type, value) => {
    if (!lastAIResult?.extractedEntities) return;
    const currentQuery = { ...lastAIResult.extractedEntities };

    if (type === 'RELAX_BUDGET') {
      currentQuery.maxPrice = value;
      const relaxedMatches = searchProducts(currentQuery, products);
      setActiveFilterVoice(relaxedMatches);
      setToast({ message: `Budget relaxed to ₹${value}. Displaying ${relaxedMatches.length} matching products.`, type: 'info' });
    } else if (type === 'RELAX_COLOR') {
      currentQuery.color = 'Any';
      const relaxedMatches = searchProducts(currentQuery, products);
      setActiveFilterVoice(relaxedMatches);
      setToast({ message: `Color filter relaxed. Displaying all available colors.`, type: 'info' });
    } else if (type === 'SHOW_CLOSEST') {
      if (lastAIResult.mismatchAnalysis?.closestAlternatives) {
        setActiveFilterVoice(lastAIResult.mismatchAnalysis.closestAlternatives);
        setToast({ message: `Showing closest verified alternatives.`, type: 'info' });
      }
    }
  };

  // Trigger audio replay — langCode passed from result.language.code
  const handlePlayAudioText = (text, langCode = 'ta-IN') => {
    if (isPlayingAudio) {
      voiceService.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    voiceService.speak(text, langCode, {
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
      onNoTamilVoice: (msg) => {
        setToast({ message: msg, type: 'warning' });
      }
    });
  };

  // Switch to voice tab and activate listening
  const handleStartVoice = () => {
    setActiveView('voice');
    setAssistantState('listening');
  };

  // Product Add / Update / Delete Handlers for Business Owner
  const handleAddProduct = (newProd) => {
    const created = storageService.addProduct(newProd);
    setProducts(datasetStore.getAllProducts());
    setToast({ message: `Product "${created.name || created.ProductName}" added to store catalog!`, type: 'success' });
  };

  const handleUpdateProduct = (id, fields) => {
    const updated = storageService.updateProduct(id, fields);
    if (updated) {
      setProducts(datasetStore.getAllProducts());
      setToast({ message: `Updated product successfully!`, type: 'success' });
    }
  };

  const handleDeleteProduct = (id) => {
    storageService.deleteProduct(id);
    setProducts(datasetStore.getAllProducts());
    setToast({ message: 'Product removed from store inventory.', type: 'info' });
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    storageService.updateOrderStatus(orderId, newStatus);
    setOrders(storageService.getOrders());
    setToast({ message: `Order #${orderId} marked as ${newStatus}`, type: 'success' });
  };

  const handleUpdateBusinessProfile = (profile) => {
    storageService.saveBusinessProfile(profile);
    setBusinessProfile(profile);
    setToast({ message: 'Store profile & policies updated!', type: 'success' });
  };

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCart(prev => {
      const prodId = product.ProductID || product.id;
      const existing = prev.find(p => (p.ProductID || p.id) === prodId);
      if (existing) {
        return prev.map(p => ((p.ProductID || p.id) === prodId ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [...prev, {
        id: prodId,
        ProductID: prodId,
        ProductName: product.ProductName || product.name,
        ProductBrand: product.ProductBrand || product.brand,
        Price: product.Price || product.price,
        Image: product.Image || product.image,
        Category: product.Category || product.category,
        quantity: 1
      }];
    });
    setToast({ message: `Added "${product.ProductName || product.name}" to cart!`, type: 'success' });
  };

  const handleUpdateCartQuantity = (index, newQty) => {
    setCart(prev => prev.map((item, i) => (i === index ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    setToast({ message: 'Item removed from cart', type: 'info' });
  };

  // Direct Voice Order confirmation
  const handleOrderConfirmed = (finalOrder) => {
    const saved = storageService.addOrder(finalOrder);
    setOrders(storageService.getOrders());
    setToast({ message: `Voice Order #${saved.id} confirmed! Sent to merchant dashboard.`, type: 'success' });
  };

  // Ask AI about product shortcut
  const handleAskAIAboutProduct = (product) => {
    const name = product.ProductName || product.name;
    const query = `Do you have ${name} in stock and what are the details?`;
    setActiveView('voice');
    handleProcessQuery(query);
  };

  const cartCount = cart.reduce((s, i) => s + (i.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans flex antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Left Fixed Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenDemo={() => setIsDemoOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        
        {/* Top Header Bar */}
        <Header
          activeView={activeView}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenDemo={() => setIsDemoOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl w-full mx-auto">
          
          {/* VIEW 1: HOME OVERVIEW */}
          {activeView === 'home' && (
            <OverviewHome
              businessProfile={businessProfile}
              productsCount={products.length}
              ordersCount={orders.length}
              queryLogs={queryLogs}
              onStartVoice={handleStartVoice}
              onSelectQuery={(q, lang) => {
                if (lang) setSelectedLanguage(lang);
                setActiveView('voice');
                handleProcessQuery(q);
              }}
              onOpenDemo={() => setIsDemoOpen(true)}
              onNavigateView={setActiveView}
              recentMessages={conversationMessages}
              onPlayAudioText={handlePlayAudioText}
            />
          )}

          {/* VIEW 2: DEDICATED VOICE ASSISTANT STAGE */}
          {activeView === 'voice' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <VoiceAssistant
                assistantState={assistantState}
                setAssistantState={setAssistantState}
                onProcessQuery={handleProcessQuery}
                currentLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                interimTranscript={interimTranscript}
                setInterimTranscript={setInterimTranscript}
                lastAIResult={lastAIResult}
                onPlayAudio={() => lastAIResult && handlePlayAudioText(lastAIResult.speechText, lastAIResult.language?.code || selectedLanguage)}
                isPlayingAudio={isPlayingAudio}
              />

              {/* AI Intent & Search Parameters */}
              {lastAIResult && (
                <SearchIntent lastAIResult={lastAIResult} language={selectedLanguage} />
              )}

              {/* Live Conversation Stream Panel */}
              <ConversationPanel
                messages={conversationMessages}
                isPlayingAudio={isPlayingAudio}
                onPlayAudioText={handlePlayAudioText}
                language={selectedLanguage}
              />

              {/* Dynamic Product & Business Results Displayed BELOW the Voice Conversation */}
              <ProductResults
                products={lastAIResult?.matchingProducts || activeFilterVoice || []}
                businessInfo={lastAIResult?.businessInfo || (lastAIResult?.intent === 'BUSINESS_INFORMATION' ? businessProfile : null)}
                query={lastAIResult?.query || ''}
                language={selectedLanguage}
                isLoading={assistantState === 'processing'}
                onViewProduct={(p) => setActiveProductDetail(p)}
                onAddToCart={handleAddToCart}
                onAskAI={handleAskAIAboutProduct}
                onVoiceOrderNow={(p) => setActiveVoiceOrder({
                  product: {
                    id: p.ProductID || p.id,
                    name: p.ProductName || p.name,
                    price: p.Price || p.price,
                    brand: p.ProductBrand || p.brand,
                    image: p.Image || p.image,
                    category: p.Category || p.category,
                    color: p.PrimaryColor || p.color,
                    sizes: p.Category?.includes('Shoes') ? ['7', '8', '9', '10'] : ['S', 'M', 'L', 'XL']
                  },
                  size: p.Category?.includes('Shoes') ? '9' : 'M',
                  quantity: 1,
                  totalAmount: p.Price || p.price,
                  orderCode: `VM${Math.floor(1000 + Math.random() * 9000)}`
                })}
                onViewBusiness={() => setActiveView('services')}
              />
            </div>
          )}

          {/* VIEW 3: PRODUCT MARKETPLACE CATALOG */}
          {activeView === 'products' && (
            <ProductCatalog
              products={products}
              activeFilterVoice={activeFilterVoice}
              mismatchAnalysis={lastAIResult?.mismatchAnalysis}
              onResetVoiceFilter={() => {
                setActiveFilterVoice(null);
                if (lastAIResult) setLastAIResult({ ...lastAIResult, mismatchAnalysis: null });
              }}
              onRelaxConstraint={handleRelaxConstraint}
              onViewProduct={(p) => setActiveProductDetail(p)}
              onAddToCart={handleAddToCart}
              onAskAI={handleAskAIAboutProduct}
              onVoiceOrderNow={(p) => setActiveVoiceOrder({
                product: {
                  id: p.ProductID || p.id,
                  name: p.ProductName || p.name,
                  price: p.Price || p.price,
                  brand: p.ProductBrand || p.brand,
                  image: p.Image || p.image,
                  category: p.Category || p.category,
                  color: p.PrimaryColor || p.color,
                  sizes: p.Category?.includes('Shoes') ? ['7', '8', '9', '10'] : ['S', 'M', 'L', 'XL']
                },
                size: p.Category?.includes('Shoes') ? '9' : 'M',
                quantity: 1,
                totalAmount: p.Price || p.price,
                orderCode: `VM${Math.floor(1000 + Math.random() * 9000)}`
              })}
            />
          )}

          {/* VIEW 4: LIVE ORDERS MANAGER */}
          {activeView === 'orders' && (
            <OrdersManager
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {/* VIEW 5: INVENTORY MANAGEMENT */}
          {activeView === 'inventory' && (
            <InventoryManager
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {/* VIEW 6: BUSINESS SERVICES & POLICIES FAQ */}
          {activeView === 'services' && (
            <BusinessServices
              onQueryService={(q) => {
                setActiveView('voice');
                handleProcessQuery(q);
              }}
              selectedLanguage={selectedLanguage}
            />
          )}

          {/* VIEW 7: DEMAND INTELLIGENCE COMMAND CENTER */}
          {activeView === 'demand' && (
            <DemandIntelligenceDashboard
              onPlayAudioText={handlePlayAudioText}
            />
          )}

          {/* VIEW 8: 12,491 PRODUCT DATASET EXPLORER */}
          {activeView === 'dataset' && (
            <DatasetExplorer
              onDatasetReloaded={() => {
                setProducts(datasetStore.getAllProducts());
                setToast({ message: 'Dataset reloaded into active memory index!', type: 'success' });
              }}
            />
          )}

          {/* VIEW 9: HOW VOICEMART THINKS (ARCHITECTURE & ZERO HALLUCINATION) */}
          {activeView === 'how-it-thinks' && (
            <HowVoicemartThinks />
          )}

          {/* VIEW 10: 7-STEP PIPELINE ARCHITECTURE */}
          {activeView === 'architecture' && (
            <ArchitectureView />
          )}

          {/* VIEW 11: STORE SETTINGS & POLICIES */}
          {activeView === 'settings' && (
            <SettingsView
              businessProfile={businessProfile}
              onUpdateBusinessProfile={handleUpdateBusinessProfile}
            />
          )}

        </main>

        {/* Clean Minimal Footer */}
        <footer className="w-full border-t border-stone-200/80 bg-white py-6 px-4 sm:px-6 lg:px-8 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-slate-900 text-sm">
                VOICEMART<span className="text-indigo-600">AI</span>
              </span>
              <span>• Problem HACM176 • Speech AI & Local Business</span>
            </div>

            <p className="font-medium text-slate-500 text-center">
              "Speak Your Language. Find What You Need." • Supporting Tamil (ta-IN) & English (en-IN)
            </p>

            <div className="flex items-center gap-3 text-slate-500">
              <button onClick={() => setIsDemoOpen(true)} className="hover:text-indigo-600 font-semibold transition-colors">
                14-Step Demo
              </button>
              <span>•</span>
              <button onClick={() => setActiveView('demand')} className="hover:text-indigo-600 font-semibold transition-colors">
                Demand Intel
              </button>
              <span>•</span>
              <button onClick={() => setActiveView('how-it-thinks')} className="hover:text-indigo-600 font-semibold transition-colors">
                How It Thinks
              </button>
            </div>
          </div>
        </footer>

      </div>

      {/* MODALS & DRAWERS */}

      {/* Product Detail Modal */}
      {activeProductDetail && (
        <ProductDetailModal
          product={activeProductDetail}
          onClose={() => setActiveProductDetail(null)}
          onAddToCart={handleAddToCart}
          onAskAI={handleAskAIAboutProduct}
          onVoiceOrderNow={(p) => {
            setActiveVoiceOrder({
              product: {
                id: p.ProductID || p.id,
                name: p.ProductName || p.name,
                price: p.Price || p.price,
                brand: p.ProductBrand || p.brand,
                image: p.Image || p.image,
                category: p.Category || p.category,
                color: p.PrimaryColor || p.color,
                sizes: p.Category?.includes('Shoes') ? ['7', '8', '9', '10'] : ['S', 'M', 'L', 'XL']
              },
              size: p.selectedSize || (p.Category?.includes('Shoes') ? '9' : 'M'),
              quantity: 1,
              totalAmount: p.Price || p.price,
              orderCode: `VM${Math.floor(1000 + Math.random() * 9000)}`
            });
          }}
        />
      )}

      {/* Voice Order Checkout Modal */}
      {activeVoiceOrder && (
        <VoiceOrderModal
          orderData={activeVoiceOrder}
          onClose={() => setActiveVoiceOrder(null)}
          onOrderConfirmed={handleOrderConfirmed}
        />
      )}

      {/* 14-Step Automated Hackathon Demo Modal */}
      <HackathonDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onApplyDemoToStore={() => {
          setSelectedLanguage('ta-IN');
          setActiveView('voice');
          handleProcessQuery("எனக்கு 1500 ரூபாய்க்குள்ள ஒரு black shirt வேண்டும்");
        }}
        onOpenDemandDashboard={() => {
          setActiveView('demand');
        }}
      />

      {/* Customer Profile & Session Memory Modal */}
      <CustomerProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        orders={orders}
        preferredLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToOrder={(orderData) => setActiveVoiceOrder(orderData)}
      />

      {/* Toast Alert */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}
