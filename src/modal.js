import React from "react";
import { connect } from "react-redux";
import styles from "./memo";
import { db } from "./firebase";

const Modal = props => {
  const { modalType, inputMemo, postMemo, changeInputMemo, ...rest } = props;
  switch (modalType) {
    case "memo":
      return (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>メモ</div>
            <div className={styles.modalContent}>
              <form
                className={styles.form}
                onSubmit={e => {
                  e.preventDefault();
                  postMemo(inputMemo);
                }}
              >
                <textarea
                  value={inputMemo}
                  onChange={e => changeInputMemo(e.target.value)}
                />
                <button type="submit">送信</button>
              </form>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const mapStateToProps = state => {
  return {
    modalType: state.modal.type,
    inputMemo: state.inputMemo
  };
};

const mapDispatchToProps = dispach => {
  return {
    changeInputMemo: inputMemo => {
      dispach({
        type: "CHANGE_INPUT_MEMO",
        payload: { memo: inputMemo }
      });
    },
    postMemo: postMemo => {
      dispach({ type: "POST_MEMO", payload: { memo: postMemo } });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
