const db = require('../models');
const passport = require("../config/passport");
// const Food = require('../models/Food');

//Routes
module.exports = (app) => {
    //GET


    app.get('/api/meal', (req, res) => {
        db.Meal.findAll().then((dbMeal) => res.json(dbMeal));
    });

    app.get('/api/food', (req, res) => {
        db.Food.findAll().then((dbFood) => res.json(dbFood));
        // console.log(dbFood[0].food);
    });



    // Route for logging user out
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

    //POST newTask
    app.post('/api/newTask', (req, res) => {
        console.log(req.body);
        db.Task.create({
            task_name: req.body.task_name,
            task_notes: req.body.task_notes,
            dayOf: req.body.dayOf,
            user_id: req.body.user_id
        })
            .then((task) => {
                res.json(task);
            })
    });
    //POST newMeal
    app.post('/api/newMeal', (req, res) => {
        console.log(req.body);
        db.Meal.create({
            dayOf: req.body.dayOf,
            mealTime: req.body.mealTime,
            food_id: req.body.food_id,
            user_id: req.body.user_id
        })
            .then((task) => {
                res.json(task);
            })
    });

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(() => {
                res.redirect(307, "/api/login");
            })
            .catch(err => {
                res.status(401).json(err);
            });
    });

    //PUT
    app.put('/api/updateTasks', (req, res) => {

    });
    app.put('/api/updateMeal', (req, res) => {

    });

    app.put('/api/completetask/:id', (req, res) => {
        console.log(req.body.task_complete)
        let status = "";
        if (req.body.task_complete === "false") {
            status = true;
        } else {
            status = false;
        }
        db.Task.update(
            { task_complete: status },
            {
                where:
                    { id: req.params.id },
            }
        ).then((dbTask) => res.json(dbTask))
    })

    //DELETE
    app.delete('api/delTasks', (req, res) => {

    });
    app.delete('api/delMeal', (req, res) => {

    });

}