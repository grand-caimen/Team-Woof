angular.module('cityQuest.auth', [])

.controller('authController', function ($scope, $location, $window, Auth, localStorageService, QuestStorage) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function () {
        localStorageService.set('user', $scope.user);
        if(Auth.isAuth()){
          sessionStorage.setItem('username', $scope.user.username);
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
    console.log($scope.user)
    Auth.signup($scope.user)
      .then(function () {
        localStorageService.set('user', $scope.user);
        if(Auth.isAuth()){
          sessionStorage.setItem('username', $scope.user.username);
          $location.path('/');
        }
      })
      .catch(function (error) {
        $scope.err = error.data.message;
        $scope.showErr = true;
        console.error(error);
      });
  };

  $window.localStorage.removeItem('sessiontoken');
  localStorage.clear();
  localStorageService.clearAll();

});
