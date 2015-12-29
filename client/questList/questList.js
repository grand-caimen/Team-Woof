angular.module('cityQuest.questList', [])

.controller('questListCtrl', function($scope, QuestStorage, Auth, $location){
  $scope.quests = null;
  $scope.showNoQuestsFoundMsg = false;

  $scope.getAllQuests = function(){
    QuestStorage.getAllQuests()
    .then(function(quests){
      var questsFound = quests.length > 0;
      if(questsFound){
        quests.forEach(function(quest){
          quest.time = minutesToHours(quest.time);
        });
        $scope.quests = quests;
      }else{
        $scope.showNoQuestsFoundMsg = true;
      }
    })
    .catch(function(error){
      console.log(error);
    });
  }

  $scope.signout = function() {
    Auth.signout();
  };

  $scope.sessionCheck = function(){
    if(!Auth.isAuth()){
      $location.path('/signin')
    }
  };

  $scope.sessionCheck();
  $scope.getAllQuests();
});
