// MAIN IDEA OF JAVASCRIPT
// 1 - SAVE THE DATA
// 2- GENERATE THE HTML
// 3 - MAKE IT INTERACTIVE

import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// EVERY TIME WE LOOP THROUGH THE CART WE ARE GOING TO ADD THIS HTML
let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // SAVE THE RESULT
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  //   console.log(matchingProduct);

  cartSummaryHTML += `
<div class="cart-item-container 
js-cart-item-container-${matchingProduct.id}">
<div class="delivery-date">
    Delivery date: Tuesday, June 21
</div>

<div class="cart-item-details-grid">
    <img class="product-image"
    src="${matchingProduct.image}">

    <div class="cart-item-details">
    <div class="product-name">
        ${matchingProduct.name}
    </div>
    <div class="product-price">
        $${formatCurrency(matchingProduct.priceCents)}
    </div>
    <div class="product-quantity">
        <span>
        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
        Update
        </span>
        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
          matchingProduct.id
        }">
        Delete
        </span>
    </div>
    </div>

    <div class="delivery-options">
    <div class="delivery-options-title">
        Choose a delivery option:
    </div>
    <div class="delivery-option">
        <input type="radio" checked
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
        <div>
        <div class="delivery-option-date">
            Tuesday, June 21
        </div>
        <div class="delivery-option-price">
            FREE Shipping
        </div>
        </div>
    </div>
    <div class="delivery-option">
        <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
        <div>
        <div class="delivery-option-date">
            Wednesday, June 15
        </div>
        <div class="delivery-option-price">
            $4.99 - Shipping
        </div>
        </div>
    </div>
    <div class="delivery-option">
        <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
        <div>
        <div class="delivery-option-date">
            Monday, June 13
        </div>
        <div class="delivery-option-price">
            $9.99 - Shipping
        </div>
        </div>
    </div>
    </div>
</div>
</div>
    `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// console.log(cartSummaryHTML);

// DELETE LINKS

// 1 - REMOVE THE PRODUCTS OF THE CART
// 2 - UPDATE THE HTML (USE THE DOM TO GET THE ELEMENT TO REMOVE / USE .remove() METHOD)

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    // console.log('delete');
    const productId = link.dataset.productId;
    // console.log(productId);
    removeFromCart(productId);
    // console.log(cart);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    // console.log(container);
    container.remove();

    updateCartQuantity();
  });
});

// UPDATE THE PAGE TITLE TO DISPLAY THE QUANTITY AT THE CHECKOUT

function updateCartQuantity() {
  let cartQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  let checkoutQuantityTitle = document.querySelector(".js-checkout-quantity");

  checkoutQuantityTitle.innerHTML = `${cartQuantity} ${
    cartQuantity === 1 ? "item" : "items"
  }`;
}

updateCartQuantity();
