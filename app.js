require('dotenv').config();
const express = require('express');
const path = require('path');
require('./config/hbs.config')


const app = express();

//view engine setup
app.set('views', (path.join(__dirname, '/views')));
app.set('view engine', 'hbs');

//Middleware
app.use(express.static(path.join(__dirname, 'public')));


//router
const router = require('./config/routes.config');
app.use('/', router);

//port
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.log(`ready listening on port ${port}`)
});