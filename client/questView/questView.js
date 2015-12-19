angular.module('cityQuest.questView', [])

.controller('questViewCtrl', function($scope, $routeParams, QuestStorage){
  //var passedInQuestIdAsString = $routeParams.questId;
  $scope.questId = $routeParams.questId;

  //$scope.quest = QuestStorage.getSingleQuest($scope.questId);
  $scope.quest = {"_id":"567471c4a89f7ab51f2e2cd8","name":"The Best of Zilker Park","description":"A couple of perfect hours in Austin, TX","city":"austin","time":180,"cost":7,"image":"http://www.edwardsaquifer.net/images/barton_main_spring.jpg","__v":0,"steps":[{"number":0,"description":"Go take a dip at Barton Springs.","location":"30.264439, -97.771279","time":90,"cost":4,"_id":"567471c4a89f7ab51f2e2cdb"},{"number":1,"description":"Drink some watermelon juice from the snack bar.","location":"30.264439, -97.771279","time":30,"cost":3,"_id":"567471c4a89f7ab51f2e2cda"},{"number":2,"description":"Play Frisbee in the park.","location":"30.267812, -97.774069","time":60,"cost":0,"_id":"567471c4a89f7ab51f2e2cd9"}],"rating":[3,4,4,5,5,5,3],"tags":[{"text": "Cheap"},{"text": "Nature"},{"text": "Park"},{"text": "Sunshine"}],"$$hashKey":"object:7"};
  $scope.quest.time = minutesToHours($scope.quest.time);
  $scope.quest.steps.forEach(function(step){
    step.cost = moneyConversion(step.cost)
    step.time = minutesToHours(step.time);
  });
});

