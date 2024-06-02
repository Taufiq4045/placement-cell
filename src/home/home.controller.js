import { ErrorHandler } from '../../utils/errorHandler.js';

export const getHomePage = async (req, res, next) => {
  try {
    res.render('home/index');
  } catch (err) {
    return next(new ErrorHandler(400, err));
  }
};
