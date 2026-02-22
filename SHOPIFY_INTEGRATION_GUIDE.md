# Guía de Integración Shopify - Justo Café

Esta guía te llevará paso a paso para integrar completamente tu tienda Justo Café con Shopify.

---

## 📋 Contenido

1. [Configuración Inicial de Shopify](#1-configuración-inicial-de-shopify)
2. [Creación de Productos](#2-creación-de-productos)
3. [Obtención de IDs de Variantes](#3-obtención-de-ids-de-variantes)
4. [Configuración de la API Storefront](#4-configuración-de-la-api-storefront)
5. [Actualización del Código](#5-actualización-del-código)
6. [Pruebas](#6-pruebas)
7. [Checkout con Shopify](#7-checkout-con-shopify)

---

## 1. Configuración Inicial de Shopify

### 1.1 Crear tu cuenta Shopify
- Ve a [shopify.com](https://www.shopify.com)
- Regístrate con tu correo de Justo Café
- Elige un plan (recomendado: Basic para empezar)

### 1.2 Configurar dominio personalizado (opcional)
- En Shopify Admin, ve a **Configuración > Dominios**
- Conecta tu dominio `justocafe.com` o usa el `.myshopify.com` temporal

---

## 2. Creación de Productos

### 2.1 Crear el producto "Kit Experiencia Justo"

1. Ve a **Productos > Agregar producto**
2. Completa los campos:
   - **Título:** Kit Experiencia Justo
   - **Descripción:** Descubre la diversidad del café colombiano con dos variedades seleccionadas del lote actual.
   - **Precio:** $85.000 COP
   - **SKU:** KIT-EXP-001
   - **Peso:** 500g (2 x 250g)

3. En **Variantes**, deja vacío (producto sin variantes) o agrega variantes si planeas diferentes tamaños de kit

4. Sube las imágenes:
   - `/images/Kit macro.png`
   - `/images/CASTILLO NO BACK.png`
   - `/images/TABI NO BACK.png`

5. Guarda el producto

### 2.2 Crear el producto "Castillo"

1. Ve a **Productos > Agregar producto**
2. Completa los campos:
   - **Título:** Castillo
   - **Descripción:** Café con notas a chocolate, panela y nuez. Tueste medio con cuerpo sedoso.
   - **Colección:** Café de Especialidad

3. En **Variantes**, agrega:
   | Peso  | Precio   | SKU           |
   |-------|----------|---------------|
   | 250g  | $38.000  | CAST-250-001  |
   | 350g  | $48.000  | CAST-350-001  |
   | 500g  | $68.000  | CAST-500-001  |

4. Sube las imágenes:
   - `/images/CASTILLO NO BACK.png` (principal)
   - `/images/Castillo macro.png` (hover)

5. En **Metafields** (campos personalizados), agrega:
   - `sca_score`: 84
   - `notas_de_cata`: Chocolate, Panela, Nuez
   - `nivel_de_tostion`: Medio

6. Guarda el producto

### 2.3 Crear el producto "Tabí"

1. Ve a **Productos > Agregar producto**
2. Completa:
   - **Título:** Tabí
   - **Descripción:** Perfil frutal con notas a frutas rojas, caramelo y cítricos.

3. **Variantes:**
   | Peso  | Precio   | SKU          |
   |-------|----------|--------------|
   | 250g  | $42.000  | TABI-250-001 |
   | 500g  | $75.000  | TABI-500-001 |

4. Sube imágenes:
   - `/images/TABI NO BACK.png`
   - `/images/macro tabi.png`

5. **Metafields:**
   - `sca_score`: 87
   - `notas_de_cata`: Frutas rojas, Caramelo, Cítricos
   - `nivel_de_tostion`: Medio-Alto

### 2.4 Crear el producto "Bourbon Rosa"

1. Ve a **Productos > Agregar producto**
2. Completa:
   - **Título:** Bourbon Rosa
   - **Descripción:** Perfil floral con notas a jazmín y miel. Acidez brillante.

3. **Variantes:**
   | Peso  | Precio   | SKU            |
   |-------|----------|----------------|
   | 250g  | $55.000  | BOURBON-250-001|
   | 500g  | $98.000  | BOURBON-500-001|

4. Sube imágenes:
   - `/images/BOURBON NO BACK.png`
   - `/images/Bourbon macro.png`

5. **Metafields:**
   - `sca_score`: 89
   - `notas_de_cata`: Floral, Jazmín, Miel
   - `nivel_de_tostion`: Claro

---

## 3. Obtención de IDs de Variantes

Cada variante en Shopify tiene un ID único que necesitas para el código. Hay varias formas de obtenerlos:

### Método 1: Desde la URL del Admin

1. Ve a **Productos > [Nombre del Producto]**
2. En la sección **Variantes**, haz clic en "Editar" en una variante
3. Mira la URL en tu navegador:
   ```
   https://admin.shopify.com/store/[tu-tienda]/products/[product_id]/variants/43343308062926
   ```
4. El número al final (`43343308062926`) es el **Variant ID**

### Método 2: Usando Shopify GraphQL App

1. Instala la aplicación **GraphiQL** desde la Shopify App Store (gratuita)
2. Ejecuta esta consulta:

```graphql
query {
  products(first: 10) {
    edges {
      node {
        id
        title
        variants(first: 5) {
          edges {
            node {
              id
              title
              sku
              price
            }
          }
        }
      }
    }
  }
}
```

3. Los IDs vendrán en formato: `gid://shopify/ProductVariant/43343308062926`

### Método 3: Bulk Export

1. Ve a **Productos > Exportar**
2. Selecciona "Exportar variantes"
3. El CSV incluirá una columna `Variant ID`

---

## 4. Configuración de la API Storefront

Para que tu sitio React pueda comunicarse con Shopify, necesitas crear una app privada:

### 4.1 Crear App Privada

1. Ve a **Configuración > Apps y canales de venta**
2. Desplázate hasta abajo y haz clic en **Desarrollar apps**
3. Haz clic en **Crear una app**
4. Nombre: `Justo Cafe Storefront`
5. Ve a **Configuración > API de Storefront**

### 4.2 Configurar Permisos (Scopes)

Activa estos permisos:

- [x] `unauthenticated_read_product_listings` - Ver productos
- [x] `unauthenticated_read_product_inventory` - Ver inventario
- [x] `unauthenticated_read_checkout` - Ver checkout
- [x] `unauthenticated_write_checkouts` - Crear checkouts
- [x] `unauthenticated_read_metaobjects` - Leer metafields

### 4.3 Instalar y Obtener Token

1. Haz clic en **Instalar app**
2. Ve a **API de Storefront**
3. Copia el **Token de acceso a Storefront**
4. Guárdalo en un lugar seguro (no se puede ver de nuevo)

---

## 5. Actualización del Código

### 5.1 Actualizar `constants.ts`

Abre `constants.ts` y actualiza estas constantes:

```typescript
// Shopify Store Configuration
export const SHOPIFY_DOMAIN = 'tu-tienda.myshopify.com'; // Tu dominio Shopify
export const SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'tu-token-aqui'; // Token del paso 4.3
```

### 5.2 Actualizar IDs de Variantes

Para cada producto, reemplaza los placeholders con los IDs reales:

```typescript
// Ejemplo para Castillo
variants: [
  {
    id: 'castillo-250',
    weight: '250g',
    price: 38000,
    shopifyId: 'gid://shopify/ProductVariant/43343308062926' // <-- TU ID REAL AQUÍ
  },
  // ... más variantes
]
```

### 5.3 Crear Servicio de Shopify (Opcional)

Crea un archivo `services/shopifyService.ts`:

```typescript
import Client from 'shopify-buy';
import { SHOPIFY_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../constants';

// Inicializar cliente Shopify
export const shopifyClient = Client.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

// Crear checkout
export const createCheckout = async () => {
  const checkout = await shopifyClient.checkout.create();
  return checkout;
};

// Agregar items al checkout
export const addItemsToCheckout = async (checkoutId: string, items: any[]) => {
  const checkout = await shopifyClient.checkout.addLineItems(checkoutId, items);
  return checkout;
};

// Obtener URL de checkout
export const getCheckoutUrl = (checkout: any) => checkout.webUrl;
```

Instala la dependencia:
```bash
npm install shopify-buy
```

### 5.4 Actualizar el Componente de Carrito

Modifica `CartSidebar.tsx` para redirigir a Shopify checkout:

```typescript
import { shopifyClient, createCheckout, addItemsToCheckout } from '../services/shopifyService';

// En tu componente de carrito:
const handleCheckout = async () => {
  const checkout = await createCheckout();
  
  const lineItems = cartItems.map(item => ({
    variantId: item.stripePriceId, // Este es el shopifyId
    quantity: item.quantity,
  }));
  
  const updatedCheckout = await addItemsToCheckout(checkout.id, lineItems);
  
  // Redirigir a Shopify checkout
  window.location.href = updatedCheckout.webUrl;
};
```

---

## 6. Pruebas

### 6.1 Prueba Local

1. Agrega un producto al carrito
2. Ve al checkout
3. Verifica que te redirige a Shopify
4. Completa una compra de prueba

### 6.2 Modo Test de Shopify

- En Shopify, activa el **Modo de prueba** en Configuración > Pagos
- Usa tarjetas de prueba de Shopify para simular pagos

### 6.3 Verificar Inventario

- Asegúrate de que el inventario se actualiza correctamente
- Verifica que las variantes agotadas se marquen como no disponibles

---

## 7. Checkout con Shopify

### Opción A: Checkout Redirect (Recomendada)

Cuando el usuario hace clic en "Pagar":

```typescript
const redirectToShopifyCheckout = () => {
  // Construir URL del carrito de Shopify
  const items = cartItems.map(item => {
    const variantId = item.selectedVariant?.shopifyId || item.stripePriceId;
    // Extraer solo el número del ID
    const numericId = variantId.split('/').pop();
    return `${numericId}:${item.quantity}`;
  });
  
  const shopifyCartUrl = `https://${SHOPIFY_DOMAIN}/cart/${items.join(',')}`;
  window.location.href = shopifyCartUrl;
};
```

### Opción B: API de Checkout (Más compleja)

Usa `shopify-buy` para crear un checkout en segundo plano:

```typescript
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

const checkout = await client.checkout.create();

const lineItems = cartItems.map(item => ({
  variantId: item.stripePriceId,
  quantity: item.quantity,
}));

const updatedCheckout = await client.checkout.addLineItems(
  checkout.id,
  lineItems
);

// Redirigir
window.location.href = updatedCheckout.webUrl;
```

---

## 📝 Checklist Final

- [ ] Productos creados en Shopify con variantes
- [ ] IDs de variantes copiados al código
- [ ] Token de Storefront API configurado
- [ ] Imágenes subidas a Shopify
- [ ] Precios configurados correctamente
- [ ] Inventario inicial establecido
- [ ] Checkout de prueba realizado
- [ ] Pasarela de pago configurada (PayU, MercadoPago, etc.)
- [ ] Envíos configurados en Shopify
- [ ] Políticas de tienda (términos, privacidad) creadas

---

## 🆘 Solución de Problemas

### "Variant ID not found"
- Verifica que el ID esté completo: `gid://shopify/ProductVariant/123456`
- Asegúrate de que la variante existe y está activa

### "Access denied"
- Verifica que los scopes de la API estén correctamente configurados
- Asegúrate de que el token es de Storefront API, no Admin API

### Precios no coinciden
- Shopify requiere precios sin punto de miles: `38000` no `38.000`
- Verifica la moneda configurada en Shopify (COP)

---

## 📚 Recursos Adicionales

- [Documentación Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Shopify Buy SDK](https://github.com/Shopify/js-buy-sdk)
- [GraphQL Explorer para Shopify](https://shopify.dev/graphiql/storefront-graphiql)

---

**¿Preguntas?** Contacta al equipo de soporte de Shopify o consulta la documentación oficial.
