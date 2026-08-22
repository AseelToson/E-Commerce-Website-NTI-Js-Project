
import {
    getProducts,
    getProductByCategory,
    searchAboutProduct,
    getAllCategories
} from "./api.js";


import { createProductCard } from "./productCard.js";


const productsContainer =
    document.getElementById("productsContainer");

const categorySelect =
    document.getElementById("categorySelect");

// const searchForm =
//     document.getElementById("searchForm");

// const searchInput =
//     document.getElementById("searchInput");

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

    allProducts =
        await getProducts();

    currentProducts =
        allProducts;

    displayProducts();

    createCategories();
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


    createPagination();
}


/* ================= Pagination ================= */

function createPagination() {

    const totalPages =
        Math.ceil(
            currentProducts.length /
            productsPerPage
        );


    pagination.innerHTML = "";


    /* Previous */

    const previous =
        document.createElement("button");

    previous.className =
        "btn btn-danger mx-1";

    previous.textContent =
        "Previous";

    previous.disabled =
        currentPage === 1;


    previous.addEventListener(
        "click",
        () => changePage(
            currentPage - 1
        )
    );


    pagination.appendChild(
        previous
    );


    /* Pages */

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const button =
            document.createElement("button");


        button.className =
            "btn btn-danger mx-1";


        button.textContent =
            i;


        button.addEventListener(
            "click",
            () => changePage(i)
        );


        pagination.appendChild(
            button
        );
    }


    /* Next */

    const next =
        document.createElement("button");


    next.className =
        "btn btn-danger mx-1";


    next.textContent =
        "Next";


    next.disabled =
        currentPage === totalPages;


    next.addEventListener(
        "click",
        () => changePage(
            currentPage + 1
        )
    );


    pagination.appendChild(
        next
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


/* ================= Categories ================= */

async function createCategories() {

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


/* ================= Search ================= */
// if (searchForm) {
//     searchForm.addEventListener(
//         "submit",
//         async event => {

//             event.preventDefault();

//             const text =
//                 searchInput.value.trim();

//             if (text === "") {

//                 currentProducts = allProducts;
//                 currentPage = 1;
//                 displayProducts();

//                 return;
//             }

//             const products =
//                 await searchAboutProduct(text);

//             currentProducts = products;
//             currentPage = 1;

//             displayProducts();
//         }
//     );
// }


/* ================= Start ================= */

//  ladProducts();
/* ================= Start ================= */

const params = new URLSearchParams(window.location.search);
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