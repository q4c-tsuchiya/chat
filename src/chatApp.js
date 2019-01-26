import React from "react";
import { connect } from "react-redux";
import styles from "./main";
import { db } from "./firebase";
import Modal from "./modal";
import { SideMenu } from "./sideMenu";

const MessageList = ({ messages }) => {
  if (!messages) {
    return null;
  }
  const list = messages.map(message => {
    return (
      <li key={Math.random()}>
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
      <Modal closeModal={props.closeModal} />
      <div className={styles.header}>
        <h1>hapicomori</h1>
        <button
          onClick={props.displayInitialData}
          style={{ height: "50px", width: "100px", marginLeft: "30px" }}
        >
          初期データ反映
        </button>
        <button
          onClick={props.openModal}
          style={{ height: "50px", width: "100px", marginLeft: "30px" }}
        >
          メモ表示
        </button>
        <a href="" className={styles.account}>
          Login / Logout
        </a>
      </div>
      <div className={styles.content}>
        <SideMenu props={props} />
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
    inputMessage: state.inputMessage,
    userRoomIdxs: state.userRoomIdxs
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

const getRoomNames = dispach => {
  const roomNames = [];
  db.collection("rooms")
    .get()
    .then(
      rooms => {
        rooms.forEach(room => {
          roomNames.push(room.id);
        });
        dispach({ type: "GET_ROOM_NAMES", payload: { roomNames: roomNames } });
      },
      err => {
        console.log("error!: ", err);
      }
    );
};

const getRoomMessages = (dispach, roomName) => {
  const messageList = [];
  db.collection("rooms")
    .doc(roomName)
    .collection("messages")
    .orderBy("timestamp")
    .get()
    .then(messages => {
      messages.forEach(mes => {
        messageList.push(mes.data());
      });
      dispach({
        type: "DISPLAY_INITIAL_DATA",
        payload: { messages: messageList, currentRoom: roomName }
      });
    });
};

const asyncGetInitialData = () => {
  return dispach => {
    getInitialData(dispach);
  };
};

const asyncGetRoomNames = () => {
  return dispatch => {
    getRoomNames(dispatch);
  };
};

const asyncRoomMessages = roomName => {
  return dispach => {
    getRoomMessages(dispach, roomName);
  };
};

const mapDispatchToProps = dispach => {
  return {
    displayInitialData: () => {
      dispach(asyncGetInitialData());
    },
    openModal: () => {
      dispach({
        type: "OPEN_MODAL",
        payload: { type: "memo" }
      });
    },
    closeModal: () => {
      dispach({
        type: "CLOSE_MODAL"
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
    },
    getRoomNames: () => {
      dispach(asyncGetRoomNames());
    },
    displayRoomData: roomName => {
      dispach(asyncRoomMessages(roomName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatApp);
