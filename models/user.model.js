const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;


const userSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        minLength: [3, 'Name needs at least 3 chars'],
    },

    email: {
      type: String,
      required: 'Email is required',
      match: [EMAIL_PATTERN, 'Email is not valid'],
      unique: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
    },
    social: {
      google: {
        type: String,
      },
    },
    password: {
      type: String,
      required: 'Password is required',
      match: [PASSWORD_PATTERN, 'Password needs at least 8 chars'],
    },

    description: {
      type: String,
      default: "",
    },

    tokens: {
      type: Number,
      default: 5,
    },

});


userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt
      .hash(user.password, SALT_ROUNDS)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;