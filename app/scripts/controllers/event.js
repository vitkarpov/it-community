'use strict';

angular.module('clientApp')
  .controller('EventCtrl', function ($scope) {
    $scope.editMe = function() {
      $scope.edit = true;
    }

    $scope.cancelEdit = function() {
      $scope.edit = false;
    }

    $scope.save = function() {
      $scope.event.save().then(function success() {
        $scope.edit = false;
      });
    }
  });
