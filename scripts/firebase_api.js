/**
 * Initialize the web app's Firebase configuration.
 * 
 * This code was adapted from https://firebase.google.com/docs/web/setup
 * 
 */

import firebaseConfig from "./firebase-config.js";

/**
 * Initialize Firebase.
 * 
 * This code was adapted from https://firebase.google.com/docs/web/setup
 *
 */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
var storage = firebase.storage();

db.settings({timestampInSnapshots: true});
