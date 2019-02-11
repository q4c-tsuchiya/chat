/* Firebase */
import FIREBASE_CONFIG from "../../../config/firebase";
import { postMessage, getRoomNames, postMemo } from "../../../src/firebase";

// Initialize Firebase
// firebase.initializeApp(FIREBASE_CONFIG);

// export const db = firebase.firestore();
// db.settings({
//   timestampsInSnapshots: true
// });

// データがとれない。。。要確認
// const getCurrentTimeStamp = () => {
//   return db.Timestamp;
// };

/* ActionCreater */

/* Reducer */

//ダミー用の日付データを用意
var date = new Date();
date.setFullYear(2019);
date.setMonth(1);
date.setDate(1);

const initialState = () => ({
  userName: "miyakawa",
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
  users: [], // APIから取得したサンプルデータが格納
  inputMessage: "",
  inputMemo: "",
  modal: {
    type: "",
    data: {}
  }
});

export const reducer = (state = initialState(), action) => {
  switch (action.type) {
    case "DISPLAY_INITIAL_DATA":
      return {
        ...state,
        messages: action.payload.messages,
        currentRoom: action.payload.currentRoom
      };
    case "GET_USERS_DATA":
      return {
        ...state,
        users: action.payload.users
      };

    case "OPEN_MODAL":
      return {
        ...state,
        modal: {
          type: action.payload.type,
          data: action.payload.data
        }
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: initialState().modal
      };
    case "CHANGE_INPUT_MESSAGE":
      return {
        ...state,
        inputMessage: action.payload.message
      };
    case "CHANGE_INPUT_MEMO":
      return {
        ...state,
        inputMemo: action.payload.memo
      };
    case "POST_MEMO":
      postMemo(action.payload.memo);
      return {
        ...state,
        inputMemo: ""
      };
    case "POST_NEW_MESSAGE":
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
    case "GET_ROOM_NAMES":
      return {
        ...state,
        userRoomIdxs: action.payload.roomNames
      };
    case "FILE_DOWNLOAD_TEST":
      return state;
    default:
      return state;
  }
};
