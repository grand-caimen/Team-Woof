angular.module('cityQuest.questStorageService', [])

.factory('QuestStorage', function($http, $location, $window){
  var EMPTY_CITY = '';
  var selectedCity = {
    name: EMPTY_CITY,
    coordinates: {},
    isEmpty: function(){
      var cityName = $window.localStorage.getItem('city');
      if(cityName){
        selectedCity.name = cityName;
        return false;
      }
      return selectedCity.name === EMPTY_CITY;
    }
  };

  var saveCity = function(cityStr){
    $window.localStorage.setItem('city', cityStr);
    selectedCity.name = cityStr;
    setCityCoordinates(selectedCity);
  };

  var setCityCoordinates = function(cityObj){
    $http({
        method: 'POST',
        url: '/api/geocode',
        data: {"city": cityObj.name}
    })
    .then(function(res){
      $window.localStorage.setItem('coords', res.data);
      cityObj.coordinates = res.data;
    });
  };

  var getCity = function(){
    if(selectedCity.isEmpty()){
      $location.path('/');
    } else {
      return selectedCity.name;
    }
  };

  var getCoords = function(){
    return $window.localStorage.getItem('coords');
    // return selectedCity.coordinates;
  };

  var getSingleQuest = function(questId){
    return $http.get(
      '/api/quests/?_id=' + questId
      ).then(function(res){
        return res.data[0];
    }) 
    .catch(function(err){
        console.log("getSingleQuest did not return any quests: ", err);
    });
  };

  var getAllQuests = function(){
    return $http.get(
       '/api/quests/?city=' + $window.localStorage.getItem('city')
        )
        .then(function(res){
          var fetchedQuests = res.data;
          return fetchedQuests;
        })
        .catch(function(err){
          console.log("getAllQuests did not return any quests: ", err);
        });
  };

  var saveNewQuestAndGoToQuestList = function(quest){
    $http({
        method: 'POST',
        url: '/api/quests',
        data: quest
      })
    .then(function(res){
      $location.path('/questList');
    });
  };

  return {
    getSingleQuest: getSingleQuest,
    getAllQuests: getAllQuests,
    saveNewQuestAndGoToQuestList: saveNewQuestAndGoToQuestList,
    saveCity: saveCity,
    getCoords: getCoords,
    getCity: getCity
  }
});

