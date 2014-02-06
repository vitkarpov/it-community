'use strict';

angular.module('clientApp')
  .controller('EventCtrl', function ($scope, $upload) {
    $scope.editMe = function() {
      $scope.edit = true;
    }

    $scope.cancelEdit = function() {
      $scope.edit = false;
    }

    $scope.save = function() {
      $scope.event.save().then(function success() {
        $scope.edit = false;
      });
    }

    $scope.onFileSelect = function($files) {
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          //TODO move to the list of api calls
          url: '/api/events/' + $scope.event.id +'/image', //upload.php script, node.js route, or servlet url
          // method: POST or PUT,
          // headers: {'headerKey': 'headerValue'}, withCredential: true,
          data: {myObj: {fdsfds: "fsdgtegfd"}},
          file: file
          // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
          /* set file formData name for 'Content-Desposition' header. Default: 'file' */
          //fileFormDataName: myFile,
          /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
          //formDataAppender: function(formData, key, val){}
        }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }).success(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log(data);
          })
        .error(function(reason) {

        });
        //.then(success, error, progress);
      }
    }

  });
