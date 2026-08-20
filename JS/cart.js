// let currentUserEmail = localStorage.getItem("currentUserEmail");

// let cartContainer = document.getElementById("cartContainer");
// let totalPrice = document.getElementById("totalPrice");
// let checkoutBtn = document.getElementById("checkoutBtn");

// // لو مفيش user عامل login
// if (!currentUserEmail) {
//   alert("Please login first");
//   window.location.href = "login.html";
// }

// // اسم الـ key الخاص بالـ user
// let cartKey = `cart_${currentUserEmail}`;

// // هات الـ cart بتاعة المستخدم
// let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

// // عرض المنتجات
// function displayCart() {
//   cartContainer.innerHTML = "";

//   if (cart.length === 0) {
//     cartContainer.innerHTML = `
//             <div class="text-center">
//                 <h3>Your cart is empty</h3>
//                 <a href="../pages/index.html" class="btn btn-primary mt-3 mb-3">
//                     Continue Shopping
//                 </a>
//             </div>
//         `;

//     totalPrice.innerText = "0";
//     return;
//   }

//   cart.forEach((product, index) => {
//      let stars="";
//                     for(let i=1;i<=5;i++){
//                      if(i<Math.round(product.rating)){
//                      stars+= "★";}
//                      else stars+="☆";
//                     }
//     cartContainer.innerHTML += `

//             <div class="cart-item">

//                 <img
//                     src="${product.thumbnail}"
//                     alt="${product.title}"
//                     class="product-image"
//                 >

//                 <div class="product-info">

//                     <h4>${product.title}</h4>

//                     <p>
//                     Rating:${stars}
                     
//                     </p>
//                     <p>
//                         Price: $${product.price}
//                     </p>
                    

//                     <div class="quantity">

//                         <button
//                             onclick="decreaseQuantity(${index})"
//                             class="quantity-btn"
//                         >
//                             -
//                         </button>

//                         <span>
//                             ${product.quantity}
//                         </span>

//                         <button
//                             onclick="increaseQuantity(${index})"
//                             class="quantity-btn"
//                         >
//                             +
//                         </button>

//                     </div>

//                     <p class="product-total">
//                         Total: $
//                         ${(product.price * product.quantity).toFixed(2)}
//                     </p>

//                 </div>

//                 <button
//                     onclick="deleteProduct(${index})"
//                     class="btn btn-danger"
//                 >
//                     Delete
//                 </button>

//             </div>

//         `;
//   });

//   calculateTotal();
// }

// // زيادة quantity
// function increaseQuantity(index) {
//   cart[index].quantity++;

//   saveCart();

//   displayCart();
// }

// // تقليل quantity
// function decreaseQuantity(index) {
//   if (cart[index].quantity > 1) {
//     cart[index].quantity--;
//   } else {
//     // لو quantity = 1 وحاول يقلل
//     // نشيل المنتج من الـ cart

//     cart.splice(index, 1);
//   }

//   saveCart();

//   displayCart();
// }

// // حذف المنتج نهائياً
// function deleteProduct(index) {
//   cart.splice(index, 1);

//   saveCart();

//   displayCart();
// }

// // حساب الـ total
// function calculateTotal() {
//   let total = 0;

//   cart.forEach((product) => {
//     total += product.price * product.quantity;
//   });

//   totalPrice.innerText = total.toFixed(2);
// }

// // حفظ الـ cart
// function saveCart() {
//   localStorage.setItem(cartKey, JSON.stringify(cart));
// }

// // Checkout
// checkoutBtn.addEventListener("click", function () {
//   if (cart.length === 0) {
//     alert("Your cart is empty");

//     return;
//   }

//   let total = 0;

//   cart.forEach((product) => {
//     total += product.price * product.quantity;
//   });

//   alert(`Order placed successfully!\n\nTotal: $${total.toFixed(2)}`);

//   // بعد إتمام الـ order
//   // نفرغ الـ cart

//   cart = [];

//   saveCart();

//   displayCart();
// });

// // تشغيل الصفحة
// displayCart();





















// import { createProductCard } from "./productCard.js";
import { currentUserEmail } from "./some.js";


/* ================= Cart Key ================= */

const cartKey =
    `cart_${currentUserEmail}`;


/* ================= Get Cart ================= */

export function getCart() {

    return JSON.parse(
        localStorage.getItem(cartKey)
    ) || [];
}


/* ================= Save Cart ================= */

export function saveCart(cart) {

    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );
}


/* ================= Add To Cart ================= */

export function addToCart(product) {

    const cart =
        getCart();


    const existingProduct =
        cart.find(
            item => item.id === product.id
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart(cart);
}


/* ================= Increase Quantity ================= */

export function increaseQuantity(id) {

    const cart =
        getCart();


    const product =
        cart.find(
            item => item.id === id
        );


    if (product) {

        product.quantity++;

    }


    saveCart(cart);
}


/* ================= Decrease Quantity ================= */

export function decreaseQuantity(id) {

    const cart =
        getCart();


    const product =
        cart.find(
            item => item.id === id
        );


    if (!product) {

        return;
    }


    if (product.quantity > 1) {

        product.quantity--;

        saveCart(cart);

    } else {

        removeFromCart(id);
    }
}


/* ================= Remove Product ================= */

export function removeFromCart(id) {

    const cart =
        getCart();


    const updatedCart =
        cart.filter(
            item => item.id !== id
        );


    saveCart(updatedCart);
}


/* ================= Clear Cart ================= */

export function clearCart() {

    saveCart([]);
}


/* ================= Calculate Total ================= */

export function getCartTotal() {

    const cart =
        getCart();


    return cart.reduce(
        (total, product) => {

            return total +
                product.price *
                product.quantity;

        },
        0
    );
}