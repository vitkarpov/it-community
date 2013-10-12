'use strict';

angular.module('clientApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/companies.html',
        controller: 'CompaniesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
