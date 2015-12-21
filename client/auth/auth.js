angular.module('cityQuest.auth', [])

.controller('authController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.authCheck = Auth.isAuth();

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function () {
        $scope.authCheck();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signout = function() {
    console.log('Sign out Function ran');
    Auth.signout();
    $location.path('/signin');

  };
});