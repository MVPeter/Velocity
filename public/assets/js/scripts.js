
// Task list HTML elements
let addTaskButton = document.getElementById('addTaskBtn');
let taskNameEl = document.getElementById('task-name');
let taskTextEl = document.getElementById('task-text');
let taskDayEl = document.getElementById('task-day')
// Meal HTML elements
let addFoodButton = document.getElementById('addFoodBtn');
let mealTypeEl = document.getElementById('meal-type');
let foodEl = document.getElementById('food');
let mealDayEl = document.getElementById('meal-day')


// $(document).ready(() => {
//     $.get("/api/tasks").then(data => {
//         const tasksObject = {
//             tasks: data,
//         };
//         console.log(tasksObject);
//         // res.render('index', tasksObject);
//     })
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
})

function submitTask() {
    let submitType = 'newTask';
    // Task values entered by user
    let newTaskName = taskNameEl.value;
    let newTaskText = taskTextEl.value;
    let newTaskDay = taskDayEl.value;
    // Alert user if inputs are left blank
    if (!newTaskName || !newTaskText || !newTaskDay) {
        alert('Your task is missing some information.');
    }
    // Create a newTask object to send off to the backend
    const newTask = {
        task_name: newTaskName.trim(),
        task_notes: newTaskText.trim(),
        dayOf: newTaskDay.trim(),
        user_id: 1
    }
    console.log('submitTask -> newTask', newTask);
    submitPost(newTask, submitType);
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
    let submitType = 'newMeal';
    // Task values entered by user
    let newMealType = mealTypeEl.value;
    let newMealFood = foodEl.value;
    let newMealDay = mealDayEl.value;
     // Alert user if inputs are left blank
    if (!newMealType || !newMealFood || !newMealDay) {
        alert('Your meal is missing some information.');
    }
    // Create a newMeal object to send off to the backend
    const newMeal = {
        dayOf: newMealDay.trim(),
        mealTime: newMealType.trim(),
        // Hard coded post to always be food_id 11 'Apple' and user_id 1
        food_id: 11,
        user_id: 1
    }
    console.log('submitMeal -> newMeal', newMeal);
    submitPost(newMeal, submitType);
}
// submitPost function posts a newTask or newMeal to api-routes
const submitPost = (newPost, submitType) => {
    console.log(newPost, submitType);
    fetch('/api/' + submitType, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success in submitting newPost:', data)
        })
        .catch((error) => {
            console.error('Error:', error)
        });
};

addTaskButton.onclick = submitTask;
addFoodButton.onclick = submitMeal;
