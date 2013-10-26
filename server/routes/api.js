'use strict'

var Company = require('../models/company');
var Vacancy = require('../models/vacancy');
var Event = require('../models/event');
var News = require('../models/news');
var Startup = require('../models/startup');
var User = require('../models/user');

function getList(model, req, res, next) {
  model.find(function(err, models) {
    if (err)
      next(err);
    res.send(models);
  })
}

function populateCompany(searchObj) {
  var promise = Company
    .find(searchObj)
    .populate('owner employees', 'name surname image')
    .exec();
  return promise;
}

module.exports.companiesList = function(req, res, next) {
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
  newCompany.owner = req.user._id;
  newCompany.save(function(err, company) {
    if (err)
      next(err);

    populateCompany(company)
      .then(
      function success(company) {
        res.send(company);
      },
      function error(err) {
        next(err);
      })
      .end();
  });
}
