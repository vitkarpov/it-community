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
    var promise = this.resource.update(model).$promise
      .then(function success(data) {
        model.setData(data);
        return model;
      });
    return promise;
  }

  ModelService.prototype.saveModel = function (model) {
    if (model.isSaved())
      return this._updateModel(model);

    var promise = this.resource.save(model).$promise
      .then(function success(data) {
        model.setData(data);
        return model;
      });
    return promise;
  }

  ModelService.prototype.query = function (queryParams) {
    var self = this;
    var promise = this.resource.query(queryParams).$promise
      .then(function success(result) {
        var models = [];
        result.forEach(function (element) {
          var model = self.createModel(element);
          models.push(model);
        });
        return models;
      });
    return promise;
  }

  return ModelService;
});