var express = require('express');
var mongoose = require('mongoose');
var {Teacher} = require('../models/schema');

var router = express.Router();

mongoose.connect('mongodb://192.168.0.20/teacher_hours', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error: '));
db.once('open', function() {
    console.log('db conection succedeed');
});

router.get('/', function(req, res, next) {
    Teacher.find({}, function(err, teachers) {
        res.send(teachers)
    });
});

router.get('/add', function(req, res, next) {
    var firstTeacher = new Teacher({
        name: 'Karin Johana Meza Ortega',
        orientsGroup: '6.2',
        subjects: [
            {
                'name': 'Castellano',
                'groups': [
                    {
                    'course': '6',
                    'sub': ['1', '2', '3', '4']
                    },
                    {
                    'course': '10',
                    'sub': ['5']
                    }
                ]
            }
        ]
    });
    firstTeacher.save(function(err, teacher) {
        if (err) res.send('no se pudo crear el profe');
        res.send('El profe' + teacher.name + ' fue creado')
    });
});

module.exports = router;