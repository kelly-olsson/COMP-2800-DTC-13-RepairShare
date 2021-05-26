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
            // $('#chatboxbutton').attr("href", "chat.html?id=" + userID);



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

            // Object.keys(userattributes).forEach(key => {
            //     if (userattributes[key] == true && key == 'Handy Certified') {

            //         let handy = key;
            //         let handyicon = '<span class="iconify" id="tooldescription" data-icon="bpmn:hand-tool" data-inline="false" data-height="32"></span> '


            //         $(document).ready(function () {
            //             var $handy = '<p id= "description">' + handyicon + handy + '</span>' + '</p>'
            //             $('#userattributes').append($handy);
            //         })
            //     }
            //     else if (userattributes[key] == true && key == 'Tool Share Member') {

            //         let tooly = key;
            //         let toolicon = '<span class="iconify" id="tooldescription" data-icon="ion:hammer-sharp" data-inline="false" data-height="32"></span> ';
            //         $(document).ready(function () {
            //             var $handy = '<p id= "description">' + toolicon + tooly + '</span>' + '</p>'
            //             $('#userattributes').append($handy);
            //         })
            //     }
            // })
            // */


        }).catch(function (error) {
            console.log(error)
        })
}


function chatButton(provider_identification) {
    $('#chatboxbutton').attr("href", "chat.html?id=" + provider_identification);
}


function LeaveReview(providerID, review, rating) {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {

                    var name = doc.data().name;
                    var profilePicture = doc.data().profilePicture;

                    // $(".usernamegoeshere").text(name);
                    console.log(doc.id)
                    console.log(name)
                    console.log(profilePicture)

                    var storedreviews = db.collection("users").doc(providerID);
                    storedreviews.update({
                        reviews: firebase.firestore.FieldValue.arrayUnion({ 'review': review, 'rating': rating, 'userID': doc.id, "name": name, "profilePicture": profilePicture })
                    });

                    $("#exampleFormControlTextarea1")[0].value = "";

                })
        }
    })
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
                let name = reviews[i].name;
                let profilePicture = reviews[i].profilePicture;


                var postedreview = $('<div id="reviews"></div>');
                var cardformat = $('<div class="card"></div>');
                var cardclass = $('<div class="card-header"></div>');
                var avatar = $('<div class="avatar"> <img id="reviewer-photo" src=https://randomuser.me/api/portraits/men/66.jpg> <div id= "thisagain"></div></div>');
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
                postedreview.find('#reviewer-name').text(name);
                postedreview.find('#reviewer-photo').attr("src", profilePicture);
                $('#reviews').append(postedreview);
            }
        })
}



