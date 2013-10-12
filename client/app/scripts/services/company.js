'use strict';

angular.module('clientApp')
  .factory('Company', function Company($resource) {
    var Company = $resource('/api/companies/:id', {id:'@id'});
    return Company;
  });
