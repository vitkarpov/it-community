'use strict';

angular.module('clientApp').factory('UserModel', function(Model) {

  function UserModel(data, service) {
    UserModel.super_.apply(this, arguments);
  }
  angular.inherits(UserModel, Model);

  return UserModel;

});