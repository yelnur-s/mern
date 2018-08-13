const validator = require("validator");
const isEmpty = require('../utils/is-empty');

module.exports = function login(data) {
	let errors = {};

	if(isEmpty(data.email)){
		errors.email = "Email field is required";
	} 

	if(isEmpty(data.password)){
		errors.password = "Password field is required";
	} 

	return errors;
}