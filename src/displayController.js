

document.querySelector(".new-todo-modal").addEventListener("click", (e) => {
    e.showModal
})

function addGlobalEventListener(type, selector, callback, parent = document) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e);
        }
    })
}