import { FIREBASE_CONFIG } from "../config/firebase";

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export const postMessage = (roomName, postMessage) => {
  db.collection("rooms")
    .doc(roomName)
    .collection("messages")
    .add(postMessage);
};
