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



/* ================= Load Products ================= */

async function loadProducts() {

    allProducts = await getProducts();

    displayProducts(allProducts);

    createCategories();

}



/* ================= Display Products ================= */

function displayProducts(products) {

    productsContainer.innerHTML = "";


    /* No Products */

    if (products.length === 0) {

        noProducts.classList.remove("d-none");

        return;
    }


    noProducts.classList.add("d-none");



    /* Display Products */

    products.forEach(product => {

        productsContainer.innerHTML += `

            <div
                class="col-12 col-sm-6 col-lg-4 col-xl-3">

                <div
                    class="product-card"
                    onclick="goToDetails(${product.id})">


                    <!-- Wishlist -->

                    <button
                        class="wishlist-btn"
                        onclick="
                            addToWishlist(${product.id}, this);
                            event.stopPropagation();
                        ">

                        ♡

                    </button>


                    <!-- Product Image -->

                    <img
                        src="${product.thumbnail}"
                        class="product-image"
                        alt="${product.title}"
                    >


                    <!-- Product Body -->

                    <div class="product-body">


                        <!-- Category -->

                        <span class="badge bg-secondary">

                            ${product.category}

                        </span>


                        <!-- Title -->

                        <h5 class="product-title mt-3">

                            ${product.title}

                        </h5>


                        <!-- Description -->

                        <p class="product-description">

                            ${product.description}

                        </p>


                        <!-- Rating -->

                        <div class="rating mb-2">

                            ⭐⭐⭐⭐⭐

                            <span class="text-muted">

                                ${product.rating}

                            </span>

                        </div>


                        <!-- Price -->

                        <div
                            class="d-flex justify-content-between mb-3">

                            <span class="product-price">

                                $${product.price}

                            </span>


                            <span>

                                ${product.stock} left

                            </span>

                        </div>


                        <!-- View Details -->

                        <button
                            class="btn btn-dark details-btn">

                            View Details

                        </button>


                    </div>

                </div>

            </div>

        `;

    });

}



/* ================= Create Categories ================= */

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



/* ================= Category Filter ================= */

categorySelect.addEventListener(
    "change",
    async function () {

        let category =
            categorySelect.value;


        /* All Categories */

        if (category === "all") {

            displayProducts(allProducts);

            return;

        }


        /* Specific Category */

        let products =
            await getProductByCategory(category);


        displayProducts(products);

    }
);



/* ================= Search ================= */

searchForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();


        let text =
            searchInput.value.trim();


        /* Empty Search */

        if (text === "") {

            displayProducts(allProducts);

            return;

        }


        /* Search API */

        let products =
            await searchAboutProduct(text);


        displayProducts(products);

    }
);



/* ================= Wishlist ================= */

function addToWishlist(id, button) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    /* Product already exists */

    if (wishlist.includes(id)) {

        /* Remove Product */

        wishlist =
            wishlist.filter(
                item => item !== id
            );


        /* Change Heart */

        button.innerHTML = "♡";

        button.classList.remove("active");

    }


    /* Product doesn't exist */

    else {

        /* Add Product */

        wishlist.push(id);


        /* Change Heart */

        button.innerHTML = "♥";

        button.classList.add("active");

    }


    /* Save Wishlist */

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}



/* ================= Go To Product Details ================= */

function goToDetails(id) {

    window.location.href =
        `product-details.html?id=${id}`;

}

window.addToWishlist =
    addToWishlist;

window.goToDetails =
    goToDetails;



/* ================= Start ================= */

loadProducts();