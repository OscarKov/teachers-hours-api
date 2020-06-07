var express = require('express');
var mongoose = require('mongoose');
var { Teacher } = require('../models/models');

var router = express.Router();

mongoose.connect('mongodb://192.168.0.22/teacher_hours', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error: '));
db.once('open', function() {
    console.log('db conection succedeed');
});

// Lista los profesores.
router.get('/', function(req, res, next) {
    Teacher.find({}, function(err, teachers) {
        res.render('teachers/list', { teachers: teachers });
    });
});

// formulario nuevo profesor
router.get('/new', function(req, res, next) {
    res.render('teachers/new');
});

// Obtiene un profesor por ID.
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    if (id == '') res.send('No se encontro el profesor');
    Teacher.findById(id, function(err, teacher) {
        res.render('teachers/detail', { teacher: teacher })
    });
});

// Crea un nuevo profesor.
router.post('/new', function(req, res, next) {
    console.log(req.body);
    const teacher = new Teacher(req.body);
    teacher.save(function(err, teacherData){
        if (err) res.send('no se pudo crear el profesor');
        res.send(teacherData)
    })
});

// Actualiza un profesor existente
router.post('/:id', function(req, res, next){
    id = req.params.id;
    if (id == '') res.send('Falta el ID');
    const teacher = Teacher.findById(id);
    teacher.updateOne({}, req.body, function(err, teacherData) {
        if (err) res.send('Error al actualizar');
        res.send(teacherData);
    });
});

module.exports = router;