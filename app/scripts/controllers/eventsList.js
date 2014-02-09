'use strict';

angular.module('clientApp')
  .controller('EventsListCtrl', function ($scope, EventService, $cacheFactory, EventList, $state, $stateParams) {

    if (EventList.items.length == 0) {
      EventList.query(3).then(function success(result) {
        $scope.events = result;
      });
    } else {
      $scope.events = EventList.items;
    }

    $scope.moar = function () {
      EventList.query(3).then(function success(result) {
        $scope.events = result;
      });
    }

    $scope.goAddEvent = function () {
      $state.go('.add', $stateParams);
    }

  });
