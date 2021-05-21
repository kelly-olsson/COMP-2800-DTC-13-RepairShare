const params = new URLSearchParams(window.location.search);


let provider_identification = params.get("id");
console.log(provider_identification);



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


            for (var index = 0; index < skills.length; index++) {
                let skill = skills[index];

                $(document).ready(function () {
                    var $skillset = '<li>' + skill + '</li>';
                    $("#skillsinfo").append($skillset)
                })
            }

            Object.keys(tools).forEach(key => {
                if (tools[key] == true) {
                    let toolitem = key;

                    $(document).ready(function () {
                        var $toolkit = '<li>' + toolitem + '</li>'
                        $("#toolz").append($toolkit);
                    })

                }

            })

            Object.keys(userattributes).forEach(key => {
                if (userattributes[key] == true && key == 'Handy Certified') {

                    let handy = key;
                    let handyicon = '<span class="iconify" id="tooldescription" data-icon="bpmn:hand-tool" data-inline="false" data-height="32"></span> '


                    $(document).ready(function () {
                        var $handy = '<p id= "description">' + handyicon + handy + '</span>' + '</p>'
                        $('#userattributes').append($handy);
                    })
                }
                else if (userattributes[key] == true && key == 'Tool Share Member') {

                    let tooly = key;
                    let toolicon = '<span class="iconify" id="tooldescription" data-icon="ion:hammer-sharp" data-inline="false" data-height="32"></span> ';
                    $(document).ready(function () {
                        var $handy = '<p id= "description">' + toolicon + tooly + '</span>' + '</p>'
                        $('#userattributes').append($handy);
                    })
                }
            })


        }).catch(function (error) {
            console.log(error)
        })
}


function chatButton(providerID) {
    $('#chatboxbutton').attr("href", "chat.html?id=" + providerID);
}


function LeaveReview(providerID, review, rating) {
    var storedreviews = db.collection("users").doc(providerID);

    storedreviews.update({
        reviews: firebase.firestore.FieldValue.arrayUnion({ 'review': review, 'rating': rating })
    });

    $("#exampleFormControlTextarea1")[0].value = "";

}


function grabReviews(providerID) {

    db.collection("users")
        .doc(providerID)
        .get()
        .then(function (doc) {
            var reviews = doc.data().reviews;

            for (let i = 0; i < reviews.length; i++) {

                let WrittenReviews = reviews[i].review;
                let rating = reviews[i].rating;

                var postedreview = $('<div id="reviews"></div>');
                var cardformat = $('<div class="card"></div>');
                var cardclass = $('<div class="card-header"></div>');
                var avatar = $('<div class="avatar" id= "thisagain"> <img id="reviewer-photo" src=https://randomuser.me/api/portraits/men/66.jpg> </div>');
                var cardbody = $('<div class="card-body"></div>');
                var blockquote = $('<blockquote class="blockquote mb-0"> </blockquote>');
                var reviewerstatement = $('<p id="reviewer-statement"></p>');
                var reviewername = $('<footer id="reviewer-name" class="blockquote-footer"> Francis Boomer <cite title="Source Title"></cite>');

                blockquote.append(reviewerstatement);
                blockquote.append(reviewername);
                cardbody.append(blockquote);
                cardformat.append(avatar);
                cardclass.append(cardbody);
                cardformat.append(cardclass);
                postedreview.append(cardformat);


                postedreview.find('#thisagain').append(StarCreation(rating));
                postedreview.find('#reviewer-statement').text(WrittenReviews);
                $('#reviews').append(postedreview);
            }
        })
}


PopulateProviderProfile(provider_identification);
chatButton(provider_identification);
grabReviews(provider_identification);

document.getElementById("reviewsubmit").addEventListener("click", function () {
    let text_review = $("#exampleFormControlTextarea1")[0].value;
    let rating = parseInt($("#exampleFormControlSelect1")[0].value);
    LeaveReview(provider_identification, text_review, rating);
})



/// create star list aligning with user rating 

function StarCreation(ratingscore) {

    var starsheet = $('<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" id="starchart"></div>')
    var classgrouping = $('<div class="btn-group mr-2" role="group" aria-label="First group"></div>')

    if (ratingscore == 1) {

        var starrating1 = $('<button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>')
        classgrouping.append(starrating1);

    } else if (ratingscore == 2) {

        var starrating2 = $('<button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button><button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>')
        classgrouping.append(starrating2);


    } else if (ratingscore == 3){

        var starrating3 =$('<button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"></button>\
        <button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>')

         classgrouping.append(starrating3);

    } else if (ratingscore == 4){

        var starrating4 =$('<button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"></button>\
        <button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>') 
        
         classgrouping.append(starrating4);

    } else if (ratingscore == 5 ){

        var starrating4 =$('<button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"></button>\
        <button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"><img src= "./images/1200px-Gold_Star.svg.png"> </button>') 

         classgrouping.append(starrating5);
    }

    starsheet.append(classgrouping);

    return starsheet;

}



//  Hannah

// function sayHello() {
//     firebase.auth().onAuthStateChanged(function (somebody) {
//         if (somebody) {
//             db.collection("users")
//                 .doc(somebody.uid)
//                 .get()
//                 .then(function (doc) {
//                     var n = doc.data().name;
//                     $("#name-goes-here").text(n);

//                     var reviews = doc.data().reviews;
//                     console.log(reviews)

//                     for (let i = 0; i < reviews.length; i++) {

//                         let WrittenReviews = reviews[i].review;
//                         let rating = reviews[i].rating;

//                         console.log(reviews[i].review)
//                         console.log(reviews[i].score)

//                         var postedreview = $('<div id="reviews"></div>');
//                         var cardformat = $('<div class="card"></div>');
//                         var cardclass = $('<div class="card-header"></div>');
//                         var avatar = $('<div class="avatar" id= "thisagain"> <img id="reviewer-photo" src=https://randomuser.me/api/portraits/men/66.jpg> </div>')
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


//                         postedreview.find('#thisagain').text(rating);
//                         postedreview.find('#reviewer-statement').text(WrittenReviews);
//                         $('#reviews').append(postedreview);
//                     }
//                 })
//         }
//     })
// }
// sayHello();