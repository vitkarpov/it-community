'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $rootScope, Company, News, Startup, Vacancy) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $rootScope.companies = Company.query();
//    $rootScope.events = Event.query();
//    $rootScope.news = News.query();
//    $rootScope.startups = Startup.query();
//    $rootScope.vacancies = Vacancy.query();
  });
