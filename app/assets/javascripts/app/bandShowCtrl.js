angular
  .module('myApp.bandShowCtrl',[])
  .controller('bandShowCtrl', function($scope, Band, $routeParams, $location, session) {
    $scope.band = Band.get({id: $routeParams.id});
    $scope.albums = null;
    $scope.caution = null; //To show the proper message in the template

    //To remove a band
    $scope.user = session.user;
    console.log("UserID: " + $scope.user.id);

  	$scope.deleteBand = function(id){
  	  if ($scope.user.id == $scope.band.user_id){ //The current user is the owner
        Band.delete({id: id});
        console.log("Borrando " + $scope.band.name);
        $scope.caution = false;
        $location.path('/bands');
      } else {// The current user is NOT the owner, can't delete it
      	console.log("Not your band!!!");
        $scope.caution = true;
      }
    }
});