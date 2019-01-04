/* Firebase */
import { FIREBASE_CONFIG } from "../../../config/firebase";

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

const postMessage = (roomName, postMessage) => {
  db.collection("rooms")
    .doc(roomName)
    .collection("messages")
    .add(postMessage);
};

const getInitialData = () => {
  const messages = [];
  db.collection("rooms")
    .doc("roomA")
    .collection("messages")
    .orderBy("timestamp")
    .get()
    .then(
      snapshot => {
        snapshot.forEach(doc => {
          console.log("doc: ", doc.data());
          messages.push(doc.data());
        });
        console.log("messages: ", messages);
        return messages;
      },
      err => {
        console.log("error!: ", err);
      }
    );
};

/* Reducer */

//ダミー用の日付データを用意
var date = new Date();
date.setFullYear(2019);
date.setMonth(1);
date.setDate(1);

const initialState = {
  userName: "miyakawa",
  userRoomIdxs: ["roomA", "roomB"],
  currentRoom: "roomA",
  messages: [
    {
      content: "あけまして",
      userName: "tsuchy",
      timestamp: date
    },
    {
      content: "おめでとうございます",
      userName: "j-miya",
      timestamp: date
    }
  ],
  // messageCount: 5,
  inputMessage: ""
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_INITIAL_DATA":
      console.log("getInitialData");
      // console.log([...getInitialData()]);
      getInitialData();
      return {
        ...state,
        messages: state.messages.concat([
          {
            content: "ダミー",
            userName: "dummy",
            timestamp: date
          }
        ])
      };
    case "CHANGE_INPUT_MESSAGE":
      return {
        ...state,
        inputMessage: action.payload.message
      };
    case "POST_NEW_MESSAGE":
      // const timestamp = getCurrentTimeStamp();
      // console.log(`timestamp:${timestamp}`);
      postMessage(state.currentRoom, {
        content: action.payload.message,
        userName: state.userName,
        timestamp: date
      });
      return {
        ...state,
        messages: state.messages.concat({
          content: action.payload.message,
          userName: state.userName,
          timestamp: date
        }),
        inputMessage: ""
      };
    default:
      return state;
  }
};
