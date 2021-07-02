const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const categories = require('../data/categories')

const serviceSchema = new Schema({
    title: {
        type: String,
        required: 'Title is required',
        minLength: [5, 'Title needs at least 5 characters'],
    },
    description: {
        type: String,
        required: 'Description is required',
        minLength: [5, 'Description needs at least 5 characters'],
    },
    tokens: {
        type: Number,
        required: true,
    },
    categories: {
        type: [{
            type: String,
            enum: categories.map((c) => c.id)
        }],
        validate: {
            validator: function(categories) {
                return categories.length >= 1;
            },
            message: 'Choose at least one category'
          }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},
 {timestamps : true},
);


const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;