const jsonData = `[
    { "id": 1, "name": "DIFFERENCE OF OPINION Printed T-Shirt", "category": "T-Shirts", "image": "card1.png", "price": "Rs.450", "gender": "men" },
    { "id": 2, "name": "THE CLOTHING FACTORY Unisex Pure Cotton T-Shirt", "category": "T-Shirts", "image": "card2.png", "price": "Rs.1865", "gender": "unisex" },
    { "id": 3, "name": "H & M Men's Pure Cotton Shirt", "category": "Shirts", "image": "card3.png", "price": "Rs.1800", "gender": "men" },
    { "id": 4, "name": "Taavi Kalamkari Handblock Print Kurti", "category": "Kurtis", "image": "card4.png", "price": "Rs.1650", "gender": "women" },
    { "id": 5, "name": "SASSAFRAS Women Straight Fit Jeans", "category": "Jeans", "image": "card5.png", "price": "Rs.1970", "gender": "women" },
    { "id": 6, "name": "Allen Solly Men Slim Fit Cotton Shirt", "category": "Shirts", "image": "card6.png", "price": "Rs.2100", "gender": "men" },
    { "id": 7, "name": "H & M Printed Velvet Wrap Dress", "category": "Dresses", "image": "card7.png", "price": "Rs.2560", "gender": "women" },
    { "id": 8, "name": "Snitch Men Pure Cotton Cargo Jeans", "category": "Jeans", "image": "card8.png", "price": "Rs. 2500", "gender": "men" },
    { "id": 9, "name": "Globus Women's Crop Tailored Jacket", "category": "Jackets", "image": "card9.png", "price": "Rs.1500", "gender": "women" },
    { "id": 10, "name": "Puma Deviate Nitro 2 Running Shoes", "category": "Shoes", "image": "card10.png", "price": "Rs.4500", "gender": "unisex" }
]`;

const cardData = JSON.parse(jsonData);

// const cardData = [
//     { id: 1, name: "DIFFERENCE OF OPINION Printed T-Shirt", category: "T-Shirts", image: "card1.png", price: "Rs.450", gender: "men" },
//     { id: 2, name: "THE CLOTHING FACTORY Unisex Pure Cotton T-Shirt", category: "T-Shirts", image: "card2.png", price: "Rs.1865", gender: "unisex" },
//     { id: 3, name: "H & M Men's Pure Cotton Shirt", category: "Shirts", image: "card3.png", price: "Rs.1800", gender: "men" },
//     { id: 4, name: "Taavi Kalamkari Handblock Print Kurti", category: "Kurtis", image: "card4.png", price: "Rs.1650", gender: "women" },
//     { id: 5, name: "SASSAFRAS Women Straight Fit Jeans", category: "Jeans", image: "card5.png", price: "Rs.1970", gender: "women" },
//     { id: 6, name: "Allen Solly Men Slim Fit Cotton Shirt", category: "Shirts", image: "card6.png", price: "Rs.2100", gender: "men" },
//     { id: 7, name: "H & M Printed Velvet Wrap Dress", category: "Dresses", image: "card7.png", price: "Rs.2560", gender: "women" },
//     { id: 8, name: "Snitch Men Pure Cotton Cargo Jeans", category: "Jeans", image: "card8.png", price: "Rs. 2500", gender: "men" },
//     { id: 9, name: "Globus Women's Crop Tailored Jacket", category: "Jackets", image: "card9.png", price: "Rs.1500", gender: "women" },
//     { id: 10, name: "Puma Deviate Nitro 2 Running Shoes", category: "Shoes", image: "card10.png", price: "Rs.4500", gender: "unisex" }
// ];

function createCard(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.itemId = card.id; // Set dataset attribute for id

    const imageElement = document.createElement("img");
    imageElement.src = card.image;
    imageElement.alt = card.name;

    const containerElement = document.createElement("div");
    containerElement.classList.add("cardcontainerjs");

    const nameElement = document.createElement("h4");
    nameElement.innerHTML = "<b>" + card.name + "</b>";

    const priceElement = document.createElement("span");
    priceElement.textContent = "Price: " + card.price;

    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.classList.add("add-to-cart-btn");
    addButton.addEventListener("click", function() {
        addToCart(card);a
        window.location.href = 'cart.html';
      });

    containerElement.appendChild(nameElement);
    containerElement.appendChild(priceElement);
    containerElement.appendChild(addButton);

    cardElement.appendChild(imageElement);
    cardElement.appendChild(containerElement);

    return cardElement;
}

