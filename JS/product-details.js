import { getProductById } from "./api.js";
import { createStars } from "./some.js";
import {
    toggleWishlist,
    isInWishlist
} from "./wishlist.js";
import {
    addToCart,
    getCart
} from "./cart.js";

// ===============================
// Elements
// ===============================

const productDetails =
    document.getElementById("productDetails");

const loading =
    document.getElementById("loading");

// ===============================
// Get Product ID
// ===============================

const params =
    new URLSearchParams(window.location.search);

const productId =
    params.get("id");

// ===============================
// Load Product
// ===============================

async function loadProduct() {

    try {

        const product =
            await getProductById(productId);

        displayProduct(product);

    } catch (error) {

        console.error(
            "Failed to load product:",
            error
        );

    }

}

// ===============================
// Display Product
// ===============================

function displayProduct(product) {

    loading.classList.add("d-none");

    productDetails.classList.remove("d-none");

    const cart = getCart();

    const alreadyInCart =
        cart.some(item => item.id === product.id);

    const alreadyInWishlist =
        isInWishlist(product.id);

    productDetails.innerHTML = `

        <!-- ================= IMAGE SECTION ================= -->

        <div class="col-lg-6">

            <div class="product-details">

                <div class="product-image-container">

                    <img
                        id="mainImage"
                        src="${product.images[0]}"
                        class="product-image"
                        alt="${product.title}"
                    >

                    <button
                        id="wishlistButton"
                        class="wishlist-details-btn"
                        type="button"
                    >
                        ${alreadyInWishlist ? "♥️" : "♡"}
                    </button>

                </div>

                <!-- Image Gallery -->

                <div class="d-flex gap-2 mt-3">

                    ${product.images.map((image, index) => `

                        <img
                            src="${image}"
                            class="gallery-image ${
                                index === 0 ? "active" : ""
                            }"
                            data-image="${image}"
                            alt="${product.title}"
                        >

                    `).join("")}

                </div>

            </div>

        </div>

        <!-- ================= PRODUCT INFO ================= -->

        <div class="col-lg-6">

            <div class="product-details">

                <span class="badge bg-secondary">
                    ${product.category}
                </span>

                <h1 class="product-title mt-3">
                    ${product.title}
                </h1>

                <div class="rating mb-3">

                    ${createStars(product.rating)}

                    <span class="text-muted">
                        ${product.rating}
                    </span>

                </div>

                <h2 class="product-price">
                    $${product.price}
                </h2>

                <p class="discount">
                    ${Math.round(product.discountPercentage)}% OFF
                </p>

                <p class="description">
                    ${product.description}
                </p>

                <hr>

                <p>
                    <strong>Brand:</strong>
                    ${product.brand || "N/A"}
                </p>

                <p>
                    <strong>Stock:</strong>
                    ${product.stock}
                </p>

                <p>
                    <strong>Warranty:</strong>
                    ${product.warrantyInformation || "N/A"}
                </p>

                <p>
                    <strong>Shipping:</strong>
                    ${product.shippingInformation || "N/A"}
                </p>

                <div class="d-flex gap-2 mt-4">

                    <button
                        id="addToCartBtn"
                        class="btn btn-danger btn-lg"
                        ${alreadyInCart ? "disabled" : ""}
                    >
                        ${
                            alreadyInCart
                                ? "Added ✓"
                                : "Add to Cart"
                        }
                    </button>

                    <button
                        id="wishlistBtn"
                        class="btn btn-outline-danger"
                    >
                        ${alreadyInWishlist ? "♥️" : "♡"}
                    </button>

                </div>

            </div>

        </div>

        <!-- ================= PRODUCT DETAILS ================= -->

        <div class="mt-5 pt-4 border-top">

            <h2 class="text-center mb-4">
                Product Details
            </h2>

            <div class="row g-3">

                <div class="col-12 col-md-6">
                    <strong>Brand:</strong>
                    ${product.brand || "N/A"}
                </div>

                <div class="col-12 col-md-6">
                    <strong>Category:</strong>
                    ${product.category}
                </div>

                <div class="col-12 col-md-6">
                    <strong>Warranty:</strong>
                    ${product.warrantyInformation || "N/A"}
                </div>

                <div class="col-12 col-md-6">
                    <strong>Shipping:</strong>
                    ${product.shippingInformation || "N/A"}
                </div>

                <div class="col-12 col-md-6">
                    <strong>Availability:</strong>
                    ${product.availabilityStatus || "N/A"}
                </div>

                <div class="col-12 col-md-6">
                    <strong>Return Policy:</strong>
                    ${product.returnPolicy || "N/A"}
                </div>

            </div>

        </div>

    `;

    setupProductEvents(product);
}

// ===============================
// Product Events
// ===============================

function setupProductEvents(product) {

    const wishlistButton =
        document.getElementById("wishlistButton");

    const wishlistBtn =
        document.getElementById("wishlistBtn");

    const addToCartButton =
        document.getElementById("addToCartBtn");

    const galleryImages =
        document.querySelectorAll(".gallery-image");

    // ===============================
    // Wishlist
    // ===============================

    const updateWishlist =
        (button) => {

            const isAdded =
                toggleWishlist(product.id);

            button.textContent =
                isAdded ? "♥️" : "♡";

            button.classList.toggle(
                "active",
                isAdded
            );
        };

    if (wishlistButton) {

        wishlistButton.addEventListener(
            "click",
            () => updateWishlist(wishlistButton)
        );

        wishlistButton.classList.toggle(
            "active",
            isInWishlist(product.id)
        );
    }

    if (wishlistBtn) {

        wishlistBtn.addEventListener(
            "click",
            () => updateWishlist(wishlistBtn)
        );
    }

    // ===============================
    // Image Gallery
    // ===============================

    galleryImages.forEach(image => {

        image.addEventListener(
            "click",
            () => {

                changeImage(
                    image.dataset.image,
                    image
                );

            }
        );

    });

    // ===============================
    // Cart
    // ===============================

    const cart =
        getCart();

    const alreadyInCart =
        cart.some(
            item => item.id === product.id
        );

    if (alreadyInCart) {

        addToCartButton.textContent =
            "Added ✓";

        addToCartButton.disabled =
            true;

    }

    addToCartButton.addEventListener(
        "click",
        () => {

            addToCart(product.id);

            addToCartButton.textContent =
                "Added ✓";

            addToCartButton.disabled =
                true;

        }
    );
}

// ===============================
// Change Main Image
// ===============================

function changeImage(image, element) {

    const mainImage =
        document.getElementById("mainImage");

    mainImage.src =
        image;

    document
        .querySelectorAll(".gallery-image")
        .forEach(img => {

            img.classList.remove("active");

        });

    element.classList.add("active");
}

// ===============================
// Start
// ===============================

loadProduct();