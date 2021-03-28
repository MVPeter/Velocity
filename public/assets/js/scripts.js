// const { response } = require("express");

let addTaskButton = document.getElementById("addTaskBtn");
let taskNameEl = document.getElementById("task-name");
let taskTextEl = document.getElementById("task-text");

let addFoodButton = document.getElementById('addFoodBtn');
let mealTypeEl = document.getElementById('meal-type');
let foodEl = document.getElementById('food');

// $(document).ready(() => {
//     $.get("/api/tasks").then(data => {
//         const tasksObject = {
//             tasks: data,
//         };
//         console.log(tasksObject);
//         // res.render('index', tasksObject);
//     })


// })


function submitTask(){
    // Task values entered by user
    let newTaskName = taskNameEl.value;
    let newTaskText = taskTextEl.value;
    // Hard code day. This will need to grab the day dropdown
    let newTaskDay = 'Monday'
    // Alert user if inputs are left blank
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
function submitMeal() {
    // Task values entered by user
     let newMealType = 'Lunch';
     let newFood = 'Apple';
     // Hard code day. This will need to grab the day dropdown.
     let newTaskDay = 'Monday';
    //  Change this
     if (!newMealType || !newFood) {
         alert('Your task is missing some content.');
     }
     // Create a newMeal object to send off to the backend
     const newTask = {
         task_name: newTaskName.trim(),
         task_notes: newTaskText.trim(),
         dayOf: newTaskDay.trim(),
     }
     console.log('submitTask -> newTask', newTask);
     postTask(newTask);

}
const postTask = (task) => {
    console.log(task);
    fetch('/api/newTask', {
        method: 'POST',
        headers:{
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
addFoodButton.onclick = submitMeal; 