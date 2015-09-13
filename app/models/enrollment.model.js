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
    ChineseName: {
      first: String,
      last: String
    },
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
    },
    summerSchoolAttended: { type: String, trim: true },
    schoolDistrict: { type: String, trim: true },
    pediatricDoctor: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true }
    },
    insuranceInfor: {
      insuranceCompany: { type: String, trim: true },
      policyNumber: { type: String, trim: true }
    },
    medicalDescription: { type: String, trim: true },
    summerAgreements: {
      photoRelease: { type: Boolean, default: false },
      applySunscreen: { type: Boolean, default: false },
      spareSunCream: { type: Boolean, default: false },
      allergySunscreen: { type: Boolean, default: false },
      emergencyPermit: { type: Boolean, default: false },
      swimPermit: { type: Boolean, default: false },
      moviePermit: { type: Boolean, default: false },
      fieldTripPermit: { type: Boolean, default: false },
      HartSportsPermit: { type: Boolean, default: false }
    },
    primaryEmerContact: {
      name: { type: String, trim: true },
      relationship: { type: String, trim: true },
      cellPhone: { type: String, trim: true },
      workPhone: { type: String, trim: true },
      homePhone: { type: String, trim: true },
      email: { type: String, trim: true }
    },
    secondaryEmerContact: {
      name: { type: String, trim: true },
      relationship: { type: String, trim: true },
      cellPhone: { type: String, trim: true },
      workPhone: { type: String, trim: true },
      homePhone: { type: String, trim: true },
      email: { type: String, trim: true }
    }
  },

  //ten weeks for summer camp
  summerCampWeeks: [{
    weekIndex: String,
    coveredDate: { type: String, trim: true },
    schedulePattern:  { type: String, trim: true }, //"absence" 
    attendingDays: [String],
    lunchDays: [String],
    extendedCare: { 
      category: { type: String, enum: ['7:00-8:00 AM', '7:30-8:00 AM', 'None'], default: 'None' },
      price: { type: Number, enum: [15, 25, 0], default: 0 }
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
        isAttend: { type: Boolean, default: false },
        activityName: String,
        theme: String,
        time: String,
        weekday: [String],
        hoursPerWeek: Number,
        classSize: [Number],
        pricePerWeek: Number
      },
      afternoon: {
        isAttend: { type: Boolean, default: false },
        activityName: String,
        time: String,
        weekday: [String],
        hoursPerWeek: Number,
        classSize: [Number],
        pricePerWeek: Number
      }
    },
    afternoonAcademics: {
      math: { type: String, default: 'DailyMath' },
      language: { type: String, enum: ['DailyChinese', 'DailySpanish', 'DailyHindi'] }
    },
    movie: {
      isAttend: { type: Boolean, default: false },
      movieName: String,
      place: String,
      time: String,
      price: String
    },
    writingElective: {
      isAttend: { type: Boolean, default: false },
      className: String,
      time: String,
      weekday: [String],
      classSize: [Number],
      pricePerWeek: Number
    },
    advWriting: {
      isAttend: { type: Boolean, default: false },
      className: String,
      time: String,
      weekday: [String],
      classSize: [Number],
      pricePerWeek: Number
    },
    mathElective: {
      isAttend: { type: Boolean, default: false },
      className: String,
      time: String,
      weekday: [String],
      classSize: [Number],
      pricePerWeek: Number
    },
    advMath: {
      isAttend: { type: Boolean, default: false },
      className: String,
      time: String,
      weekday: [String],
      classSize: [Number],
      pricePerWeek: Number
    },
    mathOlympiad: {
      isAttend: { type: Boolean, default: false },
      className: String,
      time: String,
      weekday: [String],
      classSize: [Number],
      pricePerWeek: Number
    },
    GATE: {
      isAttend: { type: Boolean, default: false },
      className: String,
      time: [
      { weekday: String, display_time: String, database_time: [Number] }
      ],
      weekday: [String],
      classSize: [Number],
      pricePerWeek: Number
    }
  }]
},{
  collection: 'enrollments'
});

mongoose.model('Enrollment', EnrollmentSchema);
