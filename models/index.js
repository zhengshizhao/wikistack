var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));


var statuses = ['open', 'closed'];

var pageSchema = new Schema({
  title:  {type: String, required: true},
  urlTitle: {type: String, required: true},
  content:   {type: String, required: true},
  status: {type: String, enum: statuses},
  //if we use Date.now(), it will record the time when this program runs
  date: { type: Date, default: Date.now },
  //refrence 
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  tags: {type:[String]}
});

var userSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true}
});





pageSchema.virtual('route').get(
    //getter function
	function() {
	return '/wiki/' + this.urlTitle;
})

pageSchema.pre('validate', function(next) {
  //do stuff
  //var title = doc.title;
  //console.log("this is this:", this);
 
  this.urlTitle =  generateUrlTitle (this.title);
  next();
});

function generateUrlTitle (title) {
	if (title) {
		return title.replace(/\s+/g, "_").replace(/\W/g, '');
	} else {
		return Math.random().toString(36).substring(2,7);
	}
}

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};




