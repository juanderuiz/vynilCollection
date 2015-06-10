angular
  .module('myApp.userShowCtrl',[])
  .controller('userShowCtrl', function($scope, Band, Album, $routeParams, $location, session) {
    //$scope.band = Band.get({id: $routeParams.band_id});
    Album.query({band_id: "forProfile", user_id: $routeParams.id}).$promise.then(function(albums) {
      $scope.albums = albums;
      if (albums.length > 0){
        console.log("Albums for Profile Page retrieved!");
      } else {
        console.log("The user has NO albums :(");
      }
    });
    Band.query({user_id: $routeParams.id}).$promise.then(function(bands){
      $scope.bands = bands;
      if (bands.length > 0){
        console.log("Bands for Profile Page retrieved!");
      } else {
        console.log("No bands for Profile Page :(");
      }
    });
    //We need the user to get his ID
    $scope.user = session.user;
    $scope.userProfileId = $routeParams.id;

});