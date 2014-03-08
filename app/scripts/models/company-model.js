'use strict';

angular.module('clientApp').factory('CompanyModel', function(Model, CompanyResource) {

  return new Model(CompanyResource);

});