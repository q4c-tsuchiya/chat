import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ChatApp from './chatApp';
import { reducer } from '../redux/ducks/chats'

const store = createStore(reducer);
console.log(store)

export const Root = () => {
    return (
        <Provider store={store}>
            {/* <Router>あとで導入</Router> */}
            <ChatApp/>
        </Provider>
    )
}
