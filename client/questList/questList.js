angular.module('cityQuest.questList', [])

.controller('questListCtrl', function($scope, QuestStorage){
  var getAllQuests = function(){
    var selectedCity = '';
    QuestStorage.getAllQuests(selectedCity)
    .then(function(quests){
      // TODO: Display quests
    })
    .catch(function(error){
      console.log(error);
    });
  }

});
