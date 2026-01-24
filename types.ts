
export interface ProductVariant {
  id: string;
  weight: string;
  price: number;
  shopifyId?: string; // The specific ID for Shopify checkout
}

export interface ScaAttributes {
  fragrance: number;
  flavor: number;
  aftertaste: number;
  acidity: number;
  body: number;
  balance: number;
  uniformity: number;
  cleanCup: number;
  sweetness: number;
  overall: number;
}

export interface Product {
  id: string;
  name: string;
  price: number; // Base price (usually smallest variant)
  description?: string;
  tastingNotes: string[];
  roastLevel: 'Claro' | 'Medio' | 'Medio-Alto' | 'Oscuro';
  weight: string; // Base weight
  image: string;
  hoverImage?: string;
  isKit?: boolean;
  kitImages?: string[]; // For kit products: array of two bag images
  stripePriceId?: string; // Fallback ID
  variants?: ProductVariant[]; // New field for weight options
  features?: { icon: string; text: string }[];
  scaScore?: number;
  scaAttributes?: ScaAttributes;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant; // Track which variant was chosen
}

export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

export interface RecipeStep {
  time?: string; // e.g., "0:00 - 0:45"
  instruction: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Filtrados' | 'Espresso' | 'Inmersión' | 'Verano' | 'Coctelería';
  difficulty: 'Fácil' | 'Medio' | 'Barista';
  totalTime: string;
  yield: string; // e.g. "2 Tazas"
  image: string;
  description: string;
  ingredients: string[];
  steps: RecipeStep[];
  author?: string; // "Justo Team" or Community Name
  recommendedProductId?: string; // ID of the product in PRODUCTS constant
}

export type ViewState = 'home' | 'shop' | 'subscription' | 'origin' | 'methods';