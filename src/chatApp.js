import React from "react";
import { connect } from "react-redux";
import styles from "./main";
import { db } from "../redux/ducks/chats";

const MessageList = ({ messages }) => {
  if (!messages) {
    return null;
  }
  const list = messages.map(message => {
    return (
      <li>
        <div className={styles.chat}>
          <div className={styles.userName}>{message.userName}</div>
          <div className={styles.message}>{message.content}</div>
        </div>
      </li>
    );
  });
  return <ul>{list}</ul>;
};

export const ChatApp = props => {
  return (
    <div>
      <div className={styles.header}>
        <h1>hapicomori</h1>
        <button
          onClick={props.displayInitialData}
          style={{ height: "50px", width: "100px", marginLeft: "30px" }}
        >
          初期データ反映
        </button>
        <a href="" className={styles.account}>
          Login / Logout
        </a>
      </div>
      <div className={styles.content}>
        <div className={styles.room}>
          <div className={styles.roomHeader}># {props.roomName}</div>
          <div className={styles.roomContent}>
            <MessageList messages={props.messages} />
          </div>
          <form
            className={styles.control}
            onSubmit={event => {
              event.preventDefault();
              props.postNewMessage(props.inputMessage);
            }}
          >
            <textarea
              value={props.inputMessage}
              onChange={event => props.changeInputMessage(event.target.value)}
            />
            <button type="submit">送信</button>
          </form>
        </div>
      </div>
      <div className={styles.footer} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    roomName: state.currentRoom,
    messages: state.messages,
    inputMessage: state.inputMessage
  };
};

const getInitialData = dispach => {
  const messages = [];
  db.collection("rooms")
    .doc("roomA")
    .collection("messages")
    .orderBy("timestamp")
    .get()
    .then(
      snapshot => {
        snapshot.forEach(doc => {
          messages.push(doc.data());
        });
        console.log("messages: ", messages);
        dispach({
          type: "DISPLAY_INITIAL_DATA",
          payload: { messages: messages }
        });
      },
      err => {
        console.log("error!: ", err);
      }
    );
};

const asyncActionCreater = () => {
  return dispach => {
    getInitialData(dispach);
  };
};

const mapDispatchToProps = dispach => {
  return {
    displayInitialData: () => {
      dispach(asyncActionCreater());
    },
    changeInputMessage: inputMessage => {
      dispach({
        type: "CHANGE_INPUT_MESSAGE",
        payload: { message: inputMessage }
      });
    },
    postNewMessage: postMessage => {
      dispach({ type: "POST_NEW_MESSAGE", payload: { message: postMessage } });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatApp);
