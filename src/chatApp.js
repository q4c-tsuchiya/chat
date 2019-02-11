import React from "react";
import { connect } from "react-redux";
import styles from "./main";
import { db, storage } from "./firebase";
import Modal from "./modal";
import { SideMenu } from "./sideMenu";
import axios from "axios";

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
        <button
          onClick={props.fileDownload} //暫定実装
          style={{ height: "50px", width: "100px", marginLeft: "30px" }} //TODO ボタンの位置がずれているので対応必要
        >
          ファイルダウンロードテスト
        </button>
        <button
          onClick={props.callServerSideAPI}
          style={{ height: "50px", width: "100px", marginLeft: "30px" }}
        >
          サーバサイドAPI呼び出し
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

// Firebase Storage からサンプルファイルをダウンロード
const fileDownloadTest = dispach => {
  // TODO ここにダウンロード処理を実装
  storage
    .child("test/fileDownloadTest.txt")
    .getDownloadURL()
    .then(url => {
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();
    })
    .catch(error => {
      // Handle any errors
    });
  dispach({ type: "FILE_DOWNLOAD_TEST" });  
};

const callServerSideAPI = dispach => {
  // expressで実装した、サンプルAPIにHttpRequest投げる
  axios({
    method: "GET",
    url: "http://localhost:3000/api/users",
    params: {}
  })
    .then(response => {
      console.log(response);
      dispach({
        type: "GET_USERS_DATA",
        payload: { users: response.data }
      });
    })
    .catch(errors => {
      console.log("Axios error occured !");
      console.log(errors);
    });
};

const asyncCallServerSideAPI = () => {
  return dispach => {
    callServerSideAPI(dispach);
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

const asyncFileDownloadTest = () => {
  return dispatch => {
    fileDownloadTest(dispatch);
  };
};

const mapDispatchToProps = dispach => {
  return {
    displayInitialData: () => {
      dispach(asyncGetInitialData());
    },
    callServerSideAPI: () => {
      dispach(asyncCallServerSideAPI());
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
    fileDownload: () => {
      dispach(asyncFileDownloadTest());
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
