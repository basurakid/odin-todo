
function buttonListenerModals() {
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

function addGlobalEventListener(type, selector, callback, parent = document) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}

export {buttonListenerModals};
