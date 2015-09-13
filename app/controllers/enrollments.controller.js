'use strict';

var Enrollment = require('mongoose').model('Enrollment');
var sendgrid = require('sendgrid')(process.env.sendgrid_api_key);

/* original data */
var enrichActData = require('../../lib/summer/enrichmentActivities.json');
var wrData = require('../../lib/summer/afternoonWritingElective.json');
var adWrData = require('../../lib/summer/afternoonAdvancedWriting.json');
var mathData = require('../../lib/summer/afternoonMathElective.json');
var adMathData = require('../../lib/summer/afternoonAdvancedMath.json');
var mathOlpData = require('../../lib/summer/afternoonMathOlympiad.json');
var GATEData = require('../../lib/summer/afternoonGATE.json');

exports.create = function (req, res, next) {
	var enrollment = new Enrollment(req.body);
	enrollment.save(function(err, enrollment) {
		if(err) { return next(err); }
		res.json(enrollment);
	});
};

exports.checkPrevEnrollment = function (req, res, next) {
  var userId = req.body.userId;
  var stuFirstName = req.body.stuFirstName;
  var q = {
    'student.userId': userId,
    'student.firstName': stuFirstName
  };

  Enrollment.findOne(q, function (err, enrollment) {
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

exports.deleteSummerEnrollment = function (req, res, next) {
  var enrollmentId = req.enrollment._id;
  Enrollment.findByIdAndRemove(enrollmentId, function (err, enrollment) {
    if(err) { return next(err); }
    res.json(enrollment);
  });
};

exports.saveSummerWeek = function (req, res, next) {
	var enrollment = req.enrollment;
	var grade = req.body.grade;
	var week = req.body.week;
	var weekIdx = req.body.weekIdx;
	var weekObj = req.body.weekObj;
	var enrollObj = enrollment.summerCampWeeks[weekIdx];
	var origDataObj;

  if(weekObj.morActIdx > 0){
  	origDataObj = enrichActData[week].morning[weekObj.morActIdx];
    enrollObj.enrichmentActs.morning = {
      isAttend: true,
      activityName: origDataObj['activity_name'],
      time: origDataObj['time'],
      weekday: enrichActData['morning_time'].weekdays,
      hoursPerWeek: origDataObj['hour_per_week'],
      classSize: origDataObj['class_size'],
      pricePerWeek: origDataObj['price']
    }
  } 

  if(weekObj.morActIdx === 0){
  	origDataObj = enrichActData[week].morning[weekObj.morActIdx];
    enrollObj.enrichmentActs.morning = {
      isAttend: true,
      activityName: origDataObj['activity_name'],
      theme: origDataObj['theme'],
      time: origDataObj['time'],
      weekday: enrichActData['morning_time'].weekdays,
      hoursPerWeek: origDataObj['hour_per_week'],
      pricePerWeek: origDataObj['price']
    }
  } 

  if(weekObj.aftActIdx > -1){
  	origDataObj = enrichActData[week].afternoon[weekObj.aftActIdx];
    enrollObj.enrichmentActs.afternoon = {
      isAttend: true,
      activityName: origDataObj['activity_name'],
      time: origDataObj['time'],
      weekday: enrichActData['afternoon_time'].weekdays,
      hoursPerWeek: origDataObj['hour_per_week'],
      classSize: origDataObj['class_size'],
      pricePerWeek: origDataObj['price']
    } 
  }

  if(weekObj.wrElecIdx > -1){
  	origDataObj = wrData[grade][weekObj.wrElecIdx];
    enrollObj.writingElective = {
      isAttend: true,
      className: origDataObj['database_name'],
      time: origDataObj['display_time'],
      weekday: origDataObj['weekday'],
      classSize: origDataObj['class_size'],
      pricePerWeek: origDataObj['price_per_class']
    } 
  }

  if(weekObj.mathElecIdx > -1){
  	origDataObj = mathData[grade][weekObj.mathElecIdx];
    enrollObj.mathElective = {
      isAttend: true,
      className: origDataObj['database_name'],
      time: origDataObj['display_time'],
      weekday: origDataObj['weekday'],
      classSize: origDataObj['class_size'],
      pricePerWeek: origDataObj['price_per_class']
    } 
  }

  if(weekObj.mathOlypIdx > -1){
  	origDataObj = mathOlpData[grade][weekObj.mathOlypIdx];
    enrollObj.mathOlympiad = {
      isAttend: true,
      className: origDataObj['database_name'],
      time: origDataObj['display_time'],
      weekday: origDataObj['weekday'],
      classSize: origDataObj['class_size'],
      pricePerWeek: origDataObj['price_per_class']
    } 
  }

  if(weekObj.GATEIdx > -1){
  	origDataObj = GATEData[grade][weekObj.GATEIdx];
    enrollObj.GATE = {
      isAttend: true,
      className: origDataObj['database_name'],
     	time: origDataObj['class_time'],
      weekday: origDataObj['weekday'],
      classSize: origDataObj['class_size'],
      pricePerWeek: origDataObj['price_per_class']
    } 
  }

  if(weekObj.advWrIdx > -1){
  	origDataObj = adWrData[grade][weekObj.advWrIdx];
    enrollObj.advWriting = {
      isAttend: true,
      className: origDataObj['database_name'],
      time: origDataObj['display_time'],
      weekday: origDataObj['weekday'],
      classSize: origDataObj['class_size'],
      pricePerWeek: origDataObj['price_per_class']
    } 
  }

  if(weekObj.advMathIdx > -1){
  	origDataObj = adMathData[grade][weekObj.advMathIdx];
    enrollObj.advMath = {
      isAttend: true,
      className: origDataObj['database_name'],
      time: origDataObj['display_time'],
      weekday: origDataObj['weekday'],
      classSize: origDataObj['class_size'],
      pricePerWeek: origDataObj['price_per_class']
    } 
  }

	enrollment.save(function (err, enrollment) {
		if(err) { return next(err); }
		res.json(enrollment);
	});
};

exports.saveSummerOtherServices = function (req, res, next) {
	var enrollment = req.enrollment;
	if(enrollment.summerCampWeeks.length < 1){
		return next(new Error('Not yet scheduled.'));
	}
	var weeklyMovies = req.body.weeklyMovies;
	var morningCare = req.body.morningCare;
	var lunch = req.body.lunch;
	var pickups = req.body.pickups;

	for(var j = 0; j < 10; j++) {
		if(weeklyMovies[j]){
			enrollment.summerCampWeeks[j].movie.isAttend = true;
		}
		if(pickups[j]){
			enrollment.summerCampWeeks[j].pickupService.isAttend = true;
		}
		switch(morningCare) {
			case 'oneHour':
				enrollment.summerCampWeeks[j].extendedCare = {
					category: '7:00-8:00 AM',
					price: 25
				};
				break;
			case 'halfHour':
				enrollment.summerCampWeeks[j].extendedCare = {
					category: '7:30-8:00 AM',
					price: 15
				};
				break;
			default:
				return;
		}
		enrollment.summerCampWeeks[j].lunchDays = lunch[j].days;
	}

	enrollment.save(function (err, enrollment) {
		res.json(enrollment);
	});
};

exports.sendConfirmEmail = function (req, res, next) {
  var enrollment = req.enrollment;
  var email = new sendgrid.Email({
    to: 'hongzi.emma@gmail.com',
    from: 'hj742@nyu.edu',
    subject: 'YF Enroll Confirm',
    text: JSON.stringify(enrollment, null, 2)
  });
  sendgrid.send(email, function (err, json) {
    if(err) { console.error(err); }
    console.log(json);
  });
};