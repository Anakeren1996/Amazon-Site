// ALL THE CODES ITS RELATED TO THE CART

export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  // cart = [
  //   {
  //     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  //     quantity: 2,
  //     deliveryOptionId: '1'
          
  //   },
  //   {
  //     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  //     quantity: 1,
  //     deliveryOptionId: '2'
  //   },
  // ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  // Check if this product name is already in the cart
  // We'll loop through the cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // Adding products to the cart by the quantity selected in the select
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  let quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

// FUNCTION DELETE STEPS
// 1- CREATE A NEW ARRAY
// 2 - LOOP THROUGH THE CART
// 3 - ADD EACH PRODUCT TO THE NEW ARRAY, EXCEPT FOR THIS PRODUCTID

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  // Check if this product name is already in the cart
  // We'll loop through the cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  // LOOPING THROUGH THE CART AND FINDING DE PRODUCT
  // UPDATE THE DELIVERYOPTIONID OF THE PRODUCT

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
