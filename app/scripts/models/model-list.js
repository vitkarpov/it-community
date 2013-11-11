"use strict";

angular.module('clientApp').factory('ModelList', function ($q) {

  function ModelList(service) {
    this.service = service;
    this.items = [];
    this.offset = 0;
  }

  ModelList.prototype.queryNext = function (count) {

  }

  ModelList.prototype._addItems = function(result) {


  }

  ModelList.prototype.query = function (limit) {
    var self = this;
    return this.service.query({skip: this.offset, limit: limit})
      .then(
      function success(result) {
        result.forEach(function (element) {
          self.items.push(element);
        });
        self.offset += limit;
        return self.items;
      }
    );
  }

  return ModelList;
});