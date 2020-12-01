var express = require('express');
var router = express.Router();

// Require controller module
var studentController = require('../controllers/studentController.js');

// Get all students
router.get('', studentController.getStudents);

// Add student
router.post('', studentController.addStudent);

// Get student by id
router.get('/:id', studentController.getStudentById);

// Update student name by id
router.put('/:id', studentController.updateStudentById);

// Delete student by id
router.delete('/:id', studentController.deleteStudentById);

module.exports = router;