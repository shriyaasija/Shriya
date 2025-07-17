import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import styles from "./StartBar.module.css";
import greenshield from "../../assets/green_shield.png";
import sound from "../../assets/sound.png";
import internet from "../../assets/internet.png";
import removabledevice from "../../assets/removabledevice.png";
import StartMenu from "../StartMenu/StartMenu";
import TrayTab from "../TrayTab/TrayTab";
import { StaticImageData } from "next/image";
import { Tab } from "../../src/types";
import { useSelector } from "react-redux";

const getTime = () => {
    const date = new Date();
    let hour = date.getHours();
    let hourPostFix = "AM";
    let min = date.getMinutes();
    if (hour >= 12) {
        hour -= 12;
        hourPostFix = "PM";
    }
    if (hour === 0) {
        hour = 12;
    } 
    // Fix the minute formatting
    const formattedMin = min < 10 ? `0${min}` : min;
    return `${hour}:${formattedMin} ${hourPostFix}`;
};

// interface props {
//     tabList: number[];
// }

interface RootState {
    tab: {
        tray: Tab[];
    };
}

const StartBar = () => {
    const [time, setTime] = useState(getTime());
    const ref = useRef<HTMLDivElement>(null);
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [focusedTab, setFocusedTab] = useState<number | null>(null);
    const Tabs = useSelector((state: RootState) => state.tab.tray);

    const handleTabFocus = (tabName: number) => {
        if (focusedTab === tabName) {
            setFocusedTab(null);
            return;
        }
        setFocusedTab(tabName);
    };

    const renderTabs = (title: String, Icon: StaticImageData, index: number) => {
        return (
            <TrayTab key={index} title={title} Icon={Icon} isFocused={index === focusedTab} onFocus={() => handleTabFocus(index)}/>
        );
    };
    
    const handleOpenStartMenu = () => {
        setStartMenuOpen(!startMenuOpen);
    }

    // Time update
    useEffect(() => {
       const timer = setInterval(() => {
        const newTime = getTime();
        newTime !== time && setTime(newTime);
       }, 1000);
       return () => clearInterval(timer);
    }, [time]);

    // Start Menu Detection
    useEffect(() => {
        const handleClickOutside = (event: { target: any}) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setStartMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside, true);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true)
        };
    }, [ref]);

    return (
       <div style={{ zIndex: 0 }}>
            <div className={styles.bluebar}>
                <div ref={ref}>
                    <div onClick={handleOpenStartMenu} className={startMenuOpen ? styles.startbtn_active : styles.startbtn}></div>
                    {startMenuOpen && <StartMenu menuControl={setStartMenuOpen}/>}
                </div>
                <div className={styles.tabbar}>
                    {Array.from(Tabs).map((_item, index) => renderTabs(_item.title, _item.Icon, index))}
                </div>
                <div className={styles.icontray}>
                    <div className={styles.iconrow}>
                        <div className={styles.icon}>
                            <img style={{ margin: "0px 3px 0px 3px"}} height={5} src={greenshield.src} alt="Icon 1" />
                            <img style={{ margin: "0px 3px 0px 3px"}} height={5} src={internet.src} alt="Icon 2" />
                            <img style={{ margin: "0px 3px 0px 3px"}} height={5} src={sound.src} alt="Icon 3" />
                            <img style={{ margin: "0px 3px 0px 3px"}} height={5} src={removabledevice.src} alt="Icon 4" />
                        </div>
                    </div>
                    <div style={{ color: "white", fontSize: "11px", fontWeight: "normal" }} className="time-display">{time}</div>
                </div>
            </div>
       </div>
    );
};

export default StartBar;