"use strict";

angular.module('clientApp')
  .factory('Auth', function (UserService) {
    var user = UserService.me();
    return {
      getUser : function() {
        return user;
      }
    }
  });