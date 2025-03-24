import "./style.css";
import {addShowModalListeners, addModalListeners} from "./displayController.js";
import {Project, addProject} from "./todoManager.js";

if (!localStorage.getItem("projects")) {
    //Set the projects array with demo myTasks project
    localStorage.setItem("projects", JSON.stringify([new Project("My Tasks")]));
} else {
    //TODO: load the project on the content div witht its todos
    console.log("it works?")
}

addShowModalListeners();
