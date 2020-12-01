const e = require('express');
var db = require('../db.js');

exports.getCourses = function (req, res) {
    let sql = 'SELECT * FROM courses';
    db.query(sql, (err, result) => {
        if(err) {
            res.status(500).json({errorMessage: err.message});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};

exports.addCourse = function (req, res) {
    const newCourse = req.body;
    let sql = 'INSERT INTO courses(name) VALUE (?)';
    db.query(sql, [newCourse.name], (err, result) => {
        if(err) {
            res.status(500).json({errorMessage: err.message});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};

exports.getCourseById = function (req, res) {
    let sql = `SELECT * FROM courses WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({errorMessage: err.message});
        } else if(result['affectedRows'] == 0) {
            console.log('No course with such ID number.');
            res.status(500).json({errorMessage: 'No course with such ID number.'});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};

exports.updateCourseById = function (req, res) {
    const course = req.body;
    let sql = `UPDATE courses SET name = ? WHERE id = ${req.params.id}`;
    db.query(sql, [course.name], (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({errorMessage: err.message});
        } else if(result['affectedRows'] == 0) {
            console.log('No course with such ID number.');
            res.status(500).json({errorMessage: 'No course with such ID number.'});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};

exports.deleteCourseById = function (req, res) {
    let sql = `DELETE FROM courses WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({errorMessage: err.message});
        } else if(result['affectedRows'] == 0) {
            console.log('No course with such ID number.');
            res.status(500).json({errorMessage: 'No course with such ID number.'});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};