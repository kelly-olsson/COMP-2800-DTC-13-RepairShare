import { db } from './firebase_api.js';

var toolProviders;
var map;
var markersList = []

/**
 * I adapted this code from https://developers.google.com/maps/documentation/javascript/overview
 * 
 * It intializes a google map.
 */
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (p) {
            let LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
            let mapOptions = {
                center: LatLng,
                zoom: 13,
            };
            sayHello();
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
        })
    }

}

// window.initMap = initMap; // Make initMap accessible globally

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
 * Dynamically poplulates the infoWindow of each marker on the google map
 * with the description, picture, and rating of the person.
 * 
 * @param {*} userID The firebase uid of the person whose marker is clicked on 
 * @param {Number} i A number used for looping through all the users that match the search 
 * parameter of the user and whose info needs to be populated in the infoWindow
 */
function mapDetailWindow(userID, i) {
    db.collection("users")
        .doc(userID)
        .get()
        .then(function (doc) {
            let name = doc.data().name;
            let description = doc.data().description;
            let picture = doc.data().profilePicture;
            let reviews = doc.data().reviews;
            let average_rating = calculateRating(reviews)
            let stars = StarCreation(average_rating);

            $('#window-name_' + i + '').attr("href", "provider-profile.html?id=" + userID).text(name);
            $('#window-rating_' + i + '').append(stars);
            $('#window-description_' + i + '').text(description);
            $('.profile-pic_' + i + '').attr("src", picture);

        }).catch(function (error) {
            console.log(error)
        })
}

/**
 * Calculates the average rating of the user based on all the ratings
 * they have received from other users
 * 
 * 
 * @param {Array} reviews An array of maps of the users ratings and reviews
 * @returns A number representing the average rating of the user
 */
function calculateRating(reviews) {

    let totalrating = 0;
    let average_rating = 0;
    if (typeof reviews != "undefined") {

    for (let i = 0; i < reviews.length; i++) {
        totalrating += reviews[i].rating;
    }
    average_rating = totalrating / reviews.length;
    }
    return average_rating
}


/**
 * It authenticates the user via firebase.
 * 
 */
function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                })
        }
    })
}


/**
 * Grabs the location data of the user from the firebase.
 * 
 * @param {string} toolKeyword The tool (e.g., "hammer") that the user is searching for
 */
function getLocation(toolKeyword) {
    db.collection("users")
        .where("tools." + toolKeyword.toLowerCase(), '==', true)
        .get()
        .then(function (snapshot) {
            toolProviders = []
            snapshot.forEach(function (doc) {
                let singleProviderInfo = []
                singleProviderInfo.push(doc.data().location)
                singleProviderInfo.push(doc.id)
                toolProviders.push(singleProviderInfo)
            })

            setMarkers(map, toolProviders)
        })
        .catch(function (error) {
            console.log(error)
        })

}

/**
 * Based on the position of each marker's location on the map, 
 * readjusts the zoom and location of the map to their center.
 * 
 * @param {Array} markers An array of google map marker objects
 */
function zoomBasedonMarkers(markers) {
    var bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }
    map.setCenter(bounds.getCenter());

}

/**
 * Adapted from https://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
 * 
 * For each user that fits the search criteria, creates a marker, adds it to the google map
 * and attaches an infoWindow that is populated with the user's information that will pop up 
 * when it is clicked on.
 * 
 * @param {*} map A google map object
 * @param {*} toolProviders An array of arrays each containing a single user's location and firebase uid
 */
function setMarkers(map, toolProviders) {
    for (let i = 0; i < toolProviders.length; i++) {

        let lat = toolProviders[i][0][0]
        let lng = toolProviders[i][0][1]
        let userID = toolProviders[i][1]
        let location = new google.maps.LatLng(lat, lng);
        let marker = new google.maps.Marker({
            map: map,
            position: location
        });
        markersList.push(marker);
        let content = "<h6> Name: <a id='window-name_" + i + "'></a></h6> <h6> Rating: <span id='window-rating_" + i + "'></span> </h6> <h6> Description: <span id='window-description_" + i + "'></span> </h6> <div><img src='' class='profile-pic_" + i + "' alt='Profile Picture'></div>"
        let infowindow = new google.maps.InfoWindow()

        google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
            return function () {
                infowindow.close();
                mapDetailWindow(userID, i);
                infowindow.setContent(content);
                infowindow.open(map, marker);
            };

        })(marker, content, infowindow));
    } zoomBasedonMarkers(markersList);
}

/**
 * Removes all the markers that are on the map.
 * 
 * @param {Array} markersList An array containing google map markers
 */
function removeMarkers(markersList) {
    for (let j = 0; j < markersList.length; j++) {
        markersList[j].setMap(null);
    }
    markersList.length = 0
}


let submitButton = document.getElementById("submit");

/**
 * Adds an event listener to the search bar of the map page. Once
 * the user searches for a tool, first, all the previous markers (if there are any)
 * are removed from the map, and then the search parameter is passed on to the getLocation function.
 */
function addSubmitListener() {
    let toolKeyword = document.getElementById("tool-keyword").value;
    removeMarkers(markersList);
    getLocation(toolKeyword);
}


// map.addListener(marker, 'click', function() {
//     if(!marker.open){
//         infoWindow.open(map,marker);
//         marker.open = true;
//         console.log("MAHANANANANAN")
//     }
//     else{
//         infoWindow.close();
//         marker.open = false;
//     }
//     map.addListener(map, 'click', function() {
//         infoWindow.close();
//         marker.open = false;
//     });
// });

submitButton.onclick = addSubmitListener;
initMap();
sayHello();
