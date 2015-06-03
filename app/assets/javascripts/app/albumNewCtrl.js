angular
  .module('myApp.albumNewCtrl',[])
  .controller('albumNewCtrl', ['$scope', '$location', 'Band', 'Album', function($scope, $location, Band, Album) {
    Band.query().$promise.then(function(bands) {
      $scope.bands = bands;
      console.log("Bands retrieved " + bands.length);
    });
    //$scope.newAlbum = {title:'', band_id:0, user_id:0};
    $scope.newAlbum = {title:''};
    $scope.missingBand = false;

    $scope.saveAlbum = function(album){
      console.log("Trying to save the album...");
      if (album.band_id != 0){
        Album.save({band_id: album.band_id}, album);
        console.log("Band ok!")
        $location.path('/');
      } else {
      	$scope.missingBand = true;
      	console.log("No band selected!");
      	//Con un ng-show mostrar un aviso
      }
    };
}]);