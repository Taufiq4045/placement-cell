import { ErrorHandler } from '../../../utils/errorHandler.js';
import {
  createStudentRepo,
  findAllStudentsRepo,
} from '../models/student.repository.js';

export const getStudents = async (req, res, next) => {
  try {
    const students = await findAllStudentsRepo();
    res.render('student/list', { students });
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};

export const addStudent = (req, res, next) => {
  res.render('student/add', { errorMessage: null });
};

export const postStudent = async (req, res, next) => {
  try {
    await createStudentRepo(req.body);
    res.redirect('/api/placementcell/student');
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};
