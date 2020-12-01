const e = require('express');
var db = require('../db.js');

exports.getStudents = function (req, res) {
    let sql = 'SELECT * FROM students';
    db.query(sql, (err, result) => {
        if(err) {
            res.status(500).json({errorMessage: err.message});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};

exports.addStudent = function (req, res) {
    const newStudent = req.body;
    let sql = 'INSERT INTO students(name, age) VALUE (?, ?)';
    db.query(sql, [newStudent.name, newStudent.age], (err, result) => {
        if(err) {
            res.status(500).json({errorMessage: err.message});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};

exports.getStudentById = function (req, res) {
    let sql = `SELECT * FROM students WHERE id = ?`;
    db.query(sql, [req.params.id], (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({errorMessage: err.message});
        } else if(result['affectedRows'] == 0) {
            console.log('No student with such ID number.');
            res.status(500).json({errorMessage: 'No student with such ID number.'});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};

exports.updateStudentById = function (req, res) {
    const student = req.body;
    let sql = `UPDATE students SET name = ? WHERE id = ?`;
    db.query(sql, [student.name, req.params.id], (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({errorMessage: err.message});
        } else if(result['affectedRows'] == 0) {
            console.log('No student with such ID number.');
            res.status(500).json({errorMessage: 'No student with such ID number.'});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};

exports.deleteStudentById = function (req, res) {
    let sql = `DELETE FROM students WHERE id = ?`;
    db.query(sql, [req.params.id], (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({errorMessage: err.message});
        } else if(result['affectedRows'] == 0) {
            console.log('No student with such ID number.');
            res.status(500).json({errorMessage: 'No student with such ID number.'});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};