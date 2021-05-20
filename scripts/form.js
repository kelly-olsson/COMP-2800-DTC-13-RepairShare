// Event Listener for clicking the "submit button".
function addSubmitListener() {
    document.getElementById("submit").addEventListener("click", function () {
        // var name = document.getElementById("user-name").value;
        let skillsArray = createSkillsArray();
        // console.log(skillsArray)
        let toolsObject = createToolsObject();
        // console.log(toolsObject)
        addData(name, skillsArray, toolsObject);
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
                // "name": name,
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

// Create an array in Firestore for each day in the week, containing the habits that are to be done on that day.
// For example, the "Monday" array contains habits that are to be performed on Mondays
function updateSkillsArray(uid, name, mon, tue, wed, thurs, fri, sat, sun) {
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