import { getOfferProducts } from "./api.js";
import { createProductCard } from "./productCard.js";
import { createPagination } from "./some.js";


const offersContainer =
    document.getElementById("offersContainer");

const pagination =
    document.getElementById("pagination");


let offers = [];

let currentPage = 1;

const productsPerPage = 20;


/* ================= Display Offers ================= */

async function displayOffers() {

    offers =
        await getOfferProducts();

    console.log("OFFERS:", offers);

    displayProducts();
}


/* ================= Display Products ================= */

function displayProducts() {

    offersContainer.innerHTML = "";


    const start =
        (currentPage - 1) *
        productsPerPage;


    const end =
        start +
        productsPerPage;


    const productsToShow =
        offers.slice(
            start,
            end
        );


    productsToShow.forEach(product => {

        const card =
            createProductCard(
                product,
                {
                    showDescription: true,
                    showStock: true,
                    showWishlist: true,
                    showAddToCart: true,
                    showQuantity: false,
                    showDelete: false,
                    showOffer: true,
                    showDetails: true
                }
            );

        offersContainer.appendChild(card);
    });


    createPagination(
        offers,
        productsPerPage,
        currentPage,
        pagination,
        changePage
    );
}


/* ================= Change Page ================= */

function changePage(page) {

    currentPage = page;

    displayProducts();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


displayOffers();