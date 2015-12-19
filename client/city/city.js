angular.module('cityQuest.city', [])

.controller('cityCtrl', function($scope, $location, $window, QuestStorage){
  // $scope.selectedCity
  $scope.city = "";

  $scope.citySelect = function(){
  	QuestStorage.saveCity($scope.city.toLowerCase());
  	$location.path('/questList');
  };

});
