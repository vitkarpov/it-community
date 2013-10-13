'use strict';

angular.module('clientApp')
  .factory('News', function News($resource) {
    return $resource('/api/news/:id', {id:'@id'});
  });
