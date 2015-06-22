angular
  .module('myApp.albumEditCtrl',[])
  .controller('albumEditCtrl', function($scope, Album, Band, $routeParams, $location, session) {
    //$scope.band = Band.get({id: $routeParams.id});
    Album.get({id: $routeParams.id, band_id:$routeParams.band_id}).$promise.then(function(album) {
      $scope.album = album;
      //If the current user is the owner, we will show buttons in the template
      $scope.owner = ($scope.user.id == album.user_id);
      console.log("Owner editing? " + $scope.owner);
    });
    Band.query().$promise.then(function(bands) {
      $scope.bands = bands;
      console.log("Bands available " + bands.length);
    });

    //We need the user to get his ID
    $scope.user = session.user;

  	$scope.saveAlbum = function(album){
      $scope.isSubmitting = true;
      console.log("Editando disco " + $scope.album.id);
      album.$update().finally(function(){
        $scope.isSubmitting = false;
        $location.path('/bands/' + album.band_id);
      });
    }
});