'use strict'

var Company = require('../models/company');
var Vacancy = require('../models/vacancy');
var Event = require('../models/event');
var News = require('../models/news');
var Startup = require('../models/startup');

function getList(model, req, res, next) {
  model.find(function (err, models) {
    if (err)
      next(err);
    res.send(models);
  })
}

module.exports.companiesList = function(req, res, next) {
  getList(Company, req, res, next);
}

module.exports.vacanciesList = function(req, res, next) {
  getList(Vacancy, req, res, next);
}


module.exports.eventsList = function(req, res, next) {
  getList(Event, req, res, next);
}

module.exports.newsList = function(req, res, next) {
  getList(News, req, res, next);
}

module.exports.startupsList = function(req, res, next) {
  getList(Startup, req, res, next);
}

module.exports.createCompany = function(req, res, next) {
  var newCompany = new Company(req.body);
  newCompany.save(function (err, company) {
    if (err)
      next(err);
    res.send(company);
  });
}
