import { isAfter, isThisISOWeek, isToday } from "date-fns";

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

class sortTodo {
    constructor(todo, projectId){
        this.todo = todo;
        this.projectId = projectId;
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

function addTodo(data) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    if (data.priority !== "high" || data.priority !== "medium" || data.priority !== "low"){
        data.priority = "medium";
    }
    const newTodo = new Todo(data.title, data.description, new Date(data.dueDate), data.priority);


    localProjects[findProjectIndex()].todos.push(newTodo);
    localStorage.setItem("projects", JSON.stringify(localProjects));

    return newTodo.id;
}

function deleteTodo(id, projectId = "") {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    if (projectId) {
        localProjects[findProjectIndex(projectId)].todos.splice([findTodoIndex(id)], 1)
    }
    else {
        localProjects[findProjectIndex()].todos.splice([findTodoIndex(id)], 1)
    }
    
    
    localStorage.setItem("projects", JSON.stringify(localProjects));
}

function editDoneStatus(projectId = "", id) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    if (!projectId) {
        const projectIndex = findProjectIndex();
    }
    else {
        const projectIndex = findProjectIndex(projectId);
    }
    const todoIndex = findTodoIndex(id);
    const doneState = localProjects[projectIndex].todos[todoIndex].done;
    localProjects[projectIndex].todos[todoIndex].done = !doneState;
    localStorage.setItem("projects", JSON.stringify(localProjects));
}

function editTitle( projectId = "", id, editedTitle) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    if (projectId) {
        localProjects[findProjectIndex(projectId)].todos[findTodoIndex(id)].title = editedTitle.trim() || "Untitled";
    }
    else {
        localProjects[findProjectIndex()].todos[findTodoIndex(id)].title = editedTitle.trim() || "Untitled";
    }

    localStorage.setItem("projects", JSON.stringify(localProjects));
}

function editDate(projectId = "", id, editedDate) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    if (projectId) {
        localProjects[findProjectIndex(projectId)].todos[findTodoIndex(id)].dueDate = new Date(editedDate);
    }
    else {
        localProjects[findProjectIndex()].todos[findTodoIndex(id)].dueDate = new Date(editedDate);
    }

    localStorage.setItem("projects", JSON.stringify(localProjects));
}

function editPriority(projectId = "", id, editedPriority) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    if (projectId) {
        localProjects[findProjectIndex(projectId)].todos[findTodoIndex(id)].priority = editPriority;
    } 
    else {
        localProjects[findProjectIndex()].todos[findTodoIndex(id)].priority = editedPriority;
    }
    localStorage.setItem("projects", JSON.stringify(localProjects));
}

function editDescription(projectId = "", id, editedDescription) {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    
    if (projectId) {
        localProjects[findProjectIndex(projectId)].todos[findTodoIndex(id)].description = editedDescription.trim() || "";
    }
    else {
        localProjects[findProjectIndex()].todos[findTodoIndex(id)].description = editedDescription.trim() || "";
    }
    localStorage.setItem("projects", JSON.stringify(localProjects));
}

function getAllTodos() {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    const allTodos = []

    if (localProjects.length) {
        for (const project of localProjects){
            for (const todo of project.todos) {
                allTodos.push(new sortTodo(todo, project.id))
            }
        }
    }

    return allTodos[0] ? allTodos : "";
}

function sortTodos(sortBy) {
    const unsortedTodos = getAllTodos();
    
    if (unsortedTodos){
        if (sortBy === "all-todos"){
            return unsortedTodos;
        } 
        else if (sortBy === "today-todos"){
            const sortedTodos = unsortedTodos.filter((todo) => isToday(new Date(todo.todo.dueDate)));
            return sortedTodos;
        }
        else if (sortBy === "week-todos"){
            const sortedTodos = unsortedTodos.filter((todo) => isThisISOWeek(new Date(todo.todo.dueDate)));
            sortedTodos.sort((a,b) => isAfter(a.todo.dueDate, b.todo.dueDate) ? 1 : -1);
            return sortedTodos;
        }
        else if (sortBy === "priority-todos"){
            const sortedTodos = unsortedTodos.filter((todo) => todo.todo.priority === "high");
            return sortedTodos;
        }
    }
    
}

export { Project, addProject, deleteProject, addTodo, deleteTodo, findProjectIndex, editDoneStatus, editTitle, editDate, editPriority, editDescription, sortTodos};