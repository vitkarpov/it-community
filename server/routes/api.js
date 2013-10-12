'use strict'

var Company = require('../models/company');

module.exports.companyList = function(req, res) {
  Company.find(function (err, companies) {
    if (err)
      next(err);
    res.send(companies);
  })
}