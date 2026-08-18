import {
    getCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartTotal,
    clearCart
} from "./cart.js";

import { createProductCard } from "./productCard.js";


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


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="text-center">

                <h3>
                    Your cart is empty
                </h3>

                <a
                    href="../Pages/index.html"
                    class="btn btn-primary mt-3 mb-3">

                    Continue Shopping

                </a>

            </div>

        `;


        totalPrice.textContent =
            "0.00";


        return;
    }


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


    totalPrice.textContent =
        getCartTotal().toFixed(2);
}


/* ================= Quantity ================= */

document.addEventListener(
    "cartQuantityChange",
    event => {

        const {
            id,
            action
        } = event.detail;


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

        removeFromCart(
            event.detail.id
        );

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