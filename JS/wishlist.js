import { currentUserEmail } from "./user.js";


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

        return false;

    }


    addToWishlist(id);

    return true;
}