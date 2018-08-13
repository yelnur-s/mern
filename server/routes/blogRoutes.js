const express = require("express");
const router = express.Router();
const passport = require("passport");
const Blog = require('../models/Blog');
const blogValidate = require("../validation/blogValid");
const isEmpty = require('../utils/is-empty');
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const path = require("path");

router.post('/',  passport.authenticate('jwt', { session: false }), upload.single("img"), (req, res, next)=>{

	let errors = blogValidate.createBlog(req.body, req.file);
	if(!isEmpty(errors)) {
		return res.status(400).send(errors);
	}

	let blog = new Blog(req.body);
	blog.author = req.user._id;


	const dateFile = 'images/blog_images/'+ req.user.name.replace(/ /g, "")+ Date.now() +'.'+req.file.originalname.split('.').slice(-1).pop();
    const tempPath = req.file.path;
    const targetPath = path.resolve('client/public/'+ dateFile);
    fs.rename(tempPath, targetPath, (err)=> {
        if (err) return next(err);
		blog.img = dateFile;
        blog.save((err, blog)=>{
            if(err) return next(err);
            res.status(200).send(blog);
        });
    });

});

router.get('/', (req, res, next)=>{
	Blog.find().populate('author', 'ava name').exec((err, blogs)=>{
		if(err) return next(err);
		res.status(200).send(blogs);
	})
});


router.get('/:id', (req, res, next)=>{
	Blog.findById(req.params.id).populate("author", "name ava").exec((err, blogs)=>{
		if(err) return next(err);
		res.status(200).send(blogs);
	})
});

router.put('/',  passport.authenticate('jwt', { session: false }), upload.single("img"), (req, res, next)=>{
	let errors = blogValidate.editBlog(req.body);
	if(!isEmpty(errors)) {
		return res.status(400).send(errors);
	}

	if(req.file&&req.file.filename){
		console.log("tut")
        Blog.findById(req.body._id).exec((err, blog)=>{
            if(err) return next(err);
			fs.unlink(path.resolve("client/public/" + blog.img ), err=>{
				// if(err) return next(err);

				const dateFile = 'images/blog_images/'+ req.user.name.replace(/ /g, "") + Date.now() +'.'+req.file.originalname.split('.').slice(-1).pop();
				const tempPath = req.file.path;
				const targetPath = path.resolve('client/public/'+ dateFile);
				fs.rename(tempPath, targetPath, (err)=> {
					if (err) return next(err);



					blog.title = req.body.title;
					blog.description = req.body.description;
					blog.img = dateFile;
					blog.save((err, blog)=>{
						if(err) return next(err);
						res.status(200).send(blog);
					})

				})


			});
		});




	} else {
        Blog.findById(req.body._id).exec((err, blog)=>{

            if(err) return next(err);
            blog.title = req.body.title;
            blog.description = req.body.description;
            blog.save((err, blog)=>{
                if(err) return next(err);
                res.status(200).send(blog);
            })

        })
	}
});


router.put('/second', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	let errors = blogValidate(req.body);
	if(!isEmpty(errors)) {
		return res.status(400).send(errors);
	}

    Blog.update({_id: req.body._id}, {
        $set: {
            title: req.body.title,
            description: req.body.description
        }
    }, {upsert: false}).exec((err, blog) => {
        if (err) return next(err);
        res.status(200).send(blog);
    })


});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
	
	Blog.remove({_id: req.params.id}).exec((err)=>{
		if(err) return next(err);
		res.status(200).end();
	})
});

router.get('/:key/search', (req, res, next)=>{
	//   $or      $and: []
    Blog.find({
		$or: [
			{
				title: new RegExp(req.params.key, "i")
			},
			{
				description:  new RegExp(req.params.key, "i")
			}
		]
	}).exec((err, blogs)=>{
        if(err) return next(err);
        res.status(200).send(blogs);
    })
});



module.exports = router;