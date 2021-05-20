// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDpW_9fn_o6lA2_QMvYbB5bj7iK6IbsfqE",
    authDomain: "testfirechat-95cd2.firebaseapp.com",
    databaseURL: "https://testfirechat-95cd2-default-rtdb.firebaseio.com",
    projectId: "testfirechat-95cd2",
    storageBucket: "testfirechat-95cd2.appspot.com",
    messagingSenderId: "91252168519",
    appId: "1:91252168519:web:064c987be903089a459e62"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({timestampInSnapshots: true});
