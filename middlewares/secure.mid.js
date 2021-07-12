const createError = require('http-errors');
const Work = require('../models/work.model');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login')
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {
  if(req.user) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};


module.exports.workOwner = (req, res, next) => {
  Work.findById(req.params.id)
    .then((work) => {
      if (work) {
        if (work.createdBy == req.user.id || work.requestedBy == req.user.id) {
          req.work = work;
          next();
        } else {
          next(createError(403));
        }
      } else {
        next(createError(404));
      }
    })
    .catch(next);
  };