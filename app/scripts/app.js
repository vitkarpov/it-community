'use strict';

angular.module('clientApp', ['ngResource', 'ui.router'])
  .config(function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        abstract: true,
        templateUrl: 'views/layouts/home.html'
      })
      .state('home.main', {
        url: '/',
        views: {
          'events': {
            templateUrl: 'views/home.events.html'
          },
          'companies': {
            templateUrl: 'views/home.companies.html'
          },
          'news': {
            templateUrl: 'views/home.news.html'
          },
          'vacancies': {
            templateUrl: 'views/home.vacancies.html'
          },
          'startups': {
            templateUrl: 'views/home.startups.html'
          }
        }
      })
      .state('tabs', {
        abstract: true,
        templateUrl: 'views/layouts/tabs.html'
      })
      .state('tabs.companies', {
        url: '/companies',
        templateUrl: 'views/tabs.companies.html'
      })
      .state('tabs.events', {
        url: '/events',
        templateUrl: 'views/tabs.events.html'
      });

    //$locationProvider.html5Mode(true);
    //$stateProvider
//
//    $routeProvider
//      .when('/', {
//        templateUrl: 'views/main.html',
//        controller: 'MainCtrl'
//      })
//      .when('/companies', {
//        templateUrl: 'views/companies.html',
//        controller: 'CompaniesCtrl'
//      })
//      .when('/companies/:id', {
//        templateUrl: 'views/companies.html',
//        controller: 'CompaniesCtrl'
//      })
//      .when('/companies/:id/edit', {
//        templateUrl: 'views/companies.html',
//        controller: 'CompaniesCtrl'
//      })
//      .when('/login', {
//        templateUrl: 'views/login.html',
//        controller: 'LoginCtrl'
//      })
//      .when('/test', {
//        templateUrl: 'views/login.html',
//        controller: 'LoginCtrl'
//      })
//      .otherwise({
//        redirectTo: '/'
//      });

    var interceptor = ['$location', '$q', function($location, $q) {
      function success(response) {
        return response;
      }

      function error(response) {

        if(response.status === 401) {
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

      return function(promise) {
        return promise.then(success, error);
      }
    }];

    $httpProvider.responseInterceptors.push(interceptor);
  })
  .run(['$rootScope', 'Company', function ($rootScope, Company) {
    //TODO awww, this is so stupid & simple
    $rootScope.companies = Company.query();
  }]);
