import { ErrorHandler } from '../../../utils/errorHandler.js';
import { sendToken } from '../../../utils/sendToken.js';
import { createNewUserRepo, findUserRepo } from '../models/user.repository.js';

export const getRegister = async (req, res, next) => {
  try {
    res.render('user/register', { errorMessage: null });
  } catch (err) {
    return next(new ErrorHandler(400, err));
  }
};

export const postRegister = async (req, res, next) => {
  try {
    const newUser = await createNewUserRepo(req.body);
    const token = await sendToken(newUser);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .redirect('/api/placementcell/user/login');
  } catch (err) {
    let errorMessage;
    if (err.message.includes('Email is already registered')) {
      errorMessage = 'Email is already registered';
    } else if (err.message.includes('User validation failed')) {
      errorMessage = 'Invalid email address';
    } else {
      errorMessage = 'An error occurred';
    }
    res.render('user/register', { errorMessage });
  }
};

export const getLogin = async (req, res, next) => {
  try {
    res.render('user/login', { errorMessage: null });
  } catch (err) {
    return next(new ErrorHandler(400, err));
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.render('user/login', { errorMessage: 'Please enter email/password' });
    }
    const user = await findUserRepo({ email }, true);
    if (!user) {
      res.render('user/login', {
        errorMessage: 'user not found! register yourself now!!',
      });
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      res.render('user/login', {
        errorMessage: 'Invalid email or passswor!',
      });
    }
    const token = await sendToken(user);
    req.session.userEmail = email;
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .redirect('/api/placementcell/student');
  } catch (err) {
    return res.render('user/login', {
      errorMessage: 'An unexpected error occurred. Please try again later.',
    });
  }
};

export const logout = async (req, res, next) => {
  // on logout destroy the session
  req.session.destroy((err) => {
    if (err) {
      return next(
        new ErrorHandler(500, 'Could not log out. Please try again later.')
      );
    } else {
      res
        .status(200)
        .cookie('token', null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .redirect('/api/placementcell');
    }
  });
};
