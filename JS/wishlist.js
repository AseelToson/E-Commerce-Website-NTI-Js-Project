let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];


const wishlistContainer =
    document.getElementById(
        "wishlistContainer"
    );


function displayWishlist() {

    wishlistContainer.innerHTML = "";




    if (wishlist.length === 0) {

        document.body.classList.add(
            "wishlist-empty-page"
        );


        wishlistContainer.innerHTML = `

            <div class="col-12">

                <div class="empty-wishlist">

                    <h2>
                        Your Wishlist is Empty
                    </h2>


                    <p>
                        You haven't added any products yet.
                        Start exploring and save your favorites!
                    </p>


                    <a
                        href="products.html"
                        class="empty-wishlist-btn"
                    >
                        Explore Products
                    </a>

                </div>

            </div>

        `;

        return;
    }


    document.body.classList.remove(
        "wishlist-empty-page"
    );




    wishlist.forEach(product => {

        wishlistContainer.innerHTML += `

            <div
                class="col-12 col-sm-6 col-md-4 col-lg-3"
            >

                <div class="card wishlist-card h-100">


                    <!-- Product Image -->

                    <div class="wishlist-image-container">

                        <img
                            src="${product.thumbnail}"
                            class="wishlist-image"
                            alt="${product.title}"
                        >

                    </div>


                    <!-- Product Information -->

                    <div class="card-body d-flex flex-column">

                        <h5 class="wishlist-product-title">

                            ${product.title}

                        </h5>


                        <p class="wishlist-price">

                            $${product.price}

                        </p>


                        <p class="wishlist-description">

                            ${product.description}

                        </p>


                        <!-- Buttons -->

                        <div class="d-flex gap-2 mt-auto">


                            <a
                                href="product-details.html?id=${product.id}"
                                class="wishlist-view-btn"
                            >
                                View Details
                            </a>


                            <button
                                class="wishlist-remove-btn remove-btn"
                                data-id="${product.id}"
                            >
                                Remove
                            </button>


                        </div>

                    </div>

                </div>

            </div>

        `;

    });





    const removeButtons =
        document.querySelectorAll(
            ".remove-btn"
        );


    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const id =
                    Number(
                        this.dataset.id
                    );


                wishlist =
                    wishlist.filter(
                        product =>
                            product.id !== id
                    );


                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(wishlist)
                );


                displayWishlist();

            }
        );

    });

}


displayWishlist();