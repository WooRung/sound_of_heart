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
const mongoStore = require('connect-mongo');

const router = require('./routers');
const jsonResponse = require('./middlewares/json-response');
const passport = require('./passport');
const configHelmet = require('./helmet');

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
configHelmet(app);
app.use(morgan('dev'));
app.use(jsonResponse());
app.use(cookieParser());

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET || 'cat',
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collection: 'sound_of_heart_session',
    }),
  })
); // TODO: Insert option

// Passport 미들웨어 등록
app.use(passport.initialize());
app.use(passport.session());

// qs vs queryset
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // body-parser

app.use('/static', express.static(path.join(__dirname, '../public')));

/**
 * Use routers
 */
app.use('/', router);

module.exports = app;
