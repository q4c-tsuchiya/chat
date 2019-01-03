import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ChatApp } from './chatApp';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case "TEST":
            return state;
        default:
            return state;
    }
};

const store = createStore(reducer);

export const Root = () => {
    return (
        <Provider store={store}>
            {/* <Router>あとで導入</Router> */}
            <ChatApp>aaa</ChatApp>
        </Provider>
    )
}
