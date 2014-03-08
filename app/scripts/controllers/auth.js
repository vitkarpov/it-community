'use strict';

angular.module('clientApp')
  .controller('AuthCtrl', function(AuthDialog) {
    this.isLoggedIn = false;
    this.open = function() {
      AuthDialog.open().result.then(function(reason) {

      }, function(reason) {

      });
    };
  });