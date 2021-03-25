let addTaskButton = document.getElementById("addTaskBtn");
let taskInput = document.getElementById("taskInput");

function submitTask(){
    let newTask = taskInput.value;
    let newTaskRow = document.createElement("li");

    newTaskRow.textContent = newTask; 
    
    document.getElementById("tasks").append(newTaskRow);
}
addTaskButton.onclick = submitTask; 