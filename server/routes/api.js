'use strict';

var Company = require('../models/company');
var Vacancy = require('../models/vacancy');
var Event = require('../models/event');
var News = require('../models/news');
var Startup = require('../models/startup');
var User = require('../models/user');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var uuid = require('node-uuid');


function getList(model, req, res, next) {
  model.find(function(err, models) {
    if (err) {
      return next(err);
    }
    res.send(models);
  });
}

function populateCompany(query, options) {
  var promise = Company
    .find(query, null, options)
    .populate('owner employees', 'name surname image')
    .exec();
  return promise;
}

function populateEvent(query, options) {
  var promise = Event
    .find(query, null, options)
  //.populate('owner participants', 'name surname image')
  .exec();
  return promise;
}

function companiesList(req, res, next) {
  populateCompany()
    .then(
      function success(companies) {
        res.send(companies);
      },
      function error(err) {
        next(err);
      })
    .end();
}

function vacanciesList(req, res, next) {
  getList(Vacancy, req, res, next);
}


function eventsList(req, res, next) {
  var options = {
    limit: req.param('limit'),
    skip: req.param('skip')
  };
  populateEvent(null, options)
    .then(
      function success(events) {
        var i = events[0].id;
        res.send(events);
      },
      function error(err) {
        next(err);
      })
    .end();
}

function newsList(req, res, next) {
  getList(News, req, res, next);
}

function startupsList(req, res, next) {
  getList(Startup, req, res, next);
}

function me(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    if (err) {
      return next(err);
    }
    res.send(user);
  });
}

function createCompany(req, res, next) {
  var newCompany = new Company(req.body);
  newCompany.owner = req.user._id;
  newCompany.save(function(err, company) {
    if (err) {
      return next(err);
    }

    populateCompany(company)
      .then(
        function success(company) {
          res.send(company[0]);
        },
        function error(err) {
          next(err);
        })
      .end();
  });
}

function createEvent(req, res, next) {
  var newEvent = new Event(req.body);
  newEvent.owner = req.user._id;
  newEvent.save(function(err, event) {
    if (err) {
      return next(err);
    }

    populateEvent(event)
      .then(
        function success(event) {
          //TODO return single instance
          res.send(event[0]);
        },
        function error(err) {
          next(err);
        })
      .end();
  });
}

function updateEvent(req, res, next) {
  //TODO validate req.user._id === owner._id
  Event.findById(req.params.eventId).exec()
    .then(function success(event) {
      //TODO return single instance
      var p = new mongoose.Promise();
      event.fullInfo = req.body.fullInfo;
      event.shortInfo = req.body.shortInfo;
      event.name = req.body.name;
      event.save(function(err, event) {
        p.resolve(err, event);
      });
      return p;
    })
    .then(function success(event) {
        res.send(event);
      },
      function error(err) {
        next(err);
      }
  );
}

function updateEventImage(req, res, next) {
  var filePath = req.files.file.path;
  //  var name = req.files.image.name;
  //  path.extname(name);

  fs.readFile(filePath, function(err, data) {
    var imageName = req.files.file.name;

    /// If there's an error
    if (!imageName) {

      next(err);

    } else {
      var ext = path.extname(imageName);
      //TODO
      var appDir = path.dirname(require.main.filename) + '/uploads/fullsize/' + uuid.v4() + ext;

      /// write file to uploads/fullsize folder
      fs.writeFile(appDir, data, function(err) {
        if (err) {
          next(err);
        }
      });
    }
  });

}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(401);
}

function ensureAuthorized(req, res, next) {
  //if ()
}

module.exports = function(app) {
  // GET
  app.get('/api/companies', companiesList);
  app.get('/api/events', eventsList);
  app.get('/api/startups', startupsList);
  app.get('/api/news', newsList);
  app.get('/api/vacancies', vacanciesList);
  app.get('/api/users/me', ensureAuthenticated, me);

  // Create
  app.post('/api/companies', ensureAuthenticated, createCompany);
  app.post('/api/events', ensureAuthenticated, createEvent);

  // Update
  app.put('/api/events/:eventId', ensureAuthenticated, updateEvent);
  app.post('/api/events/:eventId/image', /*ensureAuthenticated,*/ updateEventImage);
};