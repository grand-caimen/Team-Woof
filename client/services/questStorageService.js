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
    setCityCoordinates(cityStr);
  };

  var setCityCoordinates = function(cityStr){
    $http({
        method: 'POST',
        url: '/api/geocode',
        data: {"city": cityStr}
    })
    .then(function(res){
      $window.localStorage.setItem('coords', JSON.stringify(res.data));
    });
  };

  var getCity = function(){
    var cityName = $window.localStorage.getItem('city');
    if(cityName){
      return cityName;
    }
    else{
      $location.path('/');
    }
  };

  var getCoords = function(){
    var coords = $window.localStorage.getItem('coords');
    console.log(coords);
    return JSON.parse(coords);
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

