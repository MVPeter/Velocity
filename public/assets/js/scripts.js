// const { response } = require("express");


let addTaskButton = document.getElementById("addTaskBtn");
let taskNameEl = document.getElementById("task-name");
let taskTextEl = document.getElementById("task-text");

$(document).ready(() => {
    const getFoodData = () => {
        fetch("/api/food", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.JSON())
            .then((data) => {
                console.log(data);

            })

    }

    $.get("/api/user_data").then(data => {
        console.log(data.email);
        console.log("user_id:  " + data.id)
      });
    


})


function submitTask() {
    // This will need to be changed to a post to store the task to the db
    let newTaskName = taskNameEl.value;
    let newTaskText = taskTextEl.value;
    // Hard code day. This will need to grab the day dropdown.
    let newTaskDay = 'Monday'
    if (!newTaskName || !newTaskText) {
        alert('Your task is missing some content.');
    }
    // Create a newTask object to send off to the backend
    const newTask = {
        task_name: newTaskName.trim(),
        task_notes: newTaskText.trim(),
        dayOf: newTaskDay.trim(),
    }
    console.log('submitTask -> newTask', newTask);
    postTask(newTask);
    // // Create new list element, input checkbox, and delete button
    // let newTaskRow = document.createElement("li");
    // newTaskRow.textContent = newTaskName; 
    // let newTaskInput = document.createElement("input");
    // newTaskInput.setAttribute("type", "checkbox");
    // let delBtn = document.createElement('i');
    // delBtn.classList.add(
    //   'fas',
    //   'fa-trash-alt',
    //   'float-right',
    //   'text-danger',
    //   'delete-task'
    // );
    // newTaskRow.prepend(newTaskInput);
    // newTaskRow.append(delBtn);
    // document.getElementById("tasks").append(newTaskRow);

    taskNameEl.value = "";
    taskTextEl.value = "";
}
const postTask = (task) => {
    console.log(task);
    fetch('/api/newTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success in submitting task:', data)
        })
        .catch((error) => {
            console.error('Error:', error)
        });
};
addTaskButton.onclick = submitTask;