const express = require('express');
const mysql = require('mysql');

const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// Set up Express 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// routes
const routes = require('./controllers/controller.js');

app.use(routes);

// Start server
app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);