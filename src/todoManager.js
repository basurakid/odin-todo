
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
    const actualProjects = JSON.parse(localStorage.getItem("projects"));
    const updatedProjects = actualProjects.push(new Project(name));
    localStorage.setItem("projects", updatedProjects);
}

function deleteProject (id) {
    const actualProjects = JSON.parse(localStorage.getItem("projects"));

    const deleteIndex = actualProjects.findIndex(p => p.id = id);
    localStorage.setItem("projects") = JSON.stringify(actualProjects.splice(deleteIndex, 1));
}

export { Project, addProject};