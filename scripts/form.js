// Event Listener for clicking the "submit button".

/**
 * Click event listener for submit button which adds arrays created by helper functions createSkillsArray() and createToolsObject() and adds them to firebase.  
 */

function addSubmitListener() {
    document.getElementById("submit").addEventListener("click", function () {
        let skillsArray = createSkillsArray();
        let toolsObject = createToolsObject();
        addData(skillsArray, toolsObject);
        resetForm();
    })
}
addSubmitListener();


/**
 * Click event listener for 'reset-button' which clears the form of all input. 
 */

function resetFormButton() {
    document.getElementById("reset-button").addEventListener("click", function () {
        resetForm();
    })
}
resetFormButton();


/**
 * Resets all input fields to an empty valid who's Id is 'user-form' 
 */

function resetForm() {
    document.getElementById("user-form").reset();
}

/**
 * Populate and create an array with all user selected skill items from input field skillcheck
 * 
 * @returns an array populated by user selection in a specific input field 
 */

function createSkillsArray() {

    var skillsArray = [];
    var skillsCheckboxes = document.querySelectorAll('input[name=skillcheck]:checked');
    for (var i = 0; i < skillsCheckboxes.length; i++) {
        skillsArray.push(skillsCheckboxes[i].id + " repair")
    }
    return skillsArray;

}

// Create an object of tools availability according to user input.

/**
 * Populate and create an array with all user selected (checked) tool items from input field toolcheck 
 * 
 * @returns an array populated by all user selected (checked) tool items from input field toolcheck
 */

function createToolsObject() {

    toolsObject = {};
    var toolsCheckboxes = document.querySelectorAll('input[name=toolcheck]:checked'); //Select all inputs that have their name as "toolcheck" and are CHECKED
    for (var i = 0; i < toolsCheckboxes.length; i++) {
        toolsObject[toolsCheckboxes[i].id] = true;
    }
    return toolsObject
}


/**
 * Populates the profile-update-form page with the user's current info.
 */
function renderPrevInfo() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    let description = doc.data().description;
                    let skills = doc.data().skills;
                    let tools = doc.data().tools;

                    $("#user-description").text(description)

                    if (typeof skills != "undefined") {
                    for (var index = 0; index < skills.length; index++) {
                        let skill = skills[index];
                        console.log(skill)
                        if (skill === "appliance repair") {
                            $("#appliance").prop("checked", true);
                        } else if (skill === "automotive repair") {
                            $("#automotive").prop("checked", true);
                        } else if (skill === "textile repair") {
                            $("#textile").prop("checked", true);
                        } else if (skill === "electronic repair") {
                            $("#electronic").prop("checked", true);
                        } else if (skill === "exterior-home repair") {
                            $("#exterior-home").prop("checked", true);
                        } else if (skill === "interior-home repair") {
                            $("#interior-home").prop("checked", true);
                        }
                    }}

                    let trueTools = []
                    if (typeof tools != "undefined") {
                    Object.keys(tools).forEach(key => {
                        if (tools[key] == true) {
                            const toolitem = key;
                            trueTools.push(key)
                        } 
                    });}

                    for (var index = 0; index < trueTools.length; index++) {
                        let tool = trueTools[index];
                        console.log(tool)
                        if (tool === "hammer") {
                            $("#hammer").prop("checked", true);
                        } else if (tool === "ladder") {
                            $("#ladder").prop("checked", true);
                        } else if (tool === "screwdriver") {
                            $("#screwdriver").prop("checked", true);
                        } else if (tool === "nails") {
                            $("#nails").prop("checked", true);
                        } else if (tool === "wrench") {
                            $("#wrench").prop("checked", true);
                        } else if (tool === "sewing-kit") {
                            $("#sewing-kit").prop("checked", true);
                        }
                    }

                })
        }
    })
}

// Write data of created habits to Firestore.s

/**
 * Write data stored in passed arguments, skillsArray and toolsObject, to Firebase. 
 * 
 * @param {Array} skillsArray an array of strings representing user skills  
 * @param {Array} toolsObject an array of strings representing tools
 */

function addData(skillsArray, toolsObject) {
    var description = document.getElementById("user-description").value;

    firebase.auth().onAuthStateChanged(function (user) {
        let userRef = db.collection("users").doc(user.uid)

        userRef.set({
            "description": description,
            "skills": skillsArray,

        }, { merge: true })
        userRef.update({
            "tools": toolsObject
        })
            .catch((error) => {
                console.log("Error writing document: ", error);
            })
    })
}



/**
 * Display name and authenticate user currently logged into application. 
 */

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







/**
 * Upload user profile image to Cloud Firestore. 
 * 
 * @param {string} userUid A string representing a corresponding firebase collection identification number (or a user)
 * @returns if an error occurs, function returns an error message of 'not logged in' 
 */
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

/**
 * Load user's data.
 */

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        userId = user.uid;
        db.collection("users").doc(user.uid).get().then(function (user) {
            uploadUserProfilePic(userId);
        });
    }
});



/**
 * Obtains the current location of the user accessing the form, and write location into Firestore as an array. 
 * Adapted from code found here: 
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
 */

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

/**
 * Update location coordinates in Firebase
 * 
 * @param {object} pos an object representing geololocational coordinates
 */

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


/**
 * Produce console error message.
 * 
 * @param {error} err GelocationPositionError object
 */

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

/**
 * End of adapted code: 
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
 */



/**
 * Create a location array in the format of (latitude, longitude). 
 * 
 * @param {flaot} latitude float representing latitude
 * @param {float} longitude float representing longitude
 * @returns an array containing latitude and longitude
 */


function createLocationArray(latitude, longitude) {
    locationArray = [];

    locationArray.push(latitude);
    locationArray.push(longitude);

    return locationArray;
}


/**
 * Click event listener for html element with Id submit, which redirects to a user-profile page.
 */

document.getElementById("submit").onclick = function () {
    location.href = "user-profile.html";
};

renderPrevInfo();