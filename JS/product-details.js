import {
    getProductById
} from "./api.js";


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
    new URLSearchParams(
        window.location.search
    );


const id =
    params.get("id");


// ===============================
// Load Product
// ===============================

async function loadProduct() {

    try {

        const product =
            await getProductById(id);


        displayProduct(product);

    } catch (error) {

        console.log(error);

    }

}


// ===============================
// Display Product
// ===============================

function displayProduct(product) {

    loading.classList.add("d-none");

    productDetails.classList.remove("d-none");

    productDetails.innerHTML = `

        <div class="col-lg-6">

            <div class="product-details">

                <!-- Main Image -->

                <div class="product-image-container">

                    <img
                        id="mainImage"
                        src="${product.images[0]}"
                        class="product-image"
                        alt="${product.title}"
                    >

                    <!-- Wishlist -->

                    <button
                        id="wishlistButton"
                        class="wishlist-details-btn"
                        onclick="toggleWishlist(${product.id})"
                    >
                        ♡
                    </button>

                </div>


                <!-- Image Gallery -->

                <div class="d-flex gap-2 mt-3">

                    ${product.images.map((image, index) => `

                        <img
                            src="${image}"
                            class="gallery-image ${index === 0 ? "active" : ""}"
                            onclick="changeImage('${image}', this)"
                            alt="${product.title}"
                        >

                    `).join("")}

                </div>

            </div>

        </div>


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
                    class="btn btn-danger btn-lg w-100 mt-3">

                    Add To Cart

                </button>

            </div>

        </div>

    `;

    updateWishlistButton(product.id);
}

/*  Change Image  */

function changeImage(image, element) {

    document.getElementById("mainImage").src = image;

    document
        .querySelectorAll(".gallery-image")
        .forEach(img => {
            img.classList.remove("active");
        });

    element.classList.add("active");

}

function toggleWishlist(id) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(
                item => item !== id
            );

    } else {

        wishlist.push(id);

    }


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistButton(id);

}

function updateWishlistButton(id) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    let button =
        document.getElementById("wishlistButton");


    if (wishlist.includes(id)) {

        button.innerHTML = "♥";

        button.classList.add("active");

    } else {

        button.innerHTML = "♡";

        button.classList.remove("active");

    }

}

function createStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= Math.round(rating)) {

            stars += "⭐";

        } else {

            stars += "☆";

        }

    }

    return stars;
}


// ===============================
// Start
// ===============================

window.changeImage = changeImage;
window.toggleWishlist = toggleWishlist;
loadProduct();