let selectedGender = null;

function renderCards(gender = null, searchQuery = '') {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    let filteredCards = cardData;

    // Filter by gender if specified or use the selected gender
    if (gender === "men" || gender === "women") {
        selectedGender = gender;
    }

    if (selectedGender === "men" || selectedGender === "women") {
        filteredCards = filteredCards.filter(card => card.gender === selectedGender || card.gender === "unisex");
    }

    // Filter by search query if specified
    if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        filteredCards = filteredCards.filter(card => {
            const lowerCaseName = card.name.toLowerCase();
            return lowerCaseName.includes(lowerCaseSearchQuery);
        });
    }

    // Render filtered cards
    filteredCards.forEach(card => {
        const cardElement = createCard(card);
        cardContainer.appendChild(cardElement);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    // Render all cards initially
    renderCards();

    // Add event listener to the search bar input field
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('input', function(event) {
        // Get the value entered in the search bar
        const searchQuery = event.target.value;
        // Render the cards based on the selected gender and search query
        renderCards(selectedGender, searchQuery);
    });
});


// ======================================================================================================================

// const cardData = [
//     { id:1,name: "DIFFERENCE OF OPINION Printed T-Shirt", category: "T-Shirts", image: "card1.png", price: "Rs.450", gender: "men" },
//     { id:2,name: "THE CLOTHING FACTORY Unisex Pure Cotton T-Shirt", category: "T-Shirts", image: "card2.png", price: "Rs.1865", gender: "unisex" },
//     { id:3,name: "H & M Men's Pure Cotton Shirt", category: "Shirts", image: "card3.png", price: "Rs.1800", gender: "men" },
//     { id:4,name: "Taavi Kalamkari Handblock Print Kurti", category: "Kurtis", image: "card4.png", price: "Rs.1650", gender: "women" },
//     { id:5,name: "SASSAFRAS Women Straight Fit Jeans", category: "Jeans", image: "card5.png", price: "Rs.1970", gender: "women" },
//     { id:6,name: "Allen Solly Men Slim Fit Cotton Shirt", category: "Shirts", image: "card6.png", price: "Rs.2100", gender: "men" },
//     { id:7,name: "H & M Printed Velvet Wrap Dress", category: "Dresses", image: "card7.png", price: "Rs.2560", gender: "women" },
//     { id:8,name: "Snitch Men Pure Cotton Cargo Jeans", category: "Jeans", image: "card8.png", price: "Rs. 2500", gender: "men" },
//     { id:9,name: "Globus Women's Crop Tailored Jacket", category: "Jackets", image: "card9.png", price: "Rs.1500", gender: "women" },
//     { id:10,name: "Puma Deviate Nitro 2 Running Shoes", category: "Shoes", image: "card10.png", price: "Rs.4500", gender: "unisex" }
// ];

// function createCard(card) {
//     const cardElement = document.createElement("div");
//     cardElement.classList.add("card");

//     cardElement.dataset.itemId = card.id;

//     const imageElement = document.createElement("img");
//     imageElement.src = card.image;
//     imageElement.alt = card.name;

//     const containerElement = document.createElement("div");
//     containerElement.classList.add("cardcontainerjs");

//     const nameElement = document.createElement("h4");
//     nameElement.innerHTML = "<b>" + card.name + "</b>";

//     const priceElement = document.createElement("span");
//     priceElement.textContent = "Price: " + card.price;

//     const addButton = document.createElement("button");
//     addButton.textContent = "Add to Cart";
//     addButton.classList.add("add-to-cart-btn");
//     addButton.addEventListener("click", function() {
//         addToCart({
//             name: card.name,
//             price: card.price,
//             image: card.image
//         });
//     });

//     containerElement.appendChild(nameElement);
//     containerElement.appendChild(priceElement);
//     containerElement.appendChild(addButton);

//     cardElement.appendChild(imageElement);
//     cardElement.appendChild(containerElement);

//     return cardElement;
// }

// let selectedGender = null;

// function renderCards(gender = null, searchQuery = '') {
//     const cardContainer = document.getElementById("cardContainer");
//     cardContainer.innerHTML = "";

//     let filteredCards = cardData;

//     // Filter by gender if specified or use the selected gender
//     if (gender === "men" || gender === "women") {
//         selectedGender = gender;
//     }

