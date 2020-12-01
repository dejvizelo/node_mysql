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

module.exports = router;