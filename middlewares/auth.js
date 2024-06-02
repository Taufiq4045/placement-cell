import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../utils/errorHandler.js';
import UserModel from '../src/user/models/user.schema.js';

export const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token || !req.session.userEmail) {
    return next(new ErrorHandler(401, 'Please login to access this route!'));
  }
  const decodedData = await jwt.verify(token, process.env.JWT_Secret);
  req.user = await UserModel.findById(decodedData.id);
  next();
};

export const redirectIfAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (token && req.session.userEmail) {
    return res.redirect('/api/placementcell/student');
  }
  next();
};

export const attachUserToViews = (req, res, next) => {
  res.locals.userEmail = req.session.userEmail;
  next();
};
