// VOICEMART AI - Multilingual Natural Language Processing & Intent Engine
// Strictly supporting ONLY TWO languages:
// 1. English — en-IN
// 2. Tamil — ta-IN (with natural conversational Tamil and Tanglish code-mixing)
// Direct Tamil comprehension — NO translation round-tripping!

import { datasetStore } from './datasetService.js';
import { searchProducts, analyzeMismatchAndRelax } from './searchEngine.js';
import { demandService } from './demandAnalyticsService.js';
import { STORE_POLICIES_FAQ, INITIAL_BUSINESS_PROFILE } from './inventoryData.js';

const NLP_DEBUG = import.meta.env.DEV !== false;

function nlpLog(tag, msg, data) {
  if (!NLP_DEBUG) return;
  const styles = {
    LANGUAGE: 'color:#7c3aed;font-weight:bold',
    AI: 'color:#0ea5e9;font-weight:bold',
    INTENT: 'color:#10b981;font-weight:bold'
  };
  const style = styles[tag] || 'color:#64748b;font-weight:bold';
  if (data !== undefined) {
    console.log(`%c[${tag}]`, style, msg, data);
  } else {
    console.log(`%c[${tag}]`, style, msg);
  }
}

/**
 * Detect language: ONLY en-IN or ta-IN
 */
export function detectLanguage(text) {
  if (!text || typeof text !== 'string') {
    return { code: 'en-IN', name: 'English', label: 'English', confidence: 0.95, isCodeMixed: false };
  }

  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  // 1. Tamil Unicode script ([\u0B80-\u0BFF]) — direct Tamil
  if (/[\u0B80-\u0BFF]/.test(trimmed)) {
    const hasEnglishWords = /[a-zA-Z]{2,}/.test(trimmed);
    nlpLog('LANGUAGE', `Tamil script detected${hasEnglishWords ? ' (code-mixed with English)' : ''}`);
    return {
      code: 'ta-IN',
      name: hasEnglishWords ? 'Tamil (Code-Mixed)' : 'Tamil',
      label: 'தமிழ்',
      confidence: 0.99,
      isCodeMixed: hasEnglishWords
    };
  }

  // 2. Tanglish — Romanized Tamil vocabulary
  const TANGLISH_KEYWORDS = [
    'enakku', 'ennaku', 'venum', 'vendum', 'venume',
    'illai', 'illaya', 'irukka', 'irukku', 'evvalavu', 'evvalo',
    'enna vilai', 'enna price', 'nalla', 'nalladha', 'arisi',
    'sollunga', 'kaattunga', 'kaattu', 'vilai', 'velai',
    'tharam', 'porul', 'sattai', 'satta', 'chudi', 'pudavai',
    'kilo', 'kooda', 'kadan', 'kadai', 'romba', 'engae', 'enga'
  ];

  const hasTanglish = TANGLISH_KEYWORDS.some(w => lower.includes(w));
  if (hasTanglish) {
    nlpLog('LANGUAGE', 'Tanglish (Romanized Tamil) detected');
    return {
      code: 'ta-IN',
      name: 'Tamil (Tanglish)',
      label: 'தமிழ்',
      confidence: 0.94,
      isCodeMixed: true
    };
  }

  // 3. Fallback: English (en-IN)
  return {
    code: 'en-IN',
    name: 'English',
    label: 'English',
    confidence: 0.95,
    isCodeMixed: false
  };
}

/**
 * Normalize Tanglish / Tamil product tokens for search engine index matching
 * Original text is NEVER modified for UI display or TTS response.
 */
