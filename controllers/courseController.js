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
    let sql = `SELECT * FROM courses WHERE id = ?`;
    db.query(sql, [req.params.id], (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({errorMessage: err.message});
        } else if(result['affectedRows'] == 0) {
            console.log('No course with such ID number.');
            res.status(500).json({errorMessage: 'No course with such ID number.'});
        } else {
            console.log(result);
            res.status(200).json(result[0]);
        }
    });
};

exports.updateCourseById = function (req, res) {
    const course = req.body;
    let sql = `UPDATE courses SET name = ? WHERE id = ?`;
    db.query(sql, [course.name, req.params.id], (err, result) => {
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
    let sql1 = `DELETE FROM is_registered WHERE c_id = ?`;
    db.query(sql1, [req.params.id], (err, result) => {
        if(err) res.status(500).json({errorMessage: err.message});
    });
    let sql2 = `DELETE FROM courses WHERE id = ?`;
    db.query(sql2, [req.params.id], (err, result) => {
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

exports.registerStudentToCourse = function (req, res) {
    const reg = req.body;
    let sql = `INSERT INTO is_registered VALUE (?, ?)`;
    db.query(sql, [reg.sId, reg.cId], (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({errorMessage: err.message});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};

exports.getRegisteredStudents = function (req, res) {
    let sql = `SELECT * FROM is_registered JOIN students ON is_registered.s_id = students.id WHERE c_id = ?;`;
    db.query(sql, [req.params.id], (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({errorMessage: err.message});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};

exports.unenrollStudent = function (req, res) {
    let sql = `DELETE FROM is_registered WHERE c_id = ? AND s_id = ?;`;
    db.query(sql, [req.params.cId, req.params.sId], (err, result) => {
        if(err) {
            console.log(err.message);
            res.status(500).json({errorMessage: err.message});
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
};