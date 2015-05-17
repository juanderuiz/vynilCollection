angular
  .module('myApp.bandIndexCtrl',[])
  .controller('bandIndexCtrl', ['$scope', 'Band', function($scope, Band) {
    $scope.bands = Band.query();
}]);