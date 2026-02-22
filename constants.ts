
import { Product, Slide } from './types';

// Currency Configuration
export const CURRENCY = 'COP';

// Shopify Store Configuration
// Replace with your actual Shopify store domain
export const SHOPIFY_DOMAIN = 'justo-cafe.myshopify.com';
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'your-storefront-access-token-here';

// ============================================
// PRODUCTS WITH SHOPIFY INTEGRATION
// ============================================
// 
// SHOPIFY SETUP GUIDE:
// ====================
//
// 1. CREATE PRODUCTS IN SHOPIFY ADMIN:
//    - Go to Shopify Admin > Products > Add product
//    - Create each product with the same name as below
//    - Add variants for different weights (250g, 350g, 500g)
//    - Set prices matching the ones below
//
// 2. GET PRODUCT VARIANT IDs:
//    - In Shopify Admin, go to each product
//    - Click "Edit" on each variant
//    - The URL will show the variant ID (e.g., /variants/43343308062926)
//    - OR use Shopify GraphQL API to query products and get GIDs
//
// 3. UPDATE THE shopifyId FIELDS BELOW:
//    - Format: 'gid://shopify/ProductVariant/[VARIANT_ID]'
//    - Example: 'gid://shopify/ProductVariant/43343308062926'
//
// 4. ENABLE STOREFRONT API:
//    - Shopify Admin > Settings > Apps and sales channels
//    - Develop apps > Create an app
//    - Configure Storefront API access scopes:
//      - unauthenticated_read_product_listings
//      - unauthenticated_read_product_inventory
//      - unauthenticated_read_checkout
//      - unauthenticated_write_checkouts
//    - Install app and get Storefront Access Token
//
// 5. UPDATE SHOPIFY_DOMAIN AND TOKEN ABOVE
//
// ============================================

