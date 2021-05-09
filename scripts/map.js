
// PROBABLY the lat and lng need to be dynamically changed for each user!!!!!!!!!!!!!!!


// https://developers.google.com/maps/documentation/javascript/overview?hl=en_US#maps_map_simple-javascript
function initMap() {
    var location = { lat: 49.282730, lng: -123.120735 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: location
    });

    // // The marker, positioned at location
    // const marker = new google.maps.Marker({
    //     position: location,
    //     map: map,
    //     // icon:  can add a new image for the markeer by specifyin an img url
    // });

    // //this is how you add a window with some content to the map
    // const detailWindow = new google.maps.InfoWindow({
    //     content: "<h2> Hammer </h2>"
    // });

    // //this pops open the content that was set 
    // marker.addListener("mouseover", () =>{
    //     detailWindow.open(map, marker)
    // })

    //ADD MARKER FUNCTION

    function addMarker(property){

        const marker = new google.maps.Marker({
                position: property.location,
                map: map,
                // icon: property.icon
            });

            if(property.icon){
                marker.setIcon(property.icon)
            }
    }

    // addMarker(location)
    let hammer = [{ lat: 49.282730, lng: -123.25 }, { lat: 49.282730, lng: -123.120745 }, { lat: 49.282730, lng: -123.15 }];
    let picture = ["https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"]
    for(let i = 0; i < hammer.length; i++) {
        addMarker({location: hammer[i], 
                   icon: picture[i]})

    };
}











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