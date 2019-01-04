/* ActionCreater */


/* Reducer */

//ダミー用の日付データを用意
var date = new Date();
date.setFullYear(2019);
date.setMonth(1);
date.setDate(1);

const initialState = {
    roomId: 1,
    roomName: '茅場町にこもって開発',
    messages: [
                {
                    id: 1,
                    content: 'あけまして',
                    userName: 'tsuchy',
                    timestamp: date,
                },
                {
                    id: 2,
                    content: 'おめでとうございます',
                    userName: 'j-miya',
                    timestamp: date,
                },
                {
                    id: 3,
                    content: '今年は',
                    userName: 'tsuchy',
                    timestamp: date,
                },
                {
                    id: 4,
                    content: '副業もやるぞ',
                    userName: 'j-miya',
                    timestamp: date,
                },
                {
                    id: 5,
                    content: '稼ぐぞ',
                    userName: 'j-miya',
                    timestamp: date,
                },
              ],
    messageCount: 5,
    inputMessage: '',
}

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case "DISPLAY_INITIAL_DATA":
            return initialState;
        case "CHANGE_INPUT_MESSAGE":
            return {
                ...state,
                inputMessage: action.payload.message,
            };
        case "POST_NEW_MESSAGE":
            return {
                ...state,
                messageCount: state.messageCount + 1,
                messages: state.messages
                            .concat({
                                id: state.messageCount + 1,
                                content: action.payload.message,
                                userName: 'postman',
                                timestamp: date,
                            }),
                inputMessage: '',
            };
        default:
            return state;
    }
};