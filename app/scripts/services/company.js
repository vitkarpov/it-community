'use strict';

angular.module('clientApp')
  .factory('CompanyService', function ($resource, ModelService, Model) {
    var resource = $resource('/api/companies/:id', {id: '@id'}, { update: {method: 'PUT' } });
    return new ModelService(resource, Model);
  });