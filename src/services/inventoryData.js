// VOICEMART AI - Local Business Inventory & Store Database (Multilingual Catalog)

export const INITIAL_BUSINESS_PROFILE = {
  name: "Sri Murugan Superstore & Fashion",
  tagline: "Your Trusted Neighborhood Store Since 1998",
  businessType: "Electronics, Clothing, Footwear & Daily Essentials",
  location: "T. Nagar, Chennai, Tamil Nadu",
  phone: "+91 98401 54321",
  address: "42, Ranganathan Street, T. Nagar, Chennai - 600017",
  workingHours: {
    weekdays: "9:00 AM – 9:30 PM",
    weekends: "8:30 AM – 10:00 PM",
    holidays: "Open all days (9:00 AM – 9:00 PM)"
  },
  deliveryPolicy: {
    available: true,
    freeRadiusKm: 5,
    maxRadiusKm: 12,
    deliveryFee: "Free above ₹499 (₹30 for orders below ₹499)",
    timeSlot: "Delivered within 45 to 90 minutes"
  },
  returnPolicy: {
    allowed: true,
    windowDays: 7,
    conditions: "Unworn clothing with tags intact, undamaged packaging. Electronics returnable within 7 days with invoice."
  },
  paymentMethods: ["UPI (GPay / PhonePe / Paytm)", "Cash on Delivery", "Credit / Debit Cards", "Net Banking"],
  supportedLanguages: [
    { code: "en-IN", name: "English", label: "English", flag: "🇮🇳" },
    { code: "ta-IN", name: "Tamil", label: "தமிழ்", flag: "🇮🇳" }
  ]
};

