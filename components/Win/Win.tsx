import { ReactNode } from "react";
import Draggable from "react-draggable"
import styles from "./Win.module.css";
import WinToolBar from "../WinToolBar/WinToolBar";

const Win = (props: { title: string; width: string; children: ReactNode}) => {
    return (
        <Draggable bounds="parent">
            <div className={styles.window} style={{ width: props.width + "px", zIndex: "1" }}>
                <div className={styles.titlebar}>
                    <div>
                        <div className={styles.icon} />
                        <div className={styles.title}>{props.title}</div>
                    </div>
                    <div className={styles.titlecontrols}>
                        <div className={styles.minimise}/>
                        <div className={styles.maximise} />
                        <div className={styles.close} />
                    </div>
                </div>
                <div className={styles.windowborder}>
                    <div className={styles.windowsbody}>
                        <WinToolBar />
                        {props.children}
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default Win;