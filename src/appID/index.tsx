import { Tab } from "../../src/types";
import cmd from "../../assets/cmd.png";
import mycomp from "../../assets/mycomp.png";

export const AppDirectory: Map<number, Tab> = new Map([
    [6, { title: "Work", Icon: cmd }],
    [2, { title: "Computer", Icon: mycomp }],
    [3, {title: "Documents", Icon: cmd }],
]);