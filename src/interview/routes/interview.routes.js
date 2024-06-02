import express from 'express';
import {
  getInterviews,
  addInterview,
  postInterview,
  allocateStudent,
  updateResult,
  getAllocateStudentPage,
  getUpdateResultPage,
  downloadCSV,
} from '../controllers/interview.controller.js';

const interviewRouter = express.Router();

interviewRouter.route('/').get(getInterviews);
interviewRouter.route('/add').get(addInterview);
interviewRouter.route('/add').post(postInterview);
interviewRouter.route('/allocate').get(getAllocateStudentPage);
interviewRouter.route('/allocate').post(allocateStudent);
interviewRouter.route('/updateResult').get(getUpdateResultPage);
interviewRouter.route('/updateResult').post(updateResult);
interviewRouter.route('/download').get(downloadCSV);

export default interviewRouter;
