/**
 * Module dependecies
 */
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const nunjucks = require('nunjucks');
const createError = require('http-errors');

const router = require('./routers');
const jsonResponse = require('./middlewares/json-response');

/**
 * Initialize express application
 */
const app = express();

app.set('view engine', 'html'); // view file extension: html
nunjucks.configure(path.join(__dirname, 'views'), {
  watch: true,
  autoescape: true,
  express: app,
});

/**
 * Apply middlewares to express app
 */
app.use(helmet());
app.use(morgan('dev'));
app.use(jsonResponse());
app.use(cookieParser());

// app.use(function (req, res, next) {
//   res.a = 'value';
//   res.sum = function (a, b) {
//     return a + b;
//   };
//   next();
// });

// app.get('/index', function (req, res) {
//   console.log(res.a);
//   return res.send(`${res.sum(3, 6)}`);
// });

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET || 'cat',
  })
); // TODO: Insert option

// qs vs queryset
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // body-parser

app.use(express.static(path.join(__dirname, '../public')));

/**
 * Use routers
 */
app.use('/', router);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    errors: [
      {
        title: err.name,
        message: err.message,
      },
    ],
  });
});

module.exports = app;
