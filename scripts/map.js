// CITATION FOR GEOLOCATION: https://www.aspsnippets.com/Articles/Show-users-current-location-on-Google-Map-using-GeoLocation-API-in-website.aspx

var megaArray;
var newMEGAArray;
var map;
var markersList = []
// https://developers.google.com/maps/documentation/javascript/overview?hl=en_US#maps_map_simple-javascript

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


/// function averages rating of a user 

function AverageRating(reviews){

    let totalrating = 0; 

    for(let i=0; i < reviews.length; i){

        totalrating += reviews[i].rating; 
    }

    let average_rating = totalrating / reviews.length;
    return average_rating;
}


// Being called by an event listener
function mapDetailWindow(userID, i) {
    db.collection("users")
        .doc(userID)
        .get()
        .then(function (doc) {
            let name = doc.data().name;
            let description = doc.data().description;
            let picture = doc.data().profilePicture;
            let reviews = doc.data().reviews;

            let overallRating = AverageRating(reviews);
            let stars = StarCreation(overallRating);


            $('#window-name_' + i + '').attr("href", "provider-profile.html?id=" + userID).text(name);
            $('#window-rating_' + i + '').append(overallRating);
            $('#window-description_' + i + '').text(description);
            $('.profile-pic_' + i + '').attr("src", picture);

        }).catch(function(error){
            console.log(error)
        })
}


function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    // var n = doc.data().name;
                    // $("#name-goes-here").text(n);
                })
        }
    })
}


function getLocationH(toolKeyword) {
    db.collection("users")
        .where("tools." + toolKeyword, '==', true)
        .get()
        .then(function (snapshot) {
            megaArray = []  
            snapshot.forEach(function (doc) {
                let tempArray = []
                tempArray.push(doc.data().location)
                tempArray.push(doc.id)
                megaArray.push(tempArray)
            })

            setMarkers(map, megaArray)})
            .catch(function(error){
                console.log(error)
            })
        
}

function zoomBasedonMarkers(markers){
    var bounds = new google.maps.LatLngBounds();
    for(i=0;i<markers.length;i++) {
        bounds.extend(markers[i].getPosition());
}
map.setCenter(bounds.getCenter());

}

function setMarkers(map, megaArray){
    for (let i = 0; i < megaArray.length; i++){  

        let lat = megaArray[i][0][0]
        let lng = megaArray[i][0][1]
        let userID = megaArray[i][1]
        let location = new google.maps.LatLng(lat, lng);
        let marker = new google.maps.Marker({  
            map: map, 
            position: location  
        });
        markersList.push(marker);
    let content = "<h6> Name: <a id='window-name_" + i + "'></a></h6> <h6> Rating: <span id='window-rating_" + i + "'></span> </h6> <h6> Description: <span id='window-description_" + i + "'></span> </h6> <div><img src='' class='profile-pic_" +i + "' alt='Profile Picture'></div>"
    let infowindow = new google.maps.InfoWindow()

    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
        return function() {
            infowindow.close();
            mapDetailWindow(userID, i);  
            infowindow.setContent(content);
            infowindow.open(map,marker); 
        };
        
    })(marker,content,infowindow)); 
    }zoomBasedonMarkers(markersList); 
}

// Read user info from firebase and greet user based on user's name.
// function sayHello() {
//     firebase.auth().onAuthStateChanged(function (somebody) {
//         if (somebody) {
//             db.collection("users")
//                 .doc(somebody.uid)
//                 .get()
//                 .then(function (doc) {
//                     var n = doc.data().name;
//                     $("#name-goes-here").text(n);
//                 })
//         }
//     })
// }

function removeMarkers(markersList){
    for(let j=0; j<markersList.length; j++){
        markersList[j].setMap(null);
    }
    markersList.length = 0
}

let submitButton = document.getElementById("submit");
function addSubmitListener() {
    let toolKeyword = document.getElementById("tool-keyword").value;
    removeMarkers(markersList);
    getLocationH(toolKeyword);
}

submitButton.onclick = addSubmitListener;
initMap();
sayHello();

// function setMarkers(map, megaArray){
//     for (let i = 0; i < megaArray.length; i++){  

//         let lat = megaArray[i][0][0]
//         let lng = megaArray[i][0][1]
//         let userID = megaArray[i][1]
//         let location = new google.maps.LatLng(lat, lng);
//         let marker = new google.maps.Marker({  
//             map: map, 
//             position: location  
//         });
//         markersList.push(marker);
//     let content = "<h6> Name: <span id='window-name_" + i + "'></span></h6> <h6> Rating: <span id='window-rating_" + i + "'></span> </h6> <h6> Description: <span id='window-description_" + i + "'></span> </h6> <div><img src='' class='profile-pic_" +i + "' alt='Profile Picture'></div>"
//     mapDetailWindow(userID, i);  
//     let infowindow = new google.maps.InfoWindow({
//         content: content
//     })
//     // infowindow.setContent(content);
//     // mapDetailWindow(userID, i);  


//     google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
//         return function() {
//             infowindow.close();
//             infowindow.open(map,marker);
//             mapDetailWindow(userID, i);  

            
//         };
        
//     })(marker,content,infowindow)); 
//     }; 
// }


// [[GOOLEOBJECTMARKER , UID], [GOOLEOBJECTMARKER , UID]]
// function addInfoWindow(newMEGAArray){
//     for (let i = 0; i < megaArray.length; i++) {
//         var detailWindow = new google.maps.InfoWindow({
//             content: "<h3> Name: <span id='window-name'>User</span> </h3> <h3> Rating: <span id='window-rating'></span> </h3> <h3> Description: <span id='window-description'></span> </h3> <h3> Tools: <span id='window-tools'></span> </h3>"
//         });
//             var marker = newMEGAArray[i][0]
//             var userID = newMEGAArray[i][1]
//             //this pops open the content that was set 
//             marker.addListener("click", () => {
//                 detailWindow.open(map, marker);
//                 console.log("Issue is map detail window");
//                 console.log(userID);
//                 mapDetailWindow(userID);
        
//             })
// }
// }




// let content = "<h3> Name: <span id='window-name_" + i + "'></span> </h3><h3> Rating: <span id='window-rating_" + i + "'></span> </h3> <h3> Description: <span id='window-description_" + i + "'></span> </h3> <h3> Tools: <span id='window-tools'></span> </h3>"
