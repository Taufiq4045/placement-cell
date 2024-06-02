import express from 'express';
import { getHomePage } from './home.controller.js';

const homeRouter = express.Router();

homeRouter.route('/').get(getHomePage);
export default homeRouter; // Export the default router object
