import "./style.css";
import {addShowModalListeners} from "./displayController.js";
import myTasks from "./todoManager.js";

if (!localStorage.getItem("projects")) {
    //Set the projects array with demo myTasks project
    localStorage.setItem("projects", myTasks)
} else {
    //TODO: load the project on the content div witht its todos
}

addShowModalListeners();
