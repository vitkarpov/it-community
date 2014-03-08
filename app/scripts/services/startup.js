'use strict';

angular.module('clientApp')
  .factory('StartupResource', function Startup($resource) {
    return $resource('/api/startups/:id', {
      id: '@id'
    });
  });