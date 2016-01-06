angular.module('cityQuest.questStorageService', [])

.factory('QuestStorage', function($http, $location, $window){
  var questStorage = {};
  questStorage.saveCity = function(cityStr){
    $window.localStorage.setItem('city', cityStr);
    this.setCityCoordinates(cityStr);
  };

  questStorage.setCityCoordinates = function(cityStr){
    $http({
        method: 'POST',
        url: '/api/geocode',
        data: {"city": cityStr}
    })
    .then(function(res){
      $window.localStorage.setItem('coords', JSON.stringify(res.data));
    });
  };

  questStorage.getCity = function(){
    var cityName = $window.localStorage.getItem('city');
    if(cityName){
      return cityName;
    }
    else{
      $location.path('/');
    }
  };

  questStorage.getCoords = function(){
    var coords = $window.localStorage.getItem('coords');
    return JSON.parse(coords);
  };

  questStorage.getSingleQuest = function(questId){
    return $http.get(
      '/api/quests/?_id=' + questId
      ).then(function(res){
        return res.data[0];
    })
    .catch(function(err){
        console.log("getSingleQuest did not return any quests: ", err);
    });
  };

  questStorage.getAllQuests = function(){
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

  questStorage.saveNewQuestAndGoToQuestList = function(quest){
    $http({
        method: 'POST',
        url: '/api/quests',
        data: quest
      })
    .then(function(res){
      $location.path('/questList');
    });
  };

  return questStorage;
});

