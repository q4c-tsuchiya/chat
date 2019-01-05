/* Firebase */
import { FIREBASE_CONFIG } from "../config/firebase";

// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

// データがとれない。。。要確認
// const getCurrentTimeStamp = () => {
//   return db.Timestamp;
// };

const defaultData = {
  rooms: "rooms",
  roomName: "roomA",
  collectionName: "messages"
};

export const postMessage = (
  rooms = defaultData.rooms,
  roomName = defaultData.roomName,
  collectionName = defaultData.collectionName,
  postMessage
) => {
  db.collection(rooms)
    .doc(roomName)
    .collection(collectionName)
    .add(postMessage);
};

export const getInitialData = (
  rooms = defaultData.rooms,
  roomName = defaultData.roomName,
  collectionName = defaultData.collectionName
) => {
  return db
    .collection(rooms)
    .doc(roomName)
    .collection(collectionName)
    .orderBy("timestamp");
};
