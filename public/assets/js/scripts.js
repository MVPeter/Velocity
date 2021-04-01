
// Task list HTML elements
let addTaskButton = document.getElementById('addTaskBtn');
let taskNameEl = document.getElementById('task-name');
let taskTextEl = document.getElementById('task-text');
let taskDayEl = document.getElementById('task-day')
// Meal HTML elements
let addFoodButton = document.getElementById('addFoodBtn');
let mealTypeEl = document.getElementById('meal-type');
let foodEl = document.getElementById('food');
let mealDayEl = document.getElementById('meal-day');
let currentUserId = "";
let allFood = "FISH AND TACOS BUT NOT FISH TACOS";


$(document).ready(() => {
    // $.get("/api/food").then((response) => response.json())
    // .then((fooddb) => {
    //     allFood = fooddb.food;
    //     console.log(allFood);
    // })
    // function populateDd () {

    // }
    const getFoodData = () => {
        fetch("/api/food", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((foodDB) => {
                allFood = foodDB

                // Populate food dropdown with the food from the database
                for (i = 0; i < allFood.length; i++) {
                    let foodListEl = document.createElement("option");
                    foodListEl.value = allFood[i].id;
                    foodListEl.textContent = allFood[i].food;
                    foodEl.append(foodListEl)
                }
            })
    }
    getFoodData()

    const getMealData = () => {
        fetch("/api/meal", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((mealDB) => {
                allMeals = mealDB;
                console.log(allMeals)

                for (i = 0; i < allMeals.length; i++) {
                    let mealID = parseInt(allMeals[i].food_id)
                    let foundFood = allFood.find(food => food.id === mealID);
                    switch (allMeals[i].mealTime) {
                
                        case "Breakfast":
                            $("#mealBreakfast").append(`<li> ${foundFood.food} </li>`)
                            break;
                        case "Lunch":
                            $("#mealLunch").append(`<li> ${foundFood.food}</li>`)
                            break;
                        case "Dinner":
                            $("#mealDinner").append(`<li> ${foundFood.food}</li>`)
                            break;
                        case "Snack":
                            $("#mealSnack").append(`<li> ${foundFood.food}</li>`)
                            break;
                
                    }
                }
            })
    }
    getMealData()



    $.get("/api/user_data").then(data => {
        console.log(data.email);
        console.log("user_id:  " + data.id)
        currentUserId = data.id
    });

})


function submitTask() {
    let submitType = 'newTask';
    // Task values entered by user
    let newTaskName = taskNameEl.value;
    let newTaskText = taskTextEl.value;
    // let newTaskDay = taskDayEl.value;
    // Alert user if inputs are left blank
    if (!newTaskName || !newTaskText) {
        alert('Your task is missing some information.');
    }
    // Create a newTask object to send off to the backend
    const newTask = {
        task_name: newTaskName.trim(),
        task_notes: newTaskText.trim(),
        // dayOf: newTaskDay.trim(),
        user_id: currentUserId
    }
    console.log('submitTask -> newTask', newTask);
    submitPost(newTask, submitType);
    taskNameEl.value = "";
    taskTextEl.value = "";
    location.reload()
}

$(".taskbutton").on("click", function (event) {
    event.preventDefault()
    let buttonId = $(this).data("id")
    let taskStatus = $(this).data("taskcomplete")
    console.log(buttonId + "   " + taskStatus)
    $.ajax("/api/completetask/" + buttonId, {
        type: "PUT",
        data: { "task_complete": taskStatus }
    }).then(
        () => {
            console.log("completed")
            location.reload()
        }
    )
})


function submitMeal() {
    let submitType = 'newMeal';
    // Task values entered by user
    let newMealType = mealTypeEl.value;
    let newMealFood = foodEl.value;
    // let newMealDay = mealDayEl.value;
    // Alert user if inputs are left blank
    if (!newMealType || !newMealFood) {
        alert('Your meal is missing some information.');
    }
    // Create a newMeal object to send off to the backend
    const newMeal = {
        // dayOf: newMealDay.trim(),
        mealTime: newMealType.trim(),
        food_id: foodEl.value,
        user_id: currentUserId
    }

    let mealID = parseInt(newMeal.food_id)
    let foundFood = allFood.find(food => food.id === mealID);
    switch (newMeal.mealTime) {

        case "Breakfast":
            $("#mealBreakfast").append(`<li> ${foundFood.food} </li>`)
            break;
        case "Lunch":
            $("#mealLunch").append(`<li> ${foundFood.food}</li>`)
            break;
        case "Dinner":
            $("#mealDinner").append(`<li> ${foundFood.food}</li>`)
            break;
        case "Snack":
            $("#mealSnack").append(`<li> ${foundFood.food}</li>`)
            break;

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
