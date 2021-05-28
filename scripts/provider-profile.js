/* Pull userID from URL */
const params = new URLSearchParams(window.location.search);

let provider_identification = params.get("id");


/**
 * Populate the provider profile page with information (ie. name, description, skills, tools and picture) pulled from correct firebase collection. 
 * 
 * @param {string} userID A string representing a corresponding firebase collection identification (or user)
 */

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

        }).catch(function (error) {
            console.log(error)
        })
}

/**
 * Create dynamically an anchor tag (with direct reference to a firebase collection ID) to allow a user to access RepairShare chat feature.
 * 
 * @param {string} provider_identification A string representing a corresponding firebase collection identification (or user)
 */
function chatButton(provider_identification) {
    $('#chatboxbutton').attr("href", "chat.html?id=" + provider_identification);
}


/**
 * Add review information such as a written statement, rating, profile picture and name, to an array of maps stored in firebase. 
 * 
 * @param {string} providerID A string representing a corresponding firebase collection identification (or user)
 * @param {string} review A string grabbed from user input representing a written review.
 * @param {number} rating A number grabbed from user input representing a rating between 1-5.
 */
function LeaveReview(providerID, review, rating) {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {

                    var name = doc.data().name;
                    var profilePicture = doc.data().profilePicture;

                    var storedreviews = db.collection("users").doc(providerID);
                    storedreviews.update({
                        reviews: firebase.firestore.FieldValue.arrayUnion({'review': review, 'rating': rating, 'userID': doc.id, "name": name, "profilePicture": profilePicture})
                    });
                
                    $("#exampleFormControlTextarea1")[0].value = "";

                }).catch(function (error) {
                    console.log(error)
                })
        }
    })
}


/**
 * Construct and populate a div with all user related review information, such as a written statement, 
 * rating, profile picture and name, pulled from firebase.
 * 
 * @param {string} providerID A string representing a corresponding firebase collection identification (or a user)
 */
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
        }).catch(function (error) {
            console.log(error)
        })
}


/**
 * Filter and render user reviews as determined by numerical value of desired rating. 
 * 
 * @param {stirng} providerID  A string representing a corresponding firebase collection identification (or a user)
 * @param {number} desiredRating An integer between 1-5 as entered by user 
 */
function filterReviews(providerID, desiredRating) {

    db.collection("users")
        .doc(providerID)
        .get()
        .then(function (doc) {
            var reviews = doc.data().reviews;

            for (let i = 0; i < reviews.length; i++) {

                if (reviews[i].rating == desiredRating){ 

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
        }).catch(function (error) {
            console.log(error)
        })
}


/**
 * Calculate average of a selected user's ratings, as stored in a map within the review array stored in firebase. 
 * 
 * @param {String} userId A string representing a corresponding firebase collection identification (or a user)
 */

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

            $("#reviewnumber").text('Average Rating: ' + average_rating.toFixed(2) + ' / 5 Stars (' + reviews.length + ' Reviews)');
            $(".starspot").append(StarCreation(average_rating));
            $("#totalreview").text(reviews.length + ' Reviews');

        }).catch(function (error) {
            console.log(error)
        })
}


/**
 * Create divs which provide the framework for a bar graph representation of rating scores.
 */

function createStatBar() {

    var fivestar = $('<div class ="divworld"> <span id="ratingnumber5"> 5 Star </span><div id="ratingBar5" class="ratingBar"></div><span id="desc5"></span></div>');
    var fourstar = $('<div class ="divworld"><span id="ratingnumber4"> 4 Star </span><div id="ratingBar4" class="ratingBar"></div><span id="desc4"></span></div>');
    var threestar = $('<div class ="divworld"><span id="ratingnumber3"> 3 Star </span><div id="ratingBar3" class="ratingBar"></div><span id="desc3"></span></div>');
    var twostar = $('<div class ="divworld"><span id="ratingnumber2"> 2 Star </span><div id="ratingBar2" class="ratingBar"></div><span id="desc2"></span></div>');
    var onestar = $('<div class ="divworld"><span id="ratingnumber1"> 1 Star </span><div id="ratingBar1" class="ratingBar"></div><span id="desc1"></span></div>');

    $('#statspot').append(fivestar, fourstar, threestar, twostar, onestar);


}


/**
 * Iterate through an array of numbers and redistribute these values into a map with key's between 1-5. 
 * Numbers will be organized by thier value, and placed alongside the correct corresponding key. 
 * 
 * @param {Array} ratings An array of numbers representing a single user's ratings
 * @returns A map with key's between 1-5, populated by values equal to that of the key. 
 */

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
    return ratingsBreakdown;
}


/**
 * Render a set of bars representing a percentage breakdown of a user's ratings, as determined by the 
 * rating value stored in Firebase. 
 * 
 * @param {String} userID A string representing a corresponding firebase collection identification (or a user)
 */
function statisticRatings(userID) {
    db.collection("users")
        .doc(userID)
        .get()
        .then(function (doc) {
            var reviews = doc.data().reviews;
            var allratings = [];

            /**
             * This segment of code was adapted from code found here: 
             * https://stackoverflow.com/questions/47871201/calculate-values-for-multiple-rating-bars
             */


            if (reviews.length == []) {
                return

            } else {

                createStatBar();

                for (let i = 0; i < reviews.length; i++) {

                    allratings.push(reviews[i].rating)

                }

                sortedRatings = organizeRatings(allratings);


                for (let i = 1; i <= 5; i++) {

                    var bar = $("#ratingBar" + i);
                    var desc = $("#desc" + i);
                    var width = sortedRatings[i].length / allratings.length;
                    bar.width((width * 100) + '%');
                    desc.html(sortedRatings[i].length + ' ratings')
                }

            /**
             * End of reference:
             * https://stackoverflow.com/questions/47871201/calculate-values-for-multiple-rating-bars
             */

            }
        }.catch(function (error) {
            console.log(error)
        })
        )
}


/**
 * Render a div with a set of stars (between 1-5), as determined by ratingscore. 
 * 
 * @param {number} ratingscore 
 * @returns A div with a number of stars determined by the passed value of ratingscore 
 */

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


/**
 * Authentic current logged in user. 
 */
function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    $("#usernamegoeshere").text(n);
                })
        }
    })
}


/**
 * Click event listener that grabs values from text area with an id of 'exampleFormControlTextarea1' and drop down window with 
 * an id of 'exampleFormControlSelect1'*/

 document.getElementById("reviewsubmit").addEventListener("click", function () {
    let text_review = $("#exampleFormControlTextarea1")[0].value;
    let rating = parseInt($("#exampleFormControlSelect1")[0].value);
    LeaveReview(provider_identification, text_review, rating);
})


/**
 * Click event listener that grabs value from filter drop down window, accepts a value between 1-5. 
 */
document.getElementById("filterbutton").addEventListener("click", function () {
    let search_number = parseInt($("#searchRating")[0].value);
    $("#reviews").empty();
    filterReviews(provider_identification, search_number);
}
)

PopulateProviderProfile(provider_identification);
chatButton(provider_identification);
grabReviews(provider_identification);
averageRating(provider_identification);
sayHello();