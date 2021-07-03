const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const workSchema = new Schema({
   
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

    dueDate: {
        type: Date,
    },

    status: {
        type: String, 
        enum: ['pending', 'confirmed', 'done', 'cancel'],
        default: 'pending',
    },

    message: {
        type: String,
    }

},
 {timestamps : true},
);




const Work = mongoose.model('Work', workSchema);
module.exports = Work;