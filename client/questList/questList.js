angular.module('cityQuest.questList', [])

.controller('questListCtrl', function($scope, QuestStorage, Auth, $location){
  //Populate this object with variables 
  $scope.city = "";
  $scope.showErr = false;

  $scope.quests = null;

  $scope.getAllQuests = function(){
    QuestStorage.getAllQuests()
    .then(function(quests){
      if(quests.length>0){
        quests.forEach(function(quest){
          quest.time = minutesToHours(quest.time);
        })
      }else{
        $scope.showErr = true;
      }
      $scope.quests = quests;
    })
    .catch(function(error){
      console.log(error);
    });
  }

  $scope.getAllQuests();

  $scope.signout = function() {
    console.log('Sign out Function ran');
    Auth.signout();
    $location.path('/signin');

  };

});
