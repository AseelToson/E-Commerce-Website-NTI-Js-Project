// function updateCartCount() {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     document.getElementById("cartCount").textContent = cart.length;
// }

// updateCartCount();







import { getAllCategories,getOfferProducts } from "./api.js";
import { getProducts } from "./api.js";
import { createProductCard } from "./productCard.js";
// import{createCategories}from "./products.js";

const categoryIcons = {
    beauty: "face",
    fragrances: "spa",
    furniture: "chair",
    groceries: "shopping_basket",
    "home-decoration": "home",
    "kitchen-accessories": "kitchen",
    laptops: "laptop",
    "mens-shirts": "checkroom",
    "mens-shoes": "tablet",
    "mens-watches": "watch",
    "mobile-accessories": "phone_android",
    smartphones: "smartphone",
    tablets: "tablet",
    tops: "checkroom",
    sunglasses: "visibility",
    vehicle: "directions_car",
    "womens-bags": "shopping_bag",
    "womens-dresses": "checkroom",
    "womens-jewellery": "diamond",
    "womens-shoes": "tablet",
    "womens-watches": "watch",
    "sports-accessories": "sports",

};


// function updateCartCount() {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   document.getElementById("cartCount").textContent = cart.length;
// }

// updateCartCount();



async function displayCategories() {

    const categories = await getAllCategories();

    const container = document.getElementById("categoriesContainer");

    container.innerHTML = "";

    categories.forEach(function (category) {

        const item = document.createElement("div");

        item.className = "category-item";

        const icon = categoryIcons[category.toLowerCase()] || "health_and_beauty";

        item.innerHTML = `
            <span class="material-symbols-outlined">
                ${icon}
            </span>

            <span>${category}</span>
        `;
        item.addEventListener("click", () => {

            window.location.href =

                `products.html?category=${encodeURIComponent(category)}`;

        });

        container.appendChild(item);
    });
}


displayCategories();



async function displayHomeProducts() {

    const products = await getProducts();

    const container = document.getElementById("homeProducts");

    const featuredProducts = products.slice(0, 8);

    featuredProducts.forEach(product => {

        const card = createProductCard(product, {
            showDescription: false,
            showStock: false,
            showWishlist: true,
            showAddToCart: true,
            showQuantity: false,
            showDelete: false,
            showOffer: true,
            showDetails: true,
        });

        container.appendChild(card);
    });
}

displayHomeProducts();