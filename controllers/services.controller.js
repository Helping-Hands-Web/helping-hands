const mongoose = require('mongoose');
const Service = require('../models/service.model');
const createError = require('http-errors');
const categories = Object.keys(require('../data/categories'));


module.exports.create = (req, res, next) => {
    res.render('services/new', {
        categories: categories
    });
};

module.exports.doCreate = (req, res, next) => {
    console.log(req.body)
    let serviceCategories = req.body.categories;
    if (serviceCategories && !Array.isArray(serviceCategories)) {
        serviceCategories = [serviceCategories]
    }

    const service = new Service({
        title: req.body.title,
        description: req.body.description,
        tokens: req.body.tokens,
        categories: serviceCategories,
        createdBy: req.user.id
    });

    service
        .save()
        .then(() => {
            res.redirect('/dashboard')
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('services/new', {
                    errors: error.errors,
                    service,
                    categories,
                });
            } else {
                next(error);
            }
        });
}

module.exports.list = (req, res, next) => {
    const { search, category } = req.query;
    const criterial = {}
    if (search || category) {
       criterial.$and = [] 
    }

    if (search) {
        criterial.$and.push({$or:[{
                title: new RegExp(search, 'i')
            },
            {
                description: new RegExp(search, 'i')
            }
        ]       })
    } 
    if (category) {
        criterial.$and.push({categories : category})
    }


    Service.find(criterial)
        .populate('createdBy')
        .sort({
            createdAt: 'desc'
        })
        .then((services) => res.render('services/list', {
            services,
            search
        }))
        .catch((error) => next(error));
};