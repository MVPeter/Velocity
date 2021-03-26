let addTaskButton = document.getElementById("addTaskBtn");
let taskNameEl = document.getElementById("task-name");
let taskTextEl = document.getElementById("task-text");

function submitTask(){
    // This will need to be changed to a post to store the task to the db
    let newTaskName = taskNameEl.value;
    let newTaskText = taskTextEl.value;
    // Create new list element, input checkbox, and delete button
    let newTaskRow = document.createElement("li");
    newTaskRow.textContent = newTaskName; 
    let newTaskInput = document.createElement("input");
    newTaskInput.setAttribute("type", "checkbox");
    let delBtn = document.createElement('i');
    delBtn.classList.add(
      'fas',
      'fa-trash-alt',
      'float-right',
      'text-danger',
      'delete-task'
    );
    newTaskRow.prepend(newTaskInput);
    newTaskRow.append(delBtn);
    document.getElementById("tasks").append(newTaskRow);

    taskNameEl.value = "";
    taskTextEl.value = "";

}
addTaskButton.onclick = submitTask; 