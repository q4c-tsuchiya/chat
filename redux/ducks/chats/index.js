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
  inputMessage: ""
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_INITIAL_DATA":
      return {
        ...state,
        messages: action.payload.messages
      };
    case "CHANGE_INPUT_MESSAGE":
      return {
        ...state,
        inputMessage: action.payload.message
      };
    case "POST_NEW_MESSAGE":
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
