var express = require('express');
var router = express.Router();

var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

module.exports =  router;

router.get('/', function(req, res, next) {
	res.redirect('/');
});

function generateUrlTitle (title) {
	if (title) {
		return title.replace(/\s+/g, "_").replace(/\W/g, '');
	} else {
		return Math.random().toString(36).substring(2,7)
	}
}

router.post('/', function(req, res, next) {
  var page = new Page({
  	title: req.body.title,
  	content: req.body.content
  });

  page.save()
  .then(function(){
  	res.redirect('/');
  },function(err){
  	res.render('error');
  });

  //console.log(req.body);
   //res.json(req.body);
  //res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});