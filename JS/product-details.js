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
                        ${isInWishlist(product.id) ? "♥" : "♡"}
                    </button>

                </div>


                <!-- Image Gallery -->

                <div class="d-flex gap-2 mt-3">

                    ${product.images.map((image, index) => `

                        <img
                            src="${image}"
                            class="gallery-image ${index === 0 ? "active" : ""
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
                    ${product.brand || "Not Available"}
                </p>


                <p>
                    <strong>Stock:</strong>
                    ${product.stock}
                </p>


                <p>
                    <strong>Warranty:</strong>
                    ${product.warrantyInformation}
                </p>


                <p>
                    <strong>Shipping:</strong>
                    ${product.shippingInformation}
                </p>


                <button
                    id="addToCartButton"
                    class="btn btn-danger btn-lg w-100 mt-3"
                    type="button"
                >
                    Add To Cart
                </button>

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

    const addToCartButton =
        document.getElementById("addToCartButton");

    const galleryImages =
        document.querySelectorAll(".gallery-image");


    // ===============================
    // Wishlist
    // ===============================

    wishlistButton.addEventListener(
        "click",
        () => {

            const isAdded =
                toggleWishlist(product.id);

            wishlistButton.textContent =
                isAdded ? "♥" : "♡";

            wishlistButton.classList.toggle(
                "active",
                isAdded
            );

        }
    );


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


    // ===============================
    // Initial Wishlist State
    // ===============================

    wishlistButton.classList.toggle(
        "active",
        isInWishlist(product.id)
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