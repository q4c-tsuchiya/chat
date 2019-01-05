import React from "react";
import styles from "./main";

const RoomNameList = ({ roomNames }) => {
  if (!roomNames) {
    return null;
  }
  const list = roomNames.map(roomName => {
    return <li>{roomName}</li>;
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
      <RoomNameList roomNames={props.props.userRoomIdxs} />
    </div>
  );
};
