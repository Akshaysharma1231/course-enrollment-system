const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.post('/', enrollmentController.createEnrollment);


router.get('/', enrollmentController.getAllEnrollments);

router.get('/student/:email', enrollmentController.getEnrollmentsByEmail);

module.exports = router;