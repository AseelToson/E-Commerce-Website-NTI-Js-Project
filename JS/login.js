// let register = document.getElementById("register");
// register.addEventListener("click", check);
// register.addEventListener("click", saveDate);
let form = document.getElementById("registerForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (check()) getDate();
});

let email = document.getElementById("email");
let password = document.getElementById("password")


let errorEmail = document.getElementById("error-email");
let res, res2;


document.getElementById("email").onblur = function (event) {
  let regex = /^[a-zA-Z0-9._%+-]{3,}(@)(gmail)(\.com)$/;
  // aseeltoson423@domain.com.eg

  let res2 = regex.test(email.value);
  if (!res2 && email.value != "") {
    errorEmail.innerText = "Please enter a valid email";
    email.classList.add("error-border");
  } else {
    errorEmail.innerText = "";
    email.classList.remove("error-border");
  }
};

// document.getElementsByTagName("input")[5].onblur = function (event) {
//   if (password.value != rePassword.value) {
//     errorRepassword.innerText =
//       "password and repeat password should be the same";
//     rePassword.classList.add("error-border");
//   } else {
//     errorRepassword.innerText = "";

//     rePassword.classList.remove("error-border");
//   }
// };


function check() {
  if (!email.hasAttribute("required")) {
    email.setAttribute("required", "");
  }
  if (!password.hasAttribute("required")) {
    password.setAttribute("required", "");
  }
  if (
    email.value == "" ||
    password.value == "" 
  ) {
    return false;
  }
  return true;
}

function getDate() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  //   //  --------------------------

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let f = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email&&users[i].password == password) {
      f = 1;
      break;
    }
    else if (users[i].email == email&&users[i].password != password) {
      f = 2;
      break;
    }
  }
  if (f == 2) {
    alert("The password isnot correct")
  }
  else if (f == 0) {
    alert("There is no account with this email")
  }
  //localStorage.setItem("users", JSON.stringify(users));
  
  else{   //                  عايزه اباصي ال  email عشان اجيب منه ال ويشليست والكارد   👈👈 
    localStorage.setItem("currentUserEmail", email);
    window.location.href = "welcome.html";
  }
}

function showPass() {
  let pass = document.getElementById("password");
  let btn = document.getElementById("show-password");
  let icon = document.getElementById("iconeye");

  if (pass.type == "password") {
    pass.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    pass.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

