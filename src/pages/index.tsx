import Head from "next/head";
import { Inter } from "next/font/google";
import StartBar from "../../components/StartBar/StartBar";
import "98.css"
import styles from "@/styles/Home.module.css";
import DesktopIcon from "../../components/DesktopIcons/DesktopIcon";
import mycomp from "../../assets/mycomp.png";
import internet from "../../assets/internet.png";
import bin from "../../assets/recycling_bin.png";
import pdf from "../../assets/pdf.png";
import github from "../../assets/github.png";
import cmd from "../../assets/cmd.png";
import solitaire from "../../assets/solitaire.png";
import linkedin from "../../assets/linkedin.png";
import Win from "../../components/Win/Win";
import { useState } from "react";
import store from "@/redux/store";
import { AppDirectory } from "@/appID";
import { RootState, Tab } from "@/types";
import { addTab } from "@/redux/tabSlice";
import { useSelector } from "react-redux";

export default function Home() {
    const Tabs = useSelector((state: RootState) => state.tab.tray);
    const currTabID = useSelector((state: RootState) => state.tab.id);

    const handleRunApp = (e: number) => {
        const newTab = {...AppDirectory.get(e), id: currTabID};
        store.dispatch(addTab(newTab));
    }

    const iconClicked = () => {
        console.log("Icon clicked");
    };

    const handleOpenGitHub = () => {
        window.open("https://github.com/shriyaasija", "_blank", "noreferrer");
    };

    const handleOpenLinkedin = () => {
        window.open("https://www.linkedin.com/in/shriya-asija/", "_blank", "noreferrer");
    };

    const handleOpenResume = () => {
        window.open("./resume.pdf");
    }

    return (
        <>
            <Head>
                <title>Shriya's Personal Website - Home Page</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <DesktopIcon appID={1} doubleClick={iconClicked} title="My Comp" img={internet} />
                <DesktopIcon appID={2} doubleClick={iconClicked} title="Recycling Bin" img={bin} />
                <DesktopIcon appID={3} doubleClick={handleOpenResume} title="Resume" img={pdf} />
                <DesktopIcon appID={4} doubleClick={handleOpenLinkedin} title="LinkedIn" img={linkedin} />
                <DesktopIcon appID={5} doubleClick={handleOpenGitHub} title="GitHub" img={github} />
                <DesktopIcon appID={6} doubleClick={() => handleRunApp(2)} title="Work" img={cmd} />
                <DesktopIcon appID={7} doubleClick={iconClicked} title="Hobbies" img={solitaire} />
                {Tabs.map((tab, index) => {
                    return tab.isMinimized ? (<></>) : (
                        <Win key={index} id={tab.id} title={tab.title} width={"500"} icon={tab.Icon}>
                            {"Tab index: " + index}
                        </Win>
                    );
                })}
            </main>
            <StartBar/>
        </>
    );
}