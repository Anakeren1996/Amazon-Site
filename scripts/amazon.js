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
console.log(productsHTML);

// Take this html and put it on the web page (using the DOM)
document.querySelector(".js-products-grid").innerHTML = productsHTML;

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
    // console.log(cartQuantity);
    // console.log(cart);

    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addedMessage.classList.add("added-to-cart-visible");

    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      //Cleartimeout() -> is used to stop the previous timer, ensuring that the previous message is hidden before showing the new message.
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);

    // Save the timeoutId for this product
    // so we can stop it later if we need to.
    addedMessageTimeouts[productId] = timeoutId;
  });
});
