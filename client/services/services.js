angular.module('cityQuest.services', [])

.factory('QuestStorage', function($http, $location){
  var EMPTY_CITY = '';
  var selectedCity = {
    name: EMPTY_CITY,
    coordinates: {},
    isEmpty: function(){
      return selectedCity.name === EMPTY_CITY;
    }
  };

  var saveCity = function(cityStr){
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
    return selectedCity.coordinates;
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
       '/api/quests/?city=' + selectedCity.name
        )
        .then(function(res){
          var fetchedQuests = res.data;
          return fetchedQuests;
        })
        .catch(function(err){
          console.log("getAllQuests did not return any quests: ", err);
        });
  };

  var saveNewQuest = function(quest){
    $http({
        method: 'POST',
        url: '/api/quests',
        data: quest
      })
    .then(function(res){
      return res.data;
    });
  };

  return {
    getSingleQuest: getSingleQuest,
    getAllQuests: getAllQuests,
    saveNewQuest: saveNewQuest,
    saveCity: saveCity,
    getCoords: getCoords,
    getCity: getCity
  }
})

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      console.log('resp: ', resp);
      $window.localStorage.setItem('sessiontoken', resp.data.token); 
      $location.path('/');
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      console.log('resp.data.token: ', resp.data.token);
      $window.localStorage.setItem('sessiontoken', resp.data.token); 
      $location.path('/')
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('sessiontoken'); 
  };

  var signout = function () {
    $window.localStorage.removeItem('sessiontoken');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  }
});
