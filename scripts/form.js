// Event Listener for clicking the "submit button".
function addSubmitListener() {
    document.getElementById("submit").addEventListener("click", function () {
        // var name = document.getElementById("user-name").value;
        let skillsArray = createSkillsArray();
        // console.log(skillsArray)
        let toolsObject = createToolsObject();
        // console.log(toolsObject)
        addData(name, skillsArray, toolsObject);
        // uploadUserProfilePic();
        // resetForm();
    })
}
addSubmitListener();

// Reset the form when "reset" button gets clicked.
function resetFormButton() {
    document.getElementById("reset").addEventListener("click", function () {
        resetForm();
    })
}
// resetFormButton();


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
function addData(name, skillsArray, toolsObject) {
    // var name = document.getElementById("user-name").value;
    var description = document.getElementById("user-description").value;

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
            // .collection("Raw Data")
            .set({
                // "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
                "description": description,
                // "name": user.uid.name,
                "skills": skillsArray,
                "tools": toolsObject

            }, {merge: true})
            // .then(function () {
            //     updateSkillsArray(user.uid, name, mon, tue, wed, thurs, fri, sat, sun);
            // })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.log("Error writing document: ", error);
            })
    })
}


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


// Reset form fields after habit is logged in.
function resetForm() {
    document.getElementById("user-form").reset();
}


//IMAGE STUFF FROM CARLY#########################################################
// const user = "sC1n34ukb7RFTJCBi7zsjuqKkyr1"

function uploadUserProfilePic(userUid) {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab
    if (!userUid) { console.err("Not logged in!"); return };

    console.log("uploadUserProfilePic is being called")

    // firebase.auth().onAuthStateChanged(function (user) {
        const fileInput = document.getElementById("profile-pic");   // pointer #1
        // const image = document.getElementById("mypic-goes-here"); // pointer #2

        console.log("line 113")

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            
            // test to ensure correct data collection
            // db.collection("users").doc(user.uid)
            // .update({
            //     "set": "set3"
            // })
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            // image.src = blob;            // display this image
            console.log("We are inside the change eventlistener")
            //store using this name
            var storageRef = storage.ref("images/" + userUid + ".jpg"); 
            
            //upload the picked file
            storageRef.put(file) 
                .then(function(){
                    console.log('Uploaded to Cloud Storage.');
                })

						//get the URL of stored file
            storageRef.getDownloadURL()
                .then(function (url) {   // Get URL of the uploaded file
                    console.log(url);    // Save the URL into users collection
                    db.collection("users").doc(userUid).update({
                        "profilePicture": url
                    })
                    .then(function(){
                        console.log('Added Profile Pic URL to Firestore.');
                    })
                })
        })
    
}
// uploadUserProfilePic();

// Load user's data
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        userId = user.uid;
        db.collection("users").doc(user.uid).get().then(function(user) {
            uploadUserProfilePic(userId);
        });
    }
});
