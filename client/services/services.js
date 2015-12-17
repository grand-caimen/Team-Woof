angular.module('cityQuest.services', [])

.factory('QuestStorage', function($http){

  var selectedCity = ''; 

  var saveCity = function(city){
    selectedCity = city.toLowerCase();
  };

  var getAllQuests = function(){
    return $http.get(
             '/api/quests/?city=' + selectedCity
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
    $http({
        method: 'POST',
        url: '/api/quests',
        data: questObjStr
      })
    .then(saveNewQuestSuccess,
          saveNewQuestError);
  };

 function saveNewQuestSuccess(data, status){
    //
 };

 function saveNewQuestError(data, status){
    //
 };

 

  return {
    getAllQuests: getAllQuests,
    saveNewQuest: saveNewQuest,
    saveCity: saveCity
  }
});
