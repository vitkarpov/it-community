'use strict';

angular.module('clientApp')
  .factory('EventList', function (EventService, ModelList) {
    return new ModelList(EventService);
  });
