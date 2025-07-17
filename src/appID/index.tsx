import { Tab } from "../../src/types";
import cmd from "../../assets/cmd.png";
import mycomp from "../../assets/mycomp.png";
import folder_plain from "../../assets/folder_plain.png";

export const AppDirectory: Map<number, Tab> = new Map([
    [6, { id: 1, title: "Work", Icon: cmd }],
    [2, { id: 2, title: "Computer", Icon: mycomp }],
    [3, { id: 3, title: "Documents", Icon: folder_plain }],
]);