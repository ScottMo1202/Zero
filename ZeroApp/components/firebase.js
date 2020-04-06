import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDfUza2Fi1ycH6sbj2fin6A-XSZ-13kBCs",
    authDomain: "zero-b0410.firebaseapp.com",
    databaseURL: "https://zero-b0410.firebaseio.com",
    projectId: "zero-b0410",
    storageBucket: "zero-b0410.appspot.com",
    messagingSenderId: "1048596579776",
    appId: "1:1048596579776:web:910c01ec2fa1ba44823425",
    measurementId: "G-1ZE8N9S701"
  };

  const Firebase = firebase.initializeApp(firebaseConfig)
  export default Firebase