import express from 'express';
import axios from 'axios';
import { getExternalJobs } from '../controllers/externalJob.controller.js';

const externalJobRouter = express.Router();

externalJobRouter.route('/').get(getExternalJobs);

export default externalJobRouter;
