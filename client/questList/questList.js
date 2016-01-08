angular.module('cityQuest.questList', [])

.controller('questListCtrl', function ($scope, $window, QuestStorage, Auth, localStorageService, InputConversion, $location){
  $scope.quests = null;
  $scope.showNoQuestsFoundMsg = false;
  $scope.showNoCityFoundMsg = false;
  $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));

  $scope.user = localStorageService.get('user');

  $scope.signout = function() {
    Auth.signout();
  };

  var getCity = function() {
    if (QuestStorage.getCity() === 'no city') {
      $scope.showNoCityFoundMsg = true;
    }
  };

  var getAllQuests = function(){
    QuestStorage.getAllQuests()
    .then(function(quests){
      var questsFound = quests.length > 0;
      if(questsFound){
        quests.forEach(function(quest){
          quest.time = InputConversion.minutesToHours(quest.time);
          quest.rating = InputConversion.ratingAverage(quest.rating);
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

  getCity();

  if (!$scope.showNoCityFoundMsg) {
    sessionCheck();
    getAllQuests();
  }
});
