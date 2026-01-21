import { CartItem } from '../types';

const SHOPIFY_DOMAIN = 'justo-experiencia.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = '487d18c84b4d1ff920e1bcbac268c504';
const API_VERSION = '2024-01'; 

// Helper for raw GraphQL requests
async function shopifyFetch(query: string, variables: any = {}) {
  const url = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Network error: ${response.status} - ${text}`);
  }

  const json = await response.json();
  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

export const createCheckoutAndRedirect = async (items: CartItem[]) => {
  try {
    // 1. Filtrar items que tienen ID de Shopify configurado
    const validItems = items.filter(item => item.stripePriceId);

    if (validItems.length === 0) {
        alert("Por ahora, solo el producto 'Castillo' está conectado a Shopify para esta prueba. Por favor agrégalo al carrito.");
        return;
    }

    // 2. Preparar líneas para el carrito (Cart API)
    const lines = validItems.map((item) => ({
      merchandiseId: item.stripePriceId,
      quantity: item.quantity,
    }));

    // 3. Crear Carrito usando Mutation cartCreate
    const mutation = `
      mutation createCart($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const data = await shopifyFetch(mutation, { lines });

    if (data.cartCreate?.userErrors?.length > 0) {
       const errorMsg = data.cartCreate.userErrors.map((e: any) => e.message).join(', ');
       throw new Error(errorMsg);
    }

    const checkoutUrl = data.cartCreate?.cart?.checkoutUrl;

    if (checkoutUrl) {
      console.log("Checkout URL generada:", checkoutUrl);

      // 4. Redirección Inteligente
      // Shopify bloquea la carga en iframes (X-Frame-Options: DENY).
      // Si estamos en un entorno de desarrollo (iframe), abrimos en nueva pestaña.
      let isIframe = false;
      try {
          isIframe = window.self !== window.top;
      } catch (e) {
          isIframe = true;
      }

      if (isIframe) {
          // Estamos en un iframe (preview), usar window.open
          const newWindow = window.open(checkoutUrl, '_blank');
          if (!newWindow) {
             alert("El navegador bloqueó la ventana emergente. Por favor permite pop-ups para este sitio o intenta nuevamente.");
             // Fallback
             window.location.href = checkoutUrl;
          }
      } else {
          // Estamos en producción normal, redirección estándar
          window.location.href = checkoutUrl;
      }

    } else {
      throw new Error("No se recibió URL de checkout desde Shopify.");
    }
    
  } catch (error) {
    console.error("Error conectando con Shopify:", error);
    alert("Hubo un error iniciando el pago. Revisa la consola para más detalles.");
  }
};