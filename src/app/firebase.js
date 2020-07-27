import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBYGygTEnsZSiTW2guQSbzS97QIc6r-un4",
    authDomain: "alianceapp-bc6e3.firebaseapp.com",
    databaseURL: "https://alianceapp-bc6e3.firebaseio.com",
    projectId: "alianceapp-bc6e3",
    storageBucket: "alianceapp-bc6e3.appspot.com",
    messagingSenderId: "752833989417",
    appId: "1:752833989417:web:8107e465152bd623854538"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase