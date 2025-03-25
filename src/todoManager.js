
const projects = [];

class ToDo {
    constructor(title, description, dueDate, dateAdded, priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dateAdded = dateAdded;
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

function addToDo (data) {
    new ToDo()
}

function addProject (name) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    const newProject = new Project(name)

    localProjects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(localProjects));

    return newProject.id;
}

function deleteProject (id) {
    const actualProjects = localStorage.getItem("projects");
    console.log("Raw localStorage value:", localStorage.getItem("projects"));
    console.log("actualProjects variable:", actualProjects);

    const parsedProjects = JSON.parse(actualProjects);
    console.log("Parsed value:", parsedProjects, "Type:", typeof parsedProjects);

    const deleteIndex = parsedProjects.findIndex(p => p.id === id);
    parsedProjects.splice(deleteIndex, 1);
    localStorage.setItem("projects", JSON.stringify(parsedProjects));  
}

export { Project, addProject, deleteProject};