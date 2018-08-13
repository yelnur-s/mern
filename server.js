const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect("mongodb://127.0.0.1:27017/mean_serik");

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/api/hello', (req, res)=>{
	res.status(200).send({msg: "Works"});
})


app.use(require("./server/routes"));


app.listen(5000, ()=>console.log("Server litning on port 5000"));
// app.listen(3000, function(){
// 	console.log("Server litning on port 3000")
// });