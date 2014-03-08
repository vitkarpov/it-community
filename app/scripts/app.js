'use strict';

angular.module('clientApp', ['ngResource', 'ui.router', 'xeditable', 'ngCookies', 'ui.bootstrap', 'angularFileUpload'])
  .config(function($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {

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
            templateUrl: 'views/home.events.html',
            controller: 'EventsListCtrl'
          },
          'companies': {
            templateUrl: 'views/home.companies.html',
            controller: 'CompaniesCtrl'
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
        templateUrl: 'views/tabs.companies.html',
        controller: 'CompaniesCtrl'
      })
      .state('tabs.events', {
        url: '/events',
        templateUrl: 'views/tabs.events.html',
        controller: 'EventsListCtrl'
      })
      .state('tabs.events.add', {
        url: '/add',
        views: {
          '@tabs': {
            templateUrl: 'views/tabs.events.add.html' //,
            //            controller: ['$scope', '$stateParams',
            //              function (  $scope,   $stateParams) {
            //
            //              }]
          }
        }
      })
      .state('tabs.events.item', {
        url: '/:eventId',
        views: {
          '@tabs': {
            templateUrl: 'views/tabs.events.item.html',
            controller: 'EventCtrl'
          }
        }
      })
      .state('tabs.admin', {
        url: '/admin',
        templateUrl: 'views/tabs.admin.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html'
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

    var interceptor = ['$state', '$q',
      function($state, $q) {
        function success(response) {
          return response;
        }

        function error(response) {

          if (response.status === 401) {
            $state.go('login');
            return $q.reject(response);
          } else {
            return $q.reject(response);
          }
        }

        return function(promise) {
          return promise.then(success, error);
        };
      }
    ];

    //    $httpProvider.responseInterceptors.push(interceptor);
  })
  .run(function(editableOptions, Auth) {
    //   var u = Auth.getUser().then(function(data) {
    //     var i = data;
    //   });

    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });