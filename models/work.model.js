const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const workSchema = new Schema({
    title: {
        type: String,
    },

    description: {
        type: String,
    },

    tokens: {
        type: Number,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },

    date: {
        type: Date,
    },

    status: {
        type: String, 
        enum: ['Pending', 'Confirmed', 'Done', 'Cancelled'],
        default: 'Pending',
    },

    message: {
        type: String,
    }

},
 {timestamps : true},
);




const Work = mongoose.model('Work', workSchema);
module.exports = Work;