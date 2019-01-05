import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ChatApp from "./chatApp";
import { reducer } from "../redux/ducks/chats";
import thunk from "redux-thunk";

const middleWares = [thunk];
const store = createStore(reducer, applyMiddleware(...middleWares));

export const Root = () => {
  return (
    <Provider store={store}>
      {/* <Router>あとで導入</Router> */}
      <ChatApp />
    </Provider>
  );
};