//     if (selectedGender === "men" || selectedGender === "women") {
//         filteredCards = filteredCards.filter(card => card.gender === selectedGender || card.gender === "unisex");
//     }

//     // Filter by search query if specified
//     if (searchQuery) {
//         const lowerCaseSearchQuery = searchQuery.toLowerCase();
//         filteredCards = filteredCards.filter(card => {
//             const lowerCaseName = card.name.toLowerCase();
//             return lowerCaseName.includes(lowerCaseSearchQuery);
//         });
//     }

//     // Render filtered cards
//     filteredCards.forEach(card => {
//         const cardElement = createCard(card);
//         cardContainer.appendChild(cardElement);
//     });
// }

// document.addEventListener("DOMContentLoaded", function() {
//     // Render all cards initially
//     renderCards();

//     // Add event listener to the search bar input field
//     const searchBar = document.querySelector('.search-bar');
//     searchBar.addEventListener('input', function(event) {
//         // Get the value entered in the search bar
//         const searchQuery = event.target.value;
//         // Render the cards based on the selected gender and search query
//         renderCards(selectedGender, searchQuery);
//     });
// });






//=================================================================================================================================================================


// const cardData = [
//     { name: "DIFFERENCE OF OPINION Printed T-Shirt", category: "T-Shirts", image: "card1.png", price: "Rs.450", gender: "men" },
//     { name: "THE CLOTHING FACTORY Unisex Pure Cotton T-Shirt", category: "T-Shirts", image: "card2.png", price: "Rs.1865", gender: "unisex" },
//     { name: "H & M Men's Pure Cotton Shirt", category: "Shirts", image: "card3.png", price: "Rs.1800", gender: "men" },
//     { name: "Taavi Kalamkari Handblock Print Kurti", category: "Kurtis", image: "card4.png", price: "Rs.1650", gender: "women" },
//     { name: "SASSAFRAS Women Straight Fit Jeans", category: "Jeans", image: "card5.png", price: "Rs.1970", gender: "women" },
//     { name: "Allen Solly Men Slim Fit Cotton Shirt", category: "Shirts", image: "card6.png", price: "Rs.2100", gender: "men" },
//     { name: "H & M Printed Velvet Wrap Dress", category: "Dresses", image: "card7.png", price: "Rs.2560", gender: "women" },
//     { name: "Snitch Men Pure Cotton Cargo Jeans", category: "Jeans", image: "card8.png", price: "Rs. 2500", gender: "men" },
//     { name: "Globus Women's Crop Tailored Jacket", category: "Jackets", image: "card9.png", price: "Rs.1500", gender: "women" },
//     { name: "Puma Deviate Nitro 2 Running Shoes", category: "Shoes", image: "card10.png", price: "Rs.4500", gender: "unisex" }
// ];

// function createCard(card) {
//     const cardElement = document.createElement("div");
//     cardElement.classList.add("card");

//     const imageElement = document.createElement("img");
//     imageElement.src = card.image;
//     imageElement.alt = card.name;

//     const containerElement = document.createElement("div");
//     containerElement.classList.add("cardcontainerjs");

//     const nameElement = document.createElement("h4");
//     nameElement.innerHTML = "<b>" + card.name + "</b>";

//     const priceElement = document.createElement("span");
//     priceElement.textContent = "Price: " + card.price;

//     const addButton = document.createElement("button");
//     addButton.textContent = "Add to Cart";
//     addButton.classList.add("add-to-cart-btn");
//     addButton.addEventListener("click", function() {
//         addToCart({
//             name: card.name,
//             price: card.price,
//             image: card.image
//         });
//     });

//     containerElement.appendChild(nameElement);
//     containerElement.appendChild(priceElement);
//     containerElement.appendChild(addButton);

//     cardElement.appendChild(imageElement);
//     cardElement.appendChild(containerElement);

//     return cardElement;
// }

// function renderCards(gender = null) {
//     const cardContainer = document.getElementById("cardContainer");
//     cardContainer.innerHTML = "";

//     if (gender === "men" || gender === "women") {
//         const filteredCards = cardData.filter(card => card.gender === gender || card.gender === "unisex");
//         filteredCards.forEach(card => {
//             const cardElement = createCard(card);
//             cardContainer.appendChild(cardElement);
//         });
//     } else {
//         cardData.forEach(card => {
//             const cardElement = createCard(card);
//             cardContainer.appendChild(cardElement);
//         });
//     }
// }

// document.addEventListener("DOMContentLoaded", function() {
//     renderCards();
// });


