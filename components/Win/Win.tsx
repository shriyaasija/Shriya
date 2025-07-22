import { ReactNode, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable"
import styles from "./Win.module.css";
import WinToolBar from "../WinToolBar/WinToolBar";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { maximizeTab, minimizeTab, setFocusedTab, removeTab } from "@/redux/tabSlice";
import store from "@/redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@/types";

const unfocusedAdjustment = "brightness(1.05)"
const Win = (props: { id: number; title: string; width: string; children: ReactNode; icon: StaticImageData}) => {
    const [isMaximised, setMaximised] = useState(false);
    const [isMinimised, setMinimised] = useState(false);
    const [isClose, setClose] = useState(false);
    const [currX, setX] = useState(0);
    const [currY, setY] = useState(0);
    const currTabID = useSelector((state: RootState) => state.tab.currentFocusedTab);

    const handleMaximise = () => {
        setMaximised(!isMaximised);
        store.dispatch(maximizeTab({ id: props.id }));
        store.dispatch(setFocusedTab({ id: props.id}));
    };

    const handleMinimise = () => {
        setMinimised(!isMinimised);
        store.dispatch(minimizeTab({ id: props.id }));
        store.dispatch(setFocusedTab({ id: -1 }));
    };

    const handleClose = () => {
        store.dispatch(removeTab({ id: props.id}))
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
            <div style={{ display: isMinimised ? "none" : "inline", width: isMaximised ? "100%" : "500px", height: isMaximised ? "100%": "500px"}} className={styles.window}>
                <div onClick={() => store.dispatch(setFocusedTab({ id: props.id }))} className={currTabID == props.id ? styles.titlebar : styles.titlebar_unfocused} >
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }} className="handle">
                        <Image width={20} height={20} alt="icon" src={props.icon.src} className={styles.icon} />
                        <div className={styles.title}>{props.id}</div>
                    </div>
                    <div className={styles.titlecontrols}>
                        <div onClick={handleMinimise} style={{ filter: currTabID == props.id ? "" : unfocusedAdjustment, }} className={styles.minimise}/>
                        <div onClick={handleMaximise} style={{ filter: currTabID == props.id ? "" : unfocusedAdjustment, }} className={isMaximised ? styles.resize : styles.maximise} />
                        <div onClick={handleClose} style={{filter: currTabID == props.id ? "" : unfocusedAdjustment }} className={styles.close} />
                    </div>
                </div>
                <div className={currTabID == props.id ? styles.windowborder : styles.windowborder_unfocused}>
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