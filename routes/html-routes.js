// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
const Handlebars = require('handlebars');
// const api = require("./api-routes");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

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

  app.get("/landing", isAuthenticated, (req, res) => {

    db.Task.findAll({}).then((task) => {
      res.render('index', {
        tasks: task
      })
    });
  })
  // app.get("/landing", isAuthenticated, async (req, res) => {




  //   try {
  //     await db.Task.findAll().then((task) => {
  //       // res.json(dbtask)
  //       console.log(task);
  //       let dbtaskObject = {
  //         task: task
  //       }

  //       // console.log("routes object " + JSON.stringify(dbtaskObject.task[0]));
  //       // console.log("routes object " + JSON.stringify(dbtask[0]))
  //       res.render('index', {
  //         tasks: task
  //       });
  //     });
  //   } catch (error) {
  //     console.log(error)
  //   }



  // })
};