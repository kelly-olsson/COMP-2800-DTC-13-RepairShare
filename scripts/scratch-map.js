// CITATION FOR GEOLOCATION: https://www.aspsnippets.com/Articles/Show-users-current-location-on-Google-Map-using-GeoLocation-API-in-website.aspx

var map;
// https://developers.google.com/maps/documentation/javascript/overview?hl=en_US#maps_map_simple-javascript
function initMap(doc) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (p) {
            var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
            var mapOptions = {
                center: LatLng,
                zoom: 13,
                // mapTypeId: google.maps.MapTypeId.ROADMAP
            };
    // var location = { lat: doc.data().location[0], lng: doc.data().location[1] };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // var marker = new google.maps.Marker({
    //     position: LatLng,
    //     map: map,
    //     // icon: "repair.png"  //WE COULD ADD A CUSTOM MARKER TO THE MIDDLE or PULL THE LOGGED IN USER'S PROFILE PIC TO PUT THERE (LOOK BELOW FOR FAILED ATTEMPT)
    // });
})
}

//an attempt was made
// var map;
// // https://developers.google.com/maps/documentation/javascript/overview?hl=en_US#maps_map_simple-javascript
// function initMap(doc) {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (p) {
//             var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
//             var mapOptions = {
//                 center: LatLng,
//                 zoom: 13,
//             };
//     // var location = { lat: doc.data().location[0], lng: doc.data().location[1] };
//     map = new google.maps.Map(document.getElementById("map"), mapOptions);
//     firebase.auth().onAuthStateChanged(function (somebody) {
//         if (somebody) {
//             db.collection("users")
//                 .doc(somebody.uid)
//                 .get()
//                 .then(function (doc) {
//                     var pic = doc.data().profilePicture;
//                     var marker = new google.maps.Marker({
//                         position: LatLng,
//                         map: map,
//                         icon: pic
//                     });
//                 })
//         }
//     })

// })
// }

    // The marker, positioned at location of the user who has logged in 
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        // icon: "repair.png"
    });


    //this is how you add a window with some content to the map
    const detailWindow = new google.maps.InfoWindow({
        content: "<h3> Name: <span id='window-name'>User</span> </h3> <h3> Rating: <span id='window-rating'></span> </h3> <h3> Description: <span id='window-description'></span> </h3> <h3> Tools: <span id='window-tools'></span> </h3>"
    });

    sayHello();
    readCoordinateFromDatabase();

    //this pops open the content that was set 
    marker.addListener("click", () => {
        detailWindow.open(map, marker);
        mapDetailWindow();

    })
}



// Pull data from firestore to pass to initMap function
db.collection("users").get().then((snapshot) => {
    snapshot.docs.forEach(function (doc) {
        // console.log(doc.data().location);
        initMap(doc);
        // searchForTools(doc);
    })
})


var test;
function getLocationH(toolKeyword) {
    db.collection("users")
        .where("tools." + toolKeyword, '==', true)
        .get()
        .then(function (snapshot) {
            test = []
            snapshot.forEach(function (doc) {
                console.log(doc.data().location);
                // console.log(typeof doc.data().location);
                test.push(doc.data().location)
                console.log(doc.data().location)
                console.log(test)
                // console.log(typeof test[0])
            })
            return test
        })
        .then(addMarkerToMap(test))
}
// getLocationH("hammer");

//a function to add multiple markers to the map based on secified coordinates
function addMarkerToMap(coordinatesArray) {
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
        // console.log("marker is getting called")
    }
};


// function to listen to the submit event and call searchForTools
function addSubmitListener() {
    document.getElementById("submit").addEventListener("click", function () {
        var toolKeyword = document.getElementById("tool-keyword").value;
        getLocationH(toolKeyword);
        // console.log(toolKeyword);
        // searchForTools(toolKeyword)

        // let array = [{ lat: 49.2, lng: -123.1207 }, { lat: 49.252, lng: -123.1207 }, { lat: 49.23, lng: -123.1207 }] //format of the data needed for tool search/show
        // console.log(array)
        // addMarkerToMap(array); //this has to stay in order to populate the map with the markers of the search result submit 
    })
}
addSubmitListener();

// var test;
// function to search for tools with the keyword entered from borrow.html
function searchForTools(toolKeyword) {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid)
            .collection("Tools")
            .where(toolKeyword, "==", true)
            .get() //does not return the snapshot per se, it just gives us a promise object  .then is invoked from the promise that is returned when .get finishes
            .then(function (snapshot) {  //to get a handle on the data that .get returns, we use the snapshot. (this is a callback function) the input to that function is whateve the .get got for me
                snapshot.forEach(function (doc) { // snapshot is a pointer to the data we get from .get()
                    console.log("keyword search works");
                    var toolsObject = doc.data();  // this is an object
                    // console.log(doc.data())
                    test = []
                    for (var key in toolsObject) {
                        // console.log(Object.values(toolsObject));
                        if (toolsObject[key] == true) {
                            getLocation(user.uid);
                            // console.log(key + "-> " + toolsObject[key]);
                            test.push(toolsObject);

                        }
                    }
                    // console.log(test)
                })
                // console.log(test)
                return test;
            })
        // .then(addMarkerToMap(test))
    })
}

