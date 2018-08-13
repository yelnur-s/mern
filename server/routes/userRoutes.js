const express = require("express");
const router = express.Router();
const User = require('../models/User');
const userValidate = require("../validation/userValid");
const loginValidate = require("../validation/loginValid");
const isEmpty = require('../utils/is-empty');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const keys = require('../config/keys');

router.post('/register', (req, res, next)=> {
	let errors = userValidate(req.body);
	if(!isEmpty(errors)) {
		return res.status(400).send(errors);
	}

	console.log(req.body);

	let user = new User(req.body)
	bcrypt.genSalt(10, (err, salt)=>{
    	if(err) return next(err);

    	bcrypt.hash(user.password, salt, (err, hash)=>{
    		if(err) return next(err);
    		user.password = hash;
    		user.save((err, user)=>{
				if(err) return next(err);
				res.status(200).end();
			});
    	})

    });
});


router.post('/login', (req, res, next)=>{
	console.log(req.body)
	let errors = loginValidate(req.body);
	if(!isEmpty(errors)) {
		return res.status(400).send(errors);
	}

	User.findOne({email: req.body.email}).exec((err, user)=>{
		if(err) return next(err);
		if(!user) {
			errors.email = "User with that email not exist";
			return res.status(400).send(errors);
		} else {
						 // 
			bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{
				if(err) return next(err);
				if(!isMatch) {
					errors.password = "Password is incorrect";
					return res.status(400).send(errors);
				} else {

					const payload = { _id: user._id, 
									  name: user.name,
									  ava: user.ava }; // Create JWT Payload

			        // Sign Token
			        jwt.sign(
			          payload,
			          keys.jwtKey,
			          { expiresIn: 3600 },
			          (err, token) => {
			          	if(err) return next(err);
			            res.status(200).send({
			              success: true,
			              token: 'Bearer ' + token
			            });
			          }
			        );
				}
			});
		}
	});
});


// if we will have a session
// router.get('/logout', (req, res, next)=>{
// 	req.logout();
// 	res.status(200).end();
// });










module.exports = router;