function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.getElementById("cartCount").textContent = cart.length;
}

updateCartCount();