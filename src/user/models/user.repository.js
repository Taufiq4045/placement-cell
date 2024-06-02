import UserModel from './user.schema.js';
import mongoose from 'mongoose';

export const createNewUserRepo = async (user) => {
  try {
    return await new UserModel(user).save();
  } catch (error) {
    if (error.code === 11000 && error.keyValue && error.keyValue.email) {
      throw new Error('Email is already registered');
    }
    throw error;
  }
};

export const findUserRepo = async (factor, withPassword = false) => {
  if (withPassword) return await UserModel.findOne(factor).select('+password');
  else return await UserModel.findOne(factor);
};
