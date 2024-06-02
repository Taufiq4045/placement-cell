import express from 'express';
import {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout,
} from '../controllers/user.controller.js';
import { redirectIfAuthenticated } from '../../../middlewares/auth.js';

const router = express.Router();

// User Routes
router.route('/register').get(redirectIfAuthenticated, getRegister);
router.route('/register').post(postRegister);
router.route('/login').get(redirectIfAuthenticated, getLogin);
router.route('/login').post(postLogin);
router.route('/logout').get(logout);

export default router;
