import axios from 'axios';
import { ErrorHandler } from '../../../utils/errorHandler.js';

export const getExternalJobs = async (req, res, next) => {
  try {
    const response = await axios.get(process.env.REMOTIVE_API_URL, {
      params: {
        search: 'node', // Adjust search parameters as needed
        limit: 50, // Adjust limit as needed
      },
    });
    res.render('jobs/list', { jobs: response.data.jobs });
  } catch (err) {
    return next(new ErrorHandler(500, 'Failed to fetch jobs'));
  }
};
