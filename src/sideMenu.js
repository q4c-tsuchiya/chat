import React from "react";
import { connect } from "react-redux";
import styles from "./main";

const RoomNameList = ({ roomNames }) => {
  if (!roomNames) {
    return null;
  }
  const list = roomNames.map(roomName => {
    return <li>{roomName.id}</li>;
  });
  return <ul>{list}</ul>;
};

export const SideMenu = props => {
  console.log(props);
  return (
    <div className={styles.sidemenu}>
      <button
        onClick={() => {
          console.log(props.props.getRoomNames);
          props.props.getRoomNames();
        }}
        className={styles.normal}
      >
        ルーム一覧取得
      </button>
      <RoomNameList roomNames={props.roomNames} />
    </div>
  );
};
