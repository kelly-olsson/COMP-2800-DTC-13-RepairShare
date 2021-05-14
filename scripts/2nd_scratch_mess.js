// CITATION FOR GEOLOCATION: https://www.aspsnippets.com/Articles/Show-users-current-location-on-Google-Map-using-GeoLocation-API-in-website.aspx
var locationArray;

var map;
// https://developers.google.com/maps/documentation/javascript/overview?hl=en_US#maps_map_simple-javascript
function initMap(doc) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (p) {
            var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
            var mapOptions = {
                center: LatLng,
                zoom: 13,
            };
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
        })
    }


    // // The marker, positioned at location of the user who has logged in 
    // const marker = new google.maps.Marker({
    //     position: location,
    //     map: map,
    //     // icon: "repair.png"
    // });


    //this is how you add a window with some content to the map
    // const detailWindow = new google.maps.InfoWindow({
    //     content: "<h3> Name: <span id='window-name'>User</span> </h3> <h3> Rating: <span id='window-rating'></span> </h3> <h3> Description: <span id='window-description'></span> </h3> <h3> Tools: <span id='window-tools'></span> </h3>"
    // });



    // //this pops open the content that was set 
    // marker.addListener("click", () => {
    //     detailWindow.open(map, marker);
    //     mapDetailWindow();

    // })
}





// Pull data from firestore to pass to initMap function
db.collection("users").get().then((snapshot) => {
    snapshot.docs.forEach(function (doc) {
        // console.log(doc.data().location);
        initMap(doc);
        // searchForTools(doc);
    })
})

// SOURCES: https://stackoverflow.com/questions/11106671/google-maps-api-multiple-markers-with-infowindows
// http://jsfiddle.net/2crQ7/

// var content = "Loan Number: " + loan +  '</h3>' + "Address: " + add     

// var infowindow = new google.maps.InfoWindow()

// google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
//       return function() {
//          infowindow.setContent(content);
//          infowindow.open(map,marker);
//       };
//   })(marker,content,infowindow)); 

  // END OF THEFT
  
  




// function to listen to the submit event and call searchForTools
function addSubmitListener() {
    document.getElementById("submit").addEventListener("click", function () {
        var toolKeyword = document.getElementById("tool-keyword").value;
        getLocationH(toolKeyword);
    })
}

// function to search for tools with the keyword entered from borrow.html
// function searchForTools(toolKeyword) {
//     firebase.auth().onAuthStateChanged(function (user) {
//         db.collection("users")
//             .doc(user.uid)
//             .collection("Tools")
//             .where(toolKeyword, "==", true)
//             .get()
//             .then(function (snapshot) {
//                 snapshot.forEach(function (doc) {
//                     console.log("keyword search works");
//                     var toolsObject = doc.data();
//                     test = []
//                     for (var key in toolsObject) {
//                         if (toolsObject[key] == true) {
//                             getLocation(user.uid);
//                             test.push(toolsObject);
//                         }
//                     }
//                 })
//                 return test;
//             })
//     })
// }



function getLocation(param) {
    db.ref("users/")
        .get()
        .then(function (doc) {
            console.log(doc.data().location)
        })
}





// Add provider marker, read data from Firestore 
// function readCoordinateFromDatabase() {
//     firebase.auth().onAuthStateChanged(function (somebody) {
//         if (somebody) {
//             db.collection("users")
//                 .doc(somebody.uid)
//                 .get()
//                 .then(function (doc) {
//                     var n = doc.data().location;
//                     $("#location-goes-here").text(n);
//                 })
//         }
//     })
// }


// Read user info from firebase and greet user based on user's name.
function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    $("#name-goes-here").text(n);
                })
        }
    })
}

// function hannahSearch(toolKeyword) {
//     db.collection("users").doc(uid)
//         .collection("tools").doc
//         .where(toolKeyword, "==", true)
//         .get()
//         .then(function (snapshot) {
//             snapshot.forEach(function (doc) {
//                 console.log("hannah search works");
//                 toolsObject = doc.data().tools;
//                 console.log(Object.keys(toolsObject));
//                 console.log(Object.values(toolsObject));
//             })
//         })
// }


function addInfoWindow(marker){
    var detailWindow = new google.maps.InfoWindow({
        content: "<h3> Name: <span id='window-name'>User</span> </h3> <h3> Rating: <span id='window-rating'></span> </h3> <h3> Description: <span id='window-description'></span> </h3> <h3> Tools: <span id='window-tools'></span> </h3>"
    });
        //this pops open the content that was set 
        marker.addListener("click", () => {
            detailWindow.open(map, marker);
            mapDetailWindow();
    
        })
}


function mapDetailWindow() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var name = doc.data().name;
                    var rating = doc.data().rating;
                    var description = doc.data().description;
                    $("#window-name").text(name);
                    $("#window-rating").text(rating);
                    $("#window-description").text(description);
                })
        }
    })
}

function getLocationH(toolKeyword) {
    db.collection("users")
        .where("tools." + toolKeyword, '==', true)
        .get()
        .then(function (snapshot) {
            locationArray = []
            snapshot.forEach(function (doc) {
                console.log(doc.data().location);
                // console.log(typeof doc.data().location);
                locationArray.push(doc.data().location)
                console.log(doc.data().location)
                console.log(locationArray)
                // console.log(typeof test[0])
            })
            return locationArray
        })
        .then(addMarkerToMap(locationArray))
        // .then()
}

//a function to add multiple markers to the map based on secified coordinates
function addMarkerToMap(coordinatesArray) {
    var markers = []
    for (let i = 0; i < coordinatesArray.length; i++) {
        let newLocation = new Map()
        newLocation['lat'] = coordinatesArray[i][0]
        newLocation['lng'] = coordinatesArray[i][1]
        var location = newLocation;
        console.log(location)
        var newmarker = new google.maps.Marker({
            position: location,
            zoom: 11,
            map: map,
        });
        markers.push[newmarker]
        // console.log(markers)
        addInfoWindow(newmarker)
    }
};








sayHello();
addSubmitListener();
readCoordinateFromDatabase();