const params = new URLSearchParams(window.location.search); 

let user_identification = params.get("id");
console.log(user_identification);

function PopulateProviderProfile(userID) {
    db.collection("users")
        .doc(userID)
        .get()
        .then(function (doc) {
            var name = doc.data().name;
            var description = doc.data().description;
            var skills = doc.data().skills;
            var tools = doc.data().tools;
            var picture = doc.data().profilePicture;
            var userattributes = doc.data().attribute; 


            $(".usernamegoeshere").text(name.toUpperCase());
            $("#usercanhelp").text(name.toUpperCase());
            $("#about").text(description);
            $("#profile-photo").attr("src", picture);


            for(var index = 0; index < skills.length; index++){          
                let skill = skills[index];              

                $(document).ready(function(){
                    var $skillset = '<li>' + skill + '</li>';
                    $("#skillsinfo").append($skillset)
                })
            }

            Object.keys(tools).forEach(key=>{
                if (tools[key] == true) {
                  let toolitem = key; 

                  $(document).ready(function(){
                      var $toolkit = '<li>'+ toolitem + '</li>'
                      $("#toolz").append($toolkit);
                  })

              }
                
            })

            Object.keys(userattributes).forEach(key=>{
                if (userattributes[key] == true && key == 'Handy Certified'){

                    let handy = key;
                    let handyicon = '<span class="iconify" id="tooldescription" data-icon="bpmn:hand-tool" data-inline="false" data-height="32"></span> '


                    $(document).ready(function(){ 
                        var $handy = '<p id= "description">' + handyicon + handy + '</span>' + '</p>'
                        $('#userattributes').append($handy);
                    })
                }
                else if (userattributes[key] == true && key == 'Tool Share Member'){

                    let tooly = key; 
                    let toolicon = '<span class="iconify" id="tooldescription" data-icon="ion:hammer-sharp" data-inline="false" data-height="32"></span> ';
                    $(document).ready(function(){ 
                        var $handy = '<p id= "description">' + toolicon + tooly + '</span>' + '</p>'
                        $('#userattributes').append($handy);
                    })
                }
            })


        }).catch(function(error){
            console.log(error)
        })
}


function chatButton(providerID){
    $('#chatboxbutton').attr("href", "chat.html?id=" + user_identification);
}


// function LeaveReview(providerID, userID){
//     var review = document.getElementById


// }

PopulateProviderProfile(user_identification);
chatButton(user_identification);




function mapDetailWindow(userID, i) {
    db.collection("users")
        .doc(userID)
        .get()
        .then(function (doc) {
            let name = doc.data().name;
            let rating = doc.data().rating;
            let description = doc.data().description;
            let picture = doc.data().profilePicture;
            $('#window-name_' + i + '').attr("href", "provider-profile.html?id=" + userID).text(name);
            $('#window-rating_' + i + '').text(rating);
            $('#window-description_' + i + '').text(description);
            $('.profile-pic_' + i + '').attr("src", picture);

        }).catch(function(error){
            console.log(error)
        })
}





// function addData(name, skillsArray, toolsObject) {
//     // var name = document.getElementById("user-name").value;
//     var description = document.getElementById("user-description").value;

//     firebase.auth().onAuthStateChanged(function (user) {
//         db.collection("users").doc(user.uid)
//             // .collection("Raw Data")
//             .set({
//                 // "timestamp": firebase.firestore.FieldValue.serverTimestamp(),
//                 "description": description,
//                 // "name": user.uid.name,
//                 "skills": skillsArray,
//                 "tools": toolsObject

//             }, {merge: true})
//             // .then(function () {
//             //     updateSkillsArray(user.uid, name, mon, tue, wed, thurs, fri, sat, sun);
//             // })
//             .then(() => {
//                 console.log("Document successfully written!");
//             })
//             .catch((error) => {
//                 console.log("Error writing document: ", error);
//             })
//     })
// }