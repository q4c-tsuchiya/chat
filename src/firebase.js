import { FIREBASE_CONFIG } from "../config/firebase";

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

export const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export const postMessage = (roomName, postMessage) => {
  db.collection("rooms")
    .doc(roomName)
    .collection("messages")
    .add(postMessage);
};

export const getRoomNames = () => {
  return db
    .collection("rooms")
    .get()
    .then(rooms => {
      const list = [];
      rooms.forEach(room => {
        console.log("room, ", room);
        list.push(room.id);
      });
      console.log("list", list);
      return list;
    });
};
