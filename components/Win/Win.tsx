import { ReactNode, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable"
import styles from "./Win.module.css";
import WinToolBar from "../WinToolBar/WinToolBar";

const Win = (props: { title: string; width: string; children: ReactNode}) => {
    const [isMaximised, setMaximised] = useState(false);
    const [isMinimised, setMinimised] = useState(false);
    const [isClose, setClose] = useState(false);
    const [currX, setX] = useState(0);
    const [currY, setY] = useState(0);
    
    const handleMaximise = () => {
        setMaximised(!isMaximised);
    };
    const handleMinimise = () => {
        setMinimised(!isMinimised);
    };

    const handleClose = () => {
        setClose(true);
    };
    const handleStop = (event: any, dragElement: any) => {
        setX(dragElement.x);
        setY(dragElement.y);
    };
    let draggableProps;

    if (isMaximised) {
        draggableProps = {
            position: { x: 0, y: 0 },
            handle: ".handle",
            bounds: "parent",
        };
    } else {
        draggableProps = {
            defaultPosition: { x: currX, y: currY },
            handle: ".handle",
            bounds: "parent",
            onStop: handleStop,
        };
    }

    return (
        <Draggable {...draggableProps}>
            <div style={{ display: isMinimised || isClose ? "none" : "inline", width: isMaximised ? "100%" : "500px", height: isMaximised ? "100%": "500px"}} className={styles.window}>
                <div className={styles.titlebar}>
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
                        <div className={styles.icon} />
                        <div className={styles.title}>{props.title}</div>
                    </div>
                    <div className={styles.titlecontrols}>
                        <div onClick={handleMinimise} className={styles.minimise}/>
                        <div onClick={handleMaximise} className={isMaximised ? styles.resize : styles.maximise} />
                        <div onClick={handleClose} className={styles.close} />
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