function hannahSearch(toolKeyword) {
    db.collection("users").doc(uid)
        // console.log(Object.values(data().tools);
        .collection("tools").doc
        .where(toolKeyword, "==", true)
        .get()
        .then(function (snapshot) {
            snapshot.forEach(function (doc) {
                console.log("hannah search works");
                toolsObject = doc.data().tools; // type Object
                console.log(Object.keys(toolsObject));
                console.log(Object.values(toolsObject));

                // for (var key in toolsObject) {

                // }
            })
        })
}
// hannahSearch("hammer");


// let array = [{ lat: 49.2, lng: -123.1207 }, { lat: 49.252, lng: -123.1207 }, { lat: 49.23, lng: -123.1207 }] //format of the data needed for tool search/show
// Objects within an array



// addMarkerToMap([{ lat: 49.2, lng: -123.1207 }, { lat: 49.252, lng: -123.1207 }, { lat: 49.23, lng: -123.1207 }]);

// { lat: 49.2, lng: -123.1207 }

function getLocation(param) {
    db.ref("users/")
        .get()
        .then(function (doc) {
            console.log(doc.data().location)
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


// Add provider marker, read data from Firestore 
function readCoordinateFromDatabase() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().location;
                    $("#location-goes-here").text(n);
                })
        }
    })
}


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


// initMap();


// Pull data from firestore to put in map detail window
// function mapDetailWindow(doc){

//     let mapWindow = document.getElementById("detail-window");
//     let name = document.createElement(li);

//     name.textContent = doc.data().name;

//     mapWindow.appendChild(name);
// }
// mapDetailWindow(doc);


//Carly's code to read data from the database
// function readQuote(){
//     db.collection("quotes").doc("tuesday")
//     .onSnapshot(function(c){
//         console.log ("current document data: " + c.data());                       //.data() returns data object
//         document.getElementById("quote-goes-here").innerHTML = c.data().quote;    //using vanilla javascript
//         //$('#quote-goes-here').text(c.data().quote);                             //using jquery object dot notation
//         //$("#quote-goes-here").text(c.data()["quote"]);                          //using json object indexing
//     })
// }
// readQuote();


// var database = firebase.database();
// var ref = database.ref("")

// ref.on("value", function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
//         var data = childSnapshot.val()
//         console.log(data)
//     });
// })



//This code enables panning to the devices location. 

