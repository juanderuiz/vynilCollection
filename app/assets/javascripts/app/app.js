angular.module('myApp', ['ngRoute', 'myApp.controllers', 'myApp.services'])
.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/templates/dashboard.html', 
    controller: 'HomeController',
    resolve: {
      user: function(SessionService) {
        return SessionService.requestCurrentUser();
      }
    }
  })
  .otherwise({
    redirectTo: '/'
  });
})
;
