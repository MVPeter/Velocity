// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
const Handlebars = require('handlebars');
// const api = require("./api-routes");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { response } = require("express");
// const { DataTypes } = require("sequelize/types");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/landing");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {

      res.redirect("/landing");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  //   app.get("/members", isAuthenticated, (req, res) => {
  //     res.sendFile(path.join(__dirname, "../public/members.html"));
  //   });
  // where: {user_id: currentUserId, dayOf: taskDayEl} 

  app.get("/landing", isAuthenticated, (req, res) => {
    // let taskDayEl = document.getElementById('task-day');
    // let currentUserId = data.id;
    // console.log(currentUserId);
    console.log(isAuthenticated);
    console.log(req.user);
    // db.Task.findAll({ where: { user_id: req.user.id } }).then((task) => {

    //   res.render('index', {
    //     tasks: task
    //   })
    //   console.log(task);

    // });
    db.User.findAll({
      where: { id: req.user.id },
      include: [
        {
          model: db.Task,
          // where: { user_id: req.user.id },
        },
        {
          model: db.Meal,
          include: [
            {
              model: db.Food,
            }
          ],
        },
      ],
    }).then((user) => {
      // let dbData = JSON.parse(JSON.stringify(user))
      // let dbDataObject = json(dbData)
    //  let dbUserObject = {
    //   userDbObject: user
    // };
    // console.log("This is DB data: " + dbUserObject);
    
    res.render("index", {tasks : user});
    console.log(user)
    
  })
      // res.render('index', {
      //   user: dbData

      // })

    // });
  })



};