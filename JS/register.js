// let register = document.getElementById("register");
// register.addEventListener("click", check);
// register.addEventListener("click", saveDate);
let form = document.getElementById("registerForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (check()) saveDate();
});

  let fName = document.getElementById("fName");
  let lName = document.getElementById("lName");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let password = document.getElementById("password");
  let rePassword = document.getElementById("repassword");


let errorFName = document.getElementById("error-fName");
let errorLName = document.getElementById("error-lName");
let errorEmail = document.getElementById("error-email");
let errorPhone = document.getElementById("error-phone");
let errorRepassword = document.getElementById("error-repassword");
let res, res2;

// name.onfocus = function () {
//   name.style.border = "solid 1px blue";
// };

document.getElementById("fName").onblur = function (event) {
  let regex = /^[a-zA-Z]{3,}$/;
  let res = regex.test(fName.value);

  if (!res && fName.value != "") {
    errorFName.innerText = "Please enter a valid First Name";

    fName.classList.add("error-border");
  } else {
    errorFName.innerText = "";
    fName.classList.remove("error-border");
  }
};

document.getElementById("lName").onblur = function (event) {
  let regex = /^[a-zA-Z]{3,}$/;
  let res = regex.test(lName.value);

  if (!res && lName.value != "") {
    errorLName.innerText = "Please enter a valid Last Name";

    lName.classList.add("error-border");
  } else {
    errorLName.innerText = "";
    lName.classList.remove("error-border");
  }
};

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

document.getElementById("repassword").onblur = function (event) {
  if (password.value != rePassword.value) {
    errorRepassword.innerText =
      "password and repeat password should be the same";
    rePassword.classList.add("error-border");
  } else {
    errorRepassword.innerText = "";

    rePassword.classList.remove("error-border");
  }
};

document.getElementById("phone").onblur = function () {
  let regex = /^01[0125][0-9]{8}$/;
  let res = regex.test(phone.value);
  if (!res && phone.value != "") {
    errorPhone.innerText = "Enter a valid Phone";
    phone.classList.add("error-border");
  } else {
    errorPhone.innerText = "";
    phone.classList.remove("error-border");
  }
};

function check() {
  // let name = document.getElementById("name");
  if (!fName.hasAttribute("required")) {
    fName.setAttribute("required", "");
  }
  if (!lName.hasAttribute("required")) {
    lName.setAttribute("required", "");
  }
  if (!email.hasAttribute("required")) {
    email.setAttribute("required", "");
  }
  if (!phone.hasAttribute("required")) {
    phone.setAttribute("required", "");
  }
  if (!password.hasAttribute("required")) {
    password.setAttribute("required", "");
  }
  if (!rePassword.hasAttribute("required")) {
    rePassword.setAttribute("required", "");
  }
  if (
    fName.value == "" ||
    lName.value == "" ||
    email.value == "" ||
    phone.value == "" ||
    password.value == "" ||
    rePassword.value == "" ||
    password.value != rePassword.value
  ) {
    return false;
  }
  return true;
}

function saveDate() {
  let fName = document.getElementById("fName").value;
  let lName = document.getElementById("lName").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let password = document.getElementById("password").value;
  let rePassword = document.getElementById("repassword").value;

  //   //  --------------------------

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    alert("This email is already registered");
    return;
  }

  // let f = 0;
  // for (let i = 0; i < users.length; i++) {
  //   if (users[i].email == email) {
  //     users[i].FirstName = fName;
  //     users[i].LastName = lName;
  //     users[i].email = email;
  //     users[i].phone = phone;
  //     users[i].password = password;
  //     f = 1;
  //   }
  // }

  // if (f == 0) {
    let user = {
      FirstName: fName,
      LastName: lName,
      email: email,
      phone: phone,
      password: password,
    };
    users.push(user);
  // }
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "welcome.html";
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
function showPassrepete() {
  let pass = document.getElementById("repassword");
  let btn = document.getElementById("show-password");
  let icon = document.getElementById("iconeye2");

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
