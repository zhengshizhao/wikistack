var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

module.exports =  router;

router.get('/', function(req, res, next) {
	//res.redirect('/');
    Page.find({}).exec()
    .then(function(pagesfound){
       	res.render('index',
       	  {pages: pagesfound});
       })
	.then(null,function(err){
		es.render('error',{error: err});
		});
});




router.post('/', function(req, res, next) {
  var newPage = new Page({
  	title: req.body.title,
  	content: req.body.content,
    status: req.body.status,
    tags: req.body.tags.split(",")
  });
  
  newPage.save()
  .then(function(savedPage){
  		res.redirect(savedPage.route); 
  	})
  .then(null,function(err){
		res.render('error',{error: err});
	})

});

router.get('/add', function(req, res, next) {
  res.render('addpage');

  
});

router.get('/:urlTitle', function(req, res,next) {
	Page.findOne({'urlTitle':req.params.urlTitle})
	.exec()
	.then(function(pagefound){
       console.log(pagefound);
		//res.json(pagefound);
        res.render('wikipage',
       	{page: pagefound})
    })
	.then(null,function(err){
		res.render('error',{error: err});
	});
	
});

