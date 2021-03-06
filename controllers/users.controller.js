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
    let editedUser = {
        name: req.body.name,
        description: req.body.description
    }

    if (req.file) {
        editedUser.avatar = req.file.path
    }

    User.findByIdAndUpdate(req.user.id, editedUser, { runValidators: true, new: true })
        .then((user) => res.redirect(`/users/${user.id}`))
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('/users/me/edit', {
                  errors: error.errors,
                  user: req.body,
                });
            } else {
                next(error);
            }   
        });
}       


module.exports.dashboard = (req, res, next) => {
    User.findById(req.user.id)
      .populate('services')
      .populate({
          path: 'worksCreated',
          options:  {
            sort: { 'date': -1 }
          },
          populate: {
              path: 'requestedBy'
          }
        })
        .populate({
            path: 'worksRequested',
            options:  {
                sort: { 'date': -1 }
            },
            populate: {
                path: 'createdBy'
            }
        })
      .then((user) => {
          if (user) {
            res.render('users/dashboard', { user })
          } else {
            res.redirect('/');
          }
      })
      .catch(error => next(error))
    
}