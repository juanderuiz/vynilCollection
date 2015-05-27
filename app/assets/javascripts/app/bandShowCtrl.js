angular
  .module('myApp.bandShowCtrl',[])
  .controller('bandShowCtrl', function($scope, Band, $routeParams, $location, session) {
    Band.get({id: $routeParams.id}).$promise.then(function(band) {
      $scope.band = band;
      //If the current user is the owner, we will show buttons in the template
      $scope.owner = ($scope.user.id == $scope.band.user_id);
      console.log("Owner? " + $scope.owner);
    });
    
    $scope.albums = null;
    //We need the user to get his ID
    $scope.user = session.user;

  	$scope.deleteBand = function(id){
      Band.delete({id: id});
      console.log("Borrando " + $scope.band.name);
      $location.path('/bands');
    }
});