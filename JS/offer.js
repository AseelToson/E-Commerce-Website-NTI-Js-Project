import {
    getOfferProducts
} from "./api.js";


// ===============================
// Elements
// ===============================

const offersContainer =
    document.getElementById("offersContainer");

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

let offers = [];


// ===============================
// Load Offers
// ===============================

async function loadOffers() {

    try {

        const products =
            await getOfferProducts();


        // Show products with discount
        // more than 15%

        offers =
            products.filter(product =>
                product.discountPercentage > 15
            );


        displayOffers(offers);

    } catch (error) {

        console.log(error);

    }

}


// ===============================
// Display Offers
// ===============================

function displayOffers(products) {

    offersContainer.innerHTML = "";


    if (products.length === 0) {

        offersContainer.innerHTML = `

            <div class="col-12 text-center">

                <h3>
                    No offers found
                </h3>

            </div>

        `;

        return;

    }


    products.forEach(product => {


        const oldPrice =
            product.price /
            (1 - product.discountPercentage / 100);


        offersContainer.innerHTML += `

            <div class="col-12 col-sm-6 col-lg-4 col-xl-3">

                <div
                    class="offer-card"
                    onclick="openProductDetails(${product.id})"
                >


                    <!-- Image -->

                    <div class="offer-image-container">


                        <img
                            src="${product.thumbnail}"
                            alt="${product.title}"
                            class="offer-image"
                        >


                        <!-- Wishlist -->

                        <button
                            id="wishlist-${product.id}"
                            class="wishlist-offer-btn"
                            onclick="event.stopPropagation(); toggleWishlist(${product.id})"
                        >

                            ♡

                        </button>


                    </div>


                    <!-- Body -->

                    <div class="offer-body">


                        <span class="badge bg-danger">

                            ${Math.round(
            product.discountPercentage
        )}% OFF

                        </span>


                        <h5 class="mt-3">

                            ${product.title}

                        </h5>


                        <p class="text-muted">

                            ${product.description}

                        </p>


                        <div class="mb-3">


                            <span class="old-price">

                                $${oldPrice.toFixed(2)}

                            </span>


                            <span class="new-price ms-2">

                                $${product.price}

                            </span>


                        </div>


                        <button
                            class="btn btn-dark w-100"
                            onclick="event.stopPropagation(); openProductDetails(${product.id})"
                        >

                            View Details

                        </button>


                    </div>

                </div>

            </div>

        `;

    });


    // Update wishlist buttons

    products.forEach(product => {

        updateWishlistButton(product.id);

    });

}


// ===============================
// Open Product Details
// ===============================

function openProductDetails(id) {

    window.location.href =
        `product-details.html?id=${id}`;

}


// ===============================
// Toggle Wishlist
// ===============================

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


// ===============================
// Update Wishlist Button
// ===============================

function updateWishlistButton(id) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    let button =
        document.getElementById(
            `wishlist-${id}`
        );


    if (!button) return;


    if (wishlist.includes(id)) {

        button.innerHTML = "♥";

        button.classList.add("active");

    } else {

        button.innerHTML = "♡";

        button.classList.remove("active");

    }

}


// ===============================
// Search Offers
// ===============================

searchForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const searchValue =
            searchInput.value
                .trim()
                .toLowerCase();


        // Empty search

        if (searchValue === "") {

            displayOffers(offers);

            return;

        }


        // Search inside offers only

        const result =
            offers.filter(product =>
                product.title
                    .toLowerCase()
                    .includes(searchValue)
            );


        displayOffers(result);

    }
);

function startCountdown() {

    let saleEnd =
        localStorage.getItem("flashSaleEnd");


    // First visit

    if (!saleEnd) {

        saleEnd =
            new Date().getTime() +
            (24 * 60 * 60 * 1000);

        localStorage.setItem(
            "flashSaleEnd",
            saleEnd
        );

    }


    const countdown =
        setInterval(function () {

            const now =
                new Date().getTime();


            const distance =
                Number(saleEnd) - now;


            if (distance <= 0) {

                clearInterval(countdown);


                daysElement.innerHTML = "00";

                hoursElement.innerHTML = "00";

                minutesElement.innerHTML = "00";

                secondsElement.innerHTML = "00";

                return;

            }


            const days =
                Math.floor(
                    distance /
                    (1000 * 60 * 60 * 24)
                );


            const hours =
                Math.floor(
                    (distance %
                        (1000 * 60 * 60 * 24))
                    /
                    (1000 * 60 * 60)
                );


            const minutes =
                Math.floor(
                    (distance %
                        (1000 * 60 * 60))
                    /
                    (1000 * 60)
                );


            const seconds =
                Math.floor(
                    (distance %
                        (1000 * 60))
                    /
                    1000
                );


            daysElement.innerHTML =
                String(days).padStart(2, "0");


            hoursElement.innerHTML =
                String(hours).padStart(2, "0");


            minutesElement.innerHTML =
                String(minutes).padStart(2, "0");


            secondsElement.innerHTML =
                String(seconds).padStart(2, "0");


        }, 1000);

}


// ===============================
// Start
// ===============================

window.openProductDetails =
    openProductDetails;

window.toggleWishlist =
    toggleWishlist;

startCountdown()
loadOffers();