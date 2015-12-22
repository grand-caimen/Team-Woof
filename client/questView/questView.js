angular.module('cityQuest.questView', [])

.controller('questViewCtrl', function($scope, $routeParams, QuestStorage){
  $scope.questId = $routeParams.questId;

  QuestStorage.getSingleQuest($scope.questId).then(function(quest){
    $scope.quest = quest;
    $scope.quest.time = minutesToHours($scope.quest.time);
    $scope.quest.steps.forEach(function(step){
      var x = angular.element('.streetView');
      step.cost = moneyConversion(step.cost)
      step.time = minutesToHours(step.time);
    });
  });
})

.directive('streetViewDirective', function())

