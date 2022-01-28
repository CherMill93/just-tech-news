const path = require('path');
const express = require('express');
const session = require('express-session'); //expression-session connects db to back end | connect-session-sequelize, sets up a library stores that stores the session created in exp-sess 
const exphbs = require('express-handlebars');
//dotenv - npm install deotenv --save

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret', // makes sure cooki works correctly
  cookie: {}, //
  resave: false, //saved back to sess storage
  saveUninitialized: true, //saved to store
  store: new SequelizeStore({ //stores sequelize in store for use
    db: sequelize //const above
  })
}; // test in mysql terminal | connects to a router.get route

app.use(session(sess));

const helpers = require('./utils/helpers'); //the helper from Handlebars.js

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});