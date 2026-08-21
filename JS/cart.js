
import { currentUserEmail } from "./some.js";
import { getProducts } from "./api.js";
// import { createProductCard } from "./productCard.js";

/* ================= Wishlist Key ================= */

const cartKey = `cart_${currentUserEmail}`;

/* ================= Get Wishlist ================= */

export function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

/* ================= Save cart ================= */

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

/* ================= Check Product ================= */

// export function isInWishlist(id) {

//     const wishlist = getWishlist();

//     return wishlist.includes(id);
// }

/* ================= Add ================= */

export function addToCart(id) {
  const cart = getCart();

  const existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: id,
      quantity: 1,
    });
  }

  saveCart(cart);
  console.log("Cart after adding:", cart);
}

export function increaseQuantity(id) {
  const cart = getCart();

  const product = cart.find((item) => item.id === id);

  if (product) {
    product.quantity++;
  }

  saveCart(cart);
}

export function decreaseQuantity(id) {
  const cart = getCart();

  const product = cart.find((item) => item.id === id);

  if (!product) return;

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

    const updatedCart =
        cart.filter(item => item.id !== id);

    saveCart(updatedCart);
}

export function clearCart() {
    saveCart([]);
}
/* ================= Toggle ================= */

// export function toggleWishlist(id) {
//   if (isInWishlist(id)) {
//     removeFromWishlist(id);
//     displayWishlist();

//     return false;
//   }

//   addToWishlist(id);

//   return true;
// }

// ////////////

const cartContainer = document.getElementById("cartContainer");

async function displaycart() {
  const cart = getCart();

  const products = await getProducts();

  const cartProducts = products.filter((product) =>
    cart.some((item) => item.id === product.id),
  );

  cartContainer.innerHTML = "";

  if (cartProducts.length === 0) {
    cartContainer.innerHTML = `
            <div class="text-center">
                <h3>Your cart is empty</h3>
                <a href="../Pages/products.html"
                   class="btn btn-danger mt-3">
                    Continue Shopping
                </a>
            </div>
        `;

    return;
  }


  cartProducts.forEach((product) => {

    
  const cartItem = cart.find((item) => item.id === product.id);

  product.quantity = cartItem.quantity;
    const card = createProductCard(product, {
      showDescription: false,

      showStock: false,

      showWishlist: true,

      showAddToCart: false,

      showQuantity: true,

      showDelete: true,

      showOffer: true,
    });

    cartContainer.appendChild(card);
  });
}

if (cartContainer) {
  displaycart();
}
