
import { CartItem, Product, ProductVariant } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const addToCartLogic = (currentCart: CartItem[], product: Product, variant?: ProductVariant): CartItem[] => {
  // Define a unique ID for the cart item. 
  // If a variant is selected, combine product ID and variant ID.
  const uniqueId = variant ? `${product.id}-${variant.id}` : product.id;
  
  // Determine correct price and weight and Shopify ID
  const finalPrice = variant ? variant.price : product.price;
  const finalWeight = variant ? variant.weight : product.weight;
  const finalShopifyId = variant ? variant.shopifyId : product.stripePriceId;

  const existingItem = currentCart.find(item => item.id === uniqueId);

  if (existingItem) {
    return currentCart.map(item => 
      item.id === uniqueId 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    );
  }

  const newItem: CartItem = {
    ...product,
    id: uniqueId, // Override ID for cart uniqueness
    price: finalPrice, // Override price
    weight: finalWeight, // Override weight
    stripePriceId: finalShopifyId, // Override Shopify ID
    quantity: 1,
    selectedVariant: variant
  };

  return [...currentCart, newItem];
};

export const removeFromCartLogic = (currentCart: CartItem[], cartItemId: string): CartItem[] => {
  return currentCart.filter(item => item.id !== cartItemId);
};

export const updateQuantityLogic = (currentCart: CartItem[], cartItemId: string, newQuantity: number): CartItem[] => {
  if (newQuantity < 1) {
    return removeFromCartLogic(currentCart, cartItemId);
  }
  return currentCart.map(item => 
    item.id === cartItemId 
      ? { ...item, quantity: newQuantity } 
      : item
  );
};