export const INITIAL_PRODUCTS = [
  // WIRELESS HEADPHONES & AUDIO
  {
    id: "PROD-EL01",
    name: "SonicPro True Wireless ANC Earbuds",
    category: "Electronics & Audio",
    price: 1299,
    originalPrice: 2999,
    rating: 4.7,
    reviewsCount: 420,
    stock: 30,
    inStock: true,
    brand: "SonicTech",
    sizes: ["Standard"],
    colors: ["Midnight Black", "Pearl White"],
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    description: "Bluetooth 5.3 true wireless earbuds with 40-hour playtime, Active Noise Cancellation (ANC), 10mm titanium drivers and low latency.",
    translations: {
      ta: "ப்ளூடூத் வயர்லெஸ் இயர்பட்ஸ், 40 மணிநேர பேட்டரி மற்றும் நாய்ஸ் கேன்சலேஷன்.",
      hi: "40 घंटे की बैटरी और एक्टिव नॉइज़ कैंसलेशन वाले वायरलेस ईयरबड्स।",
      te: "40 గంటల బ్యాటరీ లైఫ్ మరియు యాక్టివ్ నాయిస్ క్యాన్సిలేషన్‌తో వైర్‌లెస్ ఇయర్‌బడ్స్.",
      ml: "40 മണിക്കൂർ ബാറ്ററി ലൈഫുള്ള ട്രൂ വയർലെസ് ഇയർബഡുകൾ.",
      kn: "40 ಗಂಟೆಗಳ ಬ್ಯಾಟರಿಯೊಂದಿಗೆ ಟ್ರೂ ವೈರ್‌ಲೆಸ್ ಇಯರ್‌ಬಡ್ಸ್."
    },
    keywords: ["earbuds", "headphone", "wireless headphones", "bluetooth", "airpods", "wireless earphones", "anc earbuds", "இயர்போன்", "ஹெட்போன்", "வயர்லெஸ் ஹெட்போன்", "इयरबड्स", "हेडफोन", "वायरलेस हेडफोन"]
  },
  {
    id: "PROD-EL02",
    name: "Sony WH-CH520 Wireless On-Ear Bluetooth Headphones",
    category: "Electronics & Audio",
    price: 2899,
    originalPrice: 4490,
    rating: 4.8,
    reviewsCount: 650,
    stock: 25,
    inStock: true,
    brand: "Sony",
    sizes: ["Adjustable"],
    colors: ["Black", "Blue", "Beige"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    description: "50-hour massive battery life, DSEE audio upscaling, 360 Reality Audio, multipoint Bluetooth connection, lightweight padded earcups under ₹3,000.",
    translations: {
      ta: "சோனி வயர்லெஸ் ஹெட்போன், 50 மணிநேர பேட்டரி மற்றும் சிறப்பான இசை தரம்.",
      hi: "सोनी वायरलेस हेडफोन, 50 घंटे की बैटरी लाइफ और प्रीमियम साउंड क्वालिटी।",
      te: "సోనీ వైర్‌లెస్ హెడ్‌ఫోన్, 50 గంటల బ్యాటరీ లైఫ్ మరియు సూపర్ సౌండ్ క్వాలిటీ.",
      ml: "സോണി വയർലെസ് ഹെഡ്‌ഫോൺ, 50 മണിക്കൂർ ബാറ്ററി ലൈഫ്.",
      kn: "ಸೋನಿ ವೈರ್‌ಲೆಸ್ ಹೆಡ್‌ಫೋನ್, 50 ಗಂಟೆಗಳ ಬ್ಯಾಟರಿ ಲೈಫ್."
    },
    keywords: ["headphones", "wireless headphones", "sony headphones", "bluetooth headphones", "over-ear headphones", "headphone under 3000", "ஹெட்போன்", "சோனி ஹெட்போன்", "வயர்லெஸ் ஹெட்போன்", "हेडफोन", "वायरलेस हेडफोन"]
  },
  {
    id: "PROD-EL03",
    name: "boAt Rockerz 550 Over-Ear Wireless Headphones",
    category: "Electronics & Audio",
    price: 1999,
    originalPrice: 4999,
    rating: 4.6,
    reviewsCount: 890,
    stock: 35,
    inStock: true,
    brand: "boAt",
    sizes: ["Over-Ear"],
    colors: ["Black", "Army Green", "Red"],
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
    description: "50mm dynamic drivers with boAt Signature Sound, deep bass, physical noise isolation, 20 hours playback and plush ear cushions.",
    translations: {
      ta: "போட் ஓவர்-இயர் வயர்லெஸ் ஹெட்போன், சிறந்த பாஸ் மற்றும் 20 மணிநேர பேட்டரி.",
      hi: "बोट ओवर-ईयर वायरलेस हेडफोन, डीप बास और 20 घंटे का प्लेबैक।",
      te: "బోట్ ఓవర్-ఇయర్ వైర్‌లెస్ హెడ్‌ఫోన్, డీప్ బాస్ మరియు 20 గంటల ప్లేబ్యాక్.",
      ml: "ബോട്ട് ഓവർ-ഇയർ വയർലെസ് ഹെഡ്‌ഫോൺ.",
      kn: "ಬೋಟ್ ಓವರ್-ಇಯರ್ ವೈರ್‌ಲೆಸ್ ಹೆಡ್‌ಫೋನ್."
    },
    keywords: ["headphones", "wireless headphones", "boat headphones", "bluetooth headphones", "bass headphones", "headphone under 3000", "ஹெட்போன்", "போட்", "हेडफोन"]
  },
  {
    id: "PROD-EL04",
    name: "JBL Tune 510BT Pure Bass Wireless Headphones",
    category: "Electronics & Audio",
    price: 2499,
    originalPrice: 3999,
    rating: 4.7,
    reviewsCount: 512,
    stock: 20,
    inStock: true,
    brand: "JBL",
    sizes: ["On-Ear Foldable"],
    colors: ["Black", "White", "Blue"],
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80",
    description: "Renowned JBL Pure Bass sound, 40 hours battery life with speed charge (5 min = 2 hours), hands-free calling and multi-device connection.",
    translations: {
      ta: "ஜேபிஎல் பியூர் பாஸ் வயர்லெஸ் ஹெட்போன், 40 மணிநேர பேட்டரி.",
      hi: "जेबीएल प्योर बास वायरलेस हेडफोन, 40 घंटे की बैटरी और फास्ट चार्जिंग।",
      te: "జేబీఎల్ ప్యూర్ బాస్ వైర్‌లెస్ హెడ్‌ఫోన్.",
      ml: "ജെബിഎൽ പ്യുവർ ബാസ് വയർലെസ് ഹെഡ്‌ഫോൺ.",
      kn: "ಜೆಬಿಎಲ್ ಪ್ಯೂರ್ ಬಾಸ್ ವೈರ್‌ಲೆಸ್ ಹೆಡ್‌ಫೋನ್."
    },
    keywords: ["headphones", "wireless headphones", "jbl headphones", "bluetooth", "headphone under 3000", "ஹெட்போன்", "ஜேபிஎல்", "हेडफोन"]
  },

  // SMARTPHONES & MOBILES
  {
    id: "PROD-PH01",
    name: "OnePlus Nord CE 3 Lite 5G Smartphone (8GB/128GB)",
    category: "Smartphones & Mobiles",
    price: 19999,
    originalPrice: 21999,
    rating: 4.7,
    reviewsCount: 940,
    stock: 18,
    inStock: true,
    brand: "OnePlus",
    sizes: ["8GB RAM + 128GB Storage"],
    colors: ["Pastel Lime", "Chromatic Gray"],
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    description: "108 MP high-resolution main camera with 3x lossless zoom, 67W SUPERVOOC fast charging, 120Hz smooth FHD+ display, Snapdragon 695 5G processor for fast photography and smooth gaming.",
    translations: {
      ta: "ஒன்பிளஸ் 108MP கேமரா 5G ஸ்மார்ட்போன், அருமையான புகைப்படம் மற்றும் கேமிங் செயல்திறன்.",
      hi: "108MP प्रो कैमरा और 67W सुपरवूक चार्जिंग वाला वनप्लस 5G स्मार्टफोन।",
      te: "108MP ప్రో కెమెరా మరియు 67W ఫాస్ట్ ఛార్జింగ్‌తో వన్‌ప్లస్ 5G స్మార్ట్‌ఫోన్.",
      ml: "108MP ക്യാമറയുള്ള വൺപ്ലസ് 5G സ്മാർട്ട്‌ഫോൺ.",
      kn: "108MP ಕ್ಯಾಮೆರಾ ಹೊಂದಿರುವ ಒನ್‌ಪ್ಲಸ್ 5G ಸ್ಮಾರ್ಟ್‌ಫೋನ್."
    },
    keywords: ["phone", "smartphone", "mobile", "oneplus", "5g phone", "camera phone", "photography phone", "gaming phone", "phone under 25000", "phone under 20000", "போன்", "ஸ்மார்ட்போன்", "மொபைல்", "கேமரா போன்", "फोन", "स्मार्टफोन", "मोबाइल"]
  },
  {
    id: "PROD-PH02",
    name: "Redmi Note 13 Pro 5G (200MP OIS Camera / 8GB/256GB)",
    category: "Smartphones & Mobiles",
    price: 23999,
    originalPrice: 28999,
    rating: 4.8,
    reviewsCount: 1200,
    stock: 14,
    inStock: true,
    brand: "Xiaomi",
    sizes: ["8GB RAM + 256GB Storage"],
    colors: ["Midnight Black", "Coral Purple", "Ocean Teal"],
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
    description: "Flagship-grade 200MP OIS ultra-clear camera, 1.5K 120Hz AMOLED curved display, Snapdragon 7s Gen 2 for exceptional night photography and high-frame-rate gaming under ₹25,000.",
    translations: {
      ta: "ரெட்மி 200MP OIS அல்ட்ரா கேமரா 5G போன், மிகச் சிறந்த போட்டோகிராபி மற்றும் கேமிங்.",
      hi: "200MP OIS कैमरा और 1.5K 120Hz एमोलेड डिस्प्ले वाला रेडमी 5G स्मार्टफोन।",
      te: "200MP OIS కెమెరాతో రెడ్‌మి ప్రో 5G స్మార్ట్‌ఫోన్.",
      ml: "200MP OIS ക്യാമറയുള്ള റെഡ്മി 5G സ്മാർട്ട്‌ഫോൺ.",
      kn: "200MP OIS ಕ್ಯಾಮೆರಾ ಹೊಂದಿರುವ ರೆಡ್ಮಿ 5G ಸ್ಮಾರ್ಟ್‌ಫೋನ್."
    },
    keywords: ["phone", "smartphone", "mobile", "redmi", "xiaomi", "camera phone", "photography phone", "gaming phone", "200mp camera", "phone under 25000", "போன்", "ஸ்மார்ட்போன்", "மொபைல்", "போட்டோகிராபி போன்", "फोन", "कैमरा फोन"]
  },
  {
    id: "PROD-PH03",
    name: "Samsung Galaxy M34 5G (50MP OIS / 6000mAh Battery)",
    category: "Smartphones & Mobiles",
    price: 16999,
    originalPrice: 24499,
    rating: 4.6,
    reviewsCount: 780,
    stock: 22,
    inStock: true,
    brand: "Samsung",
    sizes: ["6GB RAM + 128GB Storage"],
    colors: ["Midnight Blue", "Prism Silver", "Waterfall Blue"],
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
    description: "50MP No Shake OIS camera for blur-free photography, massive 6000mAh battery lasting up to 2 days, 120Hz Super AMOLED screen with Gorilla Glass 5 protection.",
    translations: {
      ta: "சாம்சங் 50MP OIS கேமரா மற்றும் 6000mAh பேட்டரி கொண்ட 5G போன்.",
      hi: "सैमसंग 50MP OIS कैमरा और 6000mAh दमदार बैटरी वाला 5G फोन।",
      te: "శామ్‌సంగ్ 50MP OIS కెమెరా మరియు 6000mAh బ్యాటరీతో 5G ఫోన్.",
      ml: "സാംസങ് 50MP OIS ക്യാമറയുള്ള 5G ഫോൺ.",
      kn: "ಸ್ಯಾಮ್‌ಸಂಗ್ 50MP OIS ಕ್ಯಾಮೆರಾ ಹೊಂದಿರುವ 5G ಫೋನ್."
    },
    keywords: ["phone", "smartphone", "mobile", "samsung", "samsung phone", "battery phone", "camera phone", "phone under 20000", "phone under 25000", "போன்", "சாம்சங் போன்", "மொபைல்", "फोन", "सैमसंग फोन"]
  },
  {
    id: "PROD-PH04",
    name: "Realme Narzo 60 Pro 5G (100MP OIS Portrait Camera)",
    category: "Smartphones & Mobiles",
    price: 21999,
    originalPrice: 26999,
    rating: 4.7,
    reviewsCount: 620,
    stock: 16,
    inStock: true,
    brand: "Realme",
    sizes: ["8GB RAM + 128GB Storage"],
    colors: ["Mars Orange", "Cosmic Black"],
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80",
    description: "100MP OIS pro portrait camera, luxury vegan leather back, curved 120Hz OLED vision display, MediaTek Dimensity 7050 5G gaming processor, 67W flash charge.",
    translations: {
      ta: "ரியல்மி 100MP போர்ட்ரெய்ட் கேமரா 5G ஸ்மார்ட்போன், அதிவேக கேமிங்.",
      hi: "100MP ओआईएस पोर्ट्रेट कैमरा और लेदर फिनिश वाला रियलमी 5G फोन।",
      te: "100MP పోర్ట్రెయిట్ కెమెరాతో రియల్‌మి 5G స్మార్ట్‌ఫోన్.",
      ml: "100MP ക്യാമറയുള്ള റിയൽമി 5G സ്മാർട്ട്‌ഫോൺ.",
      kn: "100MP ಕ್ಯಾಮೆರಾ ಹೊಂದಿರುವ ರಿಯಲ್‌ಮಿ 5G ಸ್ಮಾರ್ಟ್‌ಫೋನ್."
    },
    keywords: ["phone", "smartphone", "mobile", "realme", "narzo", "gaming phone", "photography phone", "phone under 25000", "போன்", "ரியல்மி போன்", "போட்டோகிராபி", "फोन"]
  },

  // LAPTOPS & COMPUTERS
  {
    id: "PROD-LP01",
    name: "HP 15s Ryzen 5 16GB RAM Student & College Laptop",
    category: "Laptops & Computers",
    price: 44990,
    originalPrice: 58990,
    rating: 4.8,
    reviewsCount: 380,
    stock: 12,
    inStock: true,
    brand: "HP",
    sizes: ["15.6-inch FHD (16GB RAM / 512GB SSD)"],
    colors: ["Natural Silver"],
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    description: "AMD Ryzen 5 5500U 6-Core processor, 16GB DDR4 RAM, 512GB NVMe SSD, 15.6-inch Micro-Edge FHD anti-glare display, 9 hours battery life with fast charge. Lightweight 1.69kg, ideal for college use, coding, assignments and productivity.",
    translations: {
      ta: "HP ரைசன் 5 லேப்டாப் (16GB RAM), கல்லூரி மாணவர்களுக்கான சிறந்த லேப்டாப்.",
      hi: "एचपी 15s राइज़ेन 5 लैपटॉप (16GB रैम), कॉलेज और कोडिंग के लिए परफेक्ट।",
      te: "హెచ్‌పి రైజెన్ 5 ల్యాప్‌టాప్ (16GB ర్యామ్), కాలేజ్ మరియు కోడింగ్ కోసం ఉత్తమం.",
      ml: "കോളേജ് വിദ്യാർത്ഥികൾക്കായുള്ള HP റൈസൻ 5 ലാപ്ടോപ്പ്.",
      kn: "ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಎಚ್‌ಪಿ ರೈಸನ್ 5 ಲ್ಯಾಪ್‌ಟಾಪ್."
    },
    keywords: ["laptop", "college laptop", "hp laptop", "student laptop", "laptop for college", "coding laptop", "laptop under 60000", "laptop under 50000", "லேப்டாப்", "கல்லூரி லேப்டாப்", "மாணவர் லேப்டாப்", "लैपटॉप", "कॉलेज लैपटॉप"]
  },
  {
    id: "PROD-LP02",
    name: "Lenovo IdeaPad Slim 3 12th Gen Core i5 College Laptop",
    category: "Laptops & Computers",
    price: 52990,
    originalPrice: 68990,
    rating: 4.7,
    reviewsCount: 290,
    stock: 10,
    inStock: true,
    brand: "Lenovo",
    sizes: ["15.6-inch FHD (16GB RAM / 512GB SSD)"],
    colors: ["Arctic Grey", "Abyss Blue"],
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    description: "Intel Core i5-12450H high-speed 8-core CPU, 16GB RAM, 512GB SSD, Rapid Charge (80% in 1 hr), Dolby Audio, military-grade durable chassis. Excellent for college, engineering, programming and multitasking.",
    translations: {
      ta: "லெனோவா i5 ஸ்லிம் லேப்டாப், கல்லூரி மற்றும் இன்ஜினியரிங் மாணவர்களுக்கு ஏற்றது.",
      hi: "लेनोवो आइडियापैड स्लिम 3 कोर i5 लैपटॉप, कॉलेज और मल्टीटास्किंग के लिए शानदार।",
      te: "లెనోవా కోర్ i5 ల్యాప్‌టాప్ కాలేజ్ మరియు ప్రోగ్రామింగ్ కోసం.",
      ml: "ലെനോവോ കോർ i5 കോളേജ് ലാപ്ടോപ്പ്.",
      kn: "ಲೆನೊವೊ ಕೋರ್ i5 ಕಾಲೇಜು ಲ್ಯಾಪ್‌ಟಾಪ್."
    },
    keywords: ["laptop", "lenovo laptop", "college laptop", "laptop for college", "student laptop", "i5 laptop", "laptop under 60000", "லேப்டாப்", "லெனோவா", "लैपटॉप"]
  },
  {
    id: "PROD-LP03",
    name: "Acer Swift Go 14 OLED Thin & Light Student Laptop",
    category: "Laptops & Computers",
    price: 59990,
    originalPrice: 79990,
    rating: 4.9,
    reviewsCount: 195,
    stock: 8,
    inStock: true,
    brand: "Acer",
    sizes: ["14-inch 2.8K OLED (16GB RAM / 512GB SSD)"],
    colors: ["Pure Silver"],
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
    description: "Stunning 14-inch 2.8K OLED 90Hz display (100% DCI-P3), Intel Core i5 13th Gen, 16GB LPDDR5, 512GB Gen4 SSD, ultra-slim 1.25kg all-metal chassis, 11-hour all-day battery life for college and creative projects.",
    translations: {
      ta: "ஏசர் ஸ்விஃப்ட் 14 இன்ச் OLED லேப்டாப், எடை குறைவானது, 11 மணிநேர பேட்டரி.",
      hi: "एसर स्विफ्ट गो 14 OLED अल्ट्रा-लाइट लैपटॉप, कॉलेज और प्रोजेक्ट्स के लिए बेस्ट।",
      te: "ఏసర్ స్విఫ్ట్ 14 OLED ల్యాప్‌టాప్ 11 గంటల బ్యాటరీ లైఫ్‌తో.",
      ml: "ഏസർ സ്വിഫ്റ്റ് 14 OLED ഭാരം കുറഞ്ഞ ലാപ്ടോപ്പ്.",
      kn: "ಏಸರ್ ಸ್ವಿಫ್ಟ್ 14 OLED ಅಲ್ಟ್ರಾ-ಲೈಟ್ ಲ್ಯಾಪ್‌ಟಾಪ್."
    },
    keywords: ["laptop", "acer laptop", "oled laptop", "college laptop", "lightweight laptop", "thin and light", "laptop under 60000", "லேப்டாப்", "ஏசர் லேப்டாப்", "लैपटॉप"]
  },
  {
    id: "PROD-LP04",
    name: "Asus Vivobook 15 Thin & Light Student Laptop",
    category: "Laptops & Computers",
    price: 38990,
    originalPrice: 52990,
    rating: 4.6,
    reviewsCount: 310,
    stock: 15,
    inStock: true,
    brand: "Asus",
    sizes: ["15.6-inch FHD (8GB RAM / 512GB SSD)"],
    colors: ["Quiet Blue", "Transparent Silver"],
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80",
    description: "Intel Core i3 12th Gen processor, 8GB RAM (expandable to 16GB), 512GB fast SSD, 180-degree lay-flat hinge, anti-glare FHD screen, lightweight portable design for college and school students.",
    translations: {
      ta: "ஆசுஸ் விவோபுக் 15 மெல்லிய லேப்டாப், கல்லூரி மாணவர்களுக்கான சிறந்த விலை.",
      hi: "आसुस विवोबुक 15 हल्का लैपटॉप, कॉलेज स्टूडेंट्स के लिए किफायती और टिकाऊ।",
      te: "ఆసుస్ వివోబుక్ 15 తేలికపాటి ల్యాప్‌టాప్ కాలేజ్ విద్యార్థుల కోసం.",
      ml: "ആസുസ് വിവോബുക്ക് 15 സ്റ്റുഡന്റ് ലാപ്ടോപ്പ്.",
      kn: "ಆಸುಸ್ ವಿವೋಬುಕ್ 15 ವಿದ್ಯಾರ್ಥಿ ಲ್ಯಾಪ್‌ಟಾಪ್."
    },
    keywords: ["laptop", "asus laptop", "budget laptop", "college laptop", "student laptop", "laptop under 40000", "லேப்டாப்", "ஆசுஸ்", "लैपटॉप"]
  },

  // FOOTWEAR
  {
    id: "PROD-FT01",
    name: "AeroSprint Lightweight Running Shoes",
    category: "Footwear",
    price: 899,
    originalPrice: 1499,
    rating: 4.6,
    reviewsCount: 128,
    stock: 24,
    inStock: true,
    brand: "AeroStep",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Navy Blue", "Slate Grey"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    description: "Ultra-cushioned breathable mesh running shoes with anti-skid EVA sole. Perfect for daily walking and running.",
    translations: {
      ta: "அதிவேக மெஷ் ரன்னிங் ஷூ, தினசரி நடைபயிற்சிக்கு ஏற்றது.",
      hi: "दौड़ने और चलने के लिए अल्ट्रा-लाइटवेट रनिंग जूते।",
      te: "రోజువారీ నడక మరియు పరుగు కోసం తేలికపాటి రన్నింగ్ షూస్.",
      ml: "ദൈനംദിന നടത്തത്തിനും ഓട്ടത്തിനും അനുയോജ്യമായ ഭാരം കുറഞ്ഞ ഷൂസുകൾ.",
      kn: "ದೈನಂದಿನ ಓಟ ಮತ್ತು ನಡಿಗೆಗೆ ಹಗುರವಾದ ರನ್ನಿಂಗ್ ಶೂಗಳು."
    },
    keywords: ["shoe", "running shoe", "footwear", "black shoe", "sneaker", "ஷூ", "காலணி", "ஜூதா", "shoes", "aerosprint", "sports shoes"]
  },
  {
    id: "PROD-FT02",
    name: "Classic Leather Formal Shoes",
    category: "Footwear",
    price: 999,
    originalPrice: 1899,
    rating: 4.7,
    reviewsCount: 89,
    stock: 14,
    inStock: true,
    brand: "OxFord Pro",
    sizes: ["7", "8", "9", "10"],
    colors: ["Black", "Dark Brown"],
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=80",
    description: "Premium synthetic leather formal dress shoes with padded insole for office and festive wear.",
    translations: {
      ta: "அலுவலக மற்றும் விழா உடைகளுக்கு ஏற்ற உயர்தர ஃபார்மல் ஷூ.",
      hi: "कार्यालय और शादी-समारोह के लिए क्लासिक लेदर फॉर्मल जूते।",
      te: "ఆఫీస్ మరియు శుభకార్యాల కోసం క్లాసిక్ లెదర్ ఫార్మల్ షూస్.",
      ml: "ഓഫീസ് വസ്ത്രങ്ങൾക്ക് അനുയോജ്യമായ ക്ലാസിക് ഫോർമൽ ഷൂസ്.",
      kn: "ಕಛೇರಿ ಮತ್ತು ಹಬ್ಬದ ಉಡುಪುಗಳಿಗೆ ಪ್ರೀಮಿಯಂ ಲೆದರ್ ಫಾರ್ಮಲ್ ಶೂಗಳು."
    },
    keywords: ["formal shoe", "leather shoe", "office shoe", "black formal", "black shoe", "ஷூ", "ஃபார்மல் ஷூ", "लेदर शूज"]
  },
  {
    id: "PROD-FT03",
    name: "Casual Streetwear Canvas Sneakers",
    category: "Footwear",
    price: 749,
    originalPrice: 1199,
    rating: 4.4,
    reviewsCount: 65,
    stock: 18,
    inStock: true,
    brand: "UrbanWalk",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["White", "Black", "Olive Green"],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80",
    description: "Durable canvas lace-up sneakers with vulcanized rubber sole for college and casual outings.",
    translations: {
      ta: "கேன்வாஸ் ஸ்னீக்கர்கள், கல்லூரி மற்றும் கேஷுவல் உடைகளுக்கு ஏற்றது.",
      hi: "दैनिक उपयोग के लिए स्टाइलिश और टिकाऊ कैनवास स्नीकर्स।",
      te: "కాలేజ్ మరియు క్యాజువల్ ఉపయోగం కోసం కాన్వాస్ స్నీకర్స్.",
      ml: "കാഷ്വൽ ഉപയോഗത്തിന് അനുയോജ്യമായ ക്യാൻവാസ് സ്‌നീക്കേഴ്‌സ്.",
      kn: "ಕ್ಯಾಶುಯಲ್ ಬಳಕೆಗೆ ಬಾಳಿಕೆ ಬರುವ ಕ್ಯಾನ್ವಾಸ್ ಸ್ನೀಕರ್ಸ್."
    },
    keywords: ["sneakers", "canvas shoes", "white shoes", "casual shoes", "ஷூ", "ஸ்னீக்கர்", "स्नीकर्स"]
  },
  {
    id: "PROD-FT04",
    name: "Soft Orthopedic Daily Slippers",
    category: "Footwear",
    price: 399,
    originalPrice: 699,
    rating: 4.5,
    reviewsCount: 210,
    stock: 40,
    inStock: true,
    brand: "ComfortWalk",
    sizes: ["6", "7", "8", "9"],
    colors: ["Blue", "Brown", "Black"],
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop&q=80",
    description: "Super-soft acupressure memory foam slippers for heel pain relief and home wear.",
    translations: {
      ta: "மென்மையான மெமரி ஃபோம் செருப்பு, குதிகால் வலி நிவாரணத்திற்கு சிறந்தது.",
      hi: "पैरों के आराम और एड़ी के दर्द के लिए सॉफ्ट ऑर्थोपेडिक चप्पल।",
      te: "పాదాల సౌకర్యం కోసం మృదువైన ఆర్థోపెడిక్ చెప్పులు.",
      ml: "ഹീൽ വേദന ശമിപ്പിക്കാൻ മൃദുവായ ദൈനംദിന സ്ലിപ്പറുകൾ.",
      kn: "ಹಿಮ್ಮಡಿ ನೋವು ನಿವಾರಣೆಗಾಗಿ ಮೃದುವಾದ ಆರ್ಥೋಪೆಡಿಕ್ ಚಪ್ಪಲಿಗಳು."
    },
    keywords: ["slipper", "chappal", "sandals", "slippers", "செருப்பு", "சப்பல்", "चप्पल", "स्लिपर"]
  },

  // CLOTHING - SHIRTS & T-SHIRTS
  {
    id: "PROD-CL01",
    name: "Pure Cotton Royal Blue Slim Fit Shirt",
    category: "Clothing",
    price: 699,
    originalPrice: 1299,
    rating: 4.6,
    reviewsCount: 154,
    stock: 35,
    inStock: true,
    brand: "Raymond Heritage",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Royal Blue", "Sky Blue"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
    description: "100% combed cotton breathable full sleeve formal shirt in royal blue tone.",
    translations: {
      ta: "100% தூய பருத்தி நீல நிற சட்டை, அருமையான பொருத்தம்.",
      hi: "100% शुद्ध सूती रॉयल ब्लू स्लिम फिट फॉर्मल शर्ट।",
      te: "100% స్వచ్ఛమైన కాటన్ రాయల్ బ్లూ ఫార్మల్ షర్ట్.",
      ml: "100% കോട്ടൺ റോയൽ ബ്ലൂ സ്ലിം ഫിറ്റ് ഷർട്ട്.",
      kn: "100% ಶುದ್ಧ ಹತ್ತಿ ರಾಯಲ್ ಬ್ಲೂ ಸ್ಲಿಮ್ ಫಿಟ್ ಶರ್ಟ್."
    },
    keywords: ["shirt", "blue shirt", "cotton shirt", "formal shirt", "சட்டை", "நீல சட்டை", "शर्ट", "नीली शर्ट", "cotton"]
  },
  {
    id: "PROD-CL02",
    name: "Classic Navy Blue Casual Oxford Shirt",
    category: "Clothing",
    price: 799,
    originalPrice: 1399,
    rating: 4.8,
    reviewsCount: 94,
    stock: 20,
    inStock: true,
    brand: "CottonClub",
    sizes: ["M", "L", "XL"],
    colors: ["Navy Blue", "Dark Blue"],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80",
    description: "Classic textured navy blue Oxford cotton shirt with button-down collar.",
    translations: {
      ta: "நேவி ப்ளூ காட்டன் கேஷுவல் சட்டை, உயர்தர தரம்.",
      hi: "प्रीमियम नेवी ब्लू कॉटन कैजुअल शर्ट।",
      te: "ప్రీమియం నేవీ బ్లూ కాటన్ క్యాజువల్ షర్ట్.",
      ml: "പ്രീമിയം നേവി ബ്ലൂ കോട്ടൺ കാഷ്വൽ ഷർട്ട്.",
      kn: "ಪ್ರೀಮಿಯಂ ನೇವಿ ಬ್ಲೂ ಕಾಟನ್ ಕ್ಯಾಶುಯಲ್ ಶರ್ಟ್."
    },
    keywords: ["shirt", "blue shirt", "navy shirt", "casual shirt", "சட்டை", "शर्ट", "नीली शर्ट"]
  },
  {
    id: "PROD-CL03",
    name: "Sky Blue Linen Half-Sleeve Summer Shirt",
    category: "Clothing",
    price: 549,
    originalPrice: 999,
    rating: 4.5,
    reviewsCount: 78,
    stock: 16,
    inStock: true,
    brand: "LinenCraft",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sky Blue", "White", "Sea Green"],
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80",
    description: "Feather-light linen blend half sleeve shirt designed for hot summer days.",
    translations: {
      ta: "கோடை காலத்திற்கான லினன் அரைக்கை சட்டை.",
      hi: "गर्मियों के लिए हल्की सूती और लिनन की हाफ-स्लीव शर्ट।",
      te: "వేసవి కోసం తేలికపాటి లినెన్ హాఫ్-స్లీవ్ షర్ట్.",
      ml: "വേനൽക്കാലത്തിന് അനുയോജ്യമായ ലിനൻ ഹാഫ് സ്ലീവ് ഷർട്ട്.",
      kn: "ಬೇಸಿಗೆಗೆ ಹಗುರವಾದ ಲಿನನ್ ಹಾಫ್-ಸ್ಲೀವ್ ಶರ್ಟ್."
    },
    keywords: ["shirt", "blue shirt", "half sleeve", "linen shirt", "summer shirt", "சட்டை", "அரைக்கை சட்டை", "शर्ट"]
  },
  {
    id: "PROD-CL04",
    name: "Crimson Red Polo Neck T-Shirt",
    category: "Clothing",
    price: 499,
    originalPrice: 899,
    rating: 4.5,
    reviewsCount: 112,
    stock: 28,
    inStock: true,
    brand: "PoloFit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Crimson", "Maroon"],
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80",
    description: "Bio-washed pique cotton solid polo t-shirt with ribbed collar and buttons.",
    translations: {
      ta: "சிவப்பு நிற போலோ காலர் டி-சர்ட், 100% பருத்தி.",
      hi: "100% कॉटन लाल रंग की पोलो नेक टी-शर्ट।",
      te: "ఎరుపు రంగు పోలో కాలర్ టీ-షర్ట్.",
      ml: "ചുവന്ന പോളോ നെക്ക് ടി-ഷർട്ട്.",
      kn: "ಕೆಂಪು ಪೋಲೊ ನೆಕ್ ಟೀ-ಶರ್ಟ್."
    },
    keywords: ["red shirt", "t-shirt", "red t-shirt", "polo shirt", "சிவப்பு சட்டை", "டிசர்ட்", "लाल शर्ट", "टी शर्ट"]
  },
  {
    id: "PROD-CL05",
    name: "Festive Traditional Kanchipuram Silk Saree",
    category: "Clothing",
    price: 2499,
    originalPrice: 4999,
    rating: 4.9,
    reviewsCount: 310,
    stock: 12,
    inStock: true,
    brand: "Kanchi Weaves",
    sizes: ["Free Size (6.3m)"],
    colors: ["Maroon Gold", "Peacock Blue", "Deep Green"],
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
    description: "Exquisite woven zari border traditional art silk saree with rich matching blouse piece.",
    translations: {
      ta: "பாரம்பரிய காஞ்சிபுரம் பட்டுப் புடவை ஜரிகை வேலைப்பாட்டுடன்.",
      hi: "शादी और त्योहारों के लिए पारंपरिक रेशमी कांजीवरम साड़ी।",
      te: "సాంప్రదాయ కాంచీపురం పట్టు చీర జరీ అంచుతో.",
      ml: "പരമ്പരാഗത കാഞ്ചീപുരം പട്ട് സാരി.",
      kn: "ಸಾಂಪ್ರದಾಯಿಕ ಕಾಂಚಿಪುರಂ ರೇಷ್ಮೆ ಸೀರೆ."
    },
    keywords: ["saree", "silk saree", "kanchipuram saree", "traditional saree", "புடவை", "பட்டு புடவை", "साड़ी", "सिल्क साड़ी"]
  },
  {
    id: "PROD-EL05",
    name: "AuraFit Smart Health Tracker Watch",
    category: "Smartwatches & Wearables",
    price: 1499,
    originalPrice: 3499,
    rating: 4.6,
    reviewsCount: 188,
    stock: 22,
    inStock: true,
    brand: "AuraPulse",
    sizes: ["1.85-inch HD"],
    colors: ["Space Grey", "Rose Gold", "Jet Black"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    description: "Full touchscreen smartwatch with heart rate, SpO2, Bluetooth calling, and 100+ sports modes.",
    translations: {
      ta: "ப்ளூடூத் காலிங் மற்றும் இதயத் துடிப்பு சென்சார் கொண்ட ஸ்மார்ட் வாட்ச்.",
      hi: "हार्ट रेट मॉनिटर और ब्लूटूथ कॉलिंग वाली स्मार्टवॉच।",
      te: "బ్లూటూత్ కాలింగ్ మరియు హార్ట్ రేట్ మానిటర్‌తో స్మార్ట్‌వాచ్.",
      ml: "ബ്ലൂടൂത്ത് കോളിംഗ് ഉള്ള സ്മാർട്ട് വാച്ച്.",
      kn: "ಬ್ಲೂಟೂತ್ ಕಾಲಿಂಗ್ ಹೊಂದಿರುವ ಸ್ಮಾರ್ಟ್‌ವಾಚ್."
    },
    keywords: ["smartwatch", "watch", "smart watch", "fitness band", "வாட்ச்", "கடிகாரம்", "ஸ்மார்ட் வாட்ச்", "घड़ी", "स्मार्टवॉच"]
  },
  {
    id: "PROD-EL06",
    name: "PowerBlast 20000mAh 22.5W Fast Power Bank",
    category: "Electronics & Audio",
    price: 999,
    originalPrice: 1999,
    rating: 4.8,
    reviewsCount: 240,
    stock: 19,
    inStock: true,
    brand: "VoltMax",
    sizes: ["20000 mAh"],
    colors: ["Matte Black", "Cobalt Blue"],
    image: "https://images.unsplash.com/photo-1609592426861-55536e0d9b4b?w=600&auto=format&fit=crop&q=80",
    description: "High capacity dual USB + Type-C power bank with digital percentage battery LED display.",
    translations: {
      ta: "20000mAh வேகமான பவர் பேங்க், ஒரே நேரத்தில் 3 சாதனங்களை சார்ஜ் செய்யலாம்.",
      hi: "20000mAh का फास्ट चार्जिंग पावर बैंक डिजिटल डिस्प्ले के साथ।",
      te: "20000mAh ఫాస్ట్ ఛార్జింగ్ పవర్ బ్యాంక్.",
      ml: "20000mAh ഫാസ്റ്റ് ചാർജിംഗ് പവർ ബാങ്ക്.",
      kn: "20000mAh ವೇಗದ ಚಾರ್ಜಿಂಗ್ ಪವರ್ ಬ್ಯಾಂಕ್."
    },
    keywords: ["power bank", "charger", "battery pack", "fast charger", "பவர் பேங்க்", "சார்ஜர்", "पावर बैंक"]
  },

  // GROCERY & DAILY ESSENTIALS
  {
    id: "PROD-GR-RICE01",
    name: "Premium Ponni Rice (1 Kg)",
    category: "Grocery",
    price: 120,
    originalPrice: 150,
    rating: 4.6,
    reviewsCount: 380,
    stock: 60,
    inStock: true,
    brand: "Cauvery Farm",
    sizes: ["1 Kg", "5 Kg"],
    colors: ["White"],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    description: "High quality premium Ponni boiled rice, aged for 12 months for soft and fluffy cooking.",
    translations: {
      ta: "பிரீமியம் பொன்னி அரிசி (1 கிலோ), சிறந்த தரம் மற்றும் சுவை.",
      en: "Premium Ponni Boiled Rice (1 Kg), top quality and texture."
    },
    keywords: ["rice", "premium rice", "ponni rice", "arisi", "அரிசி", "நல்ல அரிசி", "quality rice"]
  },
  {
    id: "PROD-GR-RICE02",
    name: "Organic Brown Rice (1 Kg)",
    category: "Grocery",
    price: 145,
    originalPrice: 180,
    rating: 4.7,
    reviewsCount: 290,
    stock: 40,
    inStock: true,
    brand: "Organic India",
    sizes: ["1 Kg", "2 Kg"],
    colors: ["Brown"],
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80",
    description: "100% certified organic unpolished brown rice packed with dietary fiber and essential nutrients.",
    translations: {
      ta: "இயற்கை பிரவுன் அரிசி (1 கிலோ), சத்துக்கள் நிறைந்த ஆரோக்கியமான அரிசி.",
      en: "Certified Organic Brown Rice (1 Kg), rich in fiber and minerals."
    },
    keywords: ["rice", "organic rice", "brown rice", "arisi", "அரிசி", "ஆர்கானிக் அரிசி", "quality rice"]
  },
  {
    id: "PROD-GR-RICE03",
    name: "Royal Basmati Rice (1 Kg)",
    category: "Grocery",
    price: 160,
    originalPrice: 210,
    rating: 4.5,
    reviewsCount: 450,
    stock: 45,
    inStock: true,
    brand: "India Gate",
    sizes: ["1 Kg", "5 Kg"],
    colors: ["Pearl White"],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    description: "Extra long grain royal aromatic basmati rice for fragrant biryani and pulao.",
    translations: {
      ta: "ராயல் பாஸ்மதி அரிசி (1 கிலோ), பிரியாணி மற்றும் புலாவ் செய்ய சிறந்த நறுமணம் கொண்ட அரிசி.",
      en: "Royal Long Grain Basmati Rice (1 Kg), aromatic and slender."
    },
    keywords: ["rice", "basmati rice", "arisi", "பாஸ்மதி அரிசி", "அரிசி", "biryani rice"]
  },
  {
    id: "PROD-GR01",
    name: "Ponni Boiled Rice Premium Grade (5 Kg)",
    category: "Grocery",
    price: 340,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 520,
    stock: 50,
    inStock: true,
    brand: "Cauvery Farm",
    sizes: ["5 Kg", "10 Kg", "25 Kg"],
    colors: ["White"],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    description: "Aged premium Tanjore Ponni boiled rice, smooth texture and rich aroma.",
    translations: {
      ta: "தஞ்சாவூர் பொன்னி புழுங்கல் அரிசி (5 கிலோ), மிகச் சிறந்த தரம்.",
      en: "Premium aged Tanjore Ponni boiled rice (5 Kg), soft texture."
    },
    keywords: ["rice", "ponni rice", "boiled rice", "arisi", "அரிசி", "பொன்னி அரிசி"]
  },
  {
    id: "PROD-GR02",
    name: "Cold Pressed Groundnut Oil (1 Litre)",
    category: "Grocery",
    price: 240,
    originalPrice: 290,
    rating: 4.9,
    reviewsCount: 340,
    stock: 35,
    inStock: true,
    brand: "Grama Naturals",
    sizes: ["1 Litre", "5 Litre"],
    colors: ["Golden"],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
    description: "100% pure traditional wood-pressed peanut oil with zero chemicals and natural aroma.",
    translations: {
      ta: "மரச்செக்கு கடலை எண்ணெய் (1 லிட்டர்), 100% சுத்தமானது.",
      hi: "लकड़ी की घानी से निकाला हुआ शुद्ध मूंगफली का तेल (1 लीटर)।",
      te: "గానుగ వేరుశెనగ నూనె (1 లీటరు).",
      ml: "മരച്ചെക്ക് നിലക്കടല എണ്ണ (1 ലിറ്റർ).",
      kn: "ಗಾಣದ ಕಡಲೆಕಾಯಿ ಎಣ್ಣೆ (1 ಲೀಟರ್)."
    },
    keywords: ["oil", "cooking oil", "groundnut oil", "kadala ennai", "எண்ணெய்", "கடலை எண்ணெய்", "तेल", "मूंगफली तेल"]
  },
  {
    id: "PROD-GR03",
    name: "Filter Coffee Powder Traditional Chicory Blend (500g)",
    category: "Grocery",
    price: 220,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 410,
    stock: 45,
    inStock: true,
    brand: "Madras Kaapi",
    sizes: ["250g", "500g", "1 Kg"],
    colors: ["Dark Roast"],
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80",
    description: "Authentic 80:20 Arabica and Plantation A coffee with premium French chicory.",
    translations: {
      ta: "பாரம்பரிய கும்பகோணம் ஃபில்டர் காபி தூள் (500 கிராம்).",
      hi: "पारंपरिक साउथ इंडियन फिल्टर कॉफी पाउडर (500 ग्राम)।",
      te: "సాంప్రదాయ సౌత్ ఇండియన్ ఫిల్టర్ కాఫీ పౌడర్ (500 గ్రా).",
      ml: "പരമ്പരാഗത ഫിൽട്ടർ കോഫി പൗഡർ (500 ഗ്രാം).",
      kn: "ಸಾಂಪ್ರದಾಯಿಕ ಫಿಲ್ಟರ್ ಕಾಫಿ ಪುಡಿ (500 ಗ್ರಾಂ)."
    },
    keywords: ["coffee", "filter coffee", "kaapi", "coffee powder", "காபி", "காபி தூள்", "कॉफी", "कॉफी पाउडर"]
  },

  // RESTAURANT & READY FOOD
  {
    id: "PROD-FD01",
    name: "Special Thalassery Dum Biryani (Chicken)",
    category: "Restaurant",
    price: 260,
    originalPrice: 320,
    rating: 4.8,
    reviewsCount: 390,
    stock: 25,
    inStock: true,
    brand: "Malabar Kitchen",
    sizes: ["Single", "Full (Feeds 2)"],
    colors: ["Fragrant Yellow"],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    description: "Short grain Kaima rice chicken dum biryani slow cooked in ghee with boiled egg & raita.",
    translations: {
      ta: "தலச்சேரி சிக்கன் பிரியாணி முட்டை மற்றும் ரைத்தாவுடன்.",
      hi: "स्वादिष्ट चिकन दम बिरयानी रायते और उबले अंडे के साथ।",
      te: "చికెన్ దమ్ బిర్యానీ రాయితా మరియు కోడిగుడ్డుతో.",
      ml: "തലശ്ശേരി ചിക്കൻ ദം ബിരിയാണി.",
      kn: "ರುಚಿಕರವಾದ ಚಿಕನ್ ದಮ್ ಬಿರಿಯಾನಿ."
    },
    keywords: ["biryani", "chicken biryani", "food", "lunch", "dinner", "பிரியாணி", "சிக்கன் பிரியாணி", "बिरयानी", "चिकन बिरयानी"]
  },
  {
    id: "PROD-FD02",
    name: "Crispy Masala Dosa with 3 Chutneys & Sambar",
    category: "Restaurant",
    price: 90,
    originalPrice: 120,
    rating: 4.9,
    reviewsCount: 610,
    stock: 50,
    inStock: true,
    brand: "Saravana Bhavan Special",
    sizes: ["Regular", "Ghee Roast"],
    colors: ["Golden Crisp"],
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    description: "Golden crispy fermented rice crepe stuffed with spiced potato masala, served with pure ghee.",
    translations: {
      ta: "மொறுமொறு மசாலா தோசை 3 வகை சட்னி மற்றும் சாம்பாருடன்.",
      hi: "गरमा-गरम क्रिस्पी मसाला डोसा सांभर और 3 चटनी के साथ।",
      te: "క్రిస్పీ మసాలా దోశ సాంబార్ మరియు 3 చట్నీలతో.",
      ml: "ക്രിസ്പി മസാല ദോശ സാമ്പാറും ചമ്മന്തിയും.",
      kn: "ಗರಿಗರಿಯಾದ ಮಸಾಲ ದೋಸೆ ಸಾಂಬಾರ್ ಮತ್ತು ಚಟ್ನಿಯೊಂದಿಗೆ."
    },
    keywords: ["dosa", "masala dosa", "tiffin", "breakfast", "தோசை", "மசாலா தோசை", "डोसा", "मसाला डोसा"]
  }
];

export const STORE_POLICIES_FAQ = [
  {
    topic: "hours",
    keywords: ["working hours", "open time", "close time", "closing time", "opening time", "timing", "timings", "hours", "திறந்திருக்கும் நேரம்", "நேரம்", "समय", "खुलने का समय", "సమయం", "സമയം", "ಸಮಯ"],
    answer: {
      en: "We are open Monday to Friday from 9:00 AM to 9:30 PM, and on weekends from 8:30 AM to 10:00 PM.",
      ta: "எங்கள் கடை திங்கள் முதல் வெள்ளி வரை காலை 9:00 முதல் இரவு 9:30 மணி வரையிலும், வார இறுதி நாட்களில் காலை 8:30 முதல் இரவு 10:00 மணி வரையிலும் திறந்திருக்கும்.",
      hi: "हमारी दुकान सोमवार से शुक्रवार सुबह 9:00 से रात 9:30 बजे तक और सप्ताहांत में सुबह 8:30 से रात 10:00 बजे तक खुली रहती है।",
      te: "మా దుకాణం సోమవారం నుండి శుక్రవారం వరకు ఉదయం 9:00 నుండి రాత్రి 9:30 వరకు తెరిచి ఉంటుంది.",
      ml: "തിങ്കൾ മുതൽ വെള്ളി വരെ രാവിലെ 9:00 മുതൽ രാത്രി 9:30 വരെയും വാരാന്ത്യങ്ങളിൽ 8:30 മുതൽ 10:00 വരെയും തുറന്നിരിക്കും.",
      kn: "ನಾವು ಸೋಮವಾರದಿಂದ ಶುಕ್ರವಾರದವರೆಗೆ ಬೆಳಿಗ್ಗೆ 9:00 ರಿಂದ ರಾತ್ರಿ 9:30 ರವರೆಗೆ ತೆರೆದಿರುತ್ತೇವೆ."
    }
  },
  {
    topic: "delivery",
    keywords: ["delivery", "home delivery", "deliver", "shipping", "radius", "how far", "டோர் டெலிவரி", "டெலிவரி", "வீட்டிற்கே டெலிவரி", "ஹோம் டெலிவரி", "होम डिलीवरी", "डिलीवरी", "డెలివరీ", "ഡെലിവറി", "ಡೆಲಿವರಿ"],
    answer: {
      en: "Yes! We offer fast home delivery within a 12 km radius. Free delivery on orders above ₹499.",
      ta: "ஆம்! 12 கி.மீ சுற்றளவில் 45 முதல் 90 நிமிடங்களில் ஹோம் டெலிவரி செய்கிறோம். ₹499க்கு மேல் இலவச டெலிவரி.",
      hi: "हाँ! हम 12 किलोमीटर के दायरे में 45 से 90 मिनट के भीतर होम डिलीवरी करते हैं। ₹499 से अधिक के ऑर्डर पर मुफ्त डिलीवरी।",
      te: "అవును! మేము 12 కి.మీ పరిధిలో ఉచిత హోమ్ డెలివరీ అందిస్తున్నాము (₹499 పైన).",
      ml: "അതെ! 12 കി.മീ ചുറ്റളവിൽ ഞങ്ങൾ വേഗത്തിൽ ഹോം ഡെലിവറി നൽകുന്നു.",
      kn: "ಹೌದು! ನಾವು 12 ಕಿ.ಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ವೇಗದ ಹೋಮ್ ಡೆಲಿವರಿ ನೀಡುತ್ತೇವೆ."
    }
  },
  {
    topic: "return",
    keywords: ["return", "exchange", "refund", "replace", "money back", "ரிட்டர்ன்", "மாற்றிக்கொள்ளலாமா", "ரிட்டர்ன் பாலிசி", "रिटर्न", "वापसी", "రీఫండ్", "തിരികെ നൽകൽ", "ಹಿಂತಿರುಗಿಸುವುದು"],
    answer: {
      en: "We offer a 7-day hassle-free return and exchange policy for unused clothing with tags, and electronics with bills.",
      ta: "பயன்படுத்தப்படாத உடைகள் மற்றும் எலக்ட்ரானிக்ஸ் பொருட்களுக்கு 7 நாட்கள் எளிதான ரிட்டர்ன் & எக்ஸ்சேஞ்ச் வசதி உண்டு.",
      hi: "टैग लगे नए कपड़ों और इनवॉइस वाले इलेक्ट्रॉनिक्स पर 7 दिनों की आसान वापसी और एक्सचेंज नीति उपलब्ध है।",
      te: "7 రోజుల సులభమైన రిటర్న్ మరియు ఎక్స్ఛేంజ్ పాలసీ అందుబాటులో ఉంది.",
      ml: "7 ദിവസത്തെ എളുപ്പത്തിലുള്ള റിട്ടേൺ & എക്സ്ചേഞ്ച് സൗകര്യം ലഭ്യമാണ്.",
      kn: "7 ದಿನಗಳ ಸುಲಭ ರಿಟರ್ನ್ ಮತ್ತು ಎಕ್ಸ್‌ಚೇಂಜ್ ಸೌಲಭ್ಯವಿದೆ."
    }
  },
  {
    topic: "payment",
    keywords: ["payment", "upi", "gpay", "phonepe", "paytm", "cash on delivery", "cod", "card", "கட்டணம்", "ஜிபே", "போன்பே", "பணம்", "भुगतान", "गूगल पे", "ఫోన్‌పే", "പേയ്മെന്റ്", "ಪಾವತಿ"],
    answer: {
      en: "We accept all UPI payments (GPay, PhonePe, Paytm), Cash on Delivery, Credit & Debit Cards, and Net Banking.",
      ta: "அனைத்து UPI (GPay, PhonePe), கேஷ் ஆன் டெலிவரி, மற்றும் கிரெடிட்/டெபிட் கார்டுகளை ஏற்றுக்கொள்கிறோம்.",
      hi: "हम सभी यूपीआई (GPay, PhonePe), कैश ऑन डिलीवरी, और क्रेडिट/डेबिट कार्ड स्वीकार करते हैं।",
      te: "మేము అన్ని UPI చెల్లింపులు, క్యాష్ ఆన్ డెలివరీ మరియు కార్డ్‌లను అంగీకరిస్తాము.",
      ml: "ഞങ്ങൾ എല്ലാ UPI പേയ്‌മെന്റുകളും ക്യാഷ് ഓൺ ഡെലിവറിയും സ്വീകരിക്കുന്നു.",
      kn: "ನಾವು ಎಲ್ಲಾ ಯುಪಿಐ ಮತ್ತು ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ ಪಾವತಿಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತೇವೆ."
    }
  },
  {
    topic: "location",
    keywords: ["location", "address", "where is store", "how to reach", "directions", "கடை எங்கு உள்ளது", "முகவரி", "இடம்", "पता", "दुकान कहाँ है", "చిరునామా", "മേൽവിലാസം", "ವಿಳಾಸ"],
    answer: {
      en: "We are located at 42, Ranganathan Street, T. Nagar, Chennai - 600017 (Near T. Nagar Bus Terminus).",
      ta: "எங்கள் கடை எண் 42, ரங்கநாதன் தெரு, தி. நகர், சென்னை - 600017 (தி. நகர் பேருந்து நிலையம் அருகில்) அமைந்துள்ளது.",
      hi: "हम 42, रंगनाथन स्ट्रीट, टी. नगर, चेन्नई - 600017 (टी. नगर बस स्टैंड के पास) में स्थित हैं।",
      te: "మా దుకాణం 42, రంగనాథన్ వీధి, టి. నగర్, చెన్నై - 600017 వద్ద ఉంది.",
      ml: "42, രംഗനാഥൻ സ്ട്രീറ്റ്, ടി. നഗർ, ചെന്നൈ - 600017 ലാണ് ഞങ്ങളുടെ സ്റ്റോർ.",
      kn: "ನಮ್ಮ ಮಳಿಗೆ 42, ರಂಗನಾಥನ್ ರಸ್ತೆ, ಟಿ. ನಗರ, ಚೆನ್ನೈ - 600017 ನಲ್ಲಿದೆ."
    }
  }
];

export const SAMPLE_DEMO_QUERIES = [
  { text: "வணக்கம்", query: "வணக்கம்", lang: "ta-IN", languageLabel: "தமிழ்", intent: "GENERAL_CONVERSATION", meaning: "Greeting: 'வணக்கம்! எப்படி உதவலாம்?'" },
  { text: "எனக்கு அரிசி வேண்டும்", query: "எனக்கு அரிசி வேண்டும்", lang: "ta-IN", languageLabel: "தமிழ்", intent: "PRODUCT_SEARCH", meaning: "Rice products (Ponni, Organic, Basmati)" },
  { text: "இந்த பொருளின் விலை என்ன?", query: "இந்த பொருளின் விலை என்ன?", lang: "ta-IN", languageLabel: "தமிழ்", intent: "PRODUCT_PRICE", meaning: "Product price inquiry" },
  { text: "எனக்கு red shirt வேண்டும்", query: "எனக்கு red shirt வேண்டும்", lang: "ta-IN", languageLabel: "தமிழ்", intent: "PRODUCT_SEARCH", meaning: "Red shirts under ₹500" },
  { text: "இந்த கடை எங்கே இருக்கு?", query: "இந்த கடை எங்கே இருக்கு?", lang: "ta-IN", languageLabel: "தமிழ்", intent: "BUSINESS_INFORMATION", meaning: "Store address, hours & phone card" },
  { text: "I need rice", query: "I need rice", lang: "en-IN", languageLabel: "English", intent: "PRODUCT_SEARCH", meaning: "English query for rice products" },
  { text: "enakku rice venum", query: "enakku rice venum", lang: "ta-IN", languageLabel: "தமிழ் (Tanglish)", intent: "PRODUCT_SEARCH", meaning: "Tanglish query for rice products" }
];

export const DEMO_PRESET_QUERIES = SAMPLE_DEMO_QUERIES;


