angular
  .module('myApp.albumShowCtrl',[])
  .controller('albumShowCtrl', function($scope, Band, Album, $routeParams, $location, session) {
    //$scope.album = Album.get({id:$routeParams.id, band_id: $routeParams.band_id});
    Album.get({id: $routeParams.id, band_id:$routeParams.band_id}).$promise.then(function(album) {
      $scope.album = album;
      //If the current user is the owner, we will show buttons in the template
      $scope.owner = ($scope.user.id == album.user_id);
      console.log("Album Owner? " + $scope.owner);
    });

    $scope.band = Band.get({id: $routeParams.band_id});
    
    //We need the user to get his ID
    $scope.user = session.user;

  	$scope.deleteAlbum = function(band,id){
  	    var x = window.confirm("Are you sure?")
        if (x){
          Album.delete({band_id: band, id: id});
          console.log("Borrando " + $scope.album.title);
          $location.path('/bands/' + $scope.album.band_id);
        } else {
          console.log("Aborting delete album " + $scope.album.title );
        }
    };
});