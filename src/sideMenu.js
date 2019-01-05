import React from "react";
import styles from "./main";

const RoomNameList = ({ prop }) => {
  if (!prop.userRoomIdxs) {
    return null;
  }
  const list = prop.userRoomIdxs.map(roomName => {
    return (
      <li
        key={Math.random()}
        onClick={() => {
          prop.displayRoomData(roomName);
        }}
      >
        {roomName}
      </li>
    );
  });
  return <ul>{list}</ul>;
};

export const SideMenu = props => {
  return (
    <div className={styles.sidemenu}>
      <button
        onClick={() => {
          props.props.getRoomNames();
        }}
        className={styles.normal}
      >
        ルーム一覧取得
      </button>
      <RoomNameList prop={props.props} />
    </div>
  );
};
