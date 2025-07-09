import { useEffect, useState } from "react";
import styles from "./StartBar.module.css";
import greenshield from "../../assets/green_shield.png"
import sound from "../../assets/sound.png"
import internet from "../../assets/internet.png"
import removabledevice from "../../assets/removabledevice.png"

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
    if (min < 10) {
        min = 0 + min;
    }
    return `${hour}:${min} ${hourPostFix}`
};

const StartBar = () => {
    const [time, setTime] = useState(getTime);
    useEffect(() => {
       const timer = setInterval(() => {
        const newTime = getTime();
        newTime !== time && setTime(newTime);
       }, 1000);
       return () => clearInterval(timer);
    }, [time]);

    return (
        <div className={styles.bluebar}>
            <div style={{ display: "flex" }}>
                <div className={styles.startbtn}></div>
                <div className={styles.tabbar}></div>
            </div>
            <div className={styles.icontray}>
                <div className={styles.iconrow}>
                    <div className={styles.icon}>
                        <img style={{ margin: "0px 3px 0px 3px"}} height={15} src={greenshield.src} alt="Icon 1" />
                        <img style={{ margin: "0px 3px 0px 3px"}} height={15} src={internet.src} alt="Icon 2" />
                        <img style={{ margin: "0px 3px 0px 3px"}} height={15} src={sound.src} alt="Icon 3" />
                        <img style={{ margin: "0px 3px 0px 3px"}} height={15} src={removabledevice.src} alt="Icon 4" />
                    </div>
                </div>
                <div style={{ color: "white" }} className="time-display">{time}</div>
            </div>
        </div>
    );
};

export default StartBar;