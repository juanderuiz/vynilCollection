angular
  .module('myApp.bandEditCtrl',[])
  .controller('bandEditCtrl', function($scope, Band, $routeParams, $location) {
    $scope.band = Band.get({id: $routeParams.id});
    
    //What if I put the link in the navigator and the user is not the owner?

  	$scope.saveBand = function(band){
      $scope.isSubmitting = true;
      console.log("Editando " + $scope.band.name);
      band.$update().finally(function(){
        $scope.isSubmitting = false;
        $location.path('/bands/' + band.id);
      });
    }
});