
/**
 * Expose
 */

module.exports = {
  db: 'mongodb://localhost/yfenroll_test',
  facebook: {
    clientID: process.env.FACEBOOK_CLIENTID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  }
};