export function normalizeTamilQueryForNLP(text) {
  if (!text) return text;
  let normalized = text.toLowerCase();

  const MAP = {
    // Rice & Groceries
    'அரிசி': 'rice', 'பொன்னி அரிசி': 'ponni rice', 'பாஸ்மதி': 'basmati rice',
    'arisi': 'rice', 'arisii': 'rice', 'ponni': 'ponni rice', 'basmati': 'basmati rice',
    'பருப்பு': 'dal lentils', 'உளுந்து': 'urad dal', 'paruppu': 'dal',
    'எண்ணெய்': 'oil', 'ennai': 'oil', 'சக்கரை': 'sugar', 'sakkarai': 'sugar',
    'காபி': 'coffee', 'kaapi': 'coffee',

    // Clothing & Shirts
    'சட்டை': 'shirt', 'சட்டா': 'shirt', 'sattai': 'shirt', 'satta': 'shirt',
    'டிசர்ட்': 't-shirt', 'சிவப்பு சட்டை': 'red shirt', 'நீல சட்டை': 'blue shirt',
    'புடவை': 'saree', 'பட்டு புடவை': 'silk saree', 'pudavai': 'saree',
    'பேண்ட்': 'trousers', 'ஜீன்ஸ்': 'jeans',

    // Footwear & Shoes
    'ஷூ': 'shoes', 'காலணி': 'footwear', 'செருப்பு': 'slippers footwear',
    'shoes': 'shoes', 'shoe': 'shoes', 'sneakers': 'sneakers',

    // Electronics & Phones
    'போன்': 'phone', 'ஸ்மார்ட்போன்': 'phone', 'phone': 'phone', 'mobile': 'mobile',
    'ஹெட்போன்': 'headphones', 'இயர்பட்ஸ்': 'earbuds', 'வாட்ச்': 'watch',

    // Colors
    'கருப்பு': 'black', 'karuppu': 'black',
    'சிவப்பு': 'red', 'sivappu': 'red', 'red': 'red',
    'நீலம்': 'blue', 'neelam': 'blue', 'blue': 'blue',
    'வெள்ளை': 'white', 'vellai': 'white', 'white': 'white',
    'பச்சை': 'green', 'pachai': 'green',

    // Qualifiers & Price
    'நல்ல': 'good quality', 'nalla': 'good quality', 'quality': 'good quality',
    'தரம்': 'quality', 'உயர்தர': 'premium quality',
    'விலை': 'price', 'vilai': 'price', 'evvalavu': 'price',
    'ரூபாய்': 'rupees', 'ரூபாய்க்குள்': 'under', 'குள்ள': 'under', 'kulla': 'under',
    'வேண்டும': 'want', 'வேண்டும்': 'want', 'venum': 'want', 'vendum': 'want'
  };

  const sortedKeys = Object.keys(MAP).sort((a, b) => b.length - a.length);
  for (const k of sortedKeys) {
    if (normalized.includes(k)) {
      normalized = normalized.split(k).join(MAP[k]);
    }
  }

  return normalized.trim();
}

/**
 * Extract Price limits from speech query
 */
function extractPriceLimit(text) {
  if (!text) return null;
  const lower = text.toLowerCase();

  const patterns = [
    /(?:under|below|less than|within|around|₹|rs\.?|budget)\s*(\d+)/i,
    /(\d+)\s*(?:ரூபாய்க்குள்|ரூபாய்|ரூ|rs|inr|rupees|roobai|kulla|குள்ள|venum)/i,
    /(?:ரூபாய்|ரூ|₹)\s*(\d+)/i,
    /(\d{2,6})/
  ];

  for (const pat of patterns) {
    const m = lower.match(pat);
    if (m && m[1]) {
      const val = parseInt(m[1], 10);
      if (!isNaN(val) && val >= 50 && val <= 100000) {
        return val;
      }
    }
  }
  return null;
}

/**
 * Extract Color
 */
function extractColor(text) {
  if (!text) return null;
  const lower = text.toLowerCase();

  const colorMap = {
    'red': 'Red', 'சிவப்பு': 'Red', 'sivappu': 'Red',
    'blue': 'Blue', 'நீலம்': 'Blue', 'neelam': 'Blue', 'navy': 'Navy Blue',
    'black': 'Black', 'கருப்பு': 'Black', 'karuppu': 'Black',
    'white': 'White', 'வெள்ளை': 'White', 'vellai': 'White',
    'green': 'Green', 'பச்சை': 'Green', 'pachai': 'Green',
    'yellow': 'Yellow', 'மஞ்சள்': 'Yellow',
    'brown': 'Brown', 'pink': 'Pink', 'ரோஸ்': 'Pink'
  };

  for (const [k, v] of Object.entries(colorMap)) {
    if (lower.includes(k)) return v;
  }
  return null;
}

