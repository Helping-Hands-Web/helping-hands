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


module.exports.doConfirm = ( req, res, next) => {

    Work.findById(req.params.id)
        .populate('requestedBy')
        .then((work) => {
            if(work.requestedBy.tokens >= work.tokens) {
                work.requestedBy.tokens -= work.tokens
                work.requestedBy.save()
                    .then((user) => {
                        work.status = 'Confirmed'
                        work.save()
                            .then((work) => {
                                res.redirect('/dashboard')
                            })
                            .catch(next)
                    })
                    .catch(next)
            } else {
                res.send("You don't have credits")
                // TODO: 
            }

        })
        .catch(next)

}

// module.exports.doConfirm = ( req, res, next) => 
//     Work.findByIdAndUpdate(req.params.id, {status: 'Confirmed'})
//     .populate('requestedBy')
//     .then((work) => {
//         User.findByIdAndUpdate(work.requestedBy._id, {tokens: requestedBy.tokens - work.tokens})
//         .then((user) => res.redirect('/dashboard'))
//         .catch((error) => next(error))
//     })
//     .catch((error) => next(error))
// }


module.exports.doDone = ( req, res, next) => {

    Work.findByIdAndUpdate(req.params.id, {status: 'Done'})
    .then((work) => {
        res.redirect('/dashboard')
    })
    .catch((error) => next(error))
}




module.exports.doCancel = ( req, res, next) => {

    Work.findByIdAndUpdate(req.params.id, {status: 'Cancelled'})
    .then((work) => {
        res.redirect('/dashboard')
    })
    .catch((error) => next(error))
}