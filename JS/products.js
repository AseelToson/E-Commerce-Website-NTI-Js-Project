import {
    getProducts,
    getProductByCategory,
    searchAboutProduct
} from "./api.js";


const productsContainer =
    document.getElementById("productsContainer");

const categorySelect =
    document.getElementById("categorySelect");

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const noProducts =
    document.getElementById("noProducts");


let allProducts = [];


// Get Products
async function loadProducts() {

    allProducts = await getProducts();

    displayProducts(allProducts);

    createCategories();
}


// Display Products
function displayProducts(products) {

    productsContainer.innerHTML = "";

    if (products.length === 0) {

        noProducts.classList.remove("d-none");

        return;
    }

    noProducts.classList.add("d-none");


    products.forEach(product => {

        productsContainer.innerHTML += `

            <div class="col-12 col-sm-6 col-lg-4 col-xl-3">

                <div class="product-card"
                    onclick="goToDetails(${product.id})">

                    <button 
                        class="wishlist-btn"
                        onclick="addToWishlist(${product.id}, this); 
                            event.stopPropagation();">
                        ♡
                    </button>

                    <img
                        src="${product.thumbnail}"
                        class="product-image"
                        alt="${product.title}"
                    >

                    <div class="product-body">

                        <span class="badge bg-secondary">
                            ${product.category}
                        </span>

                        <h5 class="product-title mt-3">
                            ${product.title}
                        </h5>

                        <p class="product-description">
                            ${product.description}
                        </p>

                        <div class="rating mb-2">
                            ⭐⭐⭐⭐⭐
                            <span class="text-muted">
                                ${product.rating}
                            </span>
                        </div>

                        <div class="d-flex justify-content-between mb-3">

                            <span class="product-price">
                                $${product.price}
                            </span>

                            <span>
                                ${product.stock} left
                            </span>

                        </div>

                        <a
                            href="product-details.html?id=${product.id}"
                            class="btn btn-dark details-btn">

                            View Details
                            

                        </a>

                    </div>

                </div>

            </div>

        `;
    });
}

function addToWishlist(id, button) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];


    if (wishlist.includes(id)) {

        // Remove from wishlist
        wishlist = wishlist.filter(item => item !== id);

        button.innerHTML = "♡";
        button.classList.remove("active");

    } else {

        // Add to wishlist
        wishlist.push(id);

        button.innerHTML = "♥";
        button.classList.add("active");
    }


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
}

window.addToWishlist = addToWishlist;


function goToDetails(id) {
    window.location.href = `product-details.html?id=${id}`;
}

window.goToDetails = goToDetails;

// Create Categories
function createCategories() {

    let categories = [];

    allProducts.forEach(product => {

        if (!categories.includes(product.category)) {

            categories.push(product.category);

        }

    });


    categories.forEach(category => {

        categorySelect.innerHTML += `
            <option value="${category}">
                ${category}
            </option>
        `;

    });
}


// Category Filter
categorySelect.addEventListener("change", async function () {

    let category = categorySelect.value;


    if (category === "all") {

        displayProducts(allProducts);

    } else {

        let products =
            await getProductByCategory(category);

        displayProducts(products);

    }

});


// Search
searchForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    let text = searchInput.value.trim();


    if (text === "") {

        displayProducts(allProducts);

        return;
    }


    let products =
        await searchAboutProduct(text);

    displayProducts(products);

});


// Start
loadProducts();