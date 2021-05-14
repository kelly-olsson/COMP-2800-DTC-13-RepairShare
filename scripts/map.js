// CITATION FOR GEOLOCATION: https://www.aspsnippets.com/Articles/Show-users-current-location-on-Google-Map-using-GeoLocation-API-in-website.aspx
// var locationArray;
var megaArray;
var newMEGAArray;
var map;
// https://developers.google.com/maps/documentation/javascript/overview?hl=en_US#maps_map_simple-javascript
function initMap() {
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
}

function addSubmitListener() {
    document.getElementById("submit").addEventListener("click", function () {
        var toolKeyword = document.getElementById("tool-keyword").value;
        getLocationH(toolKeyword);
    })
}

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

function mapDetailWindow(userID) {
    // console.log(userID);
    db.collection("users")
        .doc(userID)
        .get()
        .then(function (doc) {
            // console.log(doc.data())
            var name = doc.data().name;
            var rating = doc.data().rating;
            var description = doc.data().description;
            $("#window-name").text(name);
            $("#window-rating").text(rating);
            $("#window-description").text(description);
        })
}

function setMarkers(map, megaArray){
  
    var marker, i

for (i = 0; i < megaArray.length; i++){  

    var lat = megaArray[i][0][0]
    var lng = megaArray[i][0][1]
    var userID = megaArray[i][1]
    console.log(lng)
    console.log(lat)
    console.log(typeof lat)


    var location = new google.maps.LatLng(lat, lng);

var marker = new google.maps.Marker({  
        map: map, 
        position: location  
      });


var content = "<h3> Name: <span id='window-name'>User</span> </h3> <h3> Rating: <span id='window-rating'></span> </h3> <h3> Description: <span id='window-description'></span> </h3> <h3> Tools: <span id='window-tools'></span> </h3>"
mapDetailWindow(userID)
var infowindow = new google.maps.InfoWindow()

google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
      return function() {
         infowindow.setContent(content);
         infowindow.open(map,marker);
      };
  })(marker,content,infowindow)); 

};

}

///A COPY 
function getLocationH(toolKeyword) {
    db.collection("users")
        .where("tools." + toolKeyword, '==', true)
        .get()
        .then(function (snapshot) {
            megaArray = []   // [[[long:, lat:] , UID], [[long:, lat:] , UID]]
            snapshot.forEach(function (doc) {
                var tempArray = []
                
                tempArray.push(doc.data().location)
                tempArray.push(doc.id)
                console.log("user uid line 223")
                console.log(doc.id)

                megaArray.push(tempArray)
            })
            // console.log("megaArray line 229")
            // console.log(megaArray)
            return megaArray
        })
        .then(setMarkers(map, megaArray))
}

initMap();
// sayHello();
addSubmitListener();
// readCoordinateFromDatabase();