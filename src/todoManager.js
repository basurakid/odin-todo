
const projects = [];

class Todo {
    constructor(title, description="", dueDate, dateAdded, priority){
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

function addTodo (data, id) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    newTodo = new ToDo(data.title, data.description, new Date(data.get("due-date")), data.priority);
    console.log(newTodo)
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

    const parsedProjects = JSON.parse(actualProjects);

    const deleteIndex = parsedProjects.findIndex(p => p.id === id);

    if (deleteIndex !== -1) {
        parsedProjects.splice(deleteIndex, 1);
        localStorage.setItem("projects", JSON.stringify(parsedProjects));  
    } else {
        alert(`Project with id ${id} not found.`);
    }

}

export { Project, addProject, deleteProject, addTodo};