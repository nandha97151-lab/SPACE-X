// VOICEMART AI - Customer Purchase Dataset Store & Intelligence Engine
import { deriveCategory } from './datasetService.js';

// Pre-loaded seed dataset from customer purchase transactions (Customer Reference ID, Item Purchased, etc.)
export const SEED_CUSTOMER_PURCHASES = [
  { customerId: "4018", item: "Handbag", amount: 4619.0, date: "2023-02-05", rating: 4.2, paymentMethod: "Credit Card" },
  { customerId: "4115", item: "Tunic", amount: 2456.0, date: "2023-07-11", rating: 2.0, paymentMethod: "Credit Card" },
  { customerId: "4019", item: "Tank Top", amount: 2102.0, date: "2023-03-23", rating: 4.1, paymentMethod: "Cash" },
  { customerId: "4097", item: "Leggings", amount: 3126.0, date: "2023-03-15", rating: 3.2, paymentMethod: "Cash" },
  { customerId: "3997", item: "Wallet", amount: 3003.0, date: "2022-11-27", rating: 4.7, paymentMethod: "Cash" },
  { customerId: "4080", item: "Onesie", amount: 2914.0, date: "2022-12-11", rating: 4.5, paymentMethod: "Credit Card" },
  { customerId: "4055", item: "Jacket", amount: 2571.0, date: "2023-07-08", rating: 1.3, paymentMethod: "Cash" },
  { customerId: "3973", item: "Trousers", amount: 2419.0, date: "2022-11-10", rating: 4.6, paymentMethod: "Cash" },
  { customerId: "4044", item: "Jeans", amount: 4771.0, date: "2023-05-19", rating: 4.1, paymentMethod: "Cash" },
  { customerId: "4010", item: "Loafers", amount: 4233.0, date: "2023-06-11", rating: 3.8, paymentMethod: "Credit Card" },
  { customerId: "4108", item: "Slippers", amount: 2356.0, date: "2023-03-19", rating: 4.8, paymentMethod: "Credit Card" },
  { customerId: "4067", item: "Bowtie", amount: 4418.0, date: "2022-11-21", rating: 3.4, paymentMethod: "Cash" },
  { customerId: "4068", item: "Pajamas", amount: 3728.0, date: "2022-12-09", rating: 3.5, paymentMethod: "Credit Card" },
  { customerId: "4102", item: "Trench Coat", amount: 2130.0, date: "2023-01-29", rating: 4.8, paymentMethod: "Cash" },
  { customerId: "4044", item: "Handbag", amount: 2122.0, date: "2023-08-01", rating: 1.2, paymentMethod: "Credit Card" },
  { customerId: "4096", item: "Poncho", amount: 2383.0, date: "2023-04-10", rating: 3.7, paymentMethod: "Credit Card" },
  { customerId: "4017", item: "Gloves", amount: 2895.0, date: "2023-07-17", rating: 3.6, paymentMethod: "Credit Card" },
  { customerId: "4001", item: "Trench Coat", amount: 2952.0, date: "2023-06-13", rating: 2.2, paymentMethod: "Cash" },
  { customerId: "3976", item: "Slippers", amount: 4069.0, date: "2023-06-18", rating: 4.9, paymentMethod: "Credit Card" },
  { customerId: "4103", item: "Romper", amount: 4465.0, date: "2022-11-21", rating: 3.9, paymentMethod: "Credit Card" },
  { customerId: "4081", item: "T-shirt", amount: 2108.0, date: "2023-03-25", rating: 4.0, paymentMethod: "Cash" },
  { customerId: "3986", item: "Gloves", amount: 4298.0, date: "2023-04-05", rating: 4.2, paymentMethod: "Cash" },
  { customerId: "4108", item: "Jeans", amount: 2814.0, date: "2023-02-11", rating: 4.4, paymentMethod: "Credit Card" },
  { customerId: "4109", item: "Flip-Flops", amount: 4932.0, date: "2022-12-20", rating: 4.0, paymentMethod: "Credit Card" },
  { customerId: "4075", item: "Tunic", amount: 4661.0, date: "2023-04-12", rating: 1.2, paymentMethod: "Credit Card" },
  { customerId: "4040", item: "Shorts", amount: 4872.0, date: "2023-08-25", rating: 3.8, paymentMethod: "Cash" },
  { customerId: "4099", item: "Blazer", amount: 4232.0, date: "2022-10-25", rating: 2.7, paymentMethod: "Credit Card" },
  { customerId: "3981", item: "Boots", amount: 3718.0, date: "2023-09-10", rating: 2.8, paymentMethod: "Credit Card" },
  { customerId: "4070", item: "Poncho", amount: 2902.0, date: "2023-08-04", rating: 4.9, paymentMethod: "Cash" },
  { customerId: "4002", item: "Belt", amount: 3839.0, date: "2023-05-26", rating: 1.8, paymentMethod: "Cash" },
  { customerId: "4035", item: "Tunic", amount: 4413.0, date: "2022-12-23", rating: 1.2, paymentMethod: "Credit Card" },
  { customerId: "4060", item: "Boots", amount: 3139.0, date: "2023-01-26", rating: 3.4, paymentMethod: "Credit Card" },
  { customerId: "3974", item: "Flip-Flops", amount: 2026.0, date: "2023-04-16", rating: 4.0, paymentMethod: "Cash" },
  { customerId: "4110", item: "Hoodie", amount: 2653.0, date: "2022-10-11", rating: 4.2, paymentMethod: "Credit Card" },
  { customerId: "3984", item: "Sweater", amount: 4859.0, date: "2022-12-19", rating: 5.0, paymentMethod: "Cash" },
  { customerId: "4109", item: "Blouse", amount: 3731.0, date: "2023-03-02", rating: 3.5, paymentMethod: "Credit Card" },
  { customerId: "4054", item: "Swimsuit", amount: 3393.0, date: "2023-02-28", rating: 4.3, paymentMethod: "Cash" },
  { customerId: "4040", item: "Kimono", amount: 3138.0, date: "2023-05-12", rating: 3.6, paymentMethod: "Credit Card" },
  { customerId: "4083", item: "Cardigan", amount: 2636.0, date: "2023-04-09", rating: 1.7, paymentMethod: "Cash" },
  { customerId: "4122", item: "Socks", amount: 2881.0, date: "2023-02-22", rating: 3.4, paymentMethod: "Credit Card" },
  { customerId: "3972", item: "Pants", amount: 3378.0, date: "2023-05-06", rating: 3.6, paymentMethod: "Cash" },
  { customerId: "3980", item: "Pajamas", amount: 2418.0, date: "2023-05-26", rating: 2.2, paymentMethod: "Credit Card" },
  { customerId: "4012", item: "Scarf", amount: 2379.0, date: "2023-05-29", rating: 2.9, paymentMethod: "Credit Card" },
  { customerId: "3992", item: "Backpack", amount: 101.0, date: "2022-12-13", rating: 1.3, paymentMethod: "Credit Card" },
  { customerId: "4105", item: "Dress", amount: 164.0, date: "2022-10-20", rating: 3.2, paymentMethod: "Credit Card" },
  { customerId: "4119", item: "Boots", amount: 21.0, date: "2023-04-03", rating: 3.9, paymentMethod: "Cash" },
  { customerId: "3957", item: "Camisole", amount: 147.0, date: "2022-11-04", rating: 4.7, paymentMethod: "Cash" },
  { customerId: "3994", item: "Loafers", amount: 145.0, date: "2023-05-16", rating: 3.9, paymentMethod: "Cash" },
  { customerId: "3995", item: "Bowtie", amount: 30.0, date: "2022-11-23", rating: 4.1, paymentMethod: "Cash" },
  { customerId: "4072", item: "Poncho", amount: 170.0, date: "2022-10-15", rating: 3.6, paymentMethod: "Credit Card" },
  { customerId: "4093", item: "Trousers", amount: 102.0, date: "2023-05-25", rating: 2.1, paymentMethod: "Cash" },
  { customerId: "4031", item: "Blouse", amount: 190.0, date: "2023-01-14", rating: 3.0, paymentMethod: "Cash" },
  { customerId: "4056", item: "Sneakers", amount: 125.0, date: "2022-11-02", rating: 3.8, paymentMethod: "Credit Card" },
  { customerId: "4114", item: "Leggings", amount: 84.0, date: "2023-06-15", rating: 3.8, paymentMethod: "Cash" },
  { customerId: "4104", item: "Backpack", amount: 69.0, date: "2023-05-27", rating: 2.1, paymentMethod: "Cash" },
  { customerId: "4071", item: "Tunic", amount: 107.0, date: "2022-12-03", rating: 1.5, paymentMethod: "Cash" },
  { customerId: "4007", item: "Dress", amount: 172.0, date: "2023-04-05", rating: 1.9, paymentMethod: "Cash" },
  { customerId: "4009", item: "Flannel Shirt", amount: 51.0, date: "2023-04-16", rating: 1.8, paymentMethod: "Cash" },
  { customerId: "4038", item: "Tie", amount: 63.0, date: "2023-02-13", rating: 4.3, paymentMethod: "Cash" },
  { customerId: "4033", item: "Backpack", amount: 189.0, date: "2023-08-31", rating: 4.9, paymentMethod: "Cash" },
  { customerId: "4102", item: "Cardigan", amount: 175.0, date: "2023-06-05", rating: 3.6, paymentMethod: "Credit Card" },
  { customerId: "4034", item: "Tunic", amount: 120.0, date: "2023-07-01", rating: 1.5, paymentMethod: "Credit Card" },
  { customerId: "4068", item: "Jeans", amount: 146.0, date: "2023-08-26", rating: 1.1, paymentMethod: "Cash" },
  { customerId: "4045", item: "Gloves", amount: 51.0, date: "2023-01-27", rating: 2.5, paymentMethod: "Credit Card" },
  { customerId: "3979", item: "Camisole", amount: 79.0, date: "2023-06-05", rating: 1.3, paymentMethod: "Cash" },
  { customerId: "4106", item: "Trousers", amount: 173.0, date: "2023-09-07", rating: 3.4, paymentMethod: "Credit Card" },
  { customerId: "3959", item: "Trousers", amount: 66.0, date: "2022-11-02", rating: 4.5, paymentMethod: "Cash" },
  { customerId: "4113", item: "Boots", amount: 24.0, date: "2023-01-20", rating: 1.2, paymentMethod: "Credit Card" },
  { customerId: "4087", item: "Scarf", amount: 18.0, date: "2022-11-21", rating: 1.7, paymentMethod: "Credit Card" },
  { customerId: "4060", item: "Polo Shirt", amount: 112.0, date: "2023-06-08", rating: 1.2, paymentMethod: "Cash" },
  { customerId: "3989", item: "Sweater", amount: 64.0, date: "2023-03-13", rating: 3.2, paymentMethod: "Credit Card" },
  { customerId: "4032", item: "Wallet", amount: 155.0, date: "2023-03-08", rating: 1.1, paymentMethod: "Credit Card" },
  { customerId: "3972", item: "Boots", amount: 90.0, date: "2023-01-26", rating: 4.6, paymentMethod: "Credit Card" },
  { customerId: "4051", item: "Umbrella", amount: 137.0, date: "2023-06-30", rating: 4.6, paymentMethod: "Cash" },
  { customerId: "4097", item: "Tank Top", amount: 174.0, date: "2022-10-10", rating: 3.4, paymentMethod: "Cash" },
  { customerId: "3970", item: "Camisole", amount: 77.0, date: "2023-01-05", rating: 2.4, paymentMethod: "Cash" },
  { customerId: "3957", item: "Gloves", amount: 85.0, date: "2023-05-16", rating: 2.7, paymentMethod: "Cash" },
  { customerId: "4100", item: "Loafers", amount: 147.0, date: "2023-03-02", rating: 3.9, paymentMethod: "Credit Card" },
  { customerId: "4048", item: "Pajamas", amount: 159.0, date: "2022-11-08", rating: 1.2, paymentMethod: "Credit Card" },
  { customerId: "3985", item: "Flannel Shirt", amount: 159.0, date: "2023-03-05", rating: 2.6, paymentMethod: "Cash" },
  { customerId: "4029", item: "Leggings", amount: 66.0, date: "2023-06-16", rating: 3.7, paymentMethod: "Cash" },
  { customerId: "3964", item: "Hat", amount: 45.0, date: "2023-03-17", rating: 4.8, paymentMethod: "Cash" },
  { customerId: "4017", item: "Bowtie", amount: 33.0, date: "2023-09-28", rating: 3.3, paymentMethod: "Credit Card" },
  { customerId: "4067", item: "Handbag", amount: 38.0, date: "2023-05-25", rating: 3.1, paymentMethod: "Cash" },
  { customerId: "4108", item: "T-shirt", amount: 95.0, date: "2023-09-10", rating: 2.5, paymentMethod: "Credit Card" },
  { customerId: "4057", item: "Jacket", amount: 180.0, date: "2023-01-02", rating: 4.7, paymentMethod: "Cash" },
  { customerId: "4117", item: "Kimono", amount: 162.0, date: "2023-04-16", rating: 1.1, paymentMethod: "Cash" },
  { customerId: "4038", item: "Jacket", amount: 195.0, date: "2022-10-27", rating: 4.8, paymentMethod: "Credit Card" },
  { customerId: "4054", item: "Socks", amount: 129.0, date: "2022-12-23", rating: 3.8, paymentMethod: "Cash" },
  { customerId: "4060", item: "Sweater", amount: 151.0, date: "2023-07-17", rating: 3.2, paymentMethod: "Cash" },
  { customerId: "4054", item: "Handbag", amount: 12.0, date: "2022-12-29", rating: 2.6, paymentMethod: "Credit Card" },
  { customerId: "4068", item: "Pants", amount: 39.0, date: "2023-03-21", rating: 2.4, paymentMethod: "Credit Card" },
  { customerId: "4096", item: "Scarf", amount: 147.0, date: "2023-02-11", rating: 4.1, paymentMethod: "Credit Card" },
  { customerId: "4011", item: "Blouse", amount: 174.0, date: "2023-04-21", rating: 3.4, paymentMethod: "Cash" },
  { customerId: "4001", item: "Hoodie", amount: 85.0, date: "2023-09-17", rating: 3.3, paymentMethod: "Cash" },
  { customerId: "4078", item: "Hat", amount: 126.0, date: "2023-06-29", rating: 2.1, paymentMethod: "Credit Card" },
  { customerId: "3992", item: "Slippers", amount: 95.0, date: "2023-04-26", rating: 2.9, paymentMethod: "Cash" },
  { customerId: "4005", item: "Sun Hat", amount: 194.0, date: "2022-12-16", rating: 2.9, paymentMethod: "Credit Card" },
  { customerId: "4099", item: "Scarf", amount: 138.0, date: "2023-05-20", rating: 2.9, paymentMethod: "Credit Card" },
  { customerId: "4055", item: "Boots", amount: 139.0, date: "2023-01-05", rating: 1.9, paymentMethod: "Credit Card" }
];

