const express = require('express');
const bodyParser = require('body-parser');
var student = require('./routes/student.js');
var course = require('./routes/course.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/students', student);
app.use('/students', course);

const port = 5000;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});