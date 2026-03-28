document.getElementById("sign-btn").addEventListener("click", function () {

    const inputuser = document.getElementById("input-user");
    const userin = inputuser.value;
    console.log(userin);


    const inputpass = document.getElementById("input-pass");
    const passin = inputpass.value;
    console.log(passin);


    if (userin == "admin" && passin == "admin123") {
        alert("login Success")
        // window.location.assign("./pages/home.html")
        window.location.href = './pages/home.html';
    } else {
        alert("login Failed");
        return;
    }

});