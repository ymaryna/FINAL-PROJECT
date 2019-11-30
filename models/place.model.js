const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    Localization: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [EMAIL_PATTERN, 'Email is invalid']
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password needs at last 8 chars']
    },
    avatar: {
      type: String,
    },
    validateToken: {
      type: String,
      default: generateRandomToken
    },
    validated: {
      type: Boolean,
      default: false
    }
  }, { timestamps: true })

  userSchema.pre('save', function (next) {
    const user = this;
  
    if (user.isModified('password')) {
      bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          return bcrypt.hash(user.password, salt)
            .then(hash => {
              user.password = hash;
              next();
            });
        })
        .catch(error => next(error));
    } else {
      next();
    }
  });
  
  userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  }
  
  userSchema.virtual('places', {
    ref: 'Place',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;