'use strict';

angular.module('clientApp')
  .factory('EventService', function ($resource, ModelService, EventModel) {

    function EventService(resource, model) {
      EventService.super_.apply(this, arguments);
    }

    angular.inherits(EventService, ModelService);

    var resource = $resource('/api/events/:eventId', {eventId: '@id'}, { update: {method: 'PUT' } });
    return new EventService(resource, EventModel);
  });
