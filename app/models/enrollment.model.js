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
    enrichments: {
      type: { type: String, enum: ['morning', 'afternoon'] },
      time: String,
      campOption: {
        type: String,
        enum: ['Basic Camp', 'Repurpose T-shirt Rug', 'Indoor Table Tennis & Badminton', 'Science: Hands-on Geology', 'Digital Photo Safari & Publishing', 'Aboriginal Dot Art', 'Chess', 'Public Speaking', 'Kung Fu']
      },
      price: String,
      totalHours: String,
      classSize: Number,
    },
    afternoonAcademics: {
      math: { type: String, default: 'Daily Math' },
      language: { type: String, enum: ['Daily Chinese', 'Daily Spanish', 'Daily Hindi'] }
    },
    movie: {
      movieName: String,
      time: String,
      price: String
    }
    //TODO language, electives
  }]
},{
  collection: 'enrollments'
});

mongoose.model('Enrollment', EnrollmentSchema);
