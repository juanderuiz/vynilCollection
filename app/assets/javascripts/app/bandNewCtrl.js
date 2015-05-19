angular
  .module('myApp.bandNewCtrl',[])
  .controller('bandNewCtrl', ['$scope', '$location', 'Band', function($scope, $location, Band) {
    $scope.newBand = {name:'', url:'', user_id:0};

    $scope.saveBand = function(band){
      Band.save(band);
      $location.path('/bands');
    }
}]);