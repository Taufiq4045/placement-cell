import InterviewModel from './interview.schema.js';

export const createInterviewRepo = async (interviewData) => {
  try {
    const interview = new InterviewModel(interviewData);
    return await interview.save();
  } catch (err) {
    throw new Error('Error creating interview: ' + err.message);
  }
};

export const findAllInterviewsRepo = async () => {
  try {
    return await InterviewModel.find().populate('students.student');
  } catch (err) {
    throw new Error('Error fetching interviews: ' + err.message);
  }
};

export const findInterviewByIdRepo = async (interviewId) => {
  try {
    return await InterviewModel.findById(interviewId).populate(
      'students.student'
    );
  } catch (err) {
    throw new Error('Error finding interview by ID: ' + err.message);
  }
};

export const addStudentToInterviewRepo = async (interviewId, studentData) => {
  try {
    const interview = await InterviewModel.findById(interviewId);
    interview.students.push(studentData);
    return await interview.save();
  } catch (err) {
    throw new Error('Error adding student to interview: ' + err.message);
  }
};

export const updateStudentResultRepo = async (
  interviewId,
  studentId,
  result
) => {
  try {
    const interview = await InterviewModel.findById(interviewId);
    const student = interview.students.find(
      (s) => s.student.toString() === studentId
    );
    student.result = result;
    return await interview.save();
  } catch (err) {
    throw new Error('Error updating student result: ' + err.message);
  }
};
