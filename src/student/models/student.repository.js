import StudentModel from './student.schema.js';

export const createStudentRepo = async (studentData) => {
  try {
    const student = new StudentModel(studentData);
    return await student.save();
  } catch (err) {
    throw new Error('Error creating student: ' + err.message);
  }
};

export const findAllStudentsRepo = async () => {
  try {
    return await StudentModel.find();
  } catch (err) {
    throw new Error('Error fetching students: ' + err.message);
  }
};
