// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdM3ePl65L34esirhXE7smv_aUNjECrnc",
    authDomain: "repairshare-ce54f.firebaseapp.com",
    databaseURL: "https://repairshare-ce54f-default-rtdb.firebaseio.com",
    projectId: "repairshare-ce54f",
    storageBucket: "repairshare-ce54f.appspot.com",
    messagingSenderId: "151156008286",
    appId: "1:151156008286:web:8a94503aa2c1899f001bcf"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
var storage = firebase.storage();

db.settings({timestampInSnapshots: true});

// https://github.com/iamshaunjp/firebase-auth/blob/lesson-6/scripts/auth.js

// const logout = document.querySelector("#logout")
// logout.addEventListener("click", (event) => {
//     event.preventDefault;
//     auth.signOut().then(() => {
//         alert("You have signed out!")
//     })
// })