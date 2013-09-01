angular.module('myApp.controllers', [])
.controller('HomeController', function($scope, user, SessionService, ArticleService, Share) {
  $scope.articles = ArticleService.getLatestFeed();
  $scope.user = user.user;
  $scope.share = function(article) {
    Share.save({
      url: article.link,
      from_user: $scope.user.id
    });
  }
});