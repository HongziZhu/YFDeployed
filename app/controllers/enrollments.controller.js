'use strict';

var Enrollment = require('mongoose').model('Enrollment');

exports.create = function (req, res, next) {
	var enrollment = new Enrollment(req.body);
	enrollment.save(function(err, enrollment) {
		if(err) { return next(err); }
		res.json(enrollment);
	});
};

exports.saveAfternoonAcademics = function (req, res, next) {
	var enrollment = req.enrollment;
	if(enrollment.summerCampWeeks.length < 1){
		return next(new Error('Not yet scheduled.'));
	}
	for(var j = 0; j < enrollment.summerCampWeeks.length; j++) {
		enrollment.summerCampWeeks[j].afternoonAcademics.language = req.body.language;
	}
	enrollment.save(function (err, enrollment) {
		res.json(enrollment);
	});
};