// ======================================================================================================================================================

// // cardscript.js

// // Card data
// const cardData = [
//     { name: "DIFFERENCE OF OPINION Printed T-Shirt", category: "T-Shirts", image: "card1.png", price: "Rs.450", gender: "men" },
//     { name: "THE CLOTHING FACTORY Unisex Pure Cotton T-Shirt", category: "T-Shirts", image: "card2.png", price: "Rs.1865", gender: "unisex" },
//     { name: "H & M Men's Pure Cotton Shirt", category: "Shirts", image: "card3.png", price: "Rs.1800", gender: "men" },
//     { name: "Taavi Kalamkari Handblock Print Kurti", category: "Kurtis", image: "card4.png", price: "Rs.1650", gender: "women" },
//     { name: "SASSAFRAS Women Straight Fit Jeans", category: "Jeans", image: "card5.png", price: "Rs.1970", gender: "women" },
//     { name: "Allen Solly Men Slim Fit Cotton Shirt", category: "Shirts", image: "card6.png", price: "Rs.2100", gender: "men" },
//     { name: "H & M Printed Velvet Wrap Dress", category: "Dresses", image: "card7.png", price: "Rs.2560", gender: "women" },
//     { name: "Snitch Men Pure Cotton Cargo Jeans", category: "Jeans", image: "card8.png", price: "Rs. 2500", gender: "men" },
//     { name: "Globus Women's Crop Tailored Jacket", category: "Jackets", image: "card9.png", price: "Rs.1500", gender: "women" },
//     { name: "Puma Deviate Nitro 2 Running Shoes", category: "Shoes", image: "card10.png", price: "Rs.4500", gender: "unisex" }
//     // Add more card data as needed
// ];

// // Function to create a single card element
// function createCard(card) {
//     const cardElement = document.createElement("div");
//     cardElement.classList.add("card");

//     const imageElement = document.createElement("img");
//     imageElement.src = card.image;
//     imageElement.alt = card.name;

//     const containerElement = document.createElement("div");
//     containerElement.classList.add("cardcontainerjs");

//     const nameElement = document.createElement("h4");
//     nameElement.innerHTML = "<b>" + card.name + "</b>";

//     const priceElement = document.createElement("span"); // Corrected typo here
//     priceElement.textContent = "Price: " + card.price;

//     const categoryElement = document.createElement("p");
//     categoryElement.textContent = "Category: " + card.category;

//     const addButton = document.createElement("button");
//     addButton.textContent = "Add to Cart";
//     addButton.classList.add("add-to-cart-btn");
//     addButton.addEventListener("click", function() {
//         addToCart(card);
//     });
//     containerElement.appendChild(addButton);

//     containerElement.appendChild(nameElement);
//     containerElement.appendChild(priceElement);
//     containerElement.appendChild(categoryElement);

//     cardElement.appendChild(imageElement);
//     cardElement.appendChild(containerElement);

//     return cardElement;
// }



// -----------------------------------------------------

// Function to render cards based on gender
// function renderCards() {
//     const cardContainer = document.getElementById('cardContainer');
//     cardContainer.innerHTML = '';

//     products.forEach(product => {
//         const card = document.createElement('div');
//         card.classList.add('card');
//         card.innerHTML = `
//             <div class="card-image">
//                 <img src="${product.image}" alt="${product.name}">
//             </div>
//             <div class="card-details">
//                 <p>${product.name}</p>
//                 <p>Category: ${product.category}</p>
//                 <p>Price: ${product.price}</p>
//                 <button class="add-to-cart-btn" onclick="addToCart('${product.name}')">Add to Cart</button>
//             </div>
//         `;
//         cardContainer.appendChild(card);
//     });
// }


// Function to render cards based on gender
// function renderCards(gender = null) {
//     const cardContainer = document.getElementById("cardContainer");
//     cardContainer.innerHTML = "";

//     if (gender === "men" || gender === "women") {
//         const filteredCards = cardData.filter(card => card.gender === gender || card.gender === "unisex");
//         filteredCards.forEach(card => {
//             const cardElement = createCard(card);
//             cardContainer.appendChild(cardElement);
//         });
//     } else {
//         cardData.forEach(card => {
//             const cardElement = createCard(card);
//             cardContainer.appendChild(cardElement);
//         });
//     }
// }


// document.addEventListener("DOMContentLoaded", function() {
//     // Example usage for rendering men's cards
//     renderCards();
// });
