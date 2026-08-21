import {
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  // getCartTotal,
  clearCart,
} from "./cart.js";

import { createProductCard } from "./productCard.js";
import { getProducts } from "./api.js";
// import { createProductCard } from "./productCard.js";

/* ================= Elements ================= */

const cartContainer = document.getElementById("cartContainer");

const totalPrice = document.getElementById("totalPrice");

const checkoutBtn = document.getElementById("checkoutBtn");

/* ================= Display Cart ================= */

// function displayCart() {
//   console.log("Cart in cart page:", getCart());

//   const cart = getCart();

//   cartContainer.innerHTML = "";

//   /* ================= Empty Cart ================= */

//   if (cart.length === 0) {
//     cartContainer.innerHTML = `

//             <div class="text-center">

//                 <h3>
//                     Your cart is empty
//                 </h3>

//                 <a
//                     href="../Pages/index.html"
//                     class="btn btn-primary mt-3"
//                 >
//                     Continue Shopping
//                 </a>

//             </div>

//         `;

//     totalPrice.textContent = "0.00";

//     return;
//   }

//   /* ================= Products ================= */

//   cart.forEach((product) => {
//     const card = createProductCard(product, {
//       showDescription: false,

//       showStock: false,

//       showWishlist: false,

//       showAddToCart: false,

//       showQuantity: true,

//       showDelete: true,
//     });

//     cartContainer.appendChild(card);
//   });

//   /* ================= Total ================= */

//   totalPrice.textContent = getCartTotal().toFixed(2);
// }





async function displayCart() {

  console.log("Cart in cart page:", getCart());

  const cart = getCart();

  cartContainer.innerHTML = "";

  if (cart.length === 0) {

    cartContainer.innerHTML = `
      <div class="text-center">

        <h3>Your cart is empty</h3>

        <a
          href="../Pages/index.html"
          class="btn btn-primary mt-3"
        >
          Continue Shopping
        </a>

      </div>
    `;

    totalPrice.textContent = "0.00";

    return;
  }

  const products = await getProducts();

  const cartProducts = products.filter(product =>
    cart.some(item =>
      item.id === product.id
    )
  );

  console.log("Products to display:", cartProducts);

  cartProducts.forEach(product => {

    const cartItem =
      cart.find(item =>
        item.id === product.id
      );

    product.quantity =
      cartItem.quantity;

    const card =
      createProductCard(product, {

        showDescription: false,
        showStock: false,
        showWishlist: false,
        showAddToCart: false,
        showQuantity: true,
        showDelete: true,
        showOffer: true,
        showDetails:false,

      });

    card.classList.add("cart-card");

    cartContainer.appendChild(card);

  });

  updateTotal(cartProducts);
}
/* ================= Quantity Change ================= */

document.addEventListener("cartQuantityChange", (event) => {
  const id = event.detail.id;

  const action = event.detail.action;

  if (action === "increase") {
    increaseQuantity(id);
  } else {
    decreaseQuantity(id);
  }

  displayCart();
});

/* ================= Delete ================= */

document.addEventListener("cartDelete", (event) => {
  const id = event.detail.id;

  removeFromCart(id);

  displayCart();
});

/* ================= Checkout ================= */

checkoutBtn.addEventListener("click", () => {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty");

    return;
  }

  const total = getCartTotal();

  alert(`Order placed successfully!\n\nTotal: $${total.toFixed(2)}`);

  clearCart();

  displayCart();
});

function updateTotal(cart) {
  const total = cart.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  totalPrice.textContent = `$${total.toFixed(2)}`;
}

// const card = createProductCard(product, {
//   showDescription: false,
//   showStock: false,
//   showWishlist: false,
//   showAddToCart: false,
//   showQuantity: true,
//   showDelete: true,
//   showOffer: true,
// });

// card.classList.add("cart-card");

// cartContainer.appendChild(card);

/* ================= Start ================= */

displayCart();
