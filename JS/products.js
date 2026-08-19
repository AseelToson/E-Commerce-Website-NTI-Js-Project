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

const pagination =
    document.getElementById("pagination");


let allProducts = [];
let currentProducts = []
let currentPage = 1
let productsPerPage = 20



/* ================= Load Products ================= */

async function loadProducts() {

    allProducts = await getProducts();
    currentProducts = allProducts


    displayProducts(currentProducts);

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

    let start = (currentPage - 1) * productsPerPage;
    let end = start + productsPerPage;
    let productsToShow = products.slice(start, end);

    /* Display Products */

    productsToShow.forEach(product => {

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
                            class="btn btn-danger details-btn">

                            View Details

                        </button>


                    </div>

                </div>

            </div>

        `;

    });
    createPagination(products)

}

function createPagination(products) {

    let totalPages = Math.ceil(products.length / productsPerPage);

    pagination.innerHTML = "";

    pagination.innerHTML += `

        <button
            class="btn btn-danger mx-1"
            onclick="changePage(${currentPage - 1})">

            Previous

        </button>

    `;
    for (let i = 1; i <= totalPages; i++) {

        pagination.innerHTML += `
        
            <button
                class="btn btn-danger mx-1"
                onclick="changePage(${i})">

                ${i}

            </button>

        `;

    }
    pagination.innerHTML += `

        <button
            class="btn btn-danger mx-1"
            onclick="changePage(${currentPage + 1})">

            Next

        </button>

    `;

}

function changePage(page) {

    currentPage = page;
    displayProducts(currentProducts);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

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

        <option value = "${category}" >

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
            currentProducts = allProducts
            currentPage = 1


            displayProducts(currentProducts);

            return;

        }


        /* Specific Category */

        let products =
            await getProductByCategory(category);

        currentProducts = products
        currentPage = 1
        displayProducts(currentProducts);

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

window.changePage =
    changePage;


/* ================= Start ================= */

loadProducts();