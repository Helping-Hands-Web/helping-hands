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
                if( req.user.tokens >= service.tokens) {
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
                      .then(() => {
                          Work.findById(work.id)
                           .populate('requestedBy')
                           .then((work) => {
                               work.requestedBy.tokens -= work.tokens;
                               work.requestedBy.save()
                                .then((user) => {
                                    work.status = 'Pending'
                                    work.save()
                                        .then((work) => {
                                            res.redirect('/dashboard')
                                        })
                                        .catch(next)
                                })
                                .catch(next)
                           })
                           .catch(next)
                      })
                      .catch(next)
                } else {
                    req.session.flash = "No tokens available! Offer your services and help somebody to get more tokens!"
                    res.redirect('/services')
                }
                
            })
            .catch(next)  
}


module.exports.doConfirm = ( req, res, next) => {
    Work.findByIdAndUpdate(req.params.id, {status: 'Confirmed'})
    .then((work) => {
        res.redirect('/dashboard')
    })
    .catch((error) => next(error))
}


module.exports.doDone = ( req, res, next) => {

    Work.findByIdAndUpdate(req.params.id, {status: 'Done'})
    .then((work) => {
        res.redirect('/dashboard')
    })
    .catch((error) => next(error))
}




// module.exports.doCancel = ( req, res, next) => {

//     Work.findByIdAndUpdate(req.params.id, {status: 'Cancelled'})
//     .populate('requestedBy')
//     .then((work) => {
//         work.requestedBy.tokens += work.tokens;
//         res.redirect('/dashboard')
        
//     })
//     .catch((error) => next(error))
// }

