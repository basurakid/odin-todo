import { addProject, deleteProject, addTodo, findProjectIndex} from "./todoManager";

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
    hiddenDiv.classList("hidden");

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");

    const lowBtn = document.createElement("button");
    lowBtn.textContent = "Low";

    const medBtn = document.createElement("button");
    lowBtn.textContent = "Medium";

    const hiBtn = document.createElement("button");
    lowBtn.textContent = "High";

    btnGroup.appendChild(lowBtn);
    btnGroup.appendChild(medBtn);
    btnGroup.appendChild(hiBtn);


    hiddenDiv.appendChild(btnGroup);

    const description = document.createElement("p");
    description.textContent = todo.description;
    description.classList.add("description");
    hiddenDiv.appendChild(description);

    todoLi.appendChild(hiddenDiv);
}

function loadProjectDisplay(id="") {
    const projectH2 = document.querySelector("#current-project");
    const localProjects = JSON.parse(localStorage.getItem("projects"));

    //checks if we're loading a certain project, or just the default one(first one),
    
    if (!id){
        // if localStorage is empty, disable buttons that would cause issues, modify h2 to let user know there's no 
        if (!localProjects.length) {
            const disableButtons = document.querySelector("#current div").children;
            for (const button of disableButtons){
                button.disabled = true;
            }
            projectH2.textContent = "There are no projects";
            projectH2.setAttribute("data-id", id);
            return;
        } 
        //loads first project on the list
        else {
            id = localProjects[0].id;
            console.log(id);
        }
    } 

    //retrieve the project
    const projectLoading = localProjects[findProjectIndex(id)];
    console.log(projectLoading);
    projectH2.textContent = projectLoading.title;
    projectH2.setAttribute("data-id", id);
    console.log(projectLoading, typeof(projectLoading))

    for (const todo of projectLoading.todos){
        loadTodoDisplay(todo);
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
    const allTaskBtn = document.querySelector();
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

        const currentProjectId = document.querySelector("#current-project").dataset.id;
        addTodo(todoData, currentProjectId);

        loadTodoDisplay(todoData)

        todoModal.close();
    });

    //add project modal button listener
    const addProjectModal = document.querySelector(".new-project-modal")
    document.querySelector("#submit-project").addEventListener("click", () => {
        const nameInput = document.querySelector("#name");
        
        if (nameInput.value) {
            const addProjectId = addProject(nameInput.value);
            const projectsDiv = document.querySelector(".projects");


            const btnProject = document.createElement("button");
            btnProject.classList.add("dashboard-button", "project-button");
            btnProject.textContent = nameInput.value;
            btnProject.setAttribute("data-id", addProjectId);

            projectsDiv.insertBefore(btnProject, projectsDiv.lastElementChild);

            loadProjectDisplay(id)

            nameInput.value = "";
            addProjectModal.close();
        }
    });

    //add delete project listeners
    const deleteProjectModal = document.querySelector(".delete-project-modal");
    addGlobalEventListener("click", "button", deleteProjectModal, (e) => {
        if (e.target.textContent === "Yes") {
            const deleteProjectId = document.querySelector("#current-project").dataset.id;
            deleteProject(deleteProjectId);
            
            projectsDiv.querySelector(`.project-button[data-id="${id}"]`).remove();
            loadProjectDisplay();
            deleteProjectModal.close();

        } else {
            console.log(deleteProjectModal);
            deleteProjectModal.close();
        }
    });
}


function setInitialListeners() {
    addModalListeners();
    addShowModalListeners();

    addDashboardListeners();
}



export { addShowModalListeners, addModalListeners};
