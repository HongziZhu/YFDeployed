'use strict';

var Enrollment = require('mongoose').model('Enrollment');

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