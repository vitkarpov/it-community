/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var api = require('./routes/api');
var passport = require('passport');
var mongoose = require('mongoose');
var q = require('q');
var confisto = require('confisto');

function configure() {
  var deferred = q.defer()
    , env = process.env.NODE_ENV;

  var file = path.join(__dirname, 'config/defaults.json')
  //path.join(__dirname, 'config/' + env + '.json'),
  confisto({
    file: file
  }, deferred.makeNodeResolver());

  return deferred.promise;
}

function connectMongoose(config) {
  var deferred = q.defer(),
    uristring =
      process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        path.join(config.mongo.host, config.mongo.database);
  mongoose.connect(uristring, function(err) {
    if (err)
      deferred.reject(err);
    else
      deferred.resolve(config);
  });
  return deferred.promise;
}

function initExpress(config) {
  var app = express();
  // all environments

  app.configure('all', function() {
    app.set('port', process.env.PORT || config.http.port);
    // TODO move this to dev and production.
    // Or use config.
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
  });

  app.configure('development', function() {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
  });

  app.configure('production', function() {
    app.use(express.logger(''));
    // custom error handler
    app.use(function(err, req, res) {
      res.json(err.status || 500, {error: err.message})
    });
  });

  // GET
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

  app.server = http.createServer(app);

  return app;
}

configure()
  .then(connectMongoose)
  .then(initExpress)
  .then(function success(app) {
    app.server.listen(app.get('port'), function listening() {
      console.log('Yay! App started and listening on port ' + app.get('port'));
    })
  }, function error(err) {
    throw err
  })
  .done();
//
//// Mongoose connection
//mongoose.connect('mongodb://localhost/it-community');
//
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function callback () {
//  // yay!
//  console.log('yay!');
//});


//
//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(401);
};

function ensureAuthorized(req, res, next) {
  //if ()
}
