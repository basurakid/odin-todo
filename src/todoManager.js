
const projects = [];

class Todo {
    constructor(title, description="", dueDate, dateAdded, priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Project {
    constructor(title){
        this.id = crypto.randomUUID();
        this.title = title;
        this.todos = []
    }
}

function findProjectIndex () {
    const id = document.querySelector(".current-view h2").dataset.id;
    return JSON.parse(localStorage.getItem("projects")).findIndex(p => p.id === id);
}

function addTodo (data) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    const newTodo = new Todo(data.title, data.description, new Date(data.get("due-date")), data.priority);

    localProjects[findProjectIndex()].todos.push(newTodo);
    localStorage.setItem("projects", JSON.stringify(localProjects));

    return newTodo.id;
}

function addProject (name) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    const newProject = new Project(name);

    localProjects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(localProjects));

    return newProject.id;
}

function deleteProject () {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    const deleteIndex = findProjectIndex();

    if (deleteIndex !== -1) {
        localProjects.splice(deleteIndex, 1);
        localStorage.setItem("projects", JSON.stringify(parsedProjects));  
    } else {
        alert(`Project with id ${id} not found.`);
    }

}

export { Project, addProject, deleteProject, addTodo};