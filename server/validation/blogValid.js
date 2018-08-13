const validator = require("validator");
const isEmpty = require('../utils/is-empty');




module.exports.createBlog = (data, file) => {
	let errors = {};

	if(isEmpty(data.title)){
		errors.title = "Title field is required";
	} else if(!validator.isLength(data.title, {min: 10})) {
		errors.title = "Title field should have more than 10 characters";
	}

	if(isEmpty(data.description)){
		errors.description = "Desctiption field is required";
	} else if(!validator.isLength(data.description, {min: 10})) {
		errors.description = "Desctiption field should have more than 10 characters";
	}

	if(isEmpty(file)) {
        errors.image = "Image is required";
	} else if(isEmpty(file.filename)){
        errors.image = "Image is required";
	}

	return errors;

};

module.exports.editBlog = (data) => {
    let errors = {};

    if(isEmpty(data.title)){
        errors.title = "Title field is required";
    } else if(!validator.isLength(data.title, {min: 10})) {
        errors.title = "Title field should have more than 10 characters";
    }

    if(isEmpty(data.description)){
        errors.description = "Desctiption field is required";
    } else if(!validator.isLength(data.description, {min: 10})) {
        errors.description = "Desctiption field should have more than 10 characters";
    }

    return errors;

};