export const PRODUCTS: Product[] = [
  {
    id: 'kit-experiencia',
    name: 'Kit Experiencia Justo',
    price: 85000,
    description: 'Descubre la diversidad del café colombiano con dos variedades seleccionadas del lote actual.',
    tastingNotes: ['Variedad Rotativa 1', 'Variedad Rotativa 2'],
    roastLevel: 'Medio',
    weight: '2 x 250g',
    image: '/images/Kit macro.png',
    isKit: true,
    kitImages: ['/images/CASTILLO NO BACK.png', '/images/TABI NO BACK.png'],
    features: [
      { icon: 'package', text: '2 Variedades' },
      { icon: 'gift', text: 'Regalo Perfecto' },
      { icon: 'star', text: 'Edición Limitada' }
    ],
    // Shopify Integration: Create as a product with no variants (fixed size)
    // Or create with variants if you offer different kit sizes
    stripePriceId: 'gid://shopify/ProductVariant/[KIT_VARIANT_ID]',
    variants: [
      {
        id: 'kit-experiencia-2x250g',
        weight: '2 x 250g',
        price: 85000,
        shopifyId: 'gid://shopify/ProductVariant/[KIT_VARIANT_ID]'
      }
    ]
  },
  {
    id: 'castillo',
    scaScore: 84,
    scaAttributes: {
      fragrance: 7.75,
      flavor: 7.75,
      aftertaste: 7.5,
      acidity: 7.75,
      body: 7.75,
      balance: 7.75,
      uniformity: 10,
      cleanCup: 10,
      sweetness: 10,
      overall: 7.75
    },
    name: 'Castillo',
    price: 38000,
    tastingNotes: ['Chocolate', 'Panela', 'Nuez'],
    roastLevel: 'Medio',
    weight: '250g',
    image: '/images/CASTILLO NO BACK.png',
    hoverImage: '/images/Castillo macro.png',

    features: [
      { icon: 'flame', text: 'Tueste Medio' },
      { icon: 'droplet', text: 'Cuerpo Sedoso' },
      { icon: 'bean', text: 'Notas Dulces' }
    ],

    // Shopify Variants Configuration
    variants: [
      {
        id: 'castillo-250',
        weight: '250g',
        price: 38000,
        shopifyId: 'gid://shopify/ProductVariant/43343308062926' // REPLACE WITH REAL ID
      },
      {
        id: 'castillo-350',
        weight: '350g',
        price: 48000,
        shopifyId: 'gid://shopify/ProductVariant/43343308095694' // REPLACE WITH REAL ID
      },
      {
        id: 'castillo-500',
        weight: '500g',
        price: 68000,
        shopifyId: 'gid://shopify/ProductVariant/43343308128462' // REPLACE WITH REAL ID
      }
    ],
    // Fallback ID (usually the smallest variant)
    stripePriceId: 'gid://shopify/ProductVariant/43343308062926'
  },
  {
    id: 'tabi',
    name: 'Tabí',
    price: 42000,
    tastingNotes: ['Frutas rojas', 'Caramelo', 'Cítricos'],
    roastLevel: 'Medio-Alto',
    weight: '250g',
    image: '/images/TABI NO BACK.png',
    hoverImage: '/images/macro tabi.png',

    features: [
      { icon: 'flame', text: 'Tueste Medio-Alto' },
      { icon: 'leaf', text: 'Perfil Frutal' },
      { icon: 'sun', text: 'Acidez Cítrica' }
    ],

    scaScore: 87,
    scaAttributes: {
      fragrance: 8.25,
      flavor: 8.25,
      aftertaste: 8.0,
      acidity: 8.25,
      body: 8.0,
      balance: 8.25,
      uniformity: 10,
      cleanCup: 10,
      sweetness: 10,
      overall: 8.0
    },

    variants: [
      { 
        id: 'tabi-250', 
        weight: '250g', 
        price: 42000,
        shopifyId: 'gid://shopify/ProductVariant/[TABI_250_VARIANT_ID]' // REPLACE WITH REAL ID
      },
      { 
        id: 'tabi-500', 
        weight: '500g', 
        price: 75000,
        shopifyId: 'gid://shopify/ProductVariant/[TABI_500_VARIANT_ID]' // REPLACE WITH REAL ID
      }
    ],
    stripePriceId: 'gid://shopify/ProductVariant/[TABI_250_VARIANT_ID]'
  },
  {
    id: 'bourbon-rosa',
    name: 'Bourbon Rosa',
    price: 55000,
    tastingNotes: ['Floral', 'Jazmín', 'Miel'],
    roastLevel: 'Claro',
    weight: '250g',
    image: '/images/BOURBON NO BACK.png',
    hoverImage: '/images/Bourbon macro.png',

    features: [
      { icon: 'flame', text: 'Tueste Claro' },
      { icon: 'flower', text: 'Perfil Floral' },
      { icon: 'sparkles', text: 'Acidez Brillante' }
    ],

    scaScore: 89,
    scaAttributes: {
      fragrance: 8.5,
      flavor: 8.5,
      aftertaste: 8.25,
      acidity: 8.75,
      body: 8.25,
      balance: 8.5,
      uniformity: 10,
      cleanCup: 10,
      sweetness: 10,
      overall: 8.25
    },

    variants: [
      { 
        id: 'bourbon-250', 
        weight: '250g', 
        price: 55000,
        shopifyId: 'gid://shopify/ProductVariant/[BOURBON_250_VARIANT_ID]' // REPLACE WITH REAL ID
      },
      { 
        id: 'bourbon-500', 
        weight: '500g', 
        price: 98000,
        shopifyId: 'gid://shopify/ProductVariant/[BOURBON_500_VARIANT_ID]' // REPLACE WITH REAL ID
      }
    ],
    stripePriceId: 'gid://shopify/ProductVariant/[BOURBON_250_VARIANT_ID]'
  },
];

// Hero Slides Configuration
export const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Café de Origen, Tostado con Intención',
    subtitle: 'Cultivando relaciones justas desde la finca hasta tu taza.',
    cta: 'Explorar Origen',
    image: 'https://images.pexels.com/photos/2100605/pexels-photo-2100605.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    id: 2,
    title: 'Kit Experiencia Justo',
    subtitle: 'Dos variedades, una misma pasión. El regalo perfecto para los sentidos.',
    cta: 'Comprar Kit',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    id: 3,
    title: 'Suscripción Mensual',
    subtitle: 'Café fresco y ético, entregado directamente a tu puerta.',
    cta: 'Suscribirme',
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1920',
  }
];

// ============================================
// SHOPIFY INTEGRATION UTILITIES
// ============================================

/**
 * Get Shopify Product Handle from product name
 * This creates a URL-friendly handle for Shopify
 */
export const getShopifyHandle = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')     // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');        // Trim hyphens
};

/**
 * Product URL Generator for Shopify
 * Use this to generate direct links to Shopify product pages
 */
export const getShopifyProductUrl = (handle: string): string => {
  return `https://${SHOPIFY_DOMAIN}/products/${handle}`;
};

/**
 * Shopify Cart URL Generator
 * Creates a direct cart URL with pre-selected variants
 */
export const getShopifyCartUrl = (items: { variantId: string; quantity: number }[]): string => {
  const baseUrl = `https://${SHOPIFY_DOMAIN}/cart`;
  if (items.length === 0) return baseUrl;
  
  const params = items.map((item, index) => 
    `${index === 0 ? '?' : '&'}${item.variantId.split('/').pop()}:${item.quantity}`
  ).join('');
  
  return `${baseUrl}${params}`;
};
