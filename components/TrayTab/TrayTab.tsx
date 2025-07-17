import styles from "./TrayTab.module.css";

const TrayTab = () => {
    return (
        <div className={styles.tab_container}>
            <div className={styles.tab_icon}></div>
            <div className={styles.tab_text}>fritbvi</div>
        </div>
    )
};

export default TrayTab;