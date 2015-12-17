angular.module('cityQuest.services', [])

.factory('QuestStorage', function($http){
  var getAllQuests = function(selectedCity){
    return $http.get(
             '/quests/?city=' + selectedCity
           )
           .then(getQuestsSuccess,
                 getQuestsError);
  };

  function getQuestsSuccess(data, status){
    return data;
  };

  function getQuestsError(data, status){
    console.log(status);
  };

  var saveNewQuest = function(quest){
    var questObjStr = JSON.stringify(quest);
    $http.post(
      '/quests',
      questObjStr
    )
    .then(saveNewQuestSuccess,
          saveNewQuestError);
  };

 function saveNewQuestSuccess(data, status){

 };

 function saveNewQuestError(data, status){

 };

  return {
    getAllQuests: getAllQuests,
    saveNewQuest: saveNewQuest
  }
});
