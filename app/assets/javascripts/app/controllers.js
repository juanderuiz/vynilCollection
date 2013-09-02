angular.module('myApp.controllers', [])
.controller('HomeController', function($scope, session, SessionService, ArticleService, Share) {
  $scope.articles = ArticleService.getLatestFeed();
  $scope.user = session.user;
  $scope.newShare = {
    recipient: ''
  };
  $scope.share = function(article) {
    Share.save({
      url: article.link,
      from_user: $scope.user.id,
      user: $scope.newShare.recipient
    });
    $scope.newShare.recipient = '';
  }
});