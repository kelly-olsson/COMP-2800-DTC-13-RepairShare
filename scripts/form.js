// Event Listener for clicking the "submit button".
function addSubmitListener() {
    document.getElementById("submit").addEventListener("click", function () {
        var name = document.getElementById("user-name").value;
        addData(name);
        resetForm();
    })
}
addSubmitListener();

// Reset the form when "reset" button gets clicked.
function resetFormButton() {
    document.getElementById("reset").addEventListener("click", function () {
        resetForm();
    })
}
resetFormButton();

// Write data of created habits to Firestore.
function addData(name) {
    var name = document.getElementById("user-name").value;
    var description = document.getElementById("user-description").value;
    var homeRepair = document.getElementById("home-repair").checked;
    var tue = document.getElementById("automobile-repair").checked;
    var wed = document.getElementById("textile-repair").checked;
    var thurs = document.getElementById("electronic-repair").checked;
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
            .set({
                // "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
                "description": description,
                "name": name,
                "home repair": homeRepair,
                // "mon": mon,
                // "tue": tue,
                // "wed": wed,
                // "thurs": thurs,
                // "fri": fri,
                // "sat": sat,
                // "sun": sun
            }, {merge: true})
            // .then(function () {
            //     updateDaysArray(user.uid, name, mon, tue, wed, thurs, fri, sat, sun);
            // })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.log("Error writing document: ", error);
            })
    })
}

// Create an array in Firestore for each day in the week, containing the habits that are to be done on that day.
// For example, the "Monday" array contains habits that are to be performed on Mondays
function updateDaysArray(uid, name, mon, tue, wed, thurs, fri, sat, sun) {
    var obj = {};
    if (mon) {
        obj.monday = firebase.firestore.FieldValue.arrayUnion(name);
    }
    if (tue) {
        obj.tuesday = firebase.firestore.FieldValue.arrayUnion(name);
    }
    if (wed) {
        obj.wednesday = firebase.firestore.FieldValue.arrayUnion(name);
    }
    if (thurs) {
        obj.thursday = firebase.firestore.FieldValue.arrayUnion(name);
    }
    if (fri) {
        obj.friday = firebase.firestore.FieldValue.arrayUnion(name);
    }
    if (sat) {
        obj.saturday = firebase.firestore.FieldValue.arrayUnion(name);
    }
    if (sun) {
        obj.sunday = firebase.firestore.FieldValue.arrayUnion(name);
    }
    db.collection("users").doc(uid)
        .set(obj, {
            merge: true
        })
        .then(function () {
            window.location.href = "calendar.html";
        })
}

// Reset form fields after habit is logged in.
// function resetForm() {
//     document.getElementById("user-form").reset();
// }