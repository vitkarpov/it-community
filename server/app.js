
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();
var api = require('./routes/api');
var passport = require('passport');
var mongoose = require('mongoose');
var q = require('q');
var confisto = require('confisto');

function configure() {
  var deferred = q.defer()
    , env = process.env.NODE_ENV;

  var file = path.join(__dirname, 'config/' + env + '.json');
  confisto({
    file: 'config/' + env + '.json',
    defaults: 'config/defaults.json'
  }, deferred.makeNodeResolver());

  return deferred.promise;
}

function connectMongoose() {

}

// Mongoose connection
mongoose.connect('mongodb://localhost/it-community');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.log('yay!');
});


// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '../client/app')));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/api/companies', api.companiesList);
app.get('/api/events', api.eventsList);
app.get('/api/startups', api.startupsList);
app.get('/api/news', api.newsList);
app.get('/api/vacancies', api.vacanciesList);

// POST
app.post('/api/companies', ensureAuthenticated, api.createCompany);

require('./routes/auth')(app);

app.get('/test', function(req, res) {
  debugger;
  res.send(req.user);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send(401);
};

function ensureAuthorized(req, res, next) {
  //if ()
}
