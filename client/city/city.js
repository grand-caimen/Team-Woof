angular.module('cityQuest.city', [])

.controller('cityCtrl', function($scope, $location, $window, QuestStorage, Auth){
  // $scope.selectedCity
  $scope.city = "";

  $scope.citySelect = function(){
  	QuestStorage.saveCity($scope.city.toLowerCase());
  	$location.path('/questList');
  };

  $scope.signout = Auth.signout();

});
