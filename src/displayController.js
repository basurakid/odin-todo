function addGlobalEventListener(type, selector, parent = document, callback) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
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
    todoForm.addEventListener("submit", (event) =>{
        event.preventDefault();

        const todoData = new FormData(todoForm);
        
    });

    //add project modal button listener
    document.querySelector("#submit-project").addEventListener(() => {
        const nameInput = document.querySelector("#name");
        const addProjectId = add_project(nameInput.value);

        updateProjectDisplay(addProjectId, nameInput.value, true)

        nameInput.value = "";
        projectModal.parent.close();
    });

    //add delete project listeners
    const deleteProjectModal = document.querySelector(".delete-project-modal");
    addGlobalEventListener("click", "button", deleteProjectModal, (e) => {
        if (e.textContent = "Yes") {
            const deleteProjectId = document.querySelector(".current-view h2").dataset.id;

            deleteProject(deleteProjectId);
            
            updateProjectDisplay(addProjectId, "", false);
        };
    });
}



export { addShowModalListeners, addModalListeners};
