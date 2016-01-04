angular.module('cityQuest.city', [])

.controller('cityCtrl', function($scope, $location, $window, QuestStorage, Auth){
  $scope.city = "";

  $scope.citySelect = function(){
    QuestStorage.saveCity($scope.city.toLowerCase()); 
    $location.path('/questList');
  };

  var sessionCheck = function(){
    if( ! Auth.isAuth()) {
      $location.path('/signin');
    }
  }

  sessionCheck();
});
