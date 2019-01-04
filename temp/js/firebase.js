
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
  console.log('submit here');
  collection.add({
    "roomName": "sample room",
    "chat": {
      "user-name": "tsuchy",
      "message": "msg.lue"
    }
  });
}
// 以下の参考サイト
// https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja

function getData(){
  console.log('getDate here');
  const got = collection.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
          console.log('doc id:', doc.id);
          console.log('doc data:', doc.data());
        })
    })
    .catch(err => {
      console.log('Error getting snapshot', err);
    });
  // console.log('got: ', got);
}

function getDoc(){
  const roomDocRef = db.collection('rooms').doc('roomA');
  roomDocRef.get()
  .then(doc => {
    console.log('doc: ', doc.data());
  })
  .catch(err => {
    console.log('error!');
  })
}

function getSubCollections(){
  console.log('getSubCollections id:');
  const roomDocRef = db.collection('rooms').doc('roomA');
  roomDocRef.collection('messages').get()
  .then(collections => {
    collections.forEach(cl => {
      console.log('cl id: ', cl.id);
      console.log('cl data: ', cl.data());
    })
  })
  .catch(err => {
    console.log('error!');
  })
}

function searchRoom(){
  const word = "日本語";
  const roomRef = db.collection('rooms').doc(word);
  roomRef.get()
  .then(doc => {
    console.log('doc id: ', doc.id);
    console.log('doc: ', doc.data());
  })
  .catch(err => {
    console.log('error!');
  })
}

function getSnapshot() {
  const roomRef = db.collection('rooms').doc('roomA');
  roomRef.onSnapshot(snapshot => {
    console.log('snapshot: ', snapshot.data());
  }, err => {
    console.log('error!: ', err);
  })
}

function setData() {
  const roomRef = db.collection('rooms').doc('roomB');
  roomRef.set({
    name: "set 1 name",
    mes: "mes",
    cl: {
      incl: "in1",
      incl2: "in12"
    }
  });
}

