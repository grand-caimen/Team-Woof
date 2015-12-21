angular.module('cityQuest.services', [])

.factory('QuestStorage', function($http){

  var selectedCity = '';
  var selectedCordinates = {};
  var lastFetchedQuests = null;

  var saveCity = function(city){
    selectedCity = city;
    geocode(city);
  };

  var getCity = function(){
    return selectedCity;
  };

  var getCoords = function(){
    return selectedCordinates;
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
       '/api/quests/?city=' + selectedCity
        )
        .then(function(res){
          lastFetchedQuests = res.data;
          return lastFetchedQuests;
        })
        .catch(function(err){
          console.log("getAllQuests did not return any quests: ", err);
        });
  };

  function getQuestsSuccess(data, status){
  // $http will return the entire response object. To get the data returned from the database use data.data
    return data.data;
  };

  function getQuestsError(data, status){
    console.log(status);
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

  var geocode = function(city){
    $http({
        method: 'POST',
        url: '/api/geocode',
        data: {"city":city}
      })
    .then(function(res){
      console.log(res.data);
      selectedCordinates = res.data;
    });
  };

  function saveNewQuestSuccess(data, status){
    //
  };

  function saveNewQuestError(data, status){
    //
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
      url: '/api/users',
      data: user
    })
    .then(function (resp) {
      console.log('resp: ', resp);
      // $window.localStorage.setItem('sessiontoken', resp.data.token); 
      $location.path('/')
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: user
    })
    .then(function (resp) {
      console.log('resp.data.token: ', resp.data.token);
      $window.localStorage.setItem('sessiontoken', resp.data.token); 
      $location.path('/')
    });
  };

  var isAuth = function () {
    if(!!$window.localStorage.getItem('sessiontoken')){
      $location.path('/')
    }
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
