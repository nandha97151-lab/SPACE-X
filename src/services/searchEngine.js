// VOICEMART AI - Deterministic Search & Explainable Match Engine
import { datasetStore } from './datasetService.js';

// Exact Scoring Weights specified in Requirements (Section 7 & 37)
export const MATCH_WEIGHTS = {
  CATEGORY: 35,
  COLOR: 20,
  PRICE: 20,
  BRAND: 10,
  TEXT_SIMILARITY: 15
};

/**
 * Text token similarity score (0 to 1)
 */
function calculateTextSimilarity(query, targetText) {
  if (!query || !targetText) return 0;
  const qTokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  if (qTokens.length === 0) return 0.5;

  let hits = 0;
  for (const token of qTokens) {
    if (targetText.includes(token)) {
      hits++;
    }
  }
  return hits / qTokens.length;
}

/**
 * Deterministic Product Search with Weighted Match Scoring & Explainability
 */
export function searchProducts(structuredQuery, allProducts = null) {
  const catalog = allProducts || datasetStore.getAllProducts();
  const {
    category,
    color,
    brand,
    gender,
    maxPrice,
    minPrice,
    rawQueryText
  } = structuredQuery;

  const results = [];

  for (const product of catalog) {
    let score = 0;
    const matchReasons = [];
    const penaltyReasons = [];

    // Safe product field extractors
    const pCat = (product.Category || product.category || '').toLowerCase();
    const pColor = (product.PrimaryColor || product.color || '').toLowerCase();
    const pName = (product.ProductName || product.name || '').toLowerCase();
    const pBrand = (product.ProductBrand || product.brand || '').toLowerCase();
    const pGender = (product.Gender || product.gender || 'Unisex').toLowerCase();
    const pPrice = Number(product.Price ?? product.price ?? 0);
    const pText = product.SearchableText || `${pName} ${pBrand} ${pCat} ${pColor}`;

    // 1. Category Score (35 pts)
    let categoryMatched = false;
    if (category && category !== 'Any' && category !== 'General') {
      const qCat = category.toLowerCase();
      const isFootwearQuery = qCat === 'shoes' || qCat === 'footwear' || qCat === 'shoe';
      const isShirtQuery = qCat === 'shirt' || qCat === 'shirts';
      if (
        pCat.includes(qCat) ||
        qCat.includes(pCat) ||
        (isFootwearQuery && pCat.includes('shoe')) ||
        (isShirtQuery && pCat.includes('shirt'))
      ) {
        score += MATCH_WEIGHTS.CATEGORY;
        categoryMatched = true;
        matchReasons.push(`✓ Category matched: ${product.Category || product.category}`);
      } else {
        penaltyReasons.push(`Category mismatch (${product.Category || product.category} vs requested ${category})`);
      }
    } else {
      score += MATCH_WEIGHTS.CATEGORY * 0.7; // general query gets partial score
      matchReasons.push(`✓ General catalog match: ${product.Category || product.category}`);
    }

    // 2. Color Score (20 pts)
    let colorMatched = false;
    if (color && color !== 'Any') {
      const qColor = color.toLowerCase();
      if (pColor === qColor || pColor.includes(qColor) || pName.includes(qColor)) {
        score += MATCH_WEIGHTS.COLOR;
        colorMatched = true;
        matchReasons.push(`✓ Color matched: ${product.PrimaryColor || product.color}`);
      } else {
        penaltyReasons.push(`Color differs (${product.PrimaryColor || product.color} vs requested ${color})`);
      }
    } else {
      score += MATCH_WEIGHTS.COLOR * 0.8;
      matchReasons.push(`✓ Color available: ${product.PrimaryColor || product.color}`);
    }

    // 3. Price Score (20 pts)
    let priceWithinBudget = true;
    if (maxPrice && maxPrice > 0) {
      if (pPrice <= maxPrice) {
        score += MATCH_WEIGHTS.PRICE;
        matchReasons.push(`✓ Within ₹${maxPrice} budget (Price: ₹${pPrice})`);
      } else {
        priceWithinBudget = false;
        // Partial score if slightly over budget
        const overRatio = pPrice / maxPrice;
        if (overRatio <= 1.2) {
          score += MATCH_WEIGHTS.PRICE * 0.4;
          penaltyReasons.push(`Slightly above budget (₹${pPrice} vs ₹${maxPrice})`);
        } else {
          penaltyReasons.push(`Exceeds budget (₹${pPrice} > ₹${maxPrice})`);
        }
      }
    } else {
      score += MATCH_WEIGHTS.PRICE;
      matchReasons.push(`✓ Price verified: ₹${pPrice}`);
    }

    // 4. Brand Score (10 pts)
    if (brand && brand !== 'Any') {
      if (pBrand.includes(brand.toLowerCase())) {
        score += MATCH_WEIGHTS.BRAND;
        matchReasons.push(`✓ Brand matched: ${product.ProductBrand || product.brand}`);
      }
    } else {
      score += MATCH_WEIGHTS.BRAND * 0.7;
      matchReasons.push(`✓ Verified Brand: ${product.ProductBrand || product.brand}`);
    }

    // 5. Gender Match
    if (gender && gender !== 'Any') {
      if (pGender === gender.toLowerCase() || pGender === 'unisex') {
        matchReasons.push(`✓ Gender segment: ${product.Gender || product.gender}`);
      }
    }

    // 6. Text Similarity Score (15 pts)
    const sim = calculateTextSimilarity(rawQueryText, pText);
    score += Math.round(sim * MATCH_WEIGHTS.TEXT_SIMILARITY);
    if (sim > 0.4) {
      matchReasons.push(`✓ Keyword match in product description`);
    }

    const finalScore = Math.min(100, Math.round(score));

    // Hard constraint verification:
    // If strict filters are passed, ensure strict match or high score
    const isStrictMatch =
      (!category || category === 'Any' || categoryMatched) &&
      (!color || color === 'Any' || colorMatched) &&
      (!maxPrice || pPrice <= maxPrice);

    if (isStrictMatch || finalScore >= 60) {
      results.push({
        ...product,
        matchScore: finalScore,
        isStrictMatch,
        matchReasons,
        penaltyReasons
      });
    }
  }

  // Sort descending by calculated Match Score
  results.sort((a, b) => b.matchScore - a.matchScore);

  return results;
}

