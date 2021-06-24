const mongoose = require('mongoose'); //para que????

module.exports.home = (req, res, next) => {
    res.render('common/home')
}