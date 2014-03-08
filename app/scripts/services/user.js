'use strict';

angular.module('clientApp')
  .factory('UserService', function($resource, ModelService, Model, $q) {

    function UserService(resource, model) {
      UserService.super_.apply(this, arguments);
    }
    angular.inherits(UserService, ModelService);

    UserService.prototype.me = function() {
      var deferred = $q.defer();
      var self = this;
      this.resource.me(
        function success(result) {
          var model = self.createModel(result);
          deferred.resolve(model);
        },
        function error(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    var resource = $resource('/api/users/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      },
      me: {
        method: 'GET',
        url: '/api/users/me'
      }
    });
    return new UserService(resource, Model);
  });