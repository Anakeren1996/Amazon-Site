export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

export function addToCart(productId) {
    let matchingItem;
  
    // Check if this product name is already in the cart
    // We'll loop through the cart
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
  
      // VER ESSE CODIGO AQUI DE ADDEDMESSAGE DEPOIS
      // const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    });
  
    // Adding products to the cart by the quantity selected in the select
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
  
    const quantity = Number(quantitySelector.value);
  
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity,
      });
    }
  }
  