/**
 * Constraint Relaxation & "Why No Match?" Diagnostics Engine (Section 9 & 10)
 */
export function analyzeMismatchAndRelax(structuredQuery, allProducts = null) {
  const catalog = allProducts || datasetStore.getAllProducts();
  const { category, color, maxPrice, gender, brand } = structuredQuery;

  // 1. Check if category exists in catalog
  const qCat = (category || 'Any').toLowerCase();
  const isFootwearQuery = qCat === 'shoes' || qCat === 'footwear' || qCat === 'shoe';
  const isShirtQuery = qCat === 'shirt' || qCat === 'shirts';

  const categoryProducts = catalog.filter(p => {
    if (!category || category === 'Any') return true;
    const pCat = (p.Category || p.category || '').toLowerCase();
    if (pCat.includes(qCat) || qCat.includes(pCat)) return true;
    if (isFootwearQuery && pCat.includes('shoe')) return true;
    if (isShirtQuery && pCat.includes('shirt')) return true;
    return false;
  });

  // 2. Check if color exists within category
  const colorCategoryProducts = categoryProducts.filter(p => {
    if (!color || color === 'Any') return true;
    const pColor = (p.PrimaryColor || p.color || '').toLowerCase();
    return pColor === color.toLowerCase() || pColor.includes(color.toLowerCase());
  });

  // 3. Find lowest price in this combination
  const sortedByPrice = [...colorCategoryProducts].sort((a, b) => a.Price - b.Price);
  const lowestPriceAvailable = sortedByPrice[0] ? sortedByPrice[0].Price : null;

  let limitingConstraint = 'None';
  let diagnosisText = '';
  const relaxationOptions = [];

  if (categoryProducts.length === 0) {
    limitingConstraint = 'Category';
    diagnosisText = `The category "${category}" is currently not available in the store inventory.`;
    relaxationOptions.push({
      type: 'RELAX_CATEGORY',
      label: 'Explore all available categories',
      relaxedQuery: { ...structuredQuery, category: 'Any' }
    });
  } else if (colorCategoryProducts.length === 0) {
    limitingConstraint = 'Color';
    diagnosisText = `We have ${categoryProducts.length} items in ${category}, but none in "${color}" color.`;
    
    // Find available colors in this category
    const availableColors = [...new Set(categoryProducts.map(p => p.PrimaryColor))].slice(0, 3);
    for (const c of availableColors) {
      relaxationOptions.push({
        type: 'RELAX_COLOR',
        label: `View ${category} in ${c}`,
        relaxedQuery: { ...structuredQuery, color: c }
      });
    }
  } else if (maxPrice && lowestPriceAvailable && lowestPriceAvailable > maxPrice) {
    limitingConstraint = 'Budget';
    diagnosisText = `Your budget constraint (≤ ₹${maxPrice}) caused the mismatch. Lowest available ${color || ''} ${category || 'product'} starts at ₹${lowestPriceAvailable}.`;
    relaxationOptions.push({
      type: 'RELAX_BUDGET',
      label: `Relax budget to ₹${lowestPriceAvailable}`,
      relaxedQuery: { ...structuredQuery, maxPrice: lowestPriceAvailable }
    });
    relaxationOptions.push({
      type: 'SHOW_CLOSEST',
      label: 'Show closest matching alternatives',
      relaxedQuery: { ...structuredQuery, maxPrice: lowestPriceAvailable * 1.25 }
    });
  } else {
    limitingConstraint = 'Combination';
    diagnosisText = `No products found matching the exact combined filter. Showing closest alternatives.`;
    relaxationOptions.push({
      type: 'SHOW_CLOSEST',
      label: 'Show closest matching products',
      relaxedQuery: { ...structuredQuery, maxPrice: null }
    });
  }

  // Get closest alternatives (relaxed search)
  const closestAlternatives = (sortedByPrice.length > 0 ? sortedByPrice : categoryProducts).slice(0, 4).map(p => ({
    ...p,
    matchScore: 65,
    matchReasons: [
      `✓ Closest alternative in ${p.Category}`,
      `✓ Available at ₹${p.Price}`
    ]
  }));

  return {
    limitingConstraint,
    diagnosis: diagnosisText,
    categoryAvailable: categoryProducts.length > 0,
    colorAvailable: colorCategoryProducts.length > 0,
    budgetAvailable: lowestPriceAvailable ? lowestPriceAvailable <= (maxPrice || Infinity) : false,
    lowestPriceAvailable,
    relaxationOptions,
    closestAlternatives
  };
}
