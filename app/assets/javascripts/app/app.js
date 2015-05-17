angular.module('myApp', ['ngRoute', 'myApp.controllers', 'myApp.bandIndexCtrl', 'myApp.bandShowCtrl', 'myApp.services', 'myApp.directives', 'myApp.filters', 'ngAnimate'])
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
  .when('/bands/:id',{
    controller: 'bandShowCtrl',
    templateUrl : 'templates/bandShowTemplate.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});

;
