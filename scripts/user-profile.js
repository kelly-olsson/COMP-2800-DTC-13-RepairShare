// Read user info from firebase and populates profile page accordingly
function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var name = doc.data().name;
                    var description = doc.data().description;
                    var skills = doc.data().skills;
                    var tools = doc.data().tools;
                    var picture = doc.data().profilePicture;
                    var userattributes = doc.data().attribute;


                    $("#usernamegoeshere").text(name.toUpperCase());
                    $("#usercanhelp").text(name.toUpperCase());
                    $("#about").text(description);
                    $("#profile-photo").attr("src", picture);

                    for (var index = 0; index < skills.length; index++) {
                        let skill = skills[index];

                        $(document).ready(function () {
                            var $skillset = '<li>' + skill + '</li>';
                            $("#skillsinfo").append($skillset)
                        })
                    }

                    Object.keys(tools).forEach(key => {
                        if (tools[key] == true) {
                            const toolitem = key;

                            $(document).ready(function () {
                                const $toolkit = '<li>' + toolitem + " ahhh" + "<img id='update-tools' src='images/delete.png'>" + '</li>'

                                $("#toolz").append($toolkit);
                                
                            })
                        }    
                    })

                    $(document).ready(function () {
                        $("#update-tools").click(function () {
                            alert("Handler for .click() called.");
                        });
                    })


                    

                    
                    // Object.keys(userattributes).forEach(key=>{
                    //     if (userattributes[key] == true && key == 'Handy Certified'){

                    //         let handy = key;
                    //         let handyicon = '<span class="iconify" id="tooldescription" data-icon="bpmn:hand-tool" data-inline="false" data-height="32"></span> '


                    //         $(document).ready(function(){ 
                    //             var $handy = '<p id= "description">' + handyicon + handy + '</span>' + '</p>'
                    //             $('#userattributes').append($handy);
                    //         })
                    //     }
                    //     else if (userattributes[key] == true && key == 'Tool Share Member'){

                    //         let tooly = key; 
                    //         let toolicon = '<span class="iconify" id="tooldescription" data-icon="ion:hammer-sharp" data-inline="false" data-height="32"></span> ';
                    //         $(document).ready(function(){ 
                    //             var $handy = '<p id= "description">' + toolicon + tooly + '</span>' + '</p>'
                    //             $('#userattributes').append($handy);
                    //         })
                    //     }
                    // })
                })
        }
    })
}

sayHello();

document.getElementById("deleteaccount").addEventListener("click", function () {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    doc.update({
                        description: firebase.firestore.FieldValue.delete()
                    })

                })
        }
    })
});


// Button to update tools list of the user
// function updateToolsButton() {
//     document.getElementById("update-tools").addEventListener("click", function () {
//         alert("here");
//         // firebase.auth().onAuthStateChanged(function (somebody) {
//         //     if (somebody) {
//         //         db.collection("users")
//         //             .doc(somebody.uid)
//         //             .get()
//         //             .then(function (doc) {
//         //                 console.log("here")

//         //             })
//         //     }
//         // })
//     })
// }
// updateToolsButton();


$("#update-tools").click(function () {
    console.log("here")
})

$("#update-tools").click(function () {
    alert("Handler for .click() called");
});

/// Grab reviews connected to userID stored in firebase

// function grabReviews(providerID) {

//     db.collection("users")
//         .doc(providerID)
//         .get()
//         .then(function (doc) {
//             var reviews = doc.data().reviews;

//             for (let i = 0; i < reviews.length; i++) {

//                 let WrittenReviews = reviews[i].review;
//                 let rating = reviews[i].rating;

//                 var postedreview = $('<div id="reviews"></div>');
//                 var cardformat = $('<div class="card"></div>');
//                 var cardclass = $('<div class="card-header"></div>');
//                 var avatar = $('<div class="avatar"> <img id="reviewer-photo" src=https://randomuser.me/api/portraits/men/66.jpg> <div id= "thisagain"></div></div>');
//                 var cardbody = $('<div class="card-body"></div>');
//                 var blockquote = $('<blockquote class="blockquote mb-0"> </blockquote>');
//                 var reviewerstatement = $('<p id="reviewer-statement"></p>');
//                 var reviewername = $('<footer id="reviewer-name" class="blockquote-footer"> Francis Boomer <cite title="Source Title"></cite>');

//                 blockquote.append(reviewerstatement);
//                 blockquote.append(reviewername);
//                 cardbody.append(blockquote);
//                 cardformat.append(avatar);
//                 cardclass.append(cardbody);
//                 cardformat.append(cardclass);
//                 postedreview.append(cardformat);


//                 postedreview.find('#thisagain').append(StarCreation(rating));
//                 postedreview.find('#reviewer-statement').text(WrittenReviews);
//                 $('#reviews').append(postedreview);
//             }
//         })
// }


/// Filter through review

// function grabReviews() {
//     firebase.auth().onAuthStateChanged(function (somebody) {
//         if (somebody) {
//             db.collection("users")
//                 .doc(somebody.uid)
//                 .get()
//                 .then(function (doc) {
//                     var reviews = doc.data().reviews;
//                     for (let i = 0; i < reviews.length; i++) {


//                         let WrittenReviews = reviews[i].review;
//                         let rating = reviews[i].rating;

//                         var postedreview = $('<div id="reviews"></div>');
//                         var cardformat = $('<div class="card"></div>');
//                         var cardclass = $('<div class="card-header"></div>');
//                         var avatar = $('<div class="avatar"> <img id="reviewer-photo" src=https://randomuser.me/api/portraits/men/66.jpg> <div id= "thisagain"></div></div>');
//                         var cardbody = $('<div class="card-body"></div>');
//                         var blockquote = $('<blockquote class="blockquote mb-0"> </blockquote>');
//                         var reviewerstatement = $('<p id="reviewer-statement"></p>');
//                         var reviewername = $('<footer id="reviewer-name" class="blockquote-footer"> Francis Boomer <cite title="Source Title"></cite>');

//                         blockquote.append(reviewerstatement);
//                         blockquote.append(reviewername);
//                         cardbody.append(blockquote);
//                         cardformat.append(avatar);
//                         cardclass.append(cardbody);
//                         cardformat.append(cardclass);
//                         postedreview.append(cardformat);


//                         postedreview.find('#thisagain').append(StarCreation(rating));
//                         postedreview.find('#reviewer-statement').text(WrittenReviews);
//                         $('#reviews').append(postedreview);
//                     } 
//                 })
//         }

//                 })
//         }




// grabReviews();