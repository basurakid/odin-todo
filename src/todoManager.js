const projects = [];

class Todo {
    constructor(title, description="", dueDate, priority, done=false){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done;
    }
}

class Project {
    constructor(title){
        this.id = crypto.randomUUID();
        this.title = title;
        this.todos = []
    }
}

//find index of a given project, id can be passed onto it, or it can retrieve it from the h2
function findProjectIndex(id="") {
    if (!id) {
        id = document.querySelector("#current-project").dataset.id;
    }
    return JSON.parse(localStorage.getItem("projects")).findIndex(p => p.id === id);
}

function findTodoIndex(id) {
    const projectId = document.querySelector("#current-project").dataset.id;
    const projectIndex = findProjectIndex(projectId);
    return JSON.parse(localStorage.getItem("projects"))[projectIndex].todos.findIndex(p => p.id === id);
}

function addTodo(data) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    const newTodo = new Todo(data.title, data.description, new Date(data.dueDate), data.priority);

    localProjects[findProjectIndex()].todos.push(newTodo);
    localStorage.setItem("projects", JSON.stringify(localProjects));

    return newTodo.id;
}

function deleteTodo(id) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    localProjects[findProjectIndex()].todos.splice([findTodoIndex(id)], 1)
    
    localStorage.setItem("projects", JSON.stringify(localProjects));
}

function addProject(name) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    const newProject = new Project(name);

    localProjects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(localProjects));

    return newProject.id;
}

function deleteProject(id) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    const deleteIndex = findProjectIndex();

    if (deleteIndex !== -1) {
        localProjects.splice(deleteIndex, 1);
        localStorage.setItem("projects", JSON.stringify(localProjects));  
    } else {
        alert(`Project with id ${id} not found.`);
    }

}

function editDoneStatus(id) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    const projectIndex = findProjectIndex();
    const todoIndex = findTodoIndex(id);
    const doneState = localProjects[projectIndex].todos[todoIndex].done;
    localProjects[projectIndex].todos[todoIndex].done = !doneState;
    localStorage.setItem("projects", JSON.stringify(localProjects));
}

function editTitle(id, editedTitle) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    localProjects[findProjectIndex()].todos[findTodoIndex(id)].title = editedTitle.trim() || "Untitled";
    localStorage.setItem("projects", JSON.stringify(localProjects));
}

function editDate(id, editedDate) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    localProjects[findProjectIndex()].todos[findTodoIndex(id)].dueDate = new Date(editedDate);
    localStorage.setItem("projects", JSON.stringify(localProjects));
}

export { Project, addProject, deleteProject, addTodo, deleteTodo, findProjectIndex, editDoneStatus, editTitle, editDate};