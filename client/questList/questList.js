angular.module('cityQuest.questList', [])

.controller('questListCtrl', function($scope, $window, QuestStorage, Auth, InputConversion, $location){
  $scope.quests = null;
  $scope.showNoQuestsFoundMsg = false;
  $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));
  $scope.signout = function() {
    Auth.signout();
  };

  var getAllQuests = function(){
    QuestStorage.getAllQuests()
    .then(function(quests){
      var questsFound = quests.length > 0;
      if(questsFound){
        quests.forEach(function(quest){
          quest.time = InputConversion.minutesToHours(quest.time);
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

  var sessionCheck = function(){
    if(!Auth.isAuth()){
      $location.path('/signin')
    }
  };

  sessionCheck();
  getAllQuests();
});
