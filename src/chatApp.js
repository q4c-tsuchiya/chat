import React from 'react';
import { connect } from 'react-redux';
import styles from './main';

const MessageList = ({messages}) => {
    if (!messages) { return null }
    const list = messages.map(message => {
        return (
            <li>
                <div className={styles.chat}>
                    <div className={styles.userName}>
                        {message.userName}
                    </div>
                    <div className={styles.message}>
                        {message.content}
                    </div>
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
                    <button onClick={props.displayInitialData} style={{ height: '50px', width: '100px', marginLeft: '30px'}}>初期データ反映</button>
                    <a href="" className={styles.account}>Login / Logout</a>
                </div>
                <div className={styles.content}>
                    <div className={styles.room}>
                        <div className={styles.roomHeader}>
                            # {props.roomName}
                        </div>
                        <div className={styles.roomContent}>
                            <MessageList messages={props.messages}/>
                        </div>
                        <form className={styles.control}>
                            <textarea></textarea>
                            <button type="submit">送信</button>
                        </form>
                    </div>
                </div>
                <div className={styles.footer}>
                </div>
            </div>
    )
}

const mapStateToProps = state => {
    return {
        roomName: state.roomName,
        messages: state.messages,
    };
};

const mapDispatchToProps = dispach => {
    return {
        displayInitialData: () => {
            dispach({ type: "DISPLAY_INITIAL_DATA", payload: {}});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);