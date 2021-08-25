/**
 * Populate user profile page with data (ie. name, description, skills, tools and picture) pulled from corresponding firebase collection. 
 * 
 */

function populateUser() {
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
                    var dateJoined = new Date(firebase.auth().currentUser.metadata.creationTime);
                    $("#usernamegoeshere").text(name.toUpperCase());
                    // $("#dateJoined").text(dateJoined);
                    $("#usercanhelp").text(name.toUpperCase());
                    $("#about").text(description);
                    $("#profile-photo").attr("src", picture);

                    //this function, hides the "buffering" div after 1sec to ensure 
                    //that all the doms have been properly rendered based on the fetched data first
                    setTimeout(() => {
                        $("#loading").hide();
                    }, 1000);
                    

                    if (typeof skills != "undefined") {
                        for (var index = 0; index < skills.length; index++) {
                            let skill = skills[index];
    
                            $(document).ready(function () {
                                var $skillset = '<li>' + skill + '</li>';
                                $("#skillsinfo").append($skillset)
                            })
                        }
                    }


                    if (typeof tools != "undefined") {
                    Object.keys(tools).forEach(key => {
                        if (tools[key] == true) {
                            const toolitem = key;

                            $(document).ready(function () {
                                const $toolkit = '<li>' + toolitem + '</li>'

                                $("#toolz").append($toolkit);

                            })
                        } 
                    });}

                }).catch(function (error) {
                    console.log(error)
                    console.log("got error")
                    //set the loader to falser if the .then fails
                })
        }
    })
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
 * Render a div with a set of stars (between 1-5), as determined by ratingscore. 
 * 
 * @param {number} ratingscore a number between 1-5 that represents a user's rating
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
 * Construct and populate a div with all user related review information, such as a written statement, 
 * rating, profile picture and name, pulled from firebase.
 * 
 */

function grabReviews() {

    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var reviews = doc.data().reviews;
                    if (typeof reviews !== 'undefined'){
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
                    }} else {
                        console.log("There are no reviews")
                    }
                }).catch(function (error) {
                    console.log(error)
                })
        }
    })
}


/**
 * Filter and render user reviews as determined by numerical value of desired rating. 
 * 
 * @param {stirng} providerID  A string representing a corresponding firebase collection identification number (or a user)
 * @param {number} desiredRating An integer between 1-5 as entered by user 
 */


function filterReviews(desiredRating) {

    db.collection("users")
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var reviews = doc.data().reviews;
                    if (typeof reviews !== 'undefined'){
                    for (let i = 0; i < reviews.length; i++) {

                        if (reviews[i].rating == desiredRating) {

                            let WrittenReviews = reviews[i].review;
                            let rating = reviews[i].rating;
                            let name = reviews[i].name;
                            let profilePicture = reviews[i].profilePicture;

                            var postedreview = $('<div id="reviews"></div>');
                            var cardformat = $('<div class="card"></div>');
                            var cardclass = $('<div class="card-header"></div>');
                            var avatar = $('<div class="avatar"> <img id="reviewer-photo" src=https://randomuser.me/api/portraits/men/66.jpg> <div id= "thisagain"></div></div>');                            var cardbody = $('<div class="card-body"></div>');
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
                    }} else {
                        console.log("There are no reviews to filter.")
                    }
                }).catch(function (error) {
                    console.log(error)
                })
        }
    })
}


/**
 * Click event listener for button with Id of 'deleteaccount' which deletes all of a logged in user's information from firebase. 
 */

document.getElementById("deleteaccount").onclick = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var confirmDelete = confirm("Are you sure you want to delete your profile?")
            if (confirmDelete == true) {
                db.collection("users").doc(user.uid)
                    .delete()
                    .then(() => {
                        alert("You have clicked on the BUTTON OF DEATH! All your information is GONE!")
                    })
                    .catch((error) => {
                        console.log("Error executing the button of death: ", error)
                    })
            }
            else {
                alert("Your user information will be safe.")
            }
        }
        else {
            alert("You're not logged in! Please log in to delete your profile.")
        }
    })
}

/**
 * Click event listener that grabs value from filter drop down window, accepts a value between 1-5. 
 */

document.getElementById("filterbutton").addEventListener("click", function () {
    let search_number = parseInt($("#searchRating")[0].value);
    $("#reviews").empty();
    filterReviews(search_number);
}
)


/**
 * Click event listener for button with Id of "enter-info", which redirects a user to form.html. 
 */

document.getElementById("enter-info").onclick = function () {
    location.href = "form.html";
};

populateUser();
grabReviews();
sayHello();
