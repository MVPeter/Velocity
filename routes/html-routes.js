// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
const Handlebars = require('handlebars');


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const { response } = require("express");


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

  //isAuthenticated middleware to this route.
  app.get("/landing", isAuthenticated, (req, res) => {
    console.log(isAuthenticated);
    console.log(req.user);

    db.User.findAll({
      where: { id: req.user.id },
      include: [
        {
          model: db.Task,
        },
        {
          model: db.Meal,
        },
      ],
    }).then((user) => {
    res.render("index", {
      tasks : user[0].Tasks,
      meals : user[0].Meals,
      // foods : user[0].Meals[0].Food
    });
    // console.log(user[0].Tasks)
    // console.log(user[0].Meals)
    // console.log(user[0].Meals[0].Food)
    
  })
  })
};