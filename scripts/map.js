
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
        content: "<h2> Hammer to lend! </h2> <img src='repair.png'>"
    });

    //this pops open the content that was set 
    marker.addListener("click", () =>{
        detailWindow.open(map, marker)
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
                    var n = doc.data().Location; 
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
