import { currentUserEmail } from "./some.js";
import { getProducts } from "./api.js";

import { createProductCard } from "./productCard.js";

const totalPrice = document.getElementById("totalPrice");

const checkoutBtn = document.getElementById("checkoutBtn");

/* ================= cart Key ================= */

const cartKey = `cart_${currentUserEmail}`;

/* ================= Get cart ================= */

export function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

/* ================= Save cart ================= */

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

/* ================= Add ================= */

export function addToCart(id) {
  const cart = getCart();
  cart.push({
    id: id,
    quantity: 1,
  });
  saveCart(cart);
}

export function increaseQuantity(id) {
  const cart = getCart();

  const product = cart.find((item) => item.id === id);

  if (product) {
    product.quantity++;
  }

  saveCart(cart);
  //  return cart;
}

export function decreaseQuantity(id) {
  const cart = getCart();
  const product = cart.find((item) => item.id === id);

  if (product.quantity > 1) {
    product.quantity--;
  } else {
    removeFromCart(id);
    return;
  }
  saveCart(cart);
}

/* ================= Remove ================= */

export function removeFromCart(id) {
  const cart = getCart();

  const updatedCart = cart.filter((item) => item.id !== id);

  saveCart(updatedCart);
}

export function clearCart() {
  saveCart([]);
}

function updateTotal(cart) {
  const total = cart.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  totalPrice.textContent = `$${total.toFixed(2)}`;
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
      alert("Your cart is empty");

      return;
    }

    const total = parseFloat(totalPrice.textContent.replace("$", ""));

    alert(`Order placed successfully!\n\nTotal: $${total.toFixed(2)}`);
    clearCart();

    displayCart();
  });
}

/********************************* display ********************************/
const cartContainer = document.getElementById("cartContainer");

async function displayCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="text-center">
        <h3>Your cart is empty</h3>

        <a href="../Pages/products.html"
           class="btn btn-danger mt-3">
          Continue Shopping
        </a>
      </div>
    `;

    totalPrice.textContent = "$0.00";

    return;
  }

  const products = await getProducts();

  const cartProducts = products.filter((product) =>
    cart.some((item) => item.id === product.id),
  );

  cartProducts.forEach((product) => {
    const cartItem = cart.find((item) => item.id === product.id);

    product.quantity = cartItem.quantity;

    const card = createProductCard(product, {
      showDescription: false,
      showStock: false,
      showWishlist: false,
      showAddToCart: false,
      showQuantity: true,
      showDelete: true,
      showOffer: true,
      showDetails: false,
    });

    cartContainer.appendChild(card);
  });

  updateTotal(cartProducts);
}

if (cartContainer) {
  displayCart();
}
