angular.module('cityQuest.auth', [])

.controller('authController', function ($scope, $location, $window, Auth, QuestStorage) {
  $scope.user = {};

  $scope.signin = function () {
    console.log('user: ', $scope.user );
    Auth.signin($scope.user)
      .then(function () {
        QuestStorage.setUserProfile($scope.user);
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
    console.log('user: ', $scope.user );
    Auth.signup($scope.user)
      .then(function () {
        QuestStorage.setUserProfile($scope.user);
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

});
