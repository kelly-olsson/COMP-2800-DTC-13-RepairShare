// Event Listener for clicking the "submit button".
function addSubmitListener() {
    document.getElementById("submit").addEventListener("click", function () {
        let skillsArray = createSkillsArray();
        let toolsObject = createToolsObject();
        addData(skillsArray, toolsObject);
        resetForm();
    })
}
addSubmitListener();


// Reset the form when "reset" button gets clicked.
function resetFormButton() {
    document.getElementById("reset-button").addEventListener("click", function () {
        resetForm();
    })
}
resetFormButton();


// Reset form fields after habit is logged in.
function resetForm() {
    document.getElementById("user-form").reset();
}



// Create an array of skills entered by user.
function createSkillsArray() {

    var skillsArray = [];
    var skillsCheckboxes = document.querySelectorAll('input[name=skillcheck]:checked');
    for (var i = 0; i < skillsCheckboxes.length; i++) {
        skillsArray.push(skillsCheckboxes[i].id + " repair")
    }
    return skillsArray;

}


// Create an object of tools availability according to user input.
function createToolsObject() {

    toolsObject = {};
    var toolsCheckboxes = document.querySelectorAll('input[name=toolcheck]:checked');
    for (var i = 0; i < toolsCheckboxes.length; i++) {
        toolsObject[toolsCheckboxes[i].id] = true;
    }
    return toolsObject
}


// Write data of created habits to Firestore.
function addData(skillsArray, toolsObject) {
    var description = document.getElementById("user-description").value;

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
            .set({
                "description": description,
                "skills": skillsArray,
                "tools": toolsObject

            }, { merge: true })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.log("Error writing document: ", error);
            })
    })
}


// Display logged in user name at the start of the form.
function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    $("#name-goes-here").text(n);
                })
        }
    })
}
sayHello();


// Upload user profile image to Cloud Firestore.
function uploadUserProfilePic(userUid) {

    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab
    if (!userUid) { console.err("Not logged in!"); return };

    const fileInput = document.getElementById("profile-pic");

    // listen for file selection
    fileInput.addEventListener('change', function (e) {

        var file = e.target.files[0];

        //store using this name
        var storageRef = storage.ref("images/" + userUid + ".jpg");

        //upload the picked file
        storageRef.put(file)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');
            })

        //get the URL of stored file
        storageRef.getDownloadURL()
            .then(function (url) {   // Get URL of the uploaded file
                console.log(url);    // Save the URL into users collection
                db.collection("users").doc(userUid).update({
                    "profilePicture": url
                })
                    .then(function () {
                        console.log('Added Profile Pic URL to Firestore.');
                    })
            })
    })
}

// Load user's data
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        userId = user.uid;
        db.collection("users").doc(user.uid).get().then(function (user) {
            uploadUserProfilePic(userId);
        });
    }
});


// // Obtains the current location of the user accessing the form, and write location into Firestore as an array.
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;

    locationArray = createLocationArray(crd.latitude, crd.longitude);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            userId = user.uid;
            db.collection("users").doc(user.uid)
                .update({
                    "location": locationArray
                })
        }
    });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


// Create a location array in the format of (latitude, longitude).
function createLocationArray(latitude, longitude) {
    locationArray = [];

    locationArray.push(latitude);
    locationArray.push(longitude);

    return locationArray;
}