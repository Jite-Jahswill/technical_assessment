const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");


// GET all students
const handleGetAllStudents = asyncHandler(async (req, res) => {
  const students = await getAllStudents(req.query);

  res.status(200).json({
    success: true,
    message: "Students fetched successfully",
    data: students,
  });
});

// ADD student
const handleAddStudent = asyncHandler(async (req, res) => {
  const result = await addNewStudent(req.body);

  res.status(201).json({
    success: true,
    message: result.message,
  });
});

// UPDATE student
const handleUpdateStudent = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const result = await updateStudent({
    id,
    ...req.body,
  });

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

// GET student detail
const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const student = await getStudentDetail(id);

  res.status(200).json({
    success: true,
    message: "Student detail fetched successfully",
    data: student,
  });
});

// UPDATE student status
const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await setStudentStatus({
    userId: id,
    reviewerId: req.user?.id || null, // if auth middleware exists
    status,
  });

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};
