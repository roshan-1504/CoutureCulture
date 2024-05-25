// cart.js

const cartItemsList = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");

function updateCart() {
  cartItemsList.innerHTML = ""; // Clear existing cart items
  let totalPrice = 0;

  cartItems.forEach((item, index) => {
    const cartItemElement = document.createElement("li");
    cartItemElement.classList.add("cart-item");

    const itemNameElement = document.createElement("h5");
    itemNameElement.textContent = item.name;

    const itemPriceElement = document.createElement("span");
    itemPriceElement.classList.add("item-price");
    itemPriceElement.textContent = item.price;
    totalPrice += parseFloat(item.price.slice(3)); // Extract price value

    const itemImageElement = document.createElement("img");
    itemImageElement.src = item.image;
    itemImageElement.alt = item.name;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-from-cart-btn");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
      removeFromCart(index); // Remove item from cart on button click
    });

    cartItemElement.appendChild(itemNameElement);
    cartItemElement.appendChild(itemPriceElement);
    cartItemElement.appendChild(itemImageElement);
    cartItemElement.appendChild(removeButton);

    cartItemsList.appendChild(cartItemElement);
  });

  cartTotalSpan.textContent = `Total: $${totalPrice.toFixed(2)}`; // Update cart total with formatted price
}

function removeFromCart(index) {
  cartItems.splice(index, 1); // Remove item from cart array
  updateCart(); // Update cart display and total
}

// Call updateCart to display initial cart items (if any)
updateCart();
