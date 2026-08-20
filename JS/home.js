import { getAllCategories } from "./api.js";
import { getOfferProducts } from "./api.js";


const categoryIcons = {
    beauty: "face",
    fragrances: "spa",
    furniture: "chair",
    groceries: "shopping_basket",
    "home-decoration": "home",
    "kitchen-accessories": "kitchen",
    laptops: "laptop",
    "mens-shirts": "checkroom",
    "mens-shoes": "shoe",
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
    "womens-shoes": "shoe",
    "womens-watches": "watch",
    "sports-accessories": "sports",

};


function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.getElementById("cartCount").textContent = cart.length;
}

updateCartCount();



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

        container.appendChild(item);
    });
}


displayCategories();









