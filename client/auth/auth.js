angular.module('cityQuest.auth', [])

.controller('authController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  // $scope.authCheck = Auth.isAuth();

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function () {
        if(Auth.isAuth()){
          $location.path('/');
        }
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

});