import { currentUserEmail } from "./some.js";
import { getProducts } from "./api.js";
import { createProductCard } from "./productCard.js";

/* ================= Wishlist Key ================= */

const wishlistKey =
    `wishlist_${currentUserEmail}`;


/* ================= Get Wishlist ================= */

export function getWishlist() {

    return JSON.parse(
        localStorage.getItem(wishlistKey)
    ) || [];
}


/* ================= Save Wishlist ================= */

function saveWishlist(wishlist) {

    localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
    );
}


/* ================= Check Product ================= */

export function isInWishlist(id) {

    const wishlist = getWishlist();

    return wishlist.includes(id);
}


/* ================= Add ================= */

export function addToWishlist(id) {

    const wishlist = getWishlist();


    if (!wishlist.includes(id)) {

        wishlist.push(id);

        saveWishlist(wishlist);

        return true;
    }


    return false;
}


/* ================= Remove ================= */

export function removeFromWishlist(id) {

    const wishlist = getWishlist();

    const updatedWishlist =
        wishlist.filter(item => item !== id);

    saveWishlist(updatedWishlist);
}


/* ================= Toggle ================= */

export function toggleWishlist(id) {

    if (isInWishlist(id)) {

        removeFromWishlist(id);
        displayWishlist()

        return false;

    }


    addToWishlist(id);

    return true;
}













const wishlistContainer =
    document.getElementById("wishlistContainer");

async function displayWishlist() {

    const wishlist = getWishlist();

    const products = await getProducts();

    const wishlistProducts =
        products.filter(product =>
            wishlist.includes(product.id)
        );

    wishlistContainer.innerHTML = "";

    if (wishlistProducts.length === 0) {

        wishlistContainer.innerHTML = `
            <div class="text-center">
                <h3>Your wishlist is empty</h3>
                <a href="../Pages/products.html"
                   class="btn btn-danger mt-3">
                    Continue Shopping
                </a>
            </div>
        `;

        return;
    }

    wishlistProducts.forEach(product => {

        const card = createProductCard(product, {

            showDescription: true,
            showStock: true,
            showWishlist: true,
            showAddToCart: true

        });

        wishlistContainer.appendChild(card);

    });
}

if (wishlistContainer) {
    displayWishlist();
}