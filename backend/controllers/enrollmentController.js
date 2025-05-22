const Enrollment = require('../models/Enrollment');

const enrollmentController = {
  createEnrollment: async (req, res) => {
    try {
      const { studentName, email, courseName } = req.body;

      if (!studentName || !email || !courseName) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
    }
      const existingEnrollment = await Enrollment.findOne({
        email: email,
        courseName: courseName
      });

      if (existingEnrollment) {
        return res.status(400).json({
          success: false,
          message: 'Student already enrolled in this course'
        });
      }

      const enrollment = new Enrollment({
        studentName,
        email,
        courseName,
        enrollDate: new Date()
      });

      const savedEnrollment = await enrollment.save();

      res.status(201).json({
        success: true,
        message: 'Enrollment successful',
        data: savedEnrollment
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },


  getAllEnrollments: async (req, res) => {
    try {
      const enrollments = await Enrollment.find().sort({ enrollDate: -1 });
      
      res.status(200).json({
        success: true,
        count: enrollments.length,
        data: enrollments
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  getEnrollmentsByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const enrollments = await Enrollment.find({ email }).sort({ enrollDate: -1 });
      
      res.status(200).json({
        success: true,
        count: enrollments.length,
        data: enrollments
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }
};

module.exports = enrollmentController;
