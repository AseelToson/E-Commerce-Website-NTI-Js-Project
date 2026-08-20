document.addEventListener("DOMContentLoaded",()=>{
    let styleLink=document.createElement("link");
    styleLink.rel="stylesheet";
    styleLink.href="../Css/general.css";
    document.head.appendChild(styleLink);

    fetch("../General/navbar.html")
    .then(response => response.text())
    .then(data => {
        const headerContainer = document.createElement("header");
        headerContainer.innerHTML = data;
        document.body.prepend(headerContainer);
    })

    fetch("../General/footer.html")
    .then(response => response.text())
    .then(data => {
        const footerContainer = document.createElement("footer");
        footerContainer.innerHTML = data;
        document.body.append(footerContainer);
    })
   
    // .catch(error=>console.log("navbar canot load"));     //مش لازم
});




