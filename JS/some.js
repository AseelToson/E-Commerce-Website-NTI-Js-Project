

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