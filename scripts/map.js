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


// Being called by an event listener
function mapDetailWindow(userID, i) {
    console.log("mapDetailWindow is being called at line 63");
    db.collection("users")
        .doc(userID)
        .get()
        .then(function (doc) {
            console.log(".then works at line 68");
            console.log(doc.data().name)
            var name = doc.data().name;
            // var rating = doc.data().rating;
            // var description = doc.data().description;
            console.log("line 70")
            console.log('#window-name_' + i + '')
            // $("#window-name_1").text(name);
            // ISSUE IS NEXT LINE
            // document.getElementById("window-name_"+i).textContent = name;
            $('#window-name_' + i + '').text(name);
            // console.log(document.getElementById("window_name_0".value))
            // $("#window-rating_" + i).text(rating);
            // $("#window-description_" + i).text(description);
            console.log("end of map detail reached")
        })
}


// CLOSURE

function setMarkers(map, megaArray){
  
    var marker, i
    // console.log(i)
for (i = 0; i < megaArray.length; i++){  

    var lat = megaArray[i][0][0]
    var lng = megaArray[i][0][1]
    var userID = megaArray[i][1]
    console.log(userID)
    console.log(i)

    var location = new google.maps.LatLng(lat, lng);

var marker = new google.maps.Marker({  
        map: map, 
        position: location  
      });

    //   + "'>User</span> </h3> <h3> Rating: <span id='window-rating_" + i + "'></span> </h3> <h3> Description: <span id='window-description_" + i + "'></span> </h3> <h3> Tools: <span id='window-tools'></span> </h3>"
var content = "<h3> Name: <span id='window-name_" + i + "'></span> </h3>"

mapDetailWindow(userID, i);


console.log("line 100")
console.log(content)
var infowindow = new google.maps.InfoWindow()
console.log(i)

// var infowindow = new google.maps.InfoWindow({
//     content : "<h3> Name: <span id='window-name_" + i + "'></span> </h3>"
// });


google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
      return function() {
        console.log(i)
         infowindow.setContent(content);
         infowindow.open(map,marker);

      };
      
  })(marker,content,infowindow)); 


}; // for loop ends here

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
                // console.log("user uid line 223")
                // console.log(doc.id)

                megaArray.push(tempArray)
            })
            // console.log("megaArray line 229")
            // console.log(megaArray)
            return megaArray
        })
        .then(setMarkers(map, megaArray))
}

initMap();
sayHello();
addSubmitListener();
// readCoordinateFromDatabase();


