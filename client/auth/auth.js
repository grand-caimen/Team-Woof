angular.module('cityQuest.auth', [])

.controller('authController', function ($scope, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
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
