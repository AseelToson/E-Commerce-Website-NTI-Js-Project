import { getProducts } from "./api.js";
import { createStars } from "./some.js";
import { addToCart, getCart } from "./cart.js";
import { toggleWishlist, isInWishlist } from "./wishlist.js";

const productDetails = document.getElementById("productDetails");

const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

async function displayProductDetails() {
  const products = await getProducts();

  const product = products.find((product) => product.id === id);

  if (!product) {
    productDetails.innerHTML = `
            <h2 class="text-center">
                Product not found
            </h2>
        `;

    return;
  }

  const cart = getCart();

  const alreadyInCart = cart.find((item) => item.id === product.id);

  const alreadyInWishlist = isInWishlist(product.id);

  productDetails.innerHTML = `

        <div class="row g-5 align-items-center">

            <!-- Image -->

            <div class="col-12 col-md-6 text-center">

                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                    class="img-fluid"
                >

            </div>


            <!-- Information -->

            <div class="col-12 col-md-6">

                <span class="badge bg-secondary mb-3">
                    ${product.category}
                </span>


                <h1 class="mb-3">
                    ${product.title}
                </h1>


                <div class="mb-3">

                    ${createStars(product.rating)}

                    <span class="text-muted ms-2">
                        ${product.rating}
                    </span>

                </div>


                <h2 class="mb-3">
                    $${product.price}
                </h2>


                <p class="text-muted">
                    ${product.description}
                </p>


                <p>
                    <strong>Brand:</strong>
                    ${product.brand || "N/A"}
                </p>


                <p>
                    <strong>Stock:</strong>
                    ${product.stock}
                </p>


                <div class="d-flex gap-2 mt-4">

                    <button
                        id="addToCartBtn"
                        class="btn btn-danger"
                        ${alreadyInCart ? "disabled" : ""}
                    >
                        ${alreadyInCart ? "Added ✓" : "Add to Cart"}
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


        <!-- Details -->

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

  /* ================= Add To Cart ================= */

  const addToCartBtn = document.getElementById("addToCartBtn");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      addToCart(product.id);

      addToCartBtn.textContent = "Added ✓";

      addToCartBtn.disabled = true;
    });
  }

  /* ================= Wishlist ================= */

  const wishlistBtn = document.getElementById("wishlistBtn");

  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", () => {
      const added = toggleWishlist(product.id);

      wishlistBtn.textContent = added ? "♥️" : "♡";
    });
  }
}

displayProductDetails();
