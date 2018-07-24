'use strict'

const path = require('path');
const express = require('express');
const layout = require('express-layout');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const validator = require('express-validator');
const logger = require('node-commons').logger;

// const bodyParser = require('body-parser');

const routes = require('./routes');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middlewares = [
  layout(),
  express.static(path.join(__dirname, 'public')),
  // bodyParser.urlencoded(),
  cookieParser(),
  validator(),
  session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }),
  flash()
];
app.use(middlewares);

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
});

app.use((err, req, res, next) => {
    logger.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, () => {
    logger.info(`App running at http://localhost:3000`)
});
