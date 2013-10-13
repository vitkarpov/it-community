'use strict';

angular.module('clientApp')
  .factory('Vacancy', function Vacancy($resource) {
    return $resource('/api/vacancies/:id', {id:'@id'});
  });
