'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;

var EnrollmentSchema = new Schema({
  student: {
    userId: String,
    firstName: { type: String, trim: true, required: 'First name cannot be blank.' },
    lastName: { type: String, trim: true, required: 'Last name cannot be blank.' },
    currentGrade: {
      type: String,
      enum: ['K', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']
    },
    incomingGrade: {
      type: String,
      enum: ['K', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12']
    },
    birthday: { type: String, trim: true },
    gender: { type: String, enum: ['male', 'female'] },
    qualifications: {
      advancedWriting: { type: Boolean, default: false }
    }
  },
  //ten weeks for summer camp
  summerCampWeeks: [{
    coveredDate: { type: String, trim: true },
    schedulePattern:  { type: String, trim: true }, //"absence" 
    attendingDays: [String],
    lunchDays: [String],
    extendedCare: { 
      category: { type: String, enum: ['7:00-8:00 AM', '7:30-8:00 AM', 'None'] },
      price: { type: String, enum: ['15', '25', '0'] }
    },
    pickupService: {
      isAttend: Boolean,
      pickupSpot: { type: String, default: "Hidden Hills Elementary" },
      pickupTime: {type: String, default: "12:05 PM" },
      weekday: [String],
      pricePerTrip: Number
    },
    enrichmentActs: {
      morning: {
        activityName: String,
        theme: String,
        time: String,
        weekday: [String],
        hoursPerWeek: Number,
        classSize: String,
        pricePerWeek: Number
      },
      afternoon: {
        isAttend: Boolean,
        activityName: String,
        theme: String,
        time: String,
        weekday: [String],
        hoursPerWeek: Number,
        classSize: String,
        pricePerWeek: Number
      },
    },
    afternoonAcademics: {
      math: { type: String, default: 'Daily Math' },
      language: { type: String, enum: ['Daily Chinese', 'Daily Spanish', 'Daily Hindi'] }
    },
    movie: {
      isAttend: Boolean,
      movieName: String,
      place: String,
      time: String,
      price: String
    },
    writingElective: {
      isAttend: Boolean,
      className: String,
      time: [String],
      weekday: [String],
      classSize: String,
      pricePerWeek: Number
    },
    advWriting: {
      isAttend: Boolean,
      className: String,
      time: [String],
      weekday: [String],
      classSize: String,
      pricePerWeek: Number
    },
    mathElective: {
      isAttend: Boolean,
      className: String,
      time: [String],
      weekday: [String],
      classSize: String,
      pricePerWeek: Number
    },
    advMath: {
      isAttend: Boolean,
      className: String,
      time: [String],
      weekday: [String],
      classSize: String,
      pricePerWeek: Number
    },
    mathOlympiad: {
      isAttend: Boolean,
      className: String,
      time: [String],
      weekday: [String],
      classSize: String,
      pricePerWeek: Number
    },
    GATE: {
      isAttend: Boolean,
      className: String,
      time: [String],
      weekday: [String],
      classSize: String,
      pricePerWeek: Number
    }
  }]
},{
  collection: 'enrollments'
});

mongoose.model('Enrollment', EnrollmentSchema);
