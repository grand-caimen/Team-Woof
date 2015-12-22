angular.module('cityQuest.services', [])

.factory('QuestStorage', function($http, $location){

  var selectedCity = '';
  var selectedCordinates = {};
  var lastFetchedQuests = null;

  var saveCity = function(city){
    selectedCity = city;
    geocode(city);
  };

  var getCity = function(){
    if(selectedCity==="") $location.path('/');
    else return selectedCity;
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
    return $http({
             method: 'POST',
             url: '/api/quests',
             data: quest
           })
           .then(function(res){
             //Nothing to do.
           })
           .catch(function(err){
             console.log("saveNewQuest failed in services.js");
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

  //TODO: Remove once hooked up to real server database. - John
  var initializeWithFakeData = function(fakeQuests){
    //Pre-filling 'global-ish' lastFetchedQuests without HTTP GET
    lastFetchedQuests = fakeQuests;
  }  //End TODO

  return {
    initializeWithFakeData: initializeWithFakeData, //TODO: remove this - John
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
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.cityQuest');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.cityQuest');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  }
});
