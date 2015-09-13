'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var oAuthTypes = [
'github',
'twitter',
'facebook',
'google',
'linkedin'
];

var UserSchema = new Schema({
  _id: { type: String, default: uuid.v4() },
  email: { 
    type: String, 
    lowercase: true, 
    trim: true,
    required: "Email address is required."
  },
  students: [{
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
    medicalDescription: { type: String, trim: true }
  }],
  motherName: { type: String, trim: true },
  fatherName: { type: String, trim: true },
  cellPhone: { type: String, trim: true },
  homePhone: { type: String, trim: true },
  workPhone: { type: String, trim: true },
  homeAddress: {
    addressLine1: { type: String, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipcode: { type: String, trim: true }
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'host']
  },
  provider: { type: String, default: 'local' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  created: {
    type: Date,
    default: Date.now
  }
},{
  collection: 'users'
});

/**
 * Virtuals
 */

 UserSchema
 .virtual('password')
 .set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
})
 .get(function() { return this._password });

/**
 * Validations
 */

 var validatePresenceOf = function (value) {
  return value && value.length;
};

// Validate email is not taken
// respond(true) => email is valid, hasn't existed.
UserSchema
.path('email')
.validate(function(value, respond) {
  var self = this;
  this.constructor.findOne({email: value}, function(err, user) {
    if(err) throw err;
    if(user) {
      if(self.id === user.id) return respond(true);
      return respond(false);
    }
    respond(true);
  });
}, 'Email already exists');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */

 UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
})

/**
 * Methods
 */

 UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

   authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

   makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

   encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
      .createHmac('sha1', this.salt)
      .update(password)
      .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using OAuth
   */

   skipValidation: function() {
    return ~oAuthTypes.indexOf(this.provider);
  }
};

/**
 * Statics
 */

 UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

   load: function (options, cb) {
    options.select = options.select || 'email students';
    this.findOne(options.criteria)
    .select(options.select)
    .exec(cb);
  }
}

mongoose.model('User', UserSchema);