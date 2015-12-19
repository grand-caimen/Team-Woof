angular.module('cityQuest.questView', [])

.controller('questViewCtrl', function($scope, $routeParams, QuestStorage){
  $scope.questId = $routeParams.questId;

  QuestStorage.getSingleQuest($scope.questId).then(function(quest){
  	$scope.quest = quest;
  });
});

