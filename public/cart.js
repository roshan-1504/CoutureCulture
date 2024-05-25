// function displayCartItems() {
//     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const cartContainer = document.getElementById('cartContainer');
  
//     cartContainer.innerHTML = '';
  
//     cartItems.forEach(item => {
//       const cardElement = createCard(item);
//       cartContainer.appendChild(cardElement);
//     });
//   }
  
// document.addEventListener('DOMContentLoaded', displayCartItems);


//========================================

// // cart.js
// let cart = [];

// function addToCart(item) {
//   cart.push(item);
//   updateCartDisplay();
//   console.log("Added to cart:", item);
// }

// function updateCartDisplay() {
//   const cartContainer = document.getElementById("cartContainer");
//   cartContainer.innerHTML = "";

//   cart.forEach((item) => {
//     const cartItem = document.createElement("div");
//     cartItem.classList.add("cart-item");

//     const itemImage = document.createElement("img");
//     itemImage.src = item.image;
//     itemImage.alt = item.name;

//     const itemDetails = document.createElement("div");
//     itemDetails.classList.add("item-details");

//     const itemName = document.createElement("h4");
//     itemName.textContent = item.name;

//     const itemPrice = document.createElement("p");
//     itemPrice.textContent = "Price: " + item.price;

//     itemDetails.appendChild(itemName);
//     itemDetails.appendChild(itemPrice);

//     cartItem.appendChild(itemImage);
//     cartItem.appendChild(itemDetails);

//     cartContainer.appendChild(cartItem);
//   });
// }



// // cart.js

// let cartItems = [];

// function addToCart(item) {
//     console.log("Adding item to cart:", item);
//     cartItems.push(item);
//     updateCart();
// }

// function updateCart() {
//     const cartContainer = document.querySelector(".cart-items");
//     const totalPriceElement = document.getElementById("totalPrice");

//     cartContainer.innerHTML = "";

//     let totalPrice = 0;

//     cartItems.forEach(item => {
//         const itemElement = document.createElement("div");
//         itemElement.classList.add("cart-item");
//         itemElement.innerHTML = `
//             <div class="cart-item-image">
//                 <img src="${item.image}" alt="${item.name}">
//             </div>
//             <div class="cart-item-details">
//                 <p>${item.name}</p>
//                 <p>Price: ${item.price}</p>
//             </div>
//         `;
//         cartContainer.appendChild(itemElement);

//         totalPrice += parseFloat(item.price.replace("Rs.", "").trim());
//     });

//     totalPriceElement.textContent = totalPrice.toFixed(2);
// }

// document.addEventListener("DOMContentLoaded", function() {
//     updateCart();
// });


//==========================

const products = [
    { name: "Trendyol Women Solid High Neck Fitted Top", category: "Tops", image: "card1.png", price: "Rs.450" },
    { name: "THE CLOTHING FACTORY Unisex Pure Cotton T-Shirt", category: "T-Shirts", image: "card2.png", price: "Rs.1865" },
    { name: "Taavi Kalamkari Handblock Print Kurti", category: "Kurtis", image: "card4.png", price: "Rs.1650" }
];

let cartItems = [];

function addToCart(item) {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        cartItems.push({ ...item, quantity: 1 });
    }

    renderCartItems();
}

function removeFromCart(itemName) {
    cartItems = cartItems.filter(item => item.name !== itemName);
    renderCartItems();
}

function saveCartItems() {
    renderCartItems();
}

function renderCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const row = document.createElement('div');
        row.classList.add('cart-item');
        row.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <p>${item.name}</p>
                <p>Quantity: <button onclick="decreaseQuantity('${item.name}')">-</button> ${item.quantity} <button onclick="increaseQuantity('${item.name}')">+</button></p>
                <p>Price: ${item.price}</p>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
        cartContainer.appendChild(row);

        totalPrice += parseFloat(item.price.replace('Rs.', '')) * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function increaseQuantity(itemName) {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity++;
        saveCartItems();
    }
}

function decreaseQuantity(itemName) {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
        saveCartItems();
    }
}

function placeOrder() {
    // Add code to place the order
    // alert("Order is placed!");
    window.location.href = "afterorders.html";

}


// Initialize cartItems with product data when the page loads
window.onload = function () {
    products.forEach(product => {
        cartItems.push({ ...product, quantity: 1 });
    });
    renderCartItems();
};