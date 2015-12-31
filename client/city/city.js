angular.module('cityQuest.city', [])

.controller('cityCtrl', function($scope, $location, QuestStorage, Auth){
  $scope.city = "";

  $scope.citySelect = function(){
    QuestStorage.saveCity($scope.city.toLowerCase());
    $location.path('/questList');
  };

  $scope.sessionCheck = function(){
    if( ! Auth.isAuth()) {
      $location.path('/signin');
    }
  }

  $scope.sessionCheck();
});
