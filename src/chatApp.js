import React from 'react';
import styles from './main';

export const ChatApp = () => {
    return (
            <div>
                <div className={styles.header}>
                    <h1>hapicomori</h1>
                    <a href="" className={styles.account}>Login / Logout</a>
                </div>
                <div className={styles.content}>
                    <div className={styles.room}>
                        <div className={styles.roomHeader}>
                            # 茅場町にこもって開発
                        </div>
                        <div className={styles.roomContent}>
                            <div className={styles.chat}>
                                <div className={styles.userName}>
                                    tsuchy
                                </div>
                                <div className={styles.message}>
                                    あけまして
                                </div>
                            </div>
                            <div className={styles.chat}>
                                <div className={styles.userName}>
                                    j-miya
                                </div>
                                <div className={styles.message}>
                                    おめでとうございます
                                </div>
                            </div>
                            <div className={styles.chat}>
                                <div className={styles.userName}>
                                    tsuchy
                                </div>
                                <div className={styles.message}>
                                    今年は
                                </div>
                            </div>
                            <div className={styles.chat}>
                                <div className={styles.userName}>
                                    j-miya
                                </div>
                                <div className={styles.message}>
                                    副業もやるぞ
                                </div>
                            </div>
                            <div className={styles.chat}>
                                <div className={styles.userName}>
                                    tsuchy
                                </div>
                                <div className={styles.message}>
                                    稼ぐぞ
                                </div>
                            </div>
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
