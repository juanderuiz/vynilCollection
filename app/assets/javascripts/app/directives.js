angular.module('myApp.directives', [])
.directive('isUserOrEmail', function($http, $timeout, $filter, $q) {
  var isUser = function(input) {
    var d = $q.defer();

    $http({
      url: '/api/check/is_user',
      method: 'POST',
      data: { 'name': input}
    }).then(function(data) {
      if (data.status == 200) d.resolve(data.data);
      else d.reject(data.data);
    });

    return d.promise;
  };

  var checking = null,
      email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return {
    restrict: 'A',
    require: '^ngModel',
    scope: {
      'ngModel': '='
    },
    link: function(scope, ele, attrs, ctrl) {
      scope.$watch(attrs.ngModel, function(newVal) {
        if (!checking) {
          checking = $timeout(function() {
            isUser(newVal).then(function(data) {
              if (data.success) {
                // Is a user
                ctrl.$setValidity('isUserOrEmail', data.success);
              } else {
                // Is an email
                ctrl.$setValidity('isUserOrEmail', email_regex.test(newVal));
              }
              checking = null;
            });
          }, 100);
        }
      })
    }
  }
})
;