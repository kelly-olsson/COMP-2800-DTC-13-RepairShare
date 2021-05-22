// Hannah Test on prodiver-profile.js
const params = new URLSearchParams(window.location.search);
const provider_identification = params.get("id");

function authReview() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var name = doc.data().name;
                    $(".usernamegoeshere").text(name);

                    var reviews = doc.data().reviews;

                    for (let i = 0; i < reviews.length; i++) {

                        let WrittenReviews = reviews[i].review;
                        let rating = reviews[i].rating;

                        var postedreview = $('<div id="reviews"></div>');
                        var cardformat = $('<div class="card"></div>');
                        var cardclass = $('<div class="card-header"></div>');
                        var avatar = $('<div class="avatar" id= "thisagain"> <img id="reviewer-photo" src=https://randomuser.me/api/portraits/men/66.jpg> </div>')
                        var cardbody = $('<div class="card-body"></div>');
                        var blockquote = $('<blockquote class="blockquote mb-0"> </blockquote>');
                        var reviewerstatement = $('<p id="reviewer-statement"></p>');
                        var reviewername = $(`<footer id="reviewer-name" class="blockquote-footer"> <cite title="Source Title"></cite>`);

                        blockquote.append(reviewerstatement);
                        blockquote.append(reviewername);
                        cardbody.append(blockquote);
                        cardformat.append(avatar);
                        cardclass.append(cardbody);
                        cardformat.append(cardclass);
                        postedreview.append(cardformat);


                        postedreview.find('#thisagain').text(rating);
                        postedreview.find('#reviewer-statement').text(WrittenReviews);
                        postedreview.find("#reviewer-name").text(name);
                        $('#reviews').append(postedreview);
                    }

                })
        }
    })
}
// authReview();



function LeaveReview(providerID, review, rating) {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    console.log("leave review")
                    var name = doc.data().name;
                    
                    $(".usernamegoeshere").text(name);
                    console.log(doc.id)

                    var storedreviews = db.collection("users").doc(providerID);
                    storedreviews.update({
                        reviews: firebase.firestore.FieldValue.arrayUnion({ 'review': review, 'rating': rating, 'userID': doc.id })
                    });
                
                    $("#exampleFormControlTextarea1")[0].value = "";
                
                })
        }
    })
}
// sayHello();





function MaxLeaveReview(providerID, review, rating) {
    // console.log("leave review")
    var storedreviews = db.collection("users").doc(providerID);
    // console.log(doc.id)

    storedreviews.update({
        reviews: firebase.firestore.FieldValue.arrayUnion({ 'review': review, 'rating': rating })
    });

    $("#exampleFormControlTextarea1")[0].value = "";

}


document.getElementById("reviewsubmit").addEventListener("click", function () {
    console.log("clicked")
    let text_review = $("#exampleFormControlTextarea1")[0].value;
    let rating = parseInt($("#exampleFormControlSelect1")[0].value);

    console.log(text_review)
    console.log(rating)

    LeaveReview(provider_identification, text_review, rating);
    console.log("line after leave review")
})




