

export function createStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= Math.round(rating)) {

            stars += "★";

        } else {

            stars += "☆";

        }

    }

    return stars;

}

/* ================= Get Current User Email ================= */


export let currentUserEmail =
    localStorage.getItem("currentUserEmail");


/******************************** */
export function requireLogin() {

    if (!currentUserEmail) {
        alert("Please login first");

        window.location.href = "../Pages/login.html";

        return;               //null 
    }

    return currentUserEmail;
}




export function createPagination(
    products,
    productsPerPage,
    currentPage,
    pagination,
    changePage
) {
    const totalPages =
        Math.ceil(
            products.length / productsPerPage
        );
    pagination.innerHTML = "";
    // Previous
    const previous =
        document.createElement("button");
    previous.className =
        "btn btn-danger mx-1";
    previous.textContent =
        "Previous";
    previous.disabled =
        currentPage === 1;
    previous.addEventListener(
        "click",
        () => changePage(currentPage - 1)
    );
    pagination.appendChild(previous);
    // Pages
    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {
        const button =
            document.createElement("button");
        button.className =
            "btn btn-danger mx-1";
        button.textContent =
            i;
        button.addEventListener(
            "click",
            () => changePage(i)
        );
        pagination.appendChild(button);
    }
    // Next
    const next =
        document.createElement("button");
    next.className =
        "btn btn-danger mx-1";
    next.textContent =
        "Next";
    next.disabled =
        currentPage === totalPages;
    next.addEventListener(
        "click",
        () => changePage(currentPage + 1)
    );
    pagination.appendChild(next);
}