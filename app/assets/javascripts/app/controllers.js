angular.module('myApp.controllers', [])
.controller('HomeController', function($scope, session, SessionService, ArticleService, Share, Album) {
  ArticleService.getLatestFeed()
  .then(function(data) {
    $scope.articles = data;
  });
  $scope.user = session.user;
  $scope.newShare = {
    recipient: ''
  };
  $scope.share = function(recipient, article) {
    var share = new Share({
      url: article.link,
      from_user: $scope.user.id,
      user: recipient
    });
    share.$save();
    $scope.newShare.recipient = '';
  };

  Album.query({band_id: "NO"}).$promise.then(function(albums) {
      $scope.albums = albums;
      if (albums.length > 0){
        console.log("Albums for Main Page retrieved!");
      } else {
        console.log("No albums for Main Page :(");
      }
  });
});