import { Tab } from "../../src/types";
import cmd from "../../assets/cmd.png";
import mycomp from "../../assets/mycomp.png";
import folder_plain from "../../assets/folder_plain.png";
import Work from "@/programs/Work";
import outlook from "../../assets/outlook.png";
import Outlook from "@/programs/Outlook";

export const AppDirectory: Map<number, Tab> = new Map([
    [1, {id: 0, title: "Outlook Express", Icon: outlook, isMinimized: false, zIndex: 0 }],
    [6, { id: 1, title: "Work", Icon: cmd, isMinimized: false, zIndex: 0 }],
    [2, { id: 2, title: "Computer", Icon: mycomp, isMinimized: false, zIndex: 0 }],
    [3, { id: 3, title: "Documents", Icon: folder_plain, isMinimized: false, zIndex: 0 }],
]);