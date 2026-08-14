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

        wishlistContainer.innerHTML = `

            <div class="col-12">

                <div class="empty-wishlist text-center">

                    <div class="empty-heart">
                        ♡
                    </div>


                    <h3>
                        Your Wishlist is Empty
                    </h3>


                    <p>
                        You haven't added any products yet.
                    </p>

                </div>

            </div>

        `;

        return;

    }


  

    wishlist.forEach(product => {

        wishlistContainer.innerHTML += `

            <div class="col">

                <div class="card wishlist-card h-100">


                    <!-- Product Image -->

                    <div class="wishlist-image-container">

                        <img
                            src="${product.thumbnail}"
                            class="card-img-top wishlist-image"
                            alt="${product.title}"
                        >

                    </div>


                    <!-- Card Body -->

                    <div
                        class="card-body d-flex flex-column"
                    >


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

                        <div class="d-grid gap-2 mt-auto">


                            <!-- View Details -->

                            <a
                                href="product-details.html?id=${product.id}"
                                class="wishlist-view-btn"
                            >

                                View Details

                            </a>


                            <!-- Remove -->

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