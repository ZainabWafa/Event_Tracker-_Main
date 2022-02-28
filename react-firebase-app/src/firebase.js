import firebase from "firebase/app";
import "firebase/database";
import  "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCRsWvRDSSXJKiDjHVS1wt7oZmKFm93ISY",
    authDomain: "eventtracker-1bbe2.firebaseapp.com",
    databaseURL: "https://eventtracker-1bbe2-default-rtdb.firebaseio.com",
    projectId: "eventtracker-1bbe2",
    storageBucket: "eventtracker-1bbe2.appspot.com",
    messagingSenderId: "420985177549",
    appId: "1:420985177549:web:ea0dbd53d11678babcb084",
    measurementId: "G-82FB9HK55T"
};

const fireDb = firebase.initializeApp(firebaseConfig);
const fire = firebase.auth();
export { fire };
export default fireDb.database().ref();