function filterReviews(providerID, desiredRating) {

    db.collection("users")
        .doc(providerID)
        .get()
        .then(function (doc) {
            var reviews = doc.data().reviews;

            for (let i = 0; i < reviews.length; i++) {

                if (reviews[i].rating == desiredRating) {

                    let WrittenReviews = reviews[i].review;
                    let rating = reviews[i].rating;

                    var postedreview = $('<div id="reviews"></div>');
                    var cardformat = $('<div class="card"></div>');
                    var cardclass = $('<div class="card-header"></div>');
                    var avatar = $('<div class="avatar"> <img id="reviewer-photo" src=> <div id= "thisagain"></div></div>');
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
            }
        })
}


document.getElementById("reviewsubmit").addEventListener("click", function () {
    let text_review = $("#exampleFormControlTextarea1")[0].value;
    let rating = parseInt($("#exampleFormControlSelect1")[0].value);
    LeaveReview(provider_identification, text_review, rating);
})


document.getElementById("filterbutton").addEventListener("click", function () {
    let search_number = parseInt($("#searchRating")[0].value);
    $("#reviews").empty();
    filterReviews(provider_identification, search_number);
}
)




/// calculate average rating of a user 

function averageRating(userId) {

    db.collection("users")
        .doc(userId)
        .get()
        .then(function (doc) {
            var reviews = doc.data().reviews;

            totalrating = 0;

            for (let i = 0; i < reviews.length; i++) {
                totalrating += reviews[i].rating;
            }

            let average_rating = totalrating / reviews.length;

            console.log(average_rating);

            $("#reviewnumber").text('Average Rating: ' + average_rating.toFixed(2) + ' / 5 Stars (' + reviews.length + ' Reviews)');
            $(".starspot").append(StarCreation(average_rating));
            $("#totalreview").text(reviews.length + ' Reviews');

        })
}


/// dynamically create a div representing the statistical breakdown of review percentages 

function createStatBar(){

    var fivestar = $('<div class ="divworld"> <span id="ratingnumber1"> 5 Star </span><div id="ratingBar5" class="ratingBar"></div><span id="desc5"></span></div>');
    var fourstar = $('<div class ="divworld"><span id="ratingnumber2"> 4 Star </span><div id="ratingBar4" class="ratingBar"></div><span id="desc4"></span></div>');
    var threestar = $('<div id="ratingBar3" class="ratingBar"></div><span id="desc3"></span> Three Star Ratings');
    var twostar = $('<div id="ratingBar2" class="ratingBar"></div><span id="desc2"></span> Two Star Ratings');
    var onestar = $('<div id="ratingBar1" class="ratingBar"></div><span id="desc1"></span> One Star Rating');

    $('#statspot').append(fivestar, fourstar, threestar, twostar, onestar);


}

/// store ratings in managable array

function statisticRatings(userID) {
    db.collection("users")
        .doc(userID)
        .get()
        .then(function (doc) {
            var reviews = doc.data().reviews;
            var allratings = [];

            if (reviews.length == []) {
                console.log("This user does not yet have any ratings");
                return

            } else { 

                createStatBar();

            for (let i = 0; i < reviews.length; i++) {

                allratings.push(reviews[i].rating)

            }

            sortedRatings = organizeRatings(allratings);


            //// This segment of code comes from stackoverflow:
            /// https://stackoverflow.com/questions/47871201/calculate-values-for-multiple-rating-bars


            for (let i = 1; i <= 5; i++) {

                var bar = $("#ratingBar" + i);
                var desc = $("#desc" + i);
                var width = sortedRatings[i].length / allratings.length;
                bar.width((width * 100) + '%');
                desc.html(sortedRatings[i].length + ' ratings')
            }


        }}
        )
}

/// organize ratings by score, placing correct rating in corresponding array

function organizeRatings(ratings) {

    var ratingsBreakdown = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
    };

    for (let i = 0; i < ratings.length; i++) {

        if (ratings[i] == 1) {

            ratingsBreakdown[ratings[i]].push(ratings[i]);

        } else if (ratings[i] == 2) {

            ratingsBreakdown[ratings[i]].push(ratings[i]);

        } else if (ratings[i] == 3) {

            ratingsBreakdown[ratings[i]].push(ratings[i]);

        } else if (ratings[i] == 4) {

            ratingsBreakdown[ratings[i]].push(ratings[i]);

        } else if (ratings[i] == 5) {

            ratingsBreakdown[ratings[i]].push(ratings[i]);
        }

    }

    console.log(ratingsBreakdown);
    return ratingsBreakdown;
}





/// create star list aligning with user rating 



function StarCreation(ratingscore) {

    var starsheet = $('<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" id="starchart"></div>')
    var classgrouping = $('<div class="btn-group mr-2" role="group" aria-label="First group"></div>')

    if (ratingscore == 1 || ratingscore < 2) {

        var starrating1 = $('<button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
        <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1024px-Empty_Star.svg.png"> </button>\
        <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1024px-Empty_Star.svg.png"> </button>\
        <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1024px-Empty_Star.svg.png"> </button>\
        <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1024px-Empty_Star.svg.png"> </button>')
        classgrouping.append(starrating1);

    } else if (ratingscore == 2 || ratingscore < 3) {

        var starrating2 = $('<button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png">\
         </button><button type="button" class="btn btn-secondary bg-white" id="1star" style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1024px-Empty_Star.svg.png"> </button> \
         <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1024px-Empty_Star.svg.png"> </button> \
         <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1024px-Empty_Star.svg.png"> </button>')
        classgrouping.append(starrating2);


    } else if (ratingscore == 3 || ratingscore < 4) {

        var starrating3 = $('<button type="button" class="btn btn-secondary bg-white" id="1star" ><img src= "./images/1200px-Gold_Star.svg.png"></button>\
        <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1024px-Empty_Star.svg.png"> </button> \
         <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1024px-Empty_Star.svg.png"> </button>')

        classgrouping.append(starrating3);

    } else if (ratingscore == 4 || ratingscore < 5) {

        var starrating4 = $('<button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"></button>\
        <button type="button" class="btn btn-secondary bg-white" id="1star" style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star" style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1024px-Empty_Star.svg.png"> </button> ')

        classgrouping.append(starrating4);

    } else if (ratingscore == 5 || ratingscore < 6) {

        var starrating5 = $('<button type="button" class="btn btn-secondary bg-white" id="1star" style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"></button>\
        <button type="button" class="btn btn-secondary bg-white" id="1star" style= "border: none" ><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star" style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star" style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"> </button>\
         <button type="button" class="btn btn-secondary bg-white" id="1star"  style= "border: none"><img src= "./images/1200px-Gold_Star.svg.png"> </button>')

        classgrouping.append(starrating5);
    }

    starsheet.append(classgrouping);

    return starsheet;

}

function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    // var n = doc.data().name;
                    // $("#usernamegoeshere").text(n);
                })
        }
    })
}

sayHello();
PopulateProviderProfile(provider_identification);
chatButton(provider_identification);
grabReviews(provider_identification);
averageRating(provider_identification);
statisticRatings(provider_identification);
