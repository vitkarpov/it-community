/**
 * Module dependencies.
 */
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var q = require('q');
var confisto = require('confisto');

function configure() {
  var deferred = q.defer(),
    env = process.env.NODE_ENV;

  var file = path.join(__dirname, './server/config/defaults.json');
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
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(config);
    }
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
    //app.set('views', __dirname + '/app');
    //app.engine('html', require('ejs').renderFile);
    app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('keyboard cat'));
    app.use(express.session({
      secret: 'keyboard cat'
    }));
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
      res.json(err.status || 500, {
        error: err.message
      });
    });
  });

  require('./server/routes/api')(app);
  require('./server/routes/auth')(app);

  app.server = http.createServer(app);

  return app;
}

configure()
  .then(connectMongoose)
  .then(initExpress)
  .then(function success(app) {
    app.server.listen(app.get('port'), function listening() {
      console.log('Yay! App started and listening on port ' + app.get('port'));
    });
  }, function error(err) {
    throw err;
  })
  .done();