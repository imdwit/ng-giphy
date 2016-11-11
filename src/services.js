import angular from 'angular';

var GifsService = function($http) {
  var key = 'dc6zaTOxFJmzC';
  var giphy = 'http://api.giphy.com/v1/gifs/search';

  return {
    fetch: function(topic) {
      return $http({
        method: 'GET',
        url: giphy,
        params: {
          api_key: key,
          q: topic,
        },
      });
    }
  }
};

var servicesModule = angular.module('app.services', []);

servicesModule.factory('GifsService', GifsService);

export default servicesModule;
