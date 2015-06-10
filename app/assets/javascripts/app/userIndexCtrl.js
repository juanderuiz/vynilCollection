angular
  .module('myApp.userIndexCtrl',[])
  .controller('userIndexCtrl', ['$scope', 'User', function($scope, User) {
    $scope.users = User.query();
}]);