// function geoLocation() {
//     var infoWindow = new google.maps.InfoWindow();
//     const locationButton = document.createElement("button");
//     locationButton.textContent = "Pan to Current Location";
//     locationButton.classList.add("custom-map-control-button");
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//     locationButton.addEventListener("click", () => {
//         // Try HTML5 geolocation.
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const pos = {
//                         lat: position.coords.latitude,
//                         lng: position.coords.longitude,
//                     };
//                     infoWindow.setPosition(pos);
//                     infoWindow.setContent("Location found.");
//                     infoWindow.open(map);
//                     map.setCenter(pos);
//                 },
//                 () => {
//                     handleLocationError(true, infoWindow, map.getCenter());
//                 }
//             );
//         } else {
//             // Browser doesn't support Geolocation
//             handleLocationError(false, infoWindow, map.getCenter());
//         }
//     });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(
//         browserHasGeolocation
//             ? "Error: The Geolocation service failed."
//             : "Error: Your browser doesn't support geolocation."
//     );
//     infoWindow.open(map);
// }




// PROBABLY the lat and lng need to be dynamically changed for each user!!!!!!!!!!!!!!!

// db.collection("tools").get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data());

//     })
// })


// var ref = firebase.database().ref("users/tools");
// ref.once("value")
//     .then(function(snapshot) {
//         var key = snapshot.key;
//         var childKey = snapshot.child("name/last").key;
//         console.log(key);
//         console.log(childKey);
//     })



        // .then(function (snapshot) {
        //     console.log("works");
        //     snapshot.forEach(function (doc) {
        //         var name = doc.data().name;
        //         var info = doc.data().info;
        //         var time = doc.data().time;
        //         $("#habit-and-info").append("<h3 id='habit-title'> " + name + "</h3>");
        //         if (time) {
        //         $("#habit-and-info").append("<h6> " + info + ' (' + time + ')' + "</h6>");
        //         }
        //         else {
        //         $("#habit-and-info").append("<h6> " + info + "</h6>");
        //         }
        //     })
        // })


        // function mahanSearch(tool){
//     var me = "tools." + tool
//     console.log(me)
//     var toolRef = db.collection("users")
//     var query = toolRef.where(me, '==', true)
//     query.get()
//     .then()
// }

//     // .get()
//     // .then(function(doc){
//         // console.log(doc)
// //     })
// // }

// mahanSearch("hammer");




// CARLY'S
// function getLocation(param){
//     db.collection("users")
//     .doc(param)
//     .get()
//     .then(function(doc){
//         console.log(doc.data().location)
//     })
// }


// firebase.auth().onAuthStateChanged(function (somebody) {
//         if (somebody) {
//             db.collection("users")
//                 .doc(somebody.uid)
//                 .get()
//                 .then(function (doc) {
//                     var name = doc.data().name;

// { lat: 49.2, lng: -123.1207 }



// .then(addMarkerToMap(test))
// .then(function(result) { // (**)

//     alert(result); // 1
//     return result * 2;

//   }).then(function(result)





// var testObject = searchForTools("Hammer");
// console.log("test return: "+testObject);


/*

function add(a, b) {
    return a+b;
}
var sum = add(1,2);
console.log(sum)


*/



//MAHAN'S PLAYING AROUND WITH THE INFOWINDOW BELOW:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// [[[long:, lat:] , UID], [[long:, lat:] , UID]]
function addInfoWindow(megaArray){
    for (let i = 0; i < megaArray.length; i++) {
        var detailWindow = new google.maps.InfoWindow({
            content: "<h3> Name: <span id='window-name'>User</span> </h3> <h3> Rating: <span id='window-rating'></span> </h3> <h3> Description: <span id='window-description'></span> </h3> <h3> Tools: <span id='window-tools'></span> </h3>"
        });
            var marker = megaArray[i][0]
            var userID = megaArray[i][1]
            //this pops open the content that was set 
            marker.addListener("click", () => {
                detailWindow.open(map, marker);
                mapDetailWindow(userID);
        
            })
}
}

function mapDetailWindow(userID) {
    db.collection("users")
        .doc(userID)
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

// [
//  [[long:, lat:] , UID], 
//  [[long:, lat:] , UID]
// ]

function getLocationH(toolKeyword) {
    db.collection("users")
        .where("tools." + toolKeyword, '==', true)
        .get()
        .then(function (snapshot) {
            var megaArray = []   // [[[long:, lat:] , UID], [[long:, lat:] , UID]]
            snapshot.forEach(function (doc) {
                var tempArray = []
                console.log(doc.data().location);
                // console.log(typeof doc.data().location);
                tempArray.push(doc.data().location)
                tempArray.push(doc.data().uid)
                console.log(doc.data().location)
                console.log(locationArray)
                // console.log(typeof test[0])
                megaArray.push(tempArray)
            })
            return megaArray
        })
        .then(addMarkerToMap(megaArray))
}

//a function to add multiple markers to the map based on secified coordinates
function addMarkerToMap(megaArray) {
    var markers = []
    for (let i = 0; i < megaArray.length; i++) {
        let newLocation = new Map()
        newLocation['lat'] = megaArray[i][0][0]
        newLocation['lng'] = megaArray[i][0][1]
        var location = newLocation;
        console.log(location)
        var newmarker = new google.maps.Marker({
            position: location,
            zoom: 11,
            map: map,
        });
        markers.push[newmarker]
        // console.log(markers)
        addInfoWindow(megaArray)

        
    }
};








sayHello();
addSubmitListener();
readCoordinateFromDatabase();

///CLOSURE 

var locations = [
    [33.890542, 151.274856,],
    ['loan 2', 33.923036, 151.259052, 'address 2'],
    ['loan 3', 34.028249, 151.157507, 'address 3'],
    ['loan 4', 33.80010128657071, 151.28747820854187, 'address 4'],
    ['loan 5', 33.950198, 151.259302, 'address 5']
    ];
  
    function initialize() {
  
      var myOptions = {
        center: new google.maps.LatLng(33.890542, 151.274856),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
  
      };
      var map = new google.maps.Map(document.getElementById("default"),
          myOptions);
  
      setMarkers(map,locations)
  
    }
  
  
  
    function setMarkers(map,locations){
  
        var marker, i
  
  for (i = 0; i < locations.length; i++)
   {  
  
   var lat = locations[i][1]
   var long = locations[i][2]
  
   latlngset = new google.maps.LatLng(lat, long);
  
    var marker = new google.maps.Marker({  
            map: map, 
            position: latlngset  
          });
  
  
          var content = "Loan Number: " + loan +  '</h3>' + "Address: " + add     
  
    var infowindow = new google.maps.InfoWindow()
  
  google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
          return function() {
             infowindow.setContent(content);
             infowindow.open(map,marker);
          };
      })(marker,content,infowindow)); 
  
    }
    }

    ///ANOTHER ONE


    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'mouseover', (function(marker) {
               return function() {
                   var content = address;
                   infowindow.setContent(content);
                   infowindow.open(map, marker);
               }
             })(marker));
  