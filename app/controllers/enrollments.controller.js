'use strict';

var Enrollment = require('mongoose').model('Enrollment');

exports.create = function (req, res, next) {
	var enrollment = new Enrollment(req.body);
	enrollment.save(function(err, enrollment) {
		if(err) { return next(err); }
		res.json(enrollment);
	});
};