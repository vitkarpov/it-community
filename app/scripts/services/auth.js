'use strict';

angular.module('clientApp')
  .factory('Auth', function(UserService) {

    var self = this;
    this.currentUser = null;

    function loadMe() {
      UserService.me().then(function(user) {
        self.currentUser = user;
      });
    }

    this.me = function() {
      return this.currentUser;
    };

    this.isAuthorized = function() {
      return this.currentUser === null;
    };

    loadMe();

  });