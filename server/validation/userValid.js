const validator = require("validator");
const isEmpty = require('../utils/is-empty');

module.exports = function register(data) {
	let errors = {};

	if(isEmpty(data.email)){
		errors.email = "Email field is required";
	} else if(!validator.isEmail(data.email)) {
		errors.title = "Email not valid";
	}

	if(isEmpty(data.name)){
		errors.name = "Name field is required";
	} else if(!validator.isLength(data.name, {max: 40})) {
		errors.name = "Name field should have less than 40 characters";
	}

	if(isEmpty(data.password)){
		errors.password = "Password field is required";
	} else if(!validator.isLength(data.password, {min: 6, max: 40})) {
		errors.password = "Password field should have more than 6 characters";
	}

	return errors;
}