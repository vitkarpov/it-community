'use strict';

angular.module('clientApp')
  .factory('NewsResource', function News($resource) {
    return $resource('/api/news/:id', {
      id: '@id'
    });
  });