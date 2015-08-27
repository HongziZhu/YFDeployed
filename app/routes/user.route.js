'use strict';

var express = require('express');
var users = require('../controllers/users');
var enrollments = require('../controllers/enrollments.controller');
var router = express();
var passport = require('passport');
var Enrollment = require('mongoose').model('Enrollment');

/** mounted: /api/users/ **/

router.post('/new', users.createUser);

// log in
router.post('/session', passport.authenticate('local'), function(req, res){
	if(req.user){
		res.json(req.user);
	} else {
		res.status(401).send('Unauthorized');
	}
});

router.get('/:id/students', users.getStudents);


/* Enrollment */
router.param('enrollmentId', function (req, res, next, enrollmentId) {
	Enrollment.findById(enrollmentId, function (err, enrollment) {
		if(err) { return next(err); }
		if(enrollment) {
			req.enrollment = enrollment;
			return next();
		}
		next(new Error('Failed to load enrollment.'));
	});
});

router.post('/summer/schedule/new', enrollments.create);

router.put('/summer/afternoon_academics/:enrollmentId', enrollments.saveAfternoonAcademics);

//TODO Error handling
module.exports = router;