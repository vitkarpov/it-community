'use strict';

angular.module('clientApp')
  .factory('Event', function Event($resource) {
    return $resource('/api/events/:id', {id:'@id'});
  });
