import { addProject, deleteProject, addTodo, deleteTodo, findProjectIndex, editDoneStatus, editTitle} from "./todoManager";
import {format} from "date-fns";

function addGlobalEventListener(type, selector, parent = document, callback) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

function loadTodoDisplay(todo) {
    const todoLi = document.createElement("li");
    todoLi.classList.add(`${todo.priority}-priority`, "todo");
    todoLi.setAttribute("data-id", todo.id);
    
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    todoLi.appendChild(checkbox);
    if (todo.done) {
        checkbox.checked = true;
        todoLi.classList.add("done")
    }

    const title = document.createElement("h3");
    title.textContent = todo.title;
    todoLi.appendChild(title);

    const dueDate = document.createElement("p");
    dueDate.textContent = format(new Date(todo.dueDate), "dd-MM-yyyy");
    todoLi.appendChild(dueDate);

    const showMore = document.createElement("button");
    showMore.classList.add("show-more");
    showMore.textContent = "Show more";
    todoLi.appendChild(showMore);


    const deleteTodo = document.createElement("button");
    deleteTodo.classList.add("close");
    deleteTodo.textContent = "Delete";
    todoLi.appendChild(deleteTodo);

    const hiddenDiv = document.createElement("div");
    hiddenDiv.classList.add("hidden");
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");
    const lowBtn = document.createElement("button");
    lowBtn.textContent = "Low";
    const medBtn = document.createElement("button");
    medBtn.textContent = "Medium";
    const hiBtn = document.createElement("button");
    hiBtn.textContent = "High"
    btnGroup.appendChild(lowBtn);
    btnGroup.appendChild(medBtn);
    btnGroup.appendChild(hiBtn);
    hiddenDiv.appendChild(btnGroup);

    const description = document.createElement("p");
    description.textContent = todo.description;
    description.classList.add("description");
    hiddenDiv.appendChild(description);

    todoLi.appendChild(hiddenDiv);
    
    const todosDiv = document.querySelector("#todos-container");
    todosDiv.appendChild(todoLi);
}

function disableButtons() {
    const disableButtons = document.querySelector("#current div").children;
            for (const button of disableButtons){
                button.disabled = true;
            }
            projectH2.textContent = "There are no projects";
            projectH2.setAttribute("data-id", id);
}

function updateProjectH2(id, name) {
    const projectH2 = document.querySelector("#current-project");
    projectH2.textContent = name;
    projectH2.dataset.id = id;
}

//loads the given project, the first one, or disables the buttons if no projects on local storage, changes h2 content and id
function loadProjectDisplay(id="") {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    //checks if we're loading a certain project, or just the default one(first one),
    if (!id){
        // if localStorage is empty, disable buttons that would cause issues, modify h2 to let user know there's no 
        if (!localProjects.length) {
            disableButtons();
            return;
        } 
        //loads first project on the list
        else {
            id = localProjects[0].id;
        }
    } 
    //retrieve the project
    const projectLoading = localProjects[findProjectIndex(id)];

    updateProjectH2(id, projectLoading.title);

    const todosDiv = document.querySelector("#todos-container");
    todosDiv.textContent = ""
    
    for (const todo of projectLoading.todos){
        loadTodoDisplay(todo);
    }

}

function addProjectButton(id, name) {
    const projectsDiv = document.querySelector("#project-buttons");
    const btnProject = document.createElement("button");
    btnProject.classList.add("dashboard-button", "project-button");
    btnProject.textContent = name;
    btnProject.setAttribute("data-id", id);
    // append before add project button, might change if we add a scrollable div for projects
    projectsDiv.appendChild(btnProject);
}

function setInitialUi() {
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    if (!localProjects.length) {
        disableButtons();
    } else {
        for (const project of localProjects){
            addProjectButton(project.id, project.title);
        }
    
        updateProjectH2(localProjects[0].id, localProjects[0].title);

        for (const todo of localProjects[0].todos){
            loadTodoDisplay(todo);
        }
    }
    
    
}

function addShowModalListeners() {
    //Adds listeners to open the 3 modals to delete and add projects and add todos
    const addProjectModal = document.querySelector(".new-project-modal");
    document.querySelector("#add-project").addEventListener("click", () => {
        addProjectModal.showModal();
    });

    const deleteProjectModal = document.querySelector(".delete-project-modal");
    document.querySelector("#delete-project").addEventListener("click", () => {
        deleteProjectModal.showModal();
    });

    const addTodoModal = document.querySelector(".new-todo-modal");
    document.querySelector("#add-todo").addEventListener("click", () => {
        addTodoModal.showModal();
    });
};

