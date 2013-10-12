'use strict';

angular.module('clientApp')
  .controller('CompaniesCtrl', function ($scope, $rootScope, $routeParams) {
    $scope.selectedId = $routeParams.id;
    $scope.sortBySelectedId = function(item) {
      return item._id != $scope.selectedId;
    };
  })
  .controller('CreateCompanyCtrl', function ($scope, Company) {
    $scope.createCompany = function() {
      var newCompany = new Company({name:$scope.name, about:$scope.description})
      newCompany.$save();
    }
  });
