var mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    name: String,
    groups: [Object]
});

var teacherSchema = new mongoose.Schema({
    name: String,
    orientsGroup: String,
    subjects: [subjectSchema]
});

var Subject = mongoose.model('Subject', subjectSchema);
var Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = {Subject, Teacher};