function addDashboardListeners() {
    // TODO
    // set the sorting all todos buttons
    const sortBtns = document.querySelector("#sort-buttons");

    // add global listener
    const projectsDiv = document.querySelector("#project-buttons");
    addGlobalEventListener("click", ".project-button", projectsDiv, (e) => {
        const currentProjectId = document.querySelector("#current h2").dataset.id;
        if (e.target.dataset.id !== currentProjectId){
            loadProjectDisplay(e.target.dataset.id);
        }
    })
}

function addModalListeners() {
    //add todo modal submit listener
    const todoForm = document.querySelector(".new-todo-form");
    const todoModal = document.querySelector(".new-todo-modal");
    todoForm.addEventListener("submit", (event) =>{
        event.preventDefault();
        const todoData = new FormData(todoForm);

        for (const input of todoData.entries()) {
            if (input[0] !== "description" && !input[1]){
                    alert(`You must enter a value in the ${input[0]} field`);
                    return;
            }
        }
        const todoObject = Object.fromEntries(todoData.entries());
        const currentProjectId = document.querySelector("#current-project").dataset.id;
        addTodo(todoObject, currentProjectId);

        loadTodoDisplay(todoObject);

        todoModal.close();
    });
    todoModal.addEventListener("close", () => {
        todoForm.reset();
    })

    //add project modal button listener
    const addProjectModal = document.querySelector(".new-project-modal")
    document.querySelector("#submit-project").addEventListener("click", () => {
        const nameInput = document.querySelector("#name");
        
        if (nameInput.value) {
            const addProjectId = addProject(nameInput.value);

            addProjectButton(addProjectId, nameInput.value);

            loadProjectDisplay(addProjectId);

            addProjectModal.close();
        }
    });
    addProjectModal.addEventListener("close", () => {
        const nameInput = document.querySelector("#name");
        nameInput.value = "";
    })

    //add delete project listeners
    const deleteProjectModal = document.querySelector(".delete-project-modal");
    addGlobalEventListener("click", "button", deleteProjectModal, (e) => {
        if (e.target.textContent === "Yes") {
            const deleteProjectId = document.querySelector("#current-project").dataset.id;
            deleteProject(deleteProjectId);

            const projectsDiv = document.querySelector("#projects-buttons");
            projectsDiv.querySelector(`.project-button[data-id="${id}"]`).remove();
            loadProjectDisplay();
            deleteProjectModal.close();

        } else {
            deleteProjectModal.close();
        }
    });
}

function addTodoListeners() {
    //add listener on checkbox to change todo done state
    const todosContainer = document.querySelector("#todos-container");

    addGlobalEventListener("change", "input[type='checkbox']", todosContainer, (e) =>{
        const checkbox = e.target;
        checkbox.parentElement.classList.toggle("done");

        editDoneStatus(checkbox.parentElement.dataset.id);
    })

    addGlobalEventListener("click", ".close", todosContainer, (e) =>{
        deleteTodo(e.target.parentElement.dataset.id);
        e.target.parentElement.remove();
    })

    addGlobalEventListener("click", ".show-more", todosContainer, (e) =>{
        const hiddenDiv = e.target.parentElement.querySelector(".hidden");
        e.target.classList.toggle("show-less")
        hiddenDiv.classList.toggle("visible");
    })

    addGlobalEventListener("click", "h3", todosContainer, (e) => {
        const todoTitle = e.target;
        const todoInput = document.createElement("input");
        todoInput.type = "text";
        todoInput.value = todoTitle.textContent;
        todoInput.classList.add("title-input");

        todoTitle.replaceWith(todoInput);
        todoInput.focus();

        todoInput.addEventListener("blur", saveTitle);
        todoInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter"){
                saveTitle();
                editTitle(e.target.parentElement.dataset.id, todoInput.value);
            }
        })

        function saveTitle() {
            const editedH3 = document.createElement("h3");
            editedH3.textContent = todoInput.value.trim() || "Untitled";
            const replaceInput = document.querySelector(".title-input");
            setTimeout(() => {
                replaceInput.replaceWith(editedH3);
            }, 0);
        }
    })

    addGlobalEventListener("click", "li > p", todosContainer, (e) => {
        const todoDate = e.target;
        const todoInput = document.createElement("input");
        todoInput.type = "date";
        todoInput.classList.add("date-input");

        todoDate.replaceWith(todoInput);
        todoDate.focus();
    })

}


function setInitialListeners() {
    addModalListeners();
    addShowModalListeners();

    addDashboardListeners();
    addTodoListeners();
}



export {setInitialListeners, setInitialUi};
