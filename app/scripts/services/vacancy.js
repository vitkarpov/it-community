'use strict';

angular.module('clientApp')
  .factory('VacancyResource', function Vacancy($resource) {
    return $resource('/api/vacancies/:id', {id:'@id'});
  });
