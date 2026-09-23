import { INITIAL_BUSINESS_PROFILE, INITIAL_PRODUCTS } from './inventoryData.js';

const STORAGE_KEYS = {
  PRODUCTS: 'voicemart_products_v1',
  BUSINESS: 'voicemart_business_v1',
  ORDERS: 'voicemart_orders_v1',
  QUERY_LOGS: 'voicemart_query_logs_v1',
  CUSTOMER: 'voicemart_customer_v1',
  CART: 'voicemart_cart_v1'
};

const INITIAL_ORDERS = [
  {
    id: "VM1018",
    customerName: "Karthik Raja",
    customerPhone: "+91 98402 11223",
    language: "Tamil (தமிழ்)",
    items: [
      { name: "AeroSprint Lightweight Running Shoes", size: "9", quantity: 1, price: 899 }
    ],
    totalAmount: 899,
    status: "Delivered",
    orderType: "Voice Order",
    timestamp: "Today, 10:15 AM",
    deliveryAddress: "14/2, North Usman Road, T. Nagar, Chennai"
  },
  {
    id: "VM1021",
    customerName: "Priya Sharma",
    customerPhone: "+91 97910 88776",
    language: "Hindi (हिन्दी)",
    items: [
      { name: "Pure Cotton Royal Blue Slim Fit Shirt", size: "L", quantity: 2, price: 699 }
    ],
    totalAmount: 1398,
    status: "Processing",
    orderType: "Voice Order",
    timestamp: "Today, 11:42 AM",
    deliveryAddress: "Flat 4B, Emerald Heights, Habibullah Road, Chennai"
  },
  {
    id: "VM1023",
    customerName: "Venkatesh S.",
    customerPhone: "+91 94441 55667",
    language: "English",
    items: [
      { name: "Ponni Boiled Rice Premium Grade (5 Kg)", size: "5 Kg", quantity: 2, price: 340 },
      { name: "Filter Coffee Powder Traditional (500g)", size: "500g", quantity: 1, price: 220 }
    ],
    totalAmount: 900,
    status: "Confirmed",
    orderType: "Voice Order",
    timestamp: "Today, 12:30 PM",
    deliveryAddress: "8, Venkatnarayana Road, T. Nagar, Chennai"
  }
];

const INITIAL_QUERY_LOGS = [
  { id: "LOG-01", query: "எனக்கு 1000 ரூபாய்க்குள் ஒரு நல்ல ஷூ வேண்டும்", language: "Tamil", intent: "Product Search", latency: "1.2s", confidence: "98%", status: "Success", timestamp: "10:14 AM" },
  { id: "LOG-02", query: "क्या आपके पास 500 के नीचे टी-शर्ट है?", language: "Hindi", intent: "Product Search", latency: "1.4s", confidence: "96%", status: "Success", timestamp: "10:28 AM" },
  { id: "LOG-03", query: "Do you have blue shirts under 800?", language: "English", intent: "Product Search", latency: "0.9s", confidence: "99%", status: "Success", timestamp: "10:55 AM" },
  { id: "LOG-04", query: "உங்கள் கடை எத்தனை மணிக்கு மூடும்?", language: "Tamil", intent: "Store Hours", latency: "0.8s", confidence: "97%", status: "Success", timestamp: "11:10 AM" },
  { id: "LOG-05", query: "Do you do home delivery?", language: "English", intent: "Home Delivery", latency: "0.7s", confidence: "99%", status: "Success", timestamp: "11:32 AM" },
  { id: "LOG-06", query: "I want two medium blue shirts", language: "English", intent: "Create Order", latency: "1.5s", confidence: "95%", status: "Success", timestamp: "11:41 AM" },
  { id: "LOG-07", query: "ఇందులో తక్కువ ధర ఏది?", language: "Telugu", intent: "Follow-up Cheapest", latency: "1.1s", confidence: "94%", status: "Success", timestamp: "12:05 PM" }
];

export const storageService = {
  getProducts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  },

  saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      ...product,
      id: `PROD-${Date.now().toString(36).toUpperCase()}`,
      rating: product.rating || 4.5,
      reviewsCount: product.reviewsCount || 1,
      inStock: product.stock > 0
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  },

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields, inStock: (updatedFields.stock ?? products[index].stock) > 0 };
      this.saveProducts(products);
      return products[index];
    }
    return null;
  },

  deleteProduct(id) {
    const products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
    return products;
  },

  getBusinessProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BUSINESS);
      return data ? JSON.parse(data) : INITIAL_BUSINESS_PROFILE;
    } catch {
      return INITIAL_BUSINESS_PROFILE;
    }
  },

  saveBusinessProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(profile));
  },

  getOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  },

  addOrder(order) {
    const orders = this.getOrders();
    const newOrder = {
      ...order,
      id: order.id || `VM${Math.floor(1000 + Math.random() * 9000)}`,
      status: order.status || 'Confirmed',
      timestamp: 'Just now'
    };
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return newOrder;
  },

  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      return orders[index];
    }
    return null;
  },

  getQueryLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUERY_LOGS);
      return data ? JSON.parse(data) : INITIAL_QUERY_LOGS;
    } catch {
      return INITIAL_QUERY_LOGS;
    }
  },

  logQuery({ query, language, intent, latency = '1.2s', confidence = '96%', status = 'Success' }) {
    const logs = this.getQueryLogs();
    const newLog = {
      id: `LOG-${Date.now().toString(36).toUpperCase()}`,
      query,
      language: language?.name || 'Tamil',
      intent,
      latency,
      confidence,
      status,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    logs.unshift(newLog);
    if (logs.length > 50) logs.pop();
    localStorage.setItem(STORAGE_KEYS.QUERY_LOGS, JSON.stringify(logs));
    return newLog;
  },

  getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }
};
