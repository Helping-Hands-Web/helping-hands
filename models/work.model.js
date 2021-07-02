const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const workSchema = new Schema({
   
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    },

    date: {
        type: Date,

    },

    time: {
        type: Time,
        
    },

    status: {
        type: String, 
        enum: ['pending', 'confirmed', 'done', 'cancel'],
    }
    
    

},
 {timestamps : true},
);




const Work = mongoose.model('Work', workSchema);
module.exports = Work;