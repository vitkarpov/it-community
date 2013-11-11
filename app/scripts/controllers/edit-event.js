'use strict';

angular.module('clientApp')
  .controller('EditEventCtrl', function ($scope, EventService) {
    $scope.save = function() {
      //$scope.eventSaved =  EventService.createModel($scope.event).save();
    }

    $scope.cancelEdit = function() {

    }
  });
