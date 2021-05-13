function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }
// var firebase = new Firebase("https://repairshare-ce54f-default-rtdb.firebaseio.com");

// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: 0, lng: 0},
//       zoom: 3,
//       styles: [{
//         featureType: 'poi',
//         stylers: [{ visibility: 'off' }]  // Turn off points of interest.
//       }, {
//         featureType: 'transit.station',
//         stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
//       }],
//       disableDoubleClickZoom: true,
//       streetViewControl: false
//     });
//     // Create a heatmap.
// var heatmap = new google.maps.visualization.HeatmapLayer({
//     data: [],
//     map: map,
//     radius: 16
//   });
//   }

//   /**
//  * Data object to be written to Firebase.
//  */
// var data = {
//     sender: null,
//     timestamp: null,
//     lat: null,
//     lng: null
//   };

//   /**
// * Starting point for running the program. Authenticates the user.
// * @param {function()} onAuthSuccess - Called when authentication succeeds.
// */
// function initAuthentication(onAuthSuccess) {
//     firebase.auth().signInAnonymously().catch(function(error) {
//         console.log(error.code + ", " + error.message);
//     }, {remember: 'sessionOnly'});
  
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         data.sender = user.uid;
//         onAuthSuccess();
//       } else {
//         // User is signed out.
//       }
//     });
//   }

//   // Listen for clicks and add them to the heatmap.
// clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
// function(snapshot) {
//   var newPosition = snapshot.val();
//   var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
//   heatmap.getData().push(point);
// }
// );

// /**
//  * Set up a Firebase with deletion on clicks older than expirySeconds
//  * @param {!google.maps.visualization.HeatmapLayer} heatmap The heatmap to
//  * which points are added from Firebase.
//  */
//  function initFirebase(heatmap) {

//     // 10 minutes before current time.
//     var startTime = new Date().getTime() - (60 * 10 * 1000);
  
//     // Reference to the clicks in Firebase.
//     var clicks = firebase.database().ref('clicks');
  
//     // Listen for clicks and add them to the heatmap.
//     clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
//       function(snapshot) {
//         // Get that click from firebase.
//         var newPosition = snapshot.val();
//         var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
//         var elapsedMs = Date.now() - newPosition.timestamp;
  
//         // Add the point to the heatmap.
//         heatmap.getData().push(point);
  
//         // Request entries older than expiry time (10 minutes).
//         var expiryMs = Math.max(60 * 10 * 1000 - elapsed, 0);
//         // Set client timeout to remove the point after a certain time.
//         window.setTimeout(function() {
//           // Delete the old point from the database.
//           snapshot.ref.remove();
//         }, expiryMs);
//       }
//     );
  
//     // Remove old data from the heatmap when a point is removed from firebase.
//     clicks.on('child_removed', function(snapshot, prevChildKey) {
//       var heatmapData = heatmap.getData();
//       var i = 0;
//       while (snapshot.val().lat != heatmapData.getAt(i).lat()
//         || snapshot.val().lng != heatmapData.getAt(i).lng()) {
//         i++;
//       }
//       heatmapData.removeAt(i);
//     });
//   }

//   initAuthentication(initFirebase.bind(undefined, heatmap));

//   // Listen for clicks and add the location of the click to firebase.
// map.addListener('click', function(e) {
//     data.lat = e.latLng.lat();
//     data.lng = e.latLng.lng();
//     addToFirebase(data);
//   });


