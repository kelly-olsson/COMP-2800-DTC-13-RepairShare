function initMap() {
    var location = {lat: 49.282730, lng: -123.120735};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11, 
        center: location
    });
}

