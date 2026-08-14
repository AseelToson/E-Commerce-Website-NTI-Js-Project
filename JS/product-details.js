const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const productDetails = document.getElementById("productDetails");


async function getProduct() {

    try {

        const response = await fetch(
            `https://dummyjson.com/products/${id}`
        );

        const product = await response.json();


        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];


        const alreadyExists =
            wishlist.some(item => item.id === product.id);


        productDetails.innerHTML = `

            <div class="col-md-6">

                <img
                    src="${product.thumbnail}"
                    class="img-fluid product-image"
                    alt="${product.title}"
                >

            </div>


            <div class="col-md-6 product-info">

                <h2>
                    ${product.title}
                </h2>

                <p>
                    ${product.description}
                </p>

                <h4>
                    $${product.price}
                </h4>

                <p>
                    Category: ${product.category}
                </p>

                <p>
                    Rating: ${product.rating}
                </p>

                <p>
                    Stock: ${product.stock}
                </p>


                <button
                    id="addToWishlist"
                    class="wishlist-btn ${alreadyExists ? "added" : ""}"
                >

                    <span class="heart">
                        ${alreadyExists ? "♥" : "♡"}
                    </span>

                    <span class="wishlist-text">
                        ${alreadyExists
                ? "Added to Wishlist"
                : "Add to Wishlist"}
                    </span>

                </button>

            </div>

        `;


        const addToWishlist =
            document.getElementById("addToWishlist");


        addToWishlist.addEventListener("click", function () {

            let wishlist =
                JSON.parse(localStorage.getItem("wishlist")) || [];


            const productIndex =
                wishlist.findIndex(
                    item => item.id === product.id
                );


        
            if (productIndex === -1) {

                wishlist.push(product);

                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(wishlist)
                );


                this.classList.add("added");

                this.querySelector(".heart").textContent = "♥";

                this.querySelector(".wishlist-text").textContent =
                    "Added to Wishlist";

            }


            
            else {

                wishlist.splice(productIndex, 1);

                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(wishlist)
                );


                this.classList.remove("added");

                this.querySelector(".heart").textContent = "♡";

                this.querySelector(".wishlist-text").textContent =
                    "Add to Wishlist";

            }

        });

    }

    catch (error) {

        console.log(error);

        productDetails.innerHTML = `
        
            <div class="col-12 text-center">

                <h3>
                    Something went wrong
                </h3>

            </div>

        `;

    }

}


getProduct();