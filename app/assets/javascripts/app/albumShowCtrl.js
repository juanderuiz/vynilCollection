angular
  .module('myApp.albumShowCtrl',[])
  .controller('albumShowCtrl', function($scope, Band, Album, $routeParams, $location, session) {
    $scope.album = Album.get({id:$routeParams.id, band_id: $routeParams.band_id});
    $scope.band = Band.get({id: $routeParams.band_id});
    //We need the user to get his ID
    $scope.user = session.user;

  	$scope.deleteAlbum = function(id){
      
    };
});