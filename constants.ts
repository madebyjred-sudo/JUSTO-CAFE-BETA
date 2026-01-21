
import { Product, Slide } from './types';

// Placeholder prices
export const CURRENCY = 'COP';

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
  },
  {
    id: 'castillo',
    name: 'Castillo',
    price: 38000,
    tastingNotes: ['Chocolate', 'Panela', 'Nuez'],
    roastLevel: 'Medio',
    weight: '250g',
    image: '/images/Castillo macro.png',
    hoverImage: '/images/CASTILLO NO BACK.png',

    // Configuración de Variantes
    variants: [
      {
        id: 'castillo-250',
        weight: '250g',
        price: 38000,
        shopifyId: 'gid://shopify/ProductVariant/43343308062926'
      },
      {
        id: 'castillo-350',
        weight: '350g',
        price: 48000,
        shopifyId: 'gid://shopify/ProductVariant/43343308095694'
      },
      {
        id: 'castillo-500',
        weight: '500g',
        price: 68000,
        shopifyId: 'gid://shopify/ProductVariant/43343308128462'
      }
    ],
    // Fallback ID (usualmente el de 250g)
    stripePriceId: 'gid://shopify/ProductVariant/43343308062926'
  },
  {
    id: 'tabi',
    name: 'Tabí',
    price: 42000,
    tastingNotes: ['Frutas rojas', 'Caramelo', 'Cítricos'],
    roastLevel: 'Medio-Alto',
    weight: '250g',
    image: '/images/macro tabi.png',
    hoverImage: '/images/TABI NO BACK.png',

    variants: [
      { id: 'tabi-250', weight: '250g', price: 42000 },
      { id: 'tabi-500', weight: '500g', price: 75000 }
    ]
  },
  {
    id: 'bourbon-rosa',
    name: 'Bourbon Rosa',
    price: 55000,
    tastingNotes: ['Floral', 'Jazmín', 'Miel'],
    roastLevel: 'Claro',
    weight: '250g',
    image: '/images/Bourbon macro.png',
    hoverImage: '/images/BOURBON NO BACK.png',

    variants: [
      { id: 'bourbon-250', weight: '250g', price: 55000 },
      { id: 'bourbon-500', weight: '500g', price: 98000 }
    ]
  },
];

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