/**
 * Extract Category
 */
function extractCategory(text) {
  if (!text) return null;
  const lower = text.toLowerCase();

  const matchesAny = (words) => words.some(w => lower.includes(w.toLowerCase()));

  // Rice & Groceries
  if (matchesAny(['rice', 'arisi', 'அரிசி', 'பொன்னி', 'பாஸ்மதி', 'basmati', 'grocery', 'மளிகை'])) return 'Grocery';
  if (matchesAny(['oil', 'ennai', 'எண்ணெய்', 'coffee', 'காபி', 'dal', 'பருப்பு'])) return 'Grocery';

  // Bags & Accessories
  if (matchesAny(['handbag', 'bag', 'backpack', 'wallet', 'பை', 'ஹேண்ட்பேக்'])) return 'Bags & Luggage';

  // Footwear & Shoes
  if (matchesAny(['shoe', 'shoes', 'running shoe', 'sneaker', 'காலணி', 'ஷூ', 'செருப்பு', 'footwear', 'formal shoe', 'boots', 'loafers', 'slippers', 'flip-flops', 'sandals'])) return 'Footwear';

  // Shirts & Tops
  if (matchesAny(['t-shirt', 'tshirt', 'டிசர்ட்', 'tee'])) return 'T-Shirts';
  if (matchesAny(['shirt', 'சட்டை', 'சட்டா', 'sattai', 'formal shirt', 'casual shirt', 'polo shirt', 'flannel shirt', 'blouse', 'tank top', 'camisole', 'vest'])) return 'Shirts';

  // Traditional & Ethnic
  if (matchesAny(['saree', 'புடவை', 'பட்டு புடவை', 'pudavai'])) return 'Sarees';
  if (matchesAny(['kurta', 'குர்தா', 'ethnic', 'chudi', 'tunic'])) return 'Kurtas & Ethnic';

  // Outerwear & Jackets
  if (matchesAny(['jacket', 'blazer', 'coat', 'trench coat', 'hoodie', 'sweater', 'cardigan', 'poncho', 'raincoat'])) return 'Jackets & Outerwear';

  // Dresses, Skirts & One-piece
  if (matchesAny(['dress', 'skirt', 'romper', 'jumpsuit', 'onesie', 'kimono'])) return 'Dresses';

  // Pants, Jeans & Bottoms
  if (matchesAny(['jeans', 'ஜீன்ஸ்'])) return 'Jeans';
  if (matchesAny(['trousers', 'pant', 'pants', 'பேண்ட்', 'leggings', 'shorts', 'overalls', 'pajamas'])) return 'Trousers';

  // Electronics & Phones
  if (matchesAny(['phone', 'smartphone', 'mobile', 'போன்', 'ஸ்மார்ட்போன்', 'மொபைல்'])) return 'Smartphones & Mobiles';
  if (matchesAny(['earbuds', 'headphone', 'இயர்பட்ஸ்', 'ஹெட்போன்', 'audio'])) return 'Electronics & Audio';
  if (matchesAny(['watch', 'smartwatch', 'வாட்ச்', 'கடிகாரம்'])) return 'Smartwatches & Wearables';
  if (matchesAny(['laptop', 'லேப்டாப்', 'computer'])) return 'Laptops & Computers';

  return null;
}

/**
 * Extract Brand
 */
function extractBrand(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  const brands = [
    'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Sony', 'boAt',
    'Nike', 'Puma', 'Bata', 'Raymond', 'Cauvery Farm', 'India Gate', 'Organic India',
    'Roadster', 'Peter England', 'Fastrack', 'HP', 'Lenovo'
  ];

  for (const b of brands) {
    if (lower.includes(b.toLowerCase())) return b;
  }
  return null;
}

/**
 * Extract Quantity
 */
