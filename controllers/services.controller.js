const mongoose = require('mongoose');
const Service = require('../models/service.model');
const createError = require('http-errors');
const categories = Object.keys(require('../data/categories.json'));


module.exports.create = (req, res, next) => {
    res.render('services/new', {
        categories: categories
    });
};













