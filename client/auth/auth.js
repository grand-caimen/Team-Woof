angular.module('cityQuest.auth', [])

.controller('authController', function ($scope, $location, Auth, $rootScope) {
  $scope.user = {};

  $scope.signin = function () {
    $rootScope.user = $scope.user;
    Auth.signin($scope.user)
      .then(function () {
        if(Auth.isAuth()){
          $location.path('/');
        }
      })
      .catch(function (error) {
        $scope.err = error.data.message;
        $scope.showErr = true;
        console.log(error.data.message);
      });
  };

  $scope.signup = function () {
    $rootScope.user = $scope.user;
    Auth.signup($scope.user)
      .then(function (token) {
        $location.path('/');
      })
      .catch(function (error) {
        $scope.err = error.data.message;
        $scope.showErr = true;
        console.error(error);
      });
  };

});
