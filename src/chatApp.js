import React from "react";
import { connect } from "react-redux";
import styles from "./main";
import { getInitialData, postMessage } from "./firebasecontrol";

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
          onClick={() => initData(props)}
          style={{ height: "50px", width: "100px", marginLeft: "30px" }}
        >
          データ更新
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
              postNewMessage(props);
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

const initData = props => {
  const messages = [];
  getInitialData("rooms", "roomA", "messages")
    .get()
    .then(
      snapshot => {
        snapshot.forEach(doc => {
          messages.push(doc.data());
        });
        props.displayInitialData(messages);
      },
      err => {
        console.log("error!: ", err);
      }
    );
};

const postNewMessage = props => {
  props.postNewMessage(props.inputMessage);
  postMessage("rooms", "roomA", "messages", {
    content: props.inputMessage,
    userName: "test名前",
    timestamp: new Date()
  });
};

const mapStateToProps = state => {
  return {
    roomName: state.currentRoom,
    messages: state.messages,
    inputMessage: state.inputMessage
  };
};

const mapDispatchToProps = dispach => {
  return {
    displayInitialData: messages => {
      dispach({
        type: "DISPLAY_INITIAL_DATA",
        payload: { messages: messages }
      });
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
