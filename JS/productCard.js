import { createStars } from "./some.js";

import { addToCart } from "./cart.js";

import {
    toggleWishlist,
    isInWishlist
} from "./wishlist.js";


/* =====================================================
   Create Product Card
===================================================== */

export function createProductCard(product, options = {}) {

    const {

        showDescription = true,

        showStock = true,

        showWishlist = true,

        showAddToCart = true,

        showQuantity = false,

        showDelete = false

    } = options;


    /* ================= Column ================= */

    const column =
        document.createElement("div");

    column.className =
        "col-12 col-sm-6 col-lg-4 col-xl-3";


    /* ================= Card ================= */

    const card =
        document.createElement("div");

    card.className =
        "product-card";


    /* ================= Card Click ================= */

    card.addEventListener(
        "click",
        () => {

            window.location.href =
                `product-details.html?id=${product.id}`;
        }
    );


    /* ================= Wishlist ================= */

    if (showWishlist) {

        const wishlistButton =
            document.createElement("button");

        wishlistButton.className =
            "wishlist-btn";


        const active =
            isInWishlist(product.id);


        wishlistButton.innerHTML =
            active ? "♥" : "♡";


        if (active) {
            wishlistButton.classList.add("active");
        }


        wishlistButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const isAdded =
                    toggleWishlist(product.id);


                wishlistButton.innerHTML =
                    isAdded ? "♥" : "♡";


                wishlistButton.classList.toggle(
                    "active",
                    isAdded
                );
            }
        );


        card.appendChild(
            wishlistButton
        );
    }


    /* ================= Image ================= */

    const image =
        document.createElement("img");

    image.src =
        product.thumbnail;

    image.alt =
        product.title;

    image.className =
        "product-image";


    card.appendChild(image);


    /* ================= Body ================= */

    const body =
        document.createElement("div");

    body.className =
        "product-body";


    /* ================= Category ================= */

    const category =
        document.createElement("span");

    category.className =
        "badge bg-secondary";

    category.textContent =
        product.category;


    body.appendChild(category);


    /* ================= Title ================= */

    const title =
        document.createElement("h5");

    title.className =
        "product-title mt-3";

    title.textContent =
        product.title;


    body.appendChild(title);


    /* ================= Description ================= */

    if (showDescription) {

        const description =
            document.createElement("p");

        description.className =
            "product-description";

        description.textContent =
            product.description;


        body.appendChild(
            description
        );
    }


    /* ================= Rating ================= */

    const rating =
        document.createElement("div");

    rating.className =
        "rating mb-2";


    rating.innerHTML = `

        ${createStars(product.rating)}

        <span class="text-muted">
            ${product.rating}
        </span>

    `;


    body.appendChild(rating);


    /* ================= Price + Stock ================= */

    const priceContainer =
        document.createElement("div");

    priceContainer.className =
        "d-flex justify-content-between mb-3";


    const price =
        document.createElement("span");

    price.className =
        "product-price";

    price.textContent =
        `$${product.price}`;


    priceContainer.appendChild(
        price
    );


    if (showStock) {

        const stock =
            document.createElement("span");

        stock.textContent =
            `${product.stock} left`;


        priceContainer.appendChild(
            stock
        );
    }


    body.appendChild(
        priceContainer
    );


    /* ================= Actions ================= */

    const actions =
        document.createElement("div");

    actions.className =
        "product-actions";


    /* =====================================================
       Add To Cart
    ===================================================== */

    if (showAddToCart) {

        const addButton =
            document.createElement("button");


        addButton.className =
            "btn btn-danger details-btn";


        addButton.textContent =
            "Add to Cart";


        addButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                addToCart(product);


                addButton.textContent =
                    "Added ✓";
            }
        );


        actions.appendChild(
            addButton
        );
    }


    /* =====================================================
       Quantity
    ===================================================== */

    if (showQuantity) {

        const quantity =
            document.createElement("div");

        quantity.className =
            "quantity";


        const minus =
            document.createElement("button");

        minus.className =
            "quantity-btn";

        minus.textContent =
            "-";


        const number =
            document.createElement("span");

        number.textContent =
            product.quantity;


        const plus =
            document.createElement("button");

        plus.className =
            "quantity-btn";

        plus.textContent =
            "+";


        /* ---------- Minus ---------- */

        minus.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                document.dispatchEvent(
                    new CustomEvent(
                        "cartQuantityChange",
                        {
                            detail: {
                                id: product.id,
                                action: "decrease"
                            }
                        }
                    )
                );
            }
        );


        /* ---------- Plus ---------- */

        plus.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                document.dispatchEvent(
                    new CustomEvent(
                        "cartQuantityChange",
                        {
                            detail: {
                                id: product.id,
                                action: "increase"
                            }
                        }
                    )
                );
            }
        );


        quantity.append(
            minus,
            number,
            plus
        );


        actions.appendChild(
            quantity
        );
    }


    /* =====================================================
       Delete
    ===================================================== */

    if (showDelete) {

        const deleteButton =
            document.createElement("button");


        deleteButton.className =
            "btn btn-danger";


        deleteButton.textContent =
            "Delete";


        deleteButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                document.dispatchEvent(
                    new CustomEvent(
                        "cartDelete",
                        {
                            detail: {
                                id: product.id
                            }
                        }
                    )
                );
            }
        );


        actions.appendChild(
            deleteButton
        );
    }


    /* ================= Append ================= */

    body.appendChild(actions);

    card.appendChild(body);

    column.appendChild(card);


    return column;
}