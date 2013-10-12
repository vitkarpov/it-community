
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


var mongoose = require('mongoose');

var Company = require('./models/company');

mongoose.connect('mongodb://localhost/it-community');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.log('yay!');
//  var c = new Company({
//    name: "Company 1",
//    about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor " +
//      "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
//      " quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//    image: "image1.jpg",
//    link: "http://google.com"
//  });
//  c.save();
//  var c1 = new Company({
//    name: "Company 2",
//    about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor " +
//      "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
//      " quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//    image: "image1.jpg",
//    link: "http://google.com"
//  });
//  c1.save();
});


// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../client/app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/api/company', api.companyList);


//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
