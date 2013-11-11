"use strict";

angular.module('clientApp').factory('Model', function() {

  var extend = angular.extend;

  var Model = function(service) {
    //angular.copy(this, data);
    //this.data = data;
    this.__service = service;
  };

  Model.prototype.save = function() {
    return this.__service.saveModel(this);
  }

  Model.prototype.setData = function(data) {
    data && extend(this, data);
  }

  Model.prototype.isSaved = function() {
    return this.hasOwnProperty('id');
  }

  return Model;

});
