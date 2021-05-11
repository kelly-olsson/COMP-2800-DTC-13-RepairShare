
// PROBABLY the lat and lng need to be dynamically changed for each user!!!!!!!!!!!!!!!


// https://developers.google.com/maps/documentation/javascript/overview?hl=en_US#maps_map_simple-javascript
function initMap() {
    var location = { lat: 49.282730, lng: -123.120735 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: location
    });

    // The marker, positioned at location
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        // icon: "repair.png"
    });

    //this is how you add a window with some content to the map
    const detailWindow = new google.maps.InfoWindow({
        // content: "<div id='detail-window'><h2> Hammer to lend! </h2> <img src='repair.png'></div>"
        content: "<h3> Name: <span id='window-name'>User</span> </h3> <h3> Rating: <span id='window-rating'></span> </h3> <h3> Description: <span id='window-description'></span> </h3> <h3> Link to Profile: <span id='window-profile'></span> </h3>"
    });

    //this pops open the content that was set 
    marker.addListener("click", () =>{
        detailWindow.open(map, marker)
    })
}
initMap();


// Pull data from firestore to put in map detail window
// function mapDetailWindow(doc){

//     let mapWindow = document.getElementById("detail-window");
//     let name = document.createElement(li);

//     name.textContent = doc.data().name;

//     mapWindow.appendChild(name);
// }
// mapDetailWindow(doc);

function mapDetailWindow(){
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
        }})
}
mapDetailWindow();


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
        }})
}
readCoordinateFromDatabase();


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
sayHello();



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
