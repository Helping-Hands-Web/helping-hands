require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const categories = require('./data/categories');


//Configurations
require('./config/hbs.config');
require('./config/db.config');
require('./config/passport.config');
const session = require('./config/session.config');

const app = express();

//view engine setup
app.set('views', (path.join(__dirname, '/views')));
app.set('view engine', 'hbs');

//Middlewares
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.allCategories = categories;
    res.locals.path = req.path;
    res.locals.currentUser = req.user;
    next()
});

//Set routes
const router = require('./config/routes.config');
app.use('/', router);

//Error handling
app.use((req, res, next) => {
    next(createError(404, 'Page not found'));
});

app.use((error, req, res, next) => {
    console.error(error);
    const status = error.status || 500;

    res.status(status).render('error', {
        message:error.message,
        error: req.app.get('env') === 'development' ? error : {},
        });
});



//port
const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
    console.log(`ready listening on port ${port}`)
});