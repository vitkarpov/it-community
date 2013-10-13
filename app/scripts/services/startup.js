'use strict';

angular.module('clientApp')
  .factory('Startup', function Startup($resource) {
    return $resource('/api/startups/:id', {id:'@id'});
  });
