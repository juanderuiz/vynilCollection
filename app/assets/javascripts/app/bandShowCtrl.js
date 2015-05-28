angular
  .module('myApp.bandShowCtrl',[])
  .controller('bandShowCtrl', function($scope, Band, Album, $routeParams, $location, session) {
    Band.get({id: $routeParams.id}).$promise.then(function(band) {
      $scope.band = band;
      //If the current user is the owner, we will show buttons in the template
      $scope.owner = ($scope.user.id == $scope.band.user_id);
      console.log("Owner? " + $scope.owner);
    });
    
    Album.query({band_id: $routeParams.id}).$promise.then(function(albums) {
      $scope.albums = albums;
      if (albums.length > 0){
        console.log("Albums retrieved!");
      } else {
        console.log("No albums for that band :(");
      }
      
    });
    //We need the user to get his ID
    $scope.user = session.user;

  	$scope.deleteBand = function(id){
      Band.delete({id: id});
      console.log("Borrando " + $scope.band.name);
      $location.path('/bands');
    }
});