// Product image lookup by item keyword
const ITEM_IMAGES = {
  'Handbag': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
  'Tunic': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
  'Tank Top': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
  'Leggings': 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&auto=format&fit=crop&q=80',
  'Wallet': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
  'Onesie': 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&auto=format&fit=crop&q=80',
  'Jacket': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
  'Trousers': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80',
  'Jeans': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
  'Loafers': 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=80',
  'Slippers': 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80',
  'Bowtie': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80',
  'Pajamas': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
  'Trench Coat': 'https://images.unsplash.com/photo-1539533018447-63fcce667883?w=600&auto=format&fit=crop&q=80',
  'Poncho': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80',
  'Gloves': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
  'Boots': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
  'Flip-Flops': 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80',
  'Shorts': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=80',
  'Blazer': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
  'Sweater': 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&auto=format&fit=crop&q=80',
  'Blouse': 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&auto=format&fit=crop&q=80',
  'Swimsuit': 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=80',
  'Kimono': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
  'Cardigan': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80',
  'Socks': 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=600&auto=format&fit=crop&q=80',
  'Pants': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80',
  'Backpack': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
  'Dress': 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80',
  'Sneakers': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
  'T-shirt': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
  'Hoodie': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
  'Flannel Shirt': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
  'Tie': 'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=600&auto=format&fit=crop&q=80',
  'Romper': 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80',
  'Raincoat': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
  'Sun Hat': 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&auto=format&fit=crop&q=80',
  'Hat': 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&auto=format&fit=crop&q=80',
  'Vest': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
  'Jumpsuit': 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80',
  'Skirt': 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&auto=format&fit=crop&q=80',
  'Sunglasses': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
  'Umbrella': 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
  'Polo Shirt': 'https://images.unsplash.com/photo-1625910513413-4328d8442a8b?w=600&auto=format&fit=crop&q=80',
  'Overalls': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80',
  'Camisole': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
  'Scarf': 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&auto=format&fit=crop&q=80',
  'Sandals': 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=600&auto=format&fit=crop&q=80'
};

