const logout = document.querySelector("#logout")
/**
 * Logs out the user when the click on the logout button.
 * 
 * Code taken from: https://github.com/iamshaunjp/firebase-auth/blob/lesson-6/scripts/auth.js
 * 
 */
logout.addEventListener("click", (event) => {
    event.preventDefault;
    auth.signOut().then(() => {
        alert("You have signed out!");
        location.href = "index.html";
    })
})