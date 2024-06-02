import express from 'express';
import {
  getStudents,
  addStudent,
  postStudent,
} from '../controllers/student.controller.js';

const studentRouter = express.Router();

studentRouter.route('/').get(getStudents);
studentRouter.route('/add').get(addStudent);
studentRouter.route('/add').post(postStudent);

export default studentRouter;
