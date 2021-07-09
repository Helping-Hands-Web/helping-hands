const mongoose = require('mongoose');
const Work = require('../models/work.model');
const Service = require('../models/service.model');
const User = require('../models/user.model');
const createError = require('http-errors');
const categories = Object.keys(require('../data/categories'));



module.exports.create = (req, res, next) => {
    res.render('works/new', { id: req.params.id });
};

module.exports.doCreate = (req, res, next) => {
        Service.findById(req.params.id)
            .then(service => {
                const work = new Work({       
                    title: service.title,
                    description: service.description,
                    tokens: service.tokens,  
                    message: req.body.message,
                    date: req.body.date,
                    service: service,
                    createdBy: service.createdBy,
                    requestedBy: req.user.id,
                    status: "Pending"
                })
                work.save()
                .then(() => res.redirect('/dashboard'))
                .catch((error) => next(error))
            })
            .catch()

       

       
}