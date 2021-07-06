const mongoose = require('mongoose');
const Work = require('../models/work.model');
const Service = require('../models/service.model');
const User = require('../models/user.model');
const createError = require('http-errors');
const categories = Object.keys(require('../data/categories'));



module.exports.create = (req, res, next) => {
    res.render('works/new');
};

// module.exports.doCreate = (req, res, next) => {
//     Service.find('id' = req.params.id)
    
//     .const work = new Work({
//         message: req.body.message,
//         date: req.body.date,
//         createdBy: req.body.service.createdBy,
//         requestedBy: req.user.id,
        
//     })
   
// }