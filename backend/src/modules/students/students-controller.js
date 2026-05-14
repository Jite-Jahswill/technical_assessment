const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

/**
 * GET /api/v1/students
 * Query params: name, className, section, roll
 */
const handleGetAllStudents = asyncHandler(async (req, res) => {
  const { name, className, section, roll } = req.query;

  const students = await getAllStudents({ name, className, section, roll });

  res.status(200).json({
    message: "Students fetched successfully",
    data: students,
  });
});

/**
 * POST /api/v1/students
 * Body: student payload (name, email, class, section, etc.)
 */
const handleAddStudent = asyncHandler(async (req, res) => {
  // Attach the logged-in user as the reporter
  const payload = { ...req.body, reporterId: req.user.id };

  const result = await addNewStudent(payload);

  res.status(201).json({
    message: result.message,
  });
});

/**
 * PUT /api/v1/students/:id
 * Body: updated student fields
 */
const handleUpdateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // id goes into payload so addOrUpdateStudent knows it's an update, not an insert
  const payload = { ...req.body, id: Number(id) };

  const result = await updateStudent(payload);

  res.status(200).json({
    message: result.message,
  });
});

/**
 * GET /api/v1/students/:id
 */
const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const student = await getStudentDetail(Number(id));

  res.status(200).json({
    message: "Student detail fetched successfully",
    data: student,
  });
});

/**
 * PATCH /api/v1/students/:id/status
 * Body: { status: true | false }
 */
const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await setStudentStatus({
    userId: Number(id),
    reviewerId: req.user.id,
    status,
  });

  res.status(200).json({
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
