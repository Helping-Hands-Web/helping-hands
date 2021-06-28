const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.detail = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            if (user) {
              res.render('users/detail', { user }) ; 
            } else {
                res.redirect('/');
            }
        })
        .catch(error => next(error))
}

module.exports.edit = (req, res, next) => {
    res.render('users/edit', {
        user: req.user
    });
};


module.exports.doEdit = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        avatar: req.file.path,
    }, { runValidators: true, new: true })
        .then((user) => res.redirect(`/users/${user.id}`))
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('/', {
                  errors: error.errors,
                  user: req.body,
        });
    } else {
        next(error);
    }

   });
}       