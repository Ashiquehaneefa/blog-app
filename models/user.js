var mongoose = require('mongoose');
var {compare} = require('bcryptjs');
var bcryptjs = require("bcryptjs")
var Schema = mongoose.Schema;
var Bug = require("./blog")
var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,  
    },
    isadmin: { type: Boolean ,default:false },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'blog',
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.findByEmailAndPassword = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error('user not found');
    const isMatched = await compare(password, user.password);
    if (!isMatched) throw new Error('type Valid Password');
    return user;
  } catch (err) {
    err.name = 'Ststic Error';
    console.log(err);
    throw err;
  }
};

userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcryptjs
      .hash(user.password, 10)
      .then(function (hashedpassword) {
        user.password = hashedpassword;
        next();
      })
      .catch(function (err) {
        next(err);
      });
  } else next();
});

userSchema.pre('remove', function (next) {
  Bug.deleteMany({ user: this._id })
    .then((reaponce) => {
      next();
    })
    .catch((err) => {
      next(err);
    });
});

var User = mongoose.model('users', userSchema);
module.exports = User;
