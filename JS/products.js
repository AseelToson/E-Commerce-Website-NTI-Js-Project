
import {
    getProducts,
    getProductByCategory,
    searchAboutProduct,
    getAllCategories
} from "./api.js";


import { createProductCard } from "./productCard.js";
import { createPagination } from "./some.js";

const productsContainer =
    document.getElementById("productsContainer");

const categorySelect =
    document.getElementById("categorySelect");


const params = new URLSearchParams(window.location.search);

const category = params.get("category");
const noProducts =
    document.getElementById("noProducts");

const pagination =
    document.getElementById("pagination");


let allProducts = [];

let currentProducts = [];

let currentPage = 1;

const productsPerPage = 20;


/* ================= Load Products ================= */

async function loadProducts() {

    allProducts = await getProducts();

    currentProducts = allProducts;

    await createCategories();

    if (category) {

        currentProducts =
            await getProductByCategory(category);

    }

    displayProducts();
}


/* ================= Display ================= */

function displayProducts() {

    productsContainer.innerHTML = "";


    if (currentProducts.length === 0) {

        noProducts.classList.remove(
            "d-none"
        );

        pagination.innerHTML = "";

        return;
    }


    noProducts.classList.add(
        "d-none"
    );


    const start =
        (currentPage - 1) *
        productsPerPage;


    const end =
        start + productsPerPage;


    const productsToShow =
        currentProducts.slice(
            start,
            end
        );


    productsToShow.forEach(
        product => {

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
                        showOffer: true
                    }
                );


            productsContainer.appendChild(
                card
            );
        }
    );


    createPagination(
    currentProducts,
    productsPerPage,
    currentPage,
    pagination,
    changePage
);
}


/* ================= Pagination ================= */



/* ================= Change Page ================= */

function changePage(page) {

    currentPage = page;

    displayProducts();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= Categories ================= */

export async function createCategories() {

    const categories =
        await getAllCategories();


    categorySelect.innerHTML = `

        <option value="all">
            All Categories
        </option>

    `;


    categories.forEach(
        category => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                category;


            option.textContent =
                category;


            categorySelect.appendChild(
                option
            );
        }
    );
}


/* ================= Category Filter ================= */

categorySelect.addEventListener(
    "change",
    async () => {
       

        const category =
            categorySelect.value;
 console.log("Selected category:", category);

        if (category === "all") {

            currentProducts =
                allProducts;

            currentPage = 1;

            displayProducts();

            return;
        }


        const products =
            await getProductByCategory(
                category
            );
            
            console.log("Products:", products);


        currentProducts =
            products;

        currentPage = 1;

        displayProducts();
    }
);


/* ================= Start ================= */

// const params = new URLSearchParams(window.location.search);
const searchText = params.get("search");

loadProducts().then(() => {

    if (searchText) {

        searchAboutProduct(searchText).then((products) => {

            currentProducts = products;
            currentPage = 1;

            displayProducts();

        });
    }

});