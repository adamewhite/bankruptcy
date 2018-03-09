import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

function validateEmail(email) {
    let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
};


const UsersSchema = new Schema({
  id: {type: Schema.ObjectId},
  username: { type: String,
              required: [true, 'Username is required, like so required.'],
              minlength: [5, 'Username must be at least 5 characters long.'],
              index: { unique: true }
            },
  email:    { type: String,
              validate: [validateEmail, 'Please fill a valid email address, sucka.'],
              required: [true, 'Email is required, loser!'],
              index: { unique: true }
            },
  password: { type: String,
              required: [true, 'Password is required, chiquito.'],
              minlength: [4, 'Username must be at least 4 characters long, lame-o.']
            }
});

UsersSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
UsersSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

const User = mongoose.model('User', UsersSchema);

export default User;

