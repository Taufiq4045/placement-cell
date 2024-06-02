import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'user email is requires'],
    unique: true,
    validate: [validator.isEmail, 'pls enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  //  hash user password before saving using bcrypt
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_Expire,
  });
};
// user password compare
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
