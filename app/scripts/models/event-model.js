"use strict";

angular.module('clientApp').factory('EventModel', function(Model) {

  function EventModel(data, service) {
    EventModel.super_.apply(this, arguments);
  }
  angular.inherits(EventModel, Model);

  return EventModel;

});
