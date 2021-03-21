const express = require('express');
const mysql = require('mysql2');
const db = require('./models');

// Requiring passport as we've configured it
let passport = require("./config/passport");

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
const app = express();
app.use(express.static('public'));
// Set up Express 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const exphbs = require('express-handlebars');

//Handlebars config
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// routes
const routes = require('./controllers/controller.js');

app.use(routes);

// Start server
db.sequelize.sync().then(function () {
  app.listen(PORT, () =>
    console.log(`Server listening on: http://localhost:${PORT}`)
  );
});