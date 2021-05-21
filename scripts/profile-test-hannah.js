// Hannah Test on prodiver-profile.js


function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var name = doc.data().name;
                    // $(".usernamegoeshere").text(name);

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
sayHello();