var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
    name: {type: String, required: true},
    orientsGroup: String,
    subjects: [Object],
    attention: [Object]
});

var Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = { Teacher };