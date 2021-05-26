// https://github.com/iamshaunjp/firebase-auth/blob/lesson-6/scripts/auth.js
// https://www.youtube.com/watch?v=eS-yU_6aKEE

const logout = document.querySelector("#logout")
logout.addEventListener("click", (event) => {
    event.preventDefault;
    auth.signOut().then(() => {
        alert("You have signed out!");
        location.href = "index.html";
    })
})