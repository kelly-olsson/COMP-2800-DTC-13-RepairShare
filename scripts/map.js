
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

    
// Pull data from firestore to pass to initMap function
db.collection("users").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        // console.log(doc.data().location);
        initMap(doc);
        // searchForTools(doc);
    })
})


function searchForTools() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            // .doc(user.uid)
            // .collection("tools")
            .where("rating", "==", 4.8)
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    console.log("works");
                    console.log(doc.data().name);
                })
            })
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
    })
}
searchForTools();


// https://developers.google.com/maps/documentation/javascript/overview?hl=en_US#maps_map_simple-javascript
function initMap(doc) {

    var location = { lat: doc.data().location[0], lng: doc.data().location[1] };
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
        content: "<h3> Name: <span id='window-name'>User</span> </h3> <h3> Rating: <span id='window-rating'></span> </h3> <h3> Description: <span id='window-description'></span> </h3> <h3> Link to Profile: <span id='window-profile'></span> </h3>"
    });

    sayHello();
    readCoordinateFromDatabase();

    //this pops open the content that was set 
    marker.addListener("click", () =>{
        detailWindow.open(map, marker);
        mapDetailWindow();
        
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
