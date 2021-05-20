// Event Listener for clicking the "submit button".
function addSubmitListener() {
    document.getElementById("submit").addEventListener("click", function () {
        var name = document.getElementById("user-name").value;
        let skillsArray = createSkillsArray ();
        // displayArray(skillsArray);
        // addData(name);
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
resetFormButton();


// Create an array of skills entered by user.
function createSkillsArray () {
    var homeRepair = document.getElementById("home-repair").checked;
    var automobileRepair = document.getElementById("automobile-repair").checked;
    var textileRepair = document.getElementById("textile-repair").checked;
    var electronicRepair = document.getElementById("electronic-repair").checked;
    
    var allSkillsArray = [];
    var skillsArray =[];

    // var skillsCheckboxes = document.getElementsByName("skillcheck")
    // var test = document.getElementsByName("skillcheck")[0].id;
    // // console.log(test)
    // console.log(skillsCheckboxes.item(1))


    var array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
      array.push(checkboxes[i].id)
    }
    console.log(array)


    for (let i=0; i<skillsCheckboxes.length; i++){
        if (skillsCheckboxes[i].checked) {
            skillsArray.push(skillsCheckboxes[i])
        }
    }

    // console.log(skillsArray)

    // if (homeRepair == true) {
    //     skillsArray.push("home repair")
    // }
    
    // $("input:checkbox[name=skillcheck]:checked").each(function() {
    //     skillsArray.push($(this).checked);
    // });
    // console.log(skillsArray)


    




}



// function displayArray(skillsArray) {
//     console.log(skillsArray);
// }


// Write data of created habits to Firestore.
function addData(name) {
    // var name = document.getElementById("user-name").value;
    var description = document.getElementById("user-description").value;

    var homeRepair = document.getElementById("home-repair").checked;
    var automobileRepair = document.getElementById("automobile-repair").checked;
    var textileRepair = document.getElementById("textile-repair").checked;
    var electronicRepair = document.getElementById("electronic-repair").checked;
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
            .collection("Raw Data")
            .add({
                // "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
                "description": description,
                "name": name,
                "home repair": homeRepair,
                "automobile repair": automobileRepair,
                "textile repair": textileRepair,
                "electronic repair": electronicRepair

                // "mon": mon,
                // "tue": tue,
                // "wed": wed,
                // "thurs": thurs,
                // "fri": fri,
                // "sat": sat,
                // "sun": sun
            })
            .then(function () {
                updateSkillsArray(user.uid, name, mon, tue, wed, thurs, fri, sat, sun);
            })
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

// Reset form fields after habit is logged in.
function resetForm() {
    document.getElementById("user-form").reset();
}