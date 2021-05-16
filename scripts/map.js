
var megaArray;
var newMEGAArray;
var map;
var markersList = []
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (p) {
            let LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
            let mapOptions = {
                center: LatLng,
                zoom: 13,
            };
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
        })
    }

}





// Being called by an event listener
function mapDetailWindow(userID, i) {
    console.log("mapDetailWindow is being called at line 63");
    db.collection("users")
        .doc(userID)
        .get()
        .then(function (doc) {
            let name = doc.data().name;
            let rating = doc.data().rating;
            let description = doc.data().description;
            let picture = doc.data().profilePicture;
            $('#window-name_' + i + '').text(name);
            $('#window-rating_' + i + '').text(rating);
            $('#window-description_' + i + '').text(description);
            $('.profile-pic_' + i + '').attr("src", picture);
        }).catch(function(error){
            console.log(error)
        })
}

function setMarkers(map, megaArray){

    // let marker, i
    for (let i = 0; i < megaArray.length; i++){  

        let lat = megaArray[i][0][0]
        let lng = megaArray[i][0][1]
        let userID = megaArray[i][1]

        let location = new google.maps.LatLng(lat, lng);

        let marker = new google.maps.Marker({  
            map: map, 
            position: location  
        });

        // markersList = [];
        markersList.push(marker);
        console.log(markersList)

    let content = "<h6> Name: <span id='window-name_" + i + "'></span></h6> <h6> Rating: <span id='window-rating_" + i + "'></span> </h6> <h6> Description: <span id='window-description_" + i + "'></span> </h6> <div><img src='https://randomuser.me/api/portraits/men/1.jpg' class='profile-pic_" +i + "' alt='Profile Picture'></div>"

    let infowindow = new google.maps.InfoWindow()

    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
        return function() {
            infowindow.close();
            infowindow.setContent(content);
            infowindow.open(map,marker);
            mapDetailWindow(userID, i);  
        };
        
    })(marker,content,infowindow)); 
    console.log(markersList)
    }; 
}

///A COPY 
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
            // .then(mapDetailWindow(doc.id, i))
            console.log("INSIDE Get Location" + megaArray)
            console.log("INSIDE Get location" + typeof megaArray)
            return megaArray
        })
        .then(setMarkers(map, megaArray)).catch(function(error){
            console.log(error)
        })
        
}
// $(document).ready()
// function clearMarkers() {
//     setMapOnAll(null);
//   }

function removeMarkers(markersList){
    for(let j=0; j<markersList.length; j++){
        markersList[j].setMap(null);
        console.log("j" + j)
    }
    // markersList = []
    markersList.length = 0
    console.log("SHOULD BE EMOTY" + markersList)
}

let submitButton = document.getElementById("submit");
function addSubmitListener() {
    console.log("click")
    let toolKeyword = document.getElementById("tool-keyword").value;
    removeMarkers(markersList);
    getLocationH(toolKeyword);
}


submitButton.onclick = addSubmitListener;
// window.onload = function (){
//     submitButton.onclick = addSubmitListener;
//     }

// $(document).ready(function () {
// submitButton.onclick = addSubmitListener;
// })


// if (markersList.length === 0){
//     console.log("IF CALLED")
//     submitButton.onclick = addSubmitListener;
// }else{
//     console.log("IN ELSE BLOCK")
//     removeMarkers(markersList);
//     submitButton.onclick = addSubmitListener;

// addSubmitListener();
initMap();

