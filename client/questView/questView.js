angular.module('cityQuest.questView', [])

.controller('questViewCtrl', function($scope, $routeParams, QuestStorage){
  var passedInQuestIdAsString = $routeParams.questId;
  $scope.questId = +passedInQuestIdAsString; // Convert to type number

  $scope.quest = QuestStorage.getSingleQuest($scope.questId);

});

