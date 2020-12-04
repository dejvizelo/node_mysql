var express = require('express');
var router = express.Router();

// Require controller module
var courseController = require('../controllers/courseController.js');

// Get all courses
router.get('', courseController.getCourses);

// Add course
router.post('', courseController.addCourse);

// Get course by id
router.get('/:id', courseController.getCourseById);

// Update course name by id
router.put('/:id', courseController.updateCourseById);

// Delete course by id
router.delete('/:id', courseController.deleteCourseById);

// Enroll a student into a course
router.post('/registration', courseController.registerStudentToCourse);

// Get all students registered in a course
router.get('/:id/registeredStudents', courseController.getRegisteredStudents);

// Unenroll a student from a course
router.delete('/:cId/unenroll/:sId', courseController.unenrollStudent);

module.exports = router;