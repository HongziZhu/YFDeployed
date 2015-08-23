'use strict';

var express = require('express');
var users = require('../controllers/users');
var router = express();
var passport = require('passport');

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



//TODO Error handling
module.exports = router;