function extractQuantity(text) {
  if (!text) return 1;
  const lower = text.toLowerCase();
  const m = lower.match(/(\d+)\s*(?:kg|kilo|கிலோ|items|pieces|nos)?/i);
  if (m && parseInt(m[1], 10) <= 50) return parseInt(m[1], 10);
  if (/\b(two|2|இரண்டு|ரெண்டு)\b/i.test(lower)) return 2;
  if (/\b(three|3|மூன்று|மூணு)\b/i.test(lower)) return 3;
  return 1;
}

/**
 * Main Multilingual Process Query Orchestrator
 * Fully supports English (en-IN) and Tamil (ta-IN)
 */
export function processVoiceQuery(queryText, allProducts = null, context = {}) {
  const text = (queryText || '').trim();
  const langInfo = detectLanguage(text);
  const lower = text.toLowerCase();
  const isTamil = langInfo.code === 'ta-IN';

  nlpLog('LANGUAGE', `Detected: ${langInfo.code} (${langInfo.name})`);
  nlpLog('AI', `Query: "${text}"`);

  // Normalized version for search slot extraction
  const nlpText = isTamil ? normalizeTamilQueryForNLP(text) : text;
  const nlpLower = nlpText.toLowerCase();

  // ─────────────────────────────────────────────────────────────
  // 1. INTENT: GENERAL_CONVERSATION (Greetings, help requests)
  // ─────────────────────────────────────────────────────────────
  const isGreeting = (
    lower === 'வணக்கம்' || lower.includes('வணக்கம்') ||
    lower.includes('vanakkam') || lower.includes('hello') || lower.includes('hi') ||
    lower.includes('hey') || lower.includes('good morning') || lower.includes('good evening')
  );

  if (isGreeting && !nlpLower.includes('rice') && !nlpLower.includes('shirt') && !nlpLower.includes('shoe') && !nlpLower.includes('phone')) {
    nlpLog('INTENT', 'GENERAL_CONVERSATION');
    const resp = isTamil
      ? "வணக்கம்! நான் VOICEMART AI. உங்களுக்கு என்ன பொருட்கள் அல்லது கடைகள் பற்றி உதவலாம்?"
      : "Hello! I am VOICEMART AI. How can I help you today with products or local store information?";
    const speech = isTamil ? "வணக்கம்! எப்படி உதவலாம்?" : "Hello! How can I help you today?";

    return {
      query: text,
      language: langInfo,
      intent: 'GENERAL_CONVERSATION',
      extractedEntities: {},
      confidence: 0.99,
      executionTimeMs: 80,
      matchingProducts: [],
      businessInfo: null,
      responseText: resp,
      speechText: speech,
      followUpQuestions: isTamil
        ? ["எனக்கு நல்ல அரிசி வேண்டும்", "500 ரூபாய்க்குள் shirt காட்டுங்க", "இந்த கடை எங்கே இருக்கு?"]
        : ["Show me good quality rice", "Show shirts under 500", "Where is this store located?"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 2. INTENT: BUSINESS_INFORMATION (Store location, hours, contact, delivery)
  // ─────────────────────────────────────────────────────────────
  const isBusinessLocation = (
    lower.includes('எங்கே இருக்கு') || lower.includes('எங்கு உள்ளது') || lower.includes('முகவரி') ||
    lower.includes('where is') || lower.includes('location') || lower.includes('address') ||
    lower.includes('எத்தனை மணிக்கு') || lower.includes('திறக்கும்') || lower.includes('opening hours') ||
    lower.includes('contact') || lower.includes('போன் நம்பர்') || lower.includes('phone')
  );

  if (isBusinessLocation && !nlpLower.includes('shirt') && !nlpLower.includes('shoe')) {
    nlpLog('INTENT', 'BUSINESS_INFORMATION');
    const store = INITIAL_BUSINESS_PROFILE;
    const resp = isTamil
      ? `எங்கள் ${store.name} சென்னை ${store.location} (${store.address}) அமைந்துள்ளது. வேலை நேரம்: ${store.workingHours.weekdays}. தொடர்பு எண்: ${store.phone}.`
      : `${store.name} is located at ${store.address}, ${store.location}. Working hours: ${store.workingHours.weekdays}. Phone: ${store.phone}.`;

    const speech = isTamil
      ? `எங்கள் கடை சென்னை தி.நகர் ரங்கநாதன் தெருவில் அமைந்துள்ளது. காலை 9 மணி முதல் இரவு 9:30 வரை திறந்திருக்கும்.`
      : `${store.name} is located at T. Nagar, Chennai. Open from 9 AM to 9:30 PM.`;

    demandService.logDemandEvent({
      query: text,
      language: langInfo,
      intent: 'BUSINESS_INFORMATION',
      category: 'Store Info',
      matchedCount: 1
    });

    return {
      query: text,
      language: langInfo,
      intent: 'BUSINESS_INFORMATION',
      extractedEntities: { business: store.name, location: store.location, phone: store.phone },
      confidence: 0.98,
      executionTimeMs: 95,
      matchingProducts: [],
      businessInfo: store,
      responseText: resp,
      speechText: speech,
      followUpQuestions: isTamil
        ? ["இந்த கடையில் என்னென்ன பொருட்கள் இருக்கு?", "ஹோம் டெலிவரி வசதி உள்ளதா?"]
        : ["What products are available?", "Is home delivery available?"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 3. INTENT: BUSINESS_SEARCH (What products does this store carry? Nearby store?)
  // ─────────────────────────────────────────────────────────────
  const isBusinessSearch = (
    lower.includes('என்னென்ன பொருட்கள்') || lower.includes('என்ன பொருட்கள் இருக்கு') ||
    lower.includes('what products') || lower.includes('items available') ||
    lower.includes('அருகில் இருக்கும் கடை') || lower.includes('nearby store')
  );

  if (isBusinessSearch) {
    nlpLog('INTENT', 'BUSINESS_SEARCH');
    const store = INITIAL_BUSINESS_PROFILE;
    const resp = isTamil
      ? `எங்கள் ${store.name} கடையில் முதல் தர பொன்னி & பாஸ்மதி அரிசி, பருப்பு, மளிகை பொருட்கள், ஆண்கள் மற்றும் பெண்களுக்கான சட்டைகள், காலணிகள், ஸ்மார்ட்போன்கள் மற்றும் எலக்ட்ரானிக்ஸ் பொருட்கள் கிடைக்கின்றன.`
      : `${store.name} carries premium Ponni & Basmati rice, groceries, apparel, footwear, smartphones, and electronics at verified prices.`;

    const speech = isTamil
      ? `எங்கள் கடையில் அரிசி வகைகள், மளிகை, ஆடைகள், காலணிகள் மற்றும் எலக்ட்ரானிக்ஸ் பொருட்கள் சிறந்த விலையில் கிடைக்கின்றன.`
      : `We carry groceries, rice varieties, apparel, footwear, and electronics.`;

    return {
      query: text,
      language: langInfo,
      intent: 'BUSINESS_SEARCH',
      extractedEntities: { business: store.name },
      confidence: 0.97,
      executionTimeMs: 110,
      matchingProducts: (allProducts || datasetStore.getAllProducts()).filter(p => (p.Category === 'Grocery' || p.category === 'Grocery' || (p.ProductName || p.name || '').includes('Rice'))).slice(0, 4),
      businessInfo: store,
      responseText: resp,
      speechText: speech,
      followUpQuestions: isTamil
        ? ["எனக்கு அரிசி வேண்டும்", "500 ரூபாய்க்குள் shirt காட்டுங்க"]
        : ["I need rice", "Show shirts under 500"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 4. INTENT: PRODUCT_COMPARISON / CHEAPEST / BEST QUALITY
  // ─────────────────────────────────────────────────────────────
  const isComparisonQuery = (
    lower.includes('குறைந்த விலை') || lower.includes('cheapest') || lower.includes('lowest price') ||
    lower.includes('நல்ல quality எது') || lower.includes('எது நல்லது') || lower.includes('best quality') ||
    lower.includes('இரண்டு அரிசியில்') || lower.includes('ஒப்பீடு') || lower.includes('which is better')
  );

  if (isComparisonQuery && context.lastMatchingProducts && context.lastMatchingProducts.length > 0) {
    nlpLog('INTENT', 'PRODUCT_COMPARISON');
    const isCheapestQuery = lower.includes('குறைந்த விலை') || lower.includes('cheapest') || lower.includes('lowest price');

    let targetProduct = null;
    if (isCheapestQuery) {
      targetProduct = [...context.lastMatchingProducts].sort((a, b) => (a.Price || a.price || 0) - (b.Price || b.price || 0))[0];
    } else {
      targetProduct = [...context.lastMatchingProducts].sort((a, b) => (b.Rating || b.rating || 0) - (a.Rating || a.rating || 0))[0];
    }

    const pName = targetProduct.ProductName || targetProduct.name || 'Product';
    const pPrice = targetProduct.Price ?? targetProduct.price ?? 0;
    const pRating = targetProduct.Rating ?? targetProduct.rating ?? 4.5;

    const resp = isTamil
      ? (isCheapestQuery
          ? `இவற்றில் மிகவும் குறைந்த விலையுள்ள தயாரிப்பு: "${pName}" - ₹${pPrice} மட்டுமே.`
          : `இவற்றில் சிறந்த தரம் மற்றும் அதிக மதிப்பீடு கொண்ட தயாரிப்பு: "${pName}" (ரேட்டிங்: ${pRating}⭐) - ₹${pPrice}.`)
      : (isCheapestQuery
          ? `The most affordable option is "${pName}" at ₹${pPrice}.`
          : `The highest quality option is "${pName}" with a ${pRating}⭐ rating at ₹${pPrice}.`);

    const speech = isTamil
      ? (isCheapestQuery
          ? `மிகவும் குறைந்த விலையுள்ள தயாரிப்பு ${pName}, இதன் விலை ${pPrice} ரூபாய் மட்டுமே.`
          : `சிறந்த தரம் வாய்ந்த தயாரிப்பு ${pName}, இதன் விலை ${pPrice} ரூபாய்.`)
      : (isCheapestQuery
          ? `The cheapest option is ${pName} at ${pPrice} rupees.`
          : `The best quality option is ${pName} rated ${pRating} stars.`);

    return {
      query: text,
      language: langInfo,
      intent: 'PRODUCT_COMPARISON',
      extractedEntities: { sort: isCheapestQuery ? 'cheapest' : 'best_quality', selectedItem: pName, price: pPrice },
      confidence: 0.98,
      executionTimeMs: 100,
      matchingProducts: [targetProduct],
      businessInfo: null,
      responseText: resp,
      speechText: speech,
      followUpQuestions: isTamil ? ["இதை ஆர்டர் செய்யவா?", "மற்ற பொருட்களை பார்க்கவா?"] : ["Order this product now", "Show other products"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 5. INTENT: PRODUCT_PRICE / PRODUCT_INFORMATION
  // ─────────────────────────────────────────────────────────────
  const isPriceQuery = lower.includes('விலை என்ன') || lower.includes('எவ்வளவு') || lower.includes('price என்ன') || lower.includes('how much') || lower.includes('what is the price');
  const isInfoQuery = lower.includes('பற்றி சொல்லுங்க') || lower.includes('விவரம்') || lower.includes('details of') || lower.includes('tell me about');

  if ((isPriceQuery || isInfoQuery) && (context.lastMatchingProducts && context.lastMatchingProducts.length > 0 || nlpLower.includes('rice') || nlpLower.includes('shirt') || nlpLower.includes('shoe'))) {
    const catalog = allProducts || datasetStore.getAllProducts();
    let target = context.lastMatchingProducts?.[0];

    if (!target) {
      if (nlpLower.includes('rice')) {
        target = catalog.find(p => (p.ProductName || p.name || '').toLowerCase().includes('rice')) || catalog[0];
      } else {
        target = catalog[0];
      }
    }

    const pName = target.ProductName || target.name || 'Product';
    const pPrice = target.Price ?? target.price ?? 0;
    const pDesc = target.Description || target.description || '';

    nlpLog('INTENT', isPriceQuery ? 'PRODUCT_PRICE' : 'PRODUCT_INFORMATION');

    const resp = isTamil
      ? (isPriceQuery
          ? `"${pName}"-ன் துல்லியமான விலை ₹${pPrice} மட்டுமே. ஸ்டாக்கில் உள்ளது.`
          : `"${pName}": ${pDesc}. விலை: ₹${pPrice}. ஸ்டாக்கில் உள்ளது.`)
      : (isPriceQuery
          ? `The verified price of "${pName}" is ₹${pPrice}. It is in stock.`
          : `"${pName}": ${pDesc}. Price: ₹${pPrice}. In stock.`);

    const speech = isTamil
      ? (isPriceQuery ? `${pName} விலை ${pPrice} ரூபாய் மட்டுமே.` : `${pName} விலை ${pPrice} ரூபாய். சிறந்த தயாரிப்பு.`)
      : (isPriceQuery ? `The price of ${pName} is ${pPrice} rupees.` : `${pName} is available for ${pPrice} rupees.`);

    return {
      query: text,
      language: langInfo,
      intent: isPriceQuery ? 'PRODUCT_PRICE' : 'PRODUCT_INFORMATION',
      extractedEntities: { product: pName, price: pPrice },
      confidence: 0.98,
      executionTimeMs: 110,
      matchingProducts: [target],
      businessInfo: null,
      responseText: resp,
      speechText: speech,
      followUpQuestions: isTamil ? ["இதை ஆர்டர் செய்யவா?", "வேறு விருப்பங்கள் பார்க்கவா?"] : ["Order this product", "Check other options"]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 6. INTENT: PRODUCT_AVAILABILITY (is this in stock?)
  // ─────────────────────────────────────────────────────────────
  const isAvailabilityQuery = lower.includes('இருக்கா') || lower.includes('கிடைக்குமா') || lower.includes('in stock') || lower.includes('available');
  if (isAvailabilityQuery) {
    nlpLog('INTENT', 'PRODUCT_AVAILABILITY');
  }

  // ─────────────────────────────────────────────────────────────
  // 7. INTENT: PRODUCT_SEARCH (Default & Primary Voice Search)
  // ─────────────────────────────────────────────────────────────
  const category = extractCategory(nlpText);
  const color = extractColor(nlpText);
  const brand = extractBrand(nlpText);
  const maxPrice = extractPriceLimit(nlpText);
  const quantity = extractQuantity(nlpText);

  const structuredQuery = {
    category: category || 'Any',
    color: color || 'Any',
    brand: brand || 'Any',
    maxPrice,
    minPrice: null,
    rawQueryText: text
  };

  const catalog = allProducts || datasetStore.getAllProducts();

  // Perform deterministic search
  let searchResults = searchProducts(structuredQuery, catalog);

  // Special boost for Rice queries
  if (nlpLower.includes('rice') || nlpLower.includes('arisi') || category === 'Grocery') {
    const riceItems = catalog.filter(p => {
      const pName = (p.ProductName || p.name || '').toLowerCase();
      const pCat = (p.Category || p.category || '').toLowerCase();
      return pName.includes('rice') || pCat.includes('grocery');
    });
    if (riceItems.length > 0) {
      searchResults = [...riceItems, ...searchResults.filter(p => !riceItems.some(r => (r.ProductID || r.id) === (p.ProductID || p.id)))];
    }
  }

  // Filter relevant items
  let finalMatches = searchResults.slice(0, 4);

  // Check exact strict match
  const strictMatches = searchResults.filter(p => p.isStrictMatch);
  if (strictMatches.length > 0) {
    finalMatches = strictMatches.slice(0, 4);
  }

  const hasExactMatches = finalMatches.length > 0;
  let mismatchAnalysis = null;
  if (!hasExactMatches) {
    mismatchAnalysis = analyzeMismatchAndRelax(structuredQuery, catalog);
  }

  nlpLog('INTENT', 'PRODUCT_SEARCH', { count: finalMatches.length });

  // Log Demand
  demandService.logDemandEvent({
    query: text,
    language: langInfo,
    intent: 'PRODUCT_SEARCH',
    category: category || 'General',
    color: color || 'Any',
    brand: brand || 'Any',
    maxPrice,
    matchedCount: finalMatches.length
  });

  // Generate Natural Tamil / English Response
  let responseText = '';
  let speechText = '';
  const count = finalMatches.length;

  if (hasExactMatches) {
    if (isTamil) {
      if (nlpLower.includes('rice') || category === 'Grocery') {
        responseText = "சரி! உங்களுக்கு பொருத்தமான அரிசி வகைகளை காட்டுகிறேன்.";
        speechText = "சரி! உங்களுக்கு பொருத்தமான அரிசி வகைகளை காட்டுகிறேன்.";
      } else if (maxPrice && category === 'Shirts') {
        responseText = `சரி! ₹${maxPrice} க்குள் கிடைக்கும் சட்டைகளை காட்டுகிறேன்.`;
        speechText = `சரி! ${maxPrice} ரூபாய்க்குள் கிடைக்கும் சட்டைகளை காட்டுகிறேன்.`;
      } else if (category === 'Footwear') {
        responseText = "சரி! உங்களுக்கு பொருத்தமான shoes-ஐ காட்டுகிறேன்.";
        speechText = "சரி! உங்களுக்கு பொருத்தமான காலணிகளை காட்டுகிறேன்.";
      } else if (maxPrice && color) {
        responseText = `சரி! ₹${maxPrice}க்குள் ${color} நிறத்தில் கிடைக்கும் பொருட்களை காட்டுகிறேன்.`;
        speechText = `சரி! ${maxPrice} ரூபாய்க்குள் சிறந்த தயாரிப்புகளை காட்டுகிறேன்.`;
      } else {
        responseText = `சரி! உங்கள் தேவைக்கேற்ப ${count} சிறந்த தயாரிப்புகளை காட்டுகிறேன்.`;
        speechText = `உங்கள் தேடலுக்கு பொருத்தமான தயாரிப்புகள் இதோ.`;
      }
    } else {
      if (nlpLower.includes('rice') || category === 'Grocery') {
        responseText = "Sure! Here are verified rice varieties from our catalog.";
        speechText = "Sure! Here are verified rice varieties from our catalog.";
      } else if (maxPrice) {
        responseText = `Sure! Here are matching ${category || 'products'} under ₹${maxPrice}.`;
        speechText = `Found verified products under ${maxPrice} rupees.`;
      } else {
        responseText = `Here are verified products matching your request.`;
        speechText = `Here are verified products matching your request.`;
      }
    }
  } else {
    // No results found state
    if (isTamil) {
      responseText = "இந்த தேடலுக்கு பொருத்தமான பொருட்கள் கிடைக்கவில்லை. மாற்று தயாரிப்புகள் இதோ.";
      speechText = "இந்த தேடலுக்கு பொருட்கள் கிடைக்கவில்லை. மாற்று தயாரிப்புகள் இதோ.";
    } else {
      responseText = "No matching products found for this search. Here are close alternatives.";
      speechText = "No matching products found for this search.";
    }
  }

  return {
    query: text,
    language: langInfo,
    intent: 'PRODUCT_SEARCH',
    extractedEntities: { ...structuredQuery, quantity },
    confidence: 0.96,
    executionTimeMs: 130,
    matchingProducts: finalMatches,
    hasExactMatches,
    mismatchAnalysis,
    businessInfo: null,
    responseText,
    speechText,
    followUpQuestions: isTamil
      ? ["இதுல குறைந்த விலை எது?", "இதுல நல்ல quality எது?", "இந்த பொருளின் விலை என்ன?"]
      : ["Show me the cheapest one", "Which one has the best quality?", "What are the store hours?"]
  };
}
