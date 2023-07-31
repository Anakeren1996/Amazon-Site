import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = "";

// Use this data to generate html / looping through the array of products and for each product we are creating all of the html.

// forEach loop structure
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

        <div class="added-to-cart js-added-to-cart-${product.id}">
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
// console.log(productsHTML);

// Take this html and put it on the web page (using the DOM)
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// Call addToCart after adding the products to the page
addToCart();

// Make the search input interactive
const inputElement = document.querySelector(".js-search-bar");
const searchInputButton = document.querySelector(".js-search-button");

function handleSearch() {
  // This is the variable that holds the value typed in the input by the user.
  const searchTerm = inputElement.value.toLowerCase();

  // This variable holds the products that correspond to the search criteria in question.
  const matchingProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  displayProducts(matchingProducts);
}

inputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

searchInputButton.addEventListener("click", function (event) {
  handleSearch();
});

function addToCart() {
  // This object will be used to store the IDs of timers (timeouts) associated with each product.
  const addedMessageTimeouts = {};
  // Make it interactive
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      // console.log('I am working');
      //  console.log(button.dataset.productName);
      const { productId } = button.dataset;

      let matchingItem;

      // Check if this product name is already in the cart
      // We'll loop through the cart
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
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
          productId,
          quantity,
        });
      }

      let cartQuantity = 0;
      // After we update our cart we're going to calculate the quantity total
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
      if (addedMessage) {
        addedMessage.classList.add("added-to-cart-visible");

        const previousTimeoutId = addedMessageTimeouts[productId];
        if (previousTimeoutId) {
          clearTimeout(previousTimeoutId);
        }

        const timeoutId = setTimeout(() => {
          addedMessage.classList.remove("added-to-cart-visible");
        }, 2000);

        addedMessageTimeouts[productId] = timeoutId;
      }

      // LocalStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });

  // This variable stores the array of products stored in localStorage
  let cart = [];

  // Check if a cart is stored in localStorage
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    // Cart is retrieved and converted from JSON to a JavaScript object
    cart = JSON.parse(storedCart);
  }

  // Update quantity in the cart

  // Reduce: adds the number of items in the cart
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const cartIcon = document.querySelector(".js-cart-quantity");
  cartIcon.innerHTML = cartQuantity;
}

// Function to display the corresponding products
function displayProducts(products) {
  let productsHTML = "";

  if (products.length > 0) {
    products.forEach((product) => {
      // Generate the HTML for each corresponding product here
      const productHTML = `
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
      // Concatenates the product HTML to the general HTML
      productsHTML += productHTML;
    });
  } else {
    productsHTML = `<div class="no-result-products">No products matched your search.</div>`;
  }

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  // Call addToCart after adding the products to the page
  addToCart();
}
