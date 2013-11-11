'use strict';

angular.module('clientApp')
  .controller('AddEventCtrl', function ($scope, EventService) {
    $scope.showForm = false;
    $scope.toggleForm = function() {
      $scope.showForm = !$scope.showForm;
    }

    $scope.save = function() {
      $scope.eventSaved =  EventService.createModel($scope.event).save();
    }
  });
