const signInBtn = document.getElementById("sign-btn");

if (signInBtn) {
    signInBtn.addEventListener("click", function () {
        const username = document.getElementById("inputUser").value;
        const password = document.getElementById("inputPass").value;

        if (username === "admin" && password === "admin123") {
            window.location.assign("home.html")
        } else {
            alert("Invalid Credentials!")
        }

    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            loginBtn.click();
        }
    });

}