import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

// Use this data to generate html / looping through the array of products and for each product we are creating all of the html.
products.forEach((product) => {
  productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
          product.id
        }">
            Add to Cart
        </button>
      </div>
    `;
  // console.log(html);
});
console.log(productsHTML);

// Take this html and put it on the web page (using the DOM)
document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateCartQuantity() {
  let cartQuantity = 0;
  // After we update our cart we're going to calculate the quantity total
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  // console.log(cartQuantity);
  // console.log(cart);

}

// Make it interactive
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // console.log('I am working');
    //  console.log(button.dataset.productName);
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});

// MODULES = A BETTER WAY TO ORGANIZE OUR CODE

// 1 - HELP US AVOID NAMING CONFLICTS

// 2 - DON'T HAVE TO WORRY ABOUT ORDER OF FILES
