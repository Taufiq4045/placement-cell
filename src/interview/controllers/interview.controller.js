import {
  createInterviewRepo,
  findAllInterviewsRepo,
  addStudentToInterviewRepo,
  updateStudentResultRepo,
} from '../models/interview.repository.js';
import { ErrorHandler } from '../../../utils/errorHandler.js';
import StudentModel from '../../student/models/student.schema.js';
import { generateCSV } from '../../../utils/csvDownload.js';

export const getInterviews = async (req, res, next) => {
  try {
    const interviews = await findAllInterviewsRepo();
    res.render('interview/list', { interviews });
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};

export const addInterview = (req, res, next) => {
  res.render('interview/add', { errorMessage: null });
};

export const postInterview = async (req, res, next) => {
  try {
    await createInterviewRepo(req.body);
    res.redirect('/api/placementcell/interview');
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};

export const allocateStudent = async (req, res, next) => {
  try {
    const { interviewId, studentId, result } = req.body;
    await addStudentToInterviewRepo(interviewId, {
      student: studentId,
      result,
    });
    res.redirect('/api/placementcell/interview');
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};

export const updateResult = async (req, res, next) => {
  try {
    const { interviewId, studentId, result } = req.body;
    await updateStudentResultRepo(interviewId, studentId, result);
    res.redirect('/api/placementcell/interview');
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};

export const getAllocateStudentPage = async (req, res, next) => {
  try {
    const students = await StudentModel.find();
    const interviews = await findAllInterviewsRepo();
    res.render('interview/allocateStudent', {
      students,
      interviews,
    });
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};

export const getUpdateResultPage = async (req, res, next) => {
  try {
    const students = await StudentModel.find();
    const interviews = await findAllInterviewsRepo();
    res.render('interview/updateResult', { students, interviews });
  } catch (err) {
    return next(new ErrorHandler(400, err.message));
  }
};

export const downloadCSV = async (req, res, next) => {
  try {
    const interviews = await findAllInterviewsRepo();
    const data = [];

    interviews.forEach((interview) => {
      interview.students.forEach((studentRecord) => {
        const student = studentRecord.student;
        data.push({
          studentId: student._id,
          studentName: student.name,
          studentCollege: student.college,
          studentStatus: student.status,
          dsaScore: student.dsaScore,
          webdScore: student.webdScore,
          reactScore: student.reactScore,
          interviewDate: interview.date,
          interviewCompany: interview.company,
          interviewResult: studentRecord.result,
        });
      });
    });

    const csv = await generateCSV(data, {
      fields: [
        'studentId',
        'studentName',
        'studentCollege',
        'studentStatus',
        'dsaScore',
        'webdScore',
        'reactScore',
        'interviewDate',
        'interviewCompany',
        'interviewResult',
      ],
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('interviews.csv');
    res.send(csv);
  } catch (err) {
    return next(new ErrorHandler(500, err.message));
  }
};
