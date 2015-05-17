angular
  .module('myApp.bandShowCtrl',[])
  .controller('bandShowCtrl', function($scope, Band, $routeParams) {
    $scope.band = Band.get({id: $routeParams.id});
    $scope.albums = null;
});