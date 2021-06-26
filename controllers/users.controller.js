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
