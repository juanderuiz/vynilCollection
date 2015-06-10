angular.module('myApp.services', ['ngResource'])
.factory('Band', function($resource){
    var Band = $resource('/api/v1/bands/:id',
                       {id: '@id'}, {
                        'query':  { method:'GET', isArray:true },
                        'update': { method: 'PUT' }
                       });
    return Band;
})
.factory('Album', function($resource){
    var Album = $resource('/api/v1/bands/:band_id/albums/:id',
                       {band_id: '@band_id', id: '@id'}, {
                        'query':  { method:'GET', isArray:true },
                        'get':  {method:'GET' },
                        'update': { method: 'PUT' }
                       });
    return Album;
})
.factory('User', function($resource){
    var User = $resource('/users/:id',
                       {id: '@id'}, {
                        'query':  { method:'GET', isArray:true },
                        'update': { method: 'PUT' }
                       });
    return User;
})
.factory('ArticleService', function($http, $q) {
  var service = {
    getLatestFeed: function() {
      var d = $q.defer();
      $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load' +
            '?v=1.0&num=50&callback=JSON_CALLBACK&q='+
            encodeURIComponent(
              'http://feeds.huffingtonpost.com/huffingtonpost/raw_feed'
            )
        ).then(function(data, status) {
          // Huffpost data comes back as
          // data.data.responseData.feed.entries
          if (data.status === 200) 
            d.resolve(data.data.responseData.feed.entries);
          else
            d.reject(data);
        });

        return d.promise;
      }
    };

  return service;
})
.factory('Share', function($resource) {
  var service = $resource('/shares/:id.json',
      { id: '@id' },
      {}
    );

  return service;
})
.factory("SessionService", function($http, $q) {
  var service;
  return service = {
    getCurrentUser: function() {
      if (service.isAuthenticated()) {
        return $q.when(service.currentUser);
      } else {
        return $http.get('/current_user').then(function(resp) {
          return service.currentUser = resp.data;
        });
      }
    },
    currentUser: null,
    isAuthenticated: function() {
      return !!service.currentUser;
    }
  };
});
;