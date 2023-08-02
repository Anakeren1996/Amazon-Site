export const cart = [];

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
  