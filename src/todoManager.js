
const projects = [];

class ToDo {
    constructor(title, description, dueDate, dateAdded, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.dateAdded = dateAdded;
        this.priority = priority;
    }
}

class Project {
    constructor(title){
        this.title = title;
        this.todos = []
    }
}

function createToDo (data) {
    new ToDo()
}

export const myTasks = new Project("My tasks");