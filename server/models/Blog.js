const mongoose = require("mongoose");
// const deepPopulate = require("deep-populate")(mongoose)

const blogSchema = new mongoose.Schema({
	title: String,
	description: String,
	date: {type: Date, default: Date.now},
	author: { type: mongoose.Schema.ObjectId, ref: "User"},
	img: String
});

// blogSchema.plagin(deepPopulate, {
// 	popstate:{
// 		"comments.author"
// 	}
// });

module.exports = mongoose.model("Blog", blogSchema);