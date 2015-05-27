angular
  .module('myApp.bandEditCtrl',[])
  .controller('bandEditCtrl', function($scope, Band, $routeParams, $location, session) {
    //$scope.band = Band.get({id: $routeParams.id});
    Band.get({id: $routeParams.id}).$promise.then(function(band) {
      $scope.band = band;
      //If the current user is the owner, we will show buttons in the template
      $scope.owner = ($scope.user.id == $scope.band.user_id);
      console.log("Owner editing? " + $scope.owner);
    });

    //We need the user to get his ID
    $scope.user = session.user;

  	$scope.saveBand = function(band){
      $scope.isSubmitting = true;
      console.log("Editando " + $scope.band.name);
      band.$update().finally(function(){
        $scope.isSubmitting = false;
        $location.path('/bands/' + band.id);
      });
    }
});