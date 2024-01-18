import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

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
          $${formatCurrency(product.priceCents)}
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
  // After we update our cart we're going to calculate the quantity total

  const cartQuantity = calculateCartQuantity();

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  // console.log(cartQuantity);
  // console.log(cart);
}

updateCartQuantity();

// Make it interactive
// document.querySelectorAll(".js-add-to-cart").forEach((button) => {
//   button.addEventListener("click", () => {
//     // console.log('I am working');
//     //  console.log(button.dataset.productName);
//     const productId = button.dataset.productId;
//     addToCart(productId);
//     updateCartQuantity();
//   });
// });

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // parentNode to avoid conflicts
    let addedMessage = button.parentNode.querySelector(".added-to-cart");

    const addedMessageTimeouts = {};

    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();

    if (addedMessage) {
      addedMessage.classList.add("added-to-cart-visible");

      const previousTimeoutId = addedMessageTimeouts[productId];

      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }

      let timeoutId = setTimeout(() => {
        addedMessage.classList.remove("added-to-cart-visible");
      }, 2000);

      addedMessageTimeouts[productId] = timeoutId;
    }
  });
});

// MODULES = A BETTER WAY TO ORGANIZE OUR CODE

// 1 - HELP US AVOID NAMING CONFLICTS

// 2 - DON'T HAVE TO WORRY ABOUT ORDER OF FILES

// A PARTIR DAQUI TRABALHANDO NO INPUT INTERATIVO

// HERE IS ALL OF THE CODE RELATED TO SEARCH INTERACTIVE

// Make the search input interactive
// const inputElement = document.querySelector(".js-search-bar");
// const searchInputButton = document.querySelector(".js-search-button");

// function handleSearch() {
//   // This is the variable that holds the value typed in the input by the user.
//   const searchTerm = inputElement.value.toLowerCase();

//   // This variable holds the products that correspond to the search criteria in question.
//   const matchingProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm)
//   );

//   console.log("Até aqui, tudo certo.");

//   displayProducts(matchingProducts);
// }

// inputElement.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     handleSearch();
//   }
// });

// searchInputButton.addEventListener("click", function (event) {
//   handleSearch();
// });

// // PESQUISA PRODUTOS

// function displayProducts(products) {
//   let productsHTML = "";

//   if (products.length > 0) {
//     products.forEach((product) => {
//       // Generate the HTML for each corresponding product here
//       const productHTML = `
//         <div class="product-container">
//           <div class="product-image-container">
//             <img class="product-image"
//               src="${product.image}">
//           </div>
  
//           <div class="product-name limit-text-to-2-lines">
//             ${product.name}
//           </div>
  
//           <div class="product-rating-container">
//             <img class="product-rating-stars"
//               src="images/ratings/rating-${product.rating.stars * 10}.png">
//             <div class="product-rating-count link-primary">
//               ${product.rating.count}
//             </div>
//           </div>
  
//           <div class="product-price">
//             $${(product.priceCents / 100).toFixed(2)}
//           </div>
  
//           <div class="product-quantity-container">
//             <select class="js-quantity-selector-${product.id}">
//               <option selected value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//               <option value="6">6</option>
//               <option value="7">7</option>
//               <option value="8">8</option>
//               <option value="9">9</option>
//               <option value="10">10</option>
//             </select>
//           </div>
  
//           <div class="product-spacer"></div>
  
//           <div class="added-to-cart">
//             <img src="images/icons/checkmark.png">
//               Added
//           </div>
  
//           <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
//             product.id
//           }">
//               Add to Cart
//           </button>
//         </div>
//       `;
//       // Concatenates the product HTML to the general HTML
//       productsHTML += productHTML;
//     });
//   } else {
//     productsHTML = `<div class="no-result-products">No products matched your search.</div>`;
//   }

//   document.querySelector(".js-products-grid").innerHTML = productsHTML;

//   // Call addToCart after adding the products to the page
  
//   addToCart(productId);
//   updateCartQuantity();
// }
