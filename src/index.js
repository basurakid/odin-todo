import "./style.css";
import {createHomeLayout} from "./home.js";
import {createMenuLayout} from "./menu.js";
import {createAboutLayout} from "./about.js";

const buttons = document.querySelectorAll("nav button");
buttons[0].addEventListener("click", createHomeLayout);
buttons[1].addEventListener("click", createMenuLayout);
buttons[2].addEventListener("click", createAboutLayout);

createHomeLayout();

