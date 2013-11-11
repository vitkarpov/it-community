"use strict";

angular.module('clientApp').factory('ModelService', function ($q) {

  function ModelService(resource, model) {
    this.resource = resource;
    this.model = model;
    this.models = [];
  }

  ModelService.prototype.createModel = function (data) {
    //TODO model factory?
    var model = new this.model(this);
    model.setData(data);
    return model;
  }

  ModelService.prototype._updateModel = function (model) {
    var deferred = $q.defer();
    this.resource.update(model, function success(data) {
        model.setData(data);
        deferred.resolve(model);
      },
      function error(err) {
        deferred.reject(err);
      });
    return deferred.promise;
  }

  ModelService.prototype.saveModel = function (model) {
    if (model.isSaved())
      return this._updateModel(model);

    var deferred = $q.defer();
    this.resource.save(model, function success(data) {
        extend(model, data);
        deferred.resolve(model);
      },
      function error(err) {
        deferred.reject(err);
      });
    return deferred.promise;
  }

  ModelService.prototype.query = function (queryParams) {
    var deferred = $q.defer();
    var self = this;
    this.resource.query(queryParams,
      function success(result) {
        var models = [];
        result.forEach(function (element) {
          var model = self.createModel(element);
          models.push(model);
        });
        deferred.resolve(models);
      },
      function error(err) {
        deferred.reject(err);
      });
    return deferred.promise;
  }

  return ModelService;
});