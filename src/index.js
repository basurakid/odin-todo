import "./style.css";
import {addShowModalListeners, addModalListeners} from "./displayController.js";
import {Project, addProject, deleteProject} from "./todoManager.js";

if (!!localStorage.getItem("projects")) {
    //Set the projects array with demo myTasks project
    console.log("There was no projects item on local storage, adding item and setting base project");
    localStorage.setItem("projects", JSON.stringify([new Project("My Tasks")]));
} else {
    //TODO: load the project on the content div witht its todos
    console.log("There was a project item")
}

addShowModalListeners();

//test addproject and deleteproject

const localProjects = JSON.parse(localStorage.getItem("projects"));
console.log(localProjects);
const projectId = addProject("testName");
console.log(localProjects);
deleteProject(projectId);
console.log(localProjects);

