// https://github.com/iamshaunjp/firebase-auth/blob/lesson-6/scripts/auth.js

const logout = document.querySelector("#logout")
logout.addEventListener("click", (event) => {
    event.preventDefault;
    auth.signOut().then(() => {
        alert("You have signed out!");
        location.href = "index.html";
    })
})