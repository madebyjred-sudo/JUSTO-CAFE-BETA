
import Client from 'shopify-buy';
import { SHOPIFY_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../constants';
import { CartItem } from '../types';

/**
 * Shopify Buy SDK Client
 * 
 * This client is used to interact with Shopify's Storefront API
 * for creating checkouts and managing cart functionality.
 */
export const shopifyClient = Client.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

/**
 * Create a new Shopify checkout
 * Returns a checkout object with a unique ID and webUrl
 */
export const createCheckout = async () => {
  try {
    const checkout = await shopifyClient.checkout.create();
    return checkout;
  } catch (error) {
    console.error('Error creating Shopify checkout:', error);
    throw new Error('Failed to create checkout');
  }
};

/**
 * Add line items to an existing checkout
 * @param checkoutId - The Shopify checkout ID
 * @param items - Array of items with variantId and quantity
 */
export const addItemsToCheckout = async (
  checkoutId: string, 
  items: { variantId: string; quantity: number }[]
) => {
  try {
    const checkout = await shopifyClient.checkout.addLineItems(checkoutId, items);
    return checkout;
  } catch (error) {
    console.error('Error adding items to checkout:', error);
    throw new Error('Failed to add items to checkout');
  }
};

/**
 * Update line items in a checkout
 * @param checkoutId - The Shopify checkout ID
 * @param lineItems - Array of line items with id, variantId and quantity
 */
export const updateCheckoutLineItems = async (
  checkoutId: string,
  lineItems: { id?: string; variantId: string; quantity: number }[]
) => {
  try {
    const checkout = await shopifyClient.checkout.updateLineItems(checkoutId, lineItems);
    return checkout;
  } catch (error) {
    console.error('Error updating checkout items:', error);
    throw new Error('Failed to update checkout items');
  }
};

/**
 * Remove line items from a checkout
 * @param checkoutId - The Shopify checkout ID
 * @param lineItemIds - Array of line item IDs to remove
 */
export const removeCheckoutLineItems = async (
  checkoutId: string,
  lineItemIds: string[]
) => {
  try {
    const checkout = await shopifyClient.checkout.removeLineItems(checkoutId, lineItemIds);
    return checkout;
  } catch (error) {
    console.error('Error removing checkout items:', error);
    throw new Error('Failed to remove checkout items');
  }
};

/**
 * Fetch a checkout by its ID
 * Useful for retrieving an existing checkout (e.g., from localStorage)
 */
export const fetchCheckout = async (checkoutId: string) => {
  try {
    const checkout = await shopifyClient.checkout.fetch(checkoutId);
    return checkout;
  } catch (error) {
    console.error('Error fetching checkout:', error);
    throw new Error('Failed to fetch checkout');
  }
};

/**
 * Complete checkout and redirect to Shopify
 * This is the main function to call when user clicks "Checkout"
 */
export const completeCheckout = async (cartItems: CartItem[]) => {
  try {
    // Create a new checkout
    const checkout = await createCheckout();
    
    // Map cart items to Shopify line items
    const lineItems = cartItems.map(item => {
      // Get the Shopify variant ID (either from selected variant or base product)
      const variantId = item.selectedVariant?.shopifyId || item.stripePriceId;
      
      // Ensure the ID is in the correct format
      const formattedVariantId = variantId.startsWith('gid://')
        ? variantId
        : `gid://shopify/ProductVariant/${variantId}`;
      
      return {
        variantId: formattedVariantId,
        quantity: item.quantity,
      };
    });
    
    // Add items to checkout
    const updatedCheckout = await addItemsToCheckout(checkout.id, lineItems);
    
    // Return the checkout URL
    return {
      checkoutId: updatedCheckout.id,
      checkoutUrl: updatedCheckout.webUrl,
    };
  } catch (error) {
    console.error('Error completing checkout:', error);
    throw error;
  }
};

/**
 * Alternative: Simple cart redirect
 * Creates a direct cart URL without using the Storefront API
 * This is faster but less flexible
 */
export const getShopifyCartUrl = (cartItems: CartItem[]): string => {
  const items = cartItems.map(item => {
    const variantId = item.selectedVariant?.shopifyId || item.stripePriceId;
    // Extract just the numeric ID
    const numericId = variantId.replace(/[^0-9]/g, '');
    return `${numericId}:${item.quantity}`;
  });
  
  return `https://${SHOPIFY_DOMAIN}/cart/${items.join(',')}`;
};

/**
 * Fetch all products from Shopify
 * Useful if you want to sync products dynamically instead of using constants
 */
export const fetchProducts = async () => {
  try {
    const products = await shopifyClient.product.fetchAll();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

/**
 * Fetch a single product by its ID
 */
export const fetchProductById = async (productId: string) => {
  try {
    const product = await shopifyClient.product.fetch(productId);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
};
