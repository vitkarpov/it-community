'use strict';

angular.module('clientApp')
  .directive('authModal', function () {
    return {
        scope: {
          title: '@'
        },

      transclude: true,
      templateUrl: 'views/authModal.html',
//      restrict: 'EA',
      link: function(scope, element, attrs) {
        element.on('click', function(e) {
          e.preventDefault();
          element.modal('show');
        });
      }
//      scope: {
//        event: '='
//      }
//      link: function postLink(scope, element, attrs) {
//        //element.text('this is the eventForm directive');
//      }
    };
  });
