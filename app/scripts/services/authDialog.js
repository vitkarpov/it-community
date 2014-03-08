'use strict';

angular.module('clientApp')
  .service('AuthDialog', function($modal) {

    var ModalInstanceCtrl = function($scope, $modalInstance) {
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    };

    this.open = function() {

      var modalInstance = $modal.open({
        templateUrl: 'views/authModal.html',
        controller: ModalInstanceCtrl
      });

      return modalInstance;
    };
  });