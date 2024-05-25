const products = [
    { name: "Trendyol Women Solid High Neck Fitted Top", category: "Tops", image: "card1.png", price: "Rs.450" },
    { name: "THE CLOTHING FACTORY Unisex Pure Cotton T-Shirt", category: "T-Shirts", image: "card2.png", price: "Rs.1865" },
    { name: "H & M Men's Pure Cotton Shirt", category: "Shirts", image: "card3.png", price: "Rs.1800" },
    { name: "Taavi Kalamkari Handblock Print Kurti", category: "Kurtis", image: "card4.png", price: "Rs.1650" }
];

// Function to add item to cart
// Function to add item to cart
function addToCart(item) {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);

    if (existingItemIndex !== -1) {
        // If item exists, update quantity
        cartItems[existingItemIndex].quantity++;
    } else {
        // If item doesn't exist, add it to cart
        cartItems.push({ ...item, quantity: 1 });
    }

    // Save cart items to localStorage
    saveCartItems();

    // Render cart items after adding the new item
    renderCartItems();
}


// Function to remove item from cart
function removeFromCart(itemName) {
    cartItems = cartItems.filter(item => item.name !== itemName);
    // Save cart items to localStorage
    saveCartItems();
}

// Function to save cart items to localStorage
function saveCartItems() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCartItems();
}

// Initialize cartItems with the given data
let cartItems = [];

// Load cart items from localStorage
if (localStorage.getItem('cart')) {
    cartItems = JSON.parse(localStorage.getItem('cart'));
} else {
    // Add the given data to cartItems
    products.forEach(product => {
        cartItems.push({ ...product, quantity: 1 });
    });
    // Save initial cart items to localStorage
    saveCartItems();
}

// Function to render cart items
function renderCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    // Clear existing cart items
    cartContainer.innerHTML = '';

    // Populate cart items
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

        // Calculate total price
        totalPrice += parseFloat(item.price.replace('Rs.', '')) * item.quantity;
    });

    // Update total price
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to increase quantity
function increaseQuantity(itemName) {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity++;
        saveCartItems();
    }
}

// Function to decrease quantity
function decreaseQuantity(itemName) {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);
    if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
        saveCartItems();
    }
}

// Render cart items when the page loads
window.onload = renderCartItems;
