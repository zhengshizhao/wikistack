var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var swig = require('swig');
var wikiRouter = require('./routes/wiki');
var pageLink = require('./filters')(swig)
//var router = require('./routes');


app.use(morgan('dev'));
//??? 
app.use(express.static(path.join(__dirname, '/stylesheets')));
//app.use(express.static('/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});


app.use('/wiki', wikiRouter);

app.get('/', function(req, res, next){
	res.render('index');
});

app.listen(5000, function(){
	console.log('Server is listening');
});

