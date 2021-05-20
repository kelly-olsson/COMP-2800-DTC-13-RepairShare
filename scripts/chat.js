function saveMessage(messageText) {
    // Add a new message entry to the database.
    return firebase.auth().onAuthStateChanged(function (somebody) {
      if (somebody) {
        firebase.firestore().collection('users').doc(somebody.uid).collection('messages').add({
        // firebase.firestore().collection('messages').add({
          name: getUserName(),
          text: messageText,
          profilePicUrl: getProfilePicUrl(),
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function (error) {
          console.error('Error writing new message to database', error);
        });
      }
    })}