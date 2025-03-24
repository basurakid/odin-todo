
function addShowModalListeners() {
    const addProjectModal = document.querySelector(".new-project-modal");
    console.log(addProjectModal);
    const addProjectBtn = document.querySelector("#add-project")
    console.log(addProjectBtn);

    addProjectBtn.addEventListener("click", () => {
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
        
    })
}

function addGlobalEventListener(type, selector, callback, parent = document) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

export {addShowModalListeners};
