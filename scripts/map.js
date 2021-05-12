
// Pull data from firestore to pass to initMap function
db.collection("users").get().then((snapshot) => {
    snapshot.docs.forEach(function (doc) {
        // console.log(doc.data().location);
        initMap(doc);
        // searchForTools(doc);
    })
})


// function to listen to the submit event and call searchForTools
function addSubmitListener() {
    document.getElementById("submit").addEventListener("click", function () {
        var toolKeyword = document.getElementById("tool-keyword").value;
        console.log(toolKeyword);
        // searchForTools(toolKeyword)

        let array = [{lat: 49.2, lng: -123.1207}, {lat: 49.252, lng: -123.1207}, {lat: 49.23, lng: -123.1207}] //format of the data needed for tool search/show
        addMarkerToMap(array); //this has to stay in order to populate the map with the markers of the search result submit 
    })
}
addSubmitListener();


// function to search for tools with the keyword entered from borrow.html
function searchForTools(toolKeyword) {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid)
            .collection("Tools")
            .where(toolKeyword, "==", true)
            .get()
            .then(function (snapshot) {
                snapshot.forEach(function (doc) {
                    console.log("keyword search works");
                    var toolsObject = doc.data();  // this is an object
                    for (var key in toolsObject) {
                        // console.log(Object.values(toolsObject));
                        if (toolsObject[key] == true) {
                            // console.log(key + "-> " + toolsObject[key]);
                        }

                        // then(function (toolsObject) {
                        //     return toolsObject;

                        // })
                    }
                return toolsObject;
                    
                })
                
            })
            return toolsObject;
    })
}
var testObject = searchForTools("Hammer");
console.log("testObject: " + testObject);


/*
function add(a, b) {
    return a+b;
}
var sum = add(1,2);
console.log(sum)
*/


var map;
// https://developers.google.com/maps/documentation/javascript/overview?hl=en_US#maps_map_simple-javascript
function initMap(doc) {

    var location = { lat: doc.data().location[0], lng: doc.data().location[1] };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: location
    });

    // // The marker, positioned at location of the user who has logged in 
    // const marker = new google.maps.Marker({
    //     position: location,
    //     map: map,
    //     // icon: "repair.png"
    // });
    

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


//a function to add multiple markers to the 
function addMarkerToMap(coordinatesArray){
    for (let i=0; i<coordinatesArray.length; i++){
        var location = coordinatesArray[i];
        var newmarker = new google.maps.Marker({
            position: location,
            zoom: 11,
            map: map,
        });
    }
};


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



//  //This code enables panning to the devices location. 
//  var infoWindow = new google.maps.InfoWindow();
//  const locationButton = document.createElement("button");
//  locationButton.textContent = "Pan to Current Location";
//  locationButton.classList.add("custom-map-control-button");
//  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//  locationButton.addEventListener("click", () => {
//      // Try HTML5 geolocation.
//      if (navigator.geolocation) {
//          navigator.geolocation.getCurrentPosition(
//              (position) => {
//                  const pos = {
//                      lat: position.coords.latitude,
//                      lng: position.coords.longitude,
//                  };
//                  infoWindow.setPosition(pos);
//                  infoWindow.setContent("Location found.");
//                  infoWindow.open(map);
//                  map.setCenter(pos);
//              },
//              () => {
//                  handleLocationError(true, infoWindow, map.getCenter());
//              }
//          );
//      } else {
//          // Browser doesn't support Geolocation
//          handleLocationError(false, infoWindow, map.getCenter());
//      }
//  });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//  infoWindow.setPosition(pos);
//  infoWindow.setContent(
//      browserHasGeolocation
//          ? "Error: The Geolocation service failed."
//          : "Error: Your browser doesn't support geolocation."
//  );
//  infoWindow.open(map);
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