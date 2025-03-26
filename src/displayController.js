import { addProject, deleteProject, addTodo, findProjectIndex} from "./todoManager";

function addGlobalEventListener(type, selector, parent = document, callback) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

function loadProjectDisplay(id="") {
    const localProjects = localStorage.getItem("projects");
    const projectH2 = document.querySelector("#current-project");

    //checks if we're loading a certain project, or just the default one(first one), if localStorage is empty, disable buttons that would cause issues
    if (!id){
        if (!localProjects.length) {
            const disableButtons = document.querySelector("#current div").children;
            for (const button of disableButtons){
                button.disabled = true;
                
                projectH2.textContent = "There are no projects";
                projectH2.setAttribute("data-id", id);
            }
            return;
        } 
        //loads first project on the list
        else {
            id = document.querySelector(".projects").firstElementChild.dataset.id;
        }
    } 

    //retrieve the project
    const projectLoading = localStorage.getItem("projects")[findProjectIndex(id)];
    projectH2.textContent = projectLoading.name;
    

}

// Used only with modals to add and delete buttons/title on h2
function updateProjectDisplay(id, name="", isAdded) {
    const projectsDiv = document.querySelector(".projects");

    if (isAdded) {
        const btnProject = document.createElement("button");
        btnProject.classList.add("dashboard-button", "project-button");
        btnProject.textContent = name;
        btnProject.setAttribute("data-id", id);

        projectsDiv.insertBefore(btnProject, projectsDiv.lastElementChild);



        loadProjectDisplay(id)
    } else {
        projectsDiv.querySelector(`.project-button[data-id="${id}"]`).remove();
        
        if (!localStorage.getItem("projects").length) {
            const disableButtons = document.querySelector("#current div").children;
            for (const button of disableButtons){
                button.disabled = true;
            }
        } else {
            loadProjectDisplay()
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

        const currentProjectId = document.querySelector(".current-view h2").dataset.id;
        addTodo(todoData, currentProjectId);
        todoModal.close();
    });

    //add project modal button listener
    const addProjectModal = document.querySelector(".new-project-modal")
    document.querySelector("#submit-project").addEventListener("click", () => {
        const nameInput = document.querySelector("#name");
        
        if (nameInput.value) {
            const addProjectId = addProject(nameInput.value);

            updateProjectDisplay(addProjectId, nameInput.value, true)

            nameInput.value = "";
            addProjectModal.close();
        }
    });

    //add delete project listeners
    const deleteProjectModal = document.querySelector(".delete-project-modal");
    addGlobalEventListener("click", "button", deleteProjectModal, (e) => {
        if (e.target.textContent === "Yes") {

            deleteProject(deleteProjectId);
            
            updateProjectDisplay(findPro, "", false);
            deleteProjectModal.close();

        } else {
            console.log(deleteProjectModal);
            deleteProjectModal.close();
        }
    });
}



export { addShowModalListeners, addModalListeners};
