angular.module('myApp', ['ngRoute', 'myApp.controllers', 'myApp.bandIndexCtrl', 'myApp.bandNewCtrl', 'myApp.bandShowCtrl', 'myApp.bandEditCtrl', 'myApp.albumNewCtrl', 'myApp.albumShowCtrl', 'myApp.userShowCtrl', 'myApp.services', 'myApp.directives', 'myApp.filters', 'ngAnimate'])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/templates/dashboard.html', 
    controller: 'HomeController',
    resolve: {
      session: function(SessionService) {
        return SessionService.getCurrentUser();
      }
    }
  })
  .when('/bands',{
    controller: 'bandIndexCtrl',
    templateUrl : 'templates/bandIndexTemplate.html'
  })
  .when('/bands/new',{
    controller: 'bandNewCtrl',
    templateUrl : 'templates/bandNewTemplate.html'
  })
  .when('/bands/:id',{
    controller: 'bandShowCtrl',
    templateUrl : 'templates/bandShowTemplate.html',
    resolve: {
      session: function(SessionService) {
        return SessionService.getCurrentUser();
      }
    }
  })
  .when('/bands/:id/edit',{
    controller: 'bandEditCtrl',
    templateUrl : 'templates/bandEditTemplate.html',
    resolve: {
      session: function(SessionService) {
        return SessionService.getCurrentUser();
      }
    }
  })
  .when('/albums/new',{
    controller: 'albumNewCtrl',
    templateUrl: 'templates/albumNewTemplate.html'
  })
  .when('/bands/:band_id/albums/:id',{
    controller: 'albumShowCtrl',
    templateUrl: 'templates/albumShowTemplate.html',
    resolve: {
      session: function(SessionService) {
        return SessionService.getCurrentUser();
      }
    }
  })
  .when('/users/:id',{
    controller: 'userShowCtrl',
    templateUrl: 'templates/userShowTemplate.html',
    resolve: {
      session: function(SessionService) {
        return SessionService.getCurrentUser();
      }
    }
  })
  .otherwise({
    redirectTo: '/'
  });
});

