const params = new URLSearchParams(window.location.search);


let provider_identification = params.get("id");
console.log(provider_identification);



// var postedreview = $('<div id="reviews"></div>');
// var cardformat = $('<div class="card"></div>');
// var cardclass = $( '<div class="card-header"></div>');
// var cardbody = $('<div class="card-body"></div>');
// var blockquote = $('<blockquote class="blockquote mb-0"> </blockquote>');
// var reviewerstatement = $('<p id="reviewer-statement"></p>');
// var reviewername = $('<footer id="reviewer-name" class="blockquote-footer"> Francis Boomer <cite title="Source Title"></cite>');

// blockquote.append(reviewerstatement);
// blockquote.append(reviewername);
// cardbody.append(blockquote);
// cardclass.append(cardbody); 
// cardformat.append(cardclass);
// postedreview.append(cardformat);






// <div id="reviews">
// <div class="card">
//     <div class="card-header">
//         <div class="avatar"> <img id="reviewer-photo" src=https://randomuser.me/api/portraits/men/66.jpg> </div>
//     </div>
//     <div class="card-body">
//         <blockquote class="blockquote mb-0">
//             <p id="reviewer-statement">
//                 Billy was incredibly rude and did not fix my problem in the slightest. He broke my toilet and
//                 told me that it was 'my problem now', I can't believe I trusted someone like him.
//             </p>
//             <footer id="reviewer-name" class="blockquote-footer">
//                 Francis Boomer <cite title="Source Title"></cite>
//             </footer>
//         </blockquote>
//     </div>



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
    $('#chatboxbutton').attr("href", "chat.html?id=" + provider_identification);
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

            Object.keys(reviews).forEach(key => {
                let enteries = reviews[key];

                Object.keys(enteries).forEach(key => {
                    if (key == 'review') {

                        console.log(enteries[key]);

                        var WrittenReviews = enteries[key];


                        var postedreview = $('<div id="reviews"></div>');
                        var cardformat = $('<div class="card"></div>');
                        var cardclass = $('<div class="card-header"></div>');
                        var cardbody = $('<div class="card-body"></div>');
                        var blockquote = $('<blockquote class="blockquote mb-0"> </blockquote>');
                        var reviewerstatement = $('<p id="reviewer-statement"></p>');
                        var reviewername = $('<footer id="reviewer-name" class="blockquote-footer"> Francis Boomer <cite title="Source Title"></cite>');

                        blockquote.append(reviewerstatement);
                        blockquote.append(reviewername);
                        cardbody.append(blockquote);
                        cardclass.append(cardbody);
                        cardformat.append(cardclass);
                        postedreview.append(cardformat);

                        postedreview.find('#reviewer-statement').text(WrittenReviews);
                        $('#reviews').append(postedreview);


                    } else if (key == 'rating') {

                        console.log(enteries[key])

                    }
                }
                )
            })
        })
}













//             Object.keys(reviews).forEach(key => {
//                 if (key == 'review') {

//                     console.log('you got it you psycho bitch');

//                 }
//             else {
//                 console.log('fucking kill me right now')
//             }})


//         })
// }





PopulateProviderProfile(provider_identification);
chatButton(provider_identification);
grabReviews(provider_identification);

document.getElementById("reviewsubmit").addEventListener("click", function () {
    let text_review = $("#exampleFormControlTextarea1")[0].value;
    let rating = parseInt($("#exampleFormControlSelect1")[0].value);
    LeaveReview(provider_identification, text_review, rating);
})