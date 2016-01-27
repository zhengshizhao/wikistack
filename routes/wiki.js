var express = require('express');
var router = express.Router();

module.exports =  router;

router.get('/', function(req, res, next) {
	res.redirect('/');
});

router.post('/', function(req, res, next) {
  //var title = req.body;
  console.log(req.body);
   res.json(req.body);
  //res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});