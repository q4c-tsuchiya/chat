
// Firebase App is always required and must be first
// import { initializeApp } from "firebase/app";

// Add additional services that you want to use
// require("firebase/auth");
// require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBc73et9lxE9JQTqLaVS9T-A39jZKzbJd0",
  authDomain: "hapicomori-chat.firebaseapp.com",
  databaseURL: "https://hapicomori-chat.firebaseio.com",
  projectId: "hapicomori-chat",
  storageBucket: "hapicomori-chat.appspot.com",
  messagingSenderId: "37573105466"
};
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const collection = db.collection('rooms');

function submit(){
  collection.add({
    "roomName": "sample room",
    "chat": {
      "user-name": "tsuchy",
      "message": "msg.lue"
    }
  });
}