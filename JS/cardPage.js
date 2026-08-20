import {
    getCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartTotal,
    clearCart
} from "./cart.js";


import { createProductCard } from "./productCard.js";


/* ================= Elements ================= */

const cartContainer =
    document.getElementById(
        "cartContainer"
    );


const totalPrice =
    document.getElementById(
        "totalPrice"
    );


const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


/* ================= Display Cart ================= */

function displayCart() {

    const cart =
        getCart();


    cartContainer.innerHTML = "";


    /* ================= Empty Cart ================= */

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="text-center">

                <h3>
                    Your cart is empty
                </h3>

                <a
                    href="../Pages/index.html"
                    class="btn btn-primary mt-3"
                >
                    Continue Shopping
                </a>

            </div>

        `;


        totalPrice.textContent =
            "0.00";


        return;
    }


    /* ================= Products ================= */

    cart.forEach(
        product => {

            const card =
                createProductCard(
                    product,
                    {
                        showDescription: false,

                        showStock: false,

                        showWishlist: false,

                        showAddToCart: false,

                        showQuantity: true,

                        showDelete: true
                    }
                );


            cartContainer.appendChild(
                card
            );

        }
    );


    /* ================= Total ================= */

    totalPrice.textContent =
        getCartTotal().toFixed(2);
}


/* ================= Quantity Change ================= */

document.addEventListener(
    "cartQuantityChange",
    event => {

        const id =
            event.detail.id;


        const action =
            event.detail.action;


        if (action === "increase") {

            increaseQuantity(id);

        } else {

            decreaseQuantity(id);
        }


        displayCart();
    }
);


/* ================= Delete ================= */

document.addEventListener(
    "cartDelete",
    event => {

        const id =
            event.detail.id;


        removeFromCart(id);


        displayCart();
    }
);


/* ================= Checkout ================= */

checkoutBtn.addEventListener(
    "click",
    () => {

        const cart =
            getCart();


        if (cart.length === 0) {

            alert(
                "Your cart is empty"
            );

            return;
        }


        const total =
            getCartTotal();


        alert(
            `Order placed successfully!\n\nTotal: $${total.toFixed(2)}`
        );


        clearCart();


        displayCart();
    }
);


/* ================= Start ================= */

displayCart();