class CustomerPurchaseStore {
  constructor() {
    this.transactions = [];
    this.stats = null;
    this.init();
  }

  init() {
    this.transactions = SEED_CUSTOMER_PURCHASES.map((p, idx) => ({
      id: `TXN-${p.customerId}-${idx + 1}`,
      customerId: p.customerId,
      item: p.item,
      amountUSD: p.amount,
      amountINR: Math.round(p.amount * 83), // Conversion for Indian retail app
      date: p.date,
      rating: p.rating || 4.0,
      paymentMethod: p.paymentMethod || 'Cash',
      category: deriveCategory(p.item, p.item),
      image: ITEM_IMAGES[p.item] || 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80'
    }));
    this.calculateStats();
  }

  calculateStats() {
    if (!this.transactions || this.transactions.length === 0) return;

    let totalRevenueUSD = 0;
    let totalRating = 0;
    let validRatings = 0;
    const paymentMethods = { Cash: 0, 'Credit Card': 0 };
    const itemCounts = {};
    const customerCounts = {};

    for (const t of this.transactions) {
      totalRevenueUSD += t.amountUSD || 0;
      if (t.rating) {
        totalRating += t.rating;
        validRatings++;
      }
      const pm = t.paymentMethod === 'Cash' ? 'Cash' : 'Credit Card';
      paymentMethods[pm] = (paymentMethods[pm] || 0) + 1;
      itemCounts[t.item] = (itemCounts[t.item] || 0) + 1;
      customerCounts[t.customerId] = (customerCounts[t.customerId] || 0) + 1;
    }

    const sortedItems = Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([item, count]) => ({ item, count }));

    this.stats = {
      totalTransactions: this.transactions.length,
      uniqueCustomers: Object.keys(customerCounts).length,
      totalRevenueUSD: Math.round(totalRevenueUSD),
      totalRevenueINR: Math.round(totalRevenueUSD * 83),
      avgOrderUSD: Math.round(totalRevenueUSD / this.transactions.length),
      avgRating: validRatings ? Number((totalRating / validRatings).toFixed(2)) : 4.0,
      paymentMethods,
      topItems: sortedItems.slice(0, 10),
      uniqueItemsCount: Object.keys(itemCounts).length
    };
  }

  getAllTransactions() {
    return this.transactions;
  }

  getStats() {
    if (!this.stats) this.calculateStats();
    return this.stats;
  }

  /**
   * Ingest CSV lines containing customer purchases
   */
  ingestCustomerCSV(csvText) {
    if (!csvText || typeof csvText !== 'string') return { success: false, error: 'Empty content' };
    const lines = csvText.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return { success: false, error: 'CSV requires header and data' };

    const parsed = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      if (parts.length < 2) continue;

      const customerId = parts[0] || `CUST-${1000 + i}`;
      const item = parts[1] || 'Retail Item';
      const amountUSD = parseFloat(parts[2]) || 99.0;
      const date = parts[3] || '2023-01-01';
      const rating = parseFloat(parts[4]) || 4.0;
      const paymentMethod = parts[5] || 'Credit Card';

      parsed.push({
        id: `TXN-${customerId}-${i}`,
        customerId,
        item,
        amountUSD,
        amountINR: Math.round(amountUSD * 83),
        date,
        rating,
        paymentMethod,
        category: deriveCategory(item, item),
        image: ITEM_IMAGES[item] || 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80'
      });
    }

    if (parsed.length > 0) {
      this.transactions = parsed;
      this.calculateStats();
      return { success: true, count: parsed.length };
    }
    return { success: false, error: 'No valid rows found' };
  }

  /**
   * Converts customer purchase items into normalized catalog products
   */
  toProductCatalog() {
    const itemGroup = {};
    for (const t of this.transactions) {
      if (!itemGroup[t.item]) {
        itemGroup[t.item] = {
          item: t.item,
          category: t.category,
          image: t.image,
          prices: [],
          ratings: [],
          count: 0
        };
      }
      itemGroup[t.item].prices.push(t.amountINR);
      if (t.rating) itemGroup[t.item].ratings.push(t.rating);
      itemGroup[t.item].count++;
    }

    return Object.values(itemGroup).map((g, idx) => {
      const avgPrice = Math.round(g.prices.reduce((a, b) => a + b, 0) / g.prices.length);
      const avgRating = g.ratings.length
        ? Number((g.ratings.reduce((a, b) => a + b, 0) / g.ratings.length).toFixed(1))
        : 4.5;

      return {
        ProductID: `CP-${1000 + idx}`,
        ProductName: `${g.item} - Retail Collection`,
        ProductBrand: 'Customer Retail Choice',
        Gender: 'Unisex',
        Price: avgPrice,
        PriceRaw: `₹${avgPrice.toLocaleString()}`,
        NumImages: 2,
        Description: `Customer favorite ${g.item.toLowerCase()} purchased by verified shoppers. Highly reviewed with ${g.count} customer orders.`,
        PrimaryColor: 'Classic',
        Category: g.category,
        Image: g.image,
        DemoStock: g.count * 3,
        InStock: true,
        Rating: avgRating,
        ReviewsCount: g.count,
        SearchableText: `cp-${1000 + idx} ${g.item} retail collection customer choice ${g.category} ${avgPrice}`.toLowerCase()
      };
    });
  }
}

export const customerPurchaseStore = new CustomerPurchaseStore();
