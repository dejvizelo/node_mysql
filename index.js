const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '************',
    database : 'node_mysql'
});

// Connect
db.connect((err) => {
    if(err) throw err;
    console.log('MySql connected');
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add student
app.post('/students', (req, res) => {
    const newStudent = req.body;
    let sql = 'INSERT INTO students(name, age) VALUE (?, ?)';
    db.query(sql, [newStudent.name, newStudent.age], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json(newStudent);
    });
});

// Get all students
app.get('/students', (req, res) => {
    let sql = 'SELECT * FROM students';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
});

// Get student by id
app.get('/students/:id', (req, res) => {
    let sql = `SELECT * FROM students WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
});

// Update student name by id
app.put('/students', (req, res) => {
    const student = req.body;
    let sql = 'UPDATE students SET name = ? WHERE id = ?';
    db.query(sql, [student.name, student.id], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json(student);
    });
});

// Delete student by id
app.delete('/students/:id', (req, res) => {
    let sql = `DELETE FROM students WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});