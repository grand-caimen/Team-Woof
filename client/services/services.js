angular.module('cityQuest.services', [])

.factory('QuestStorage', function($http){

  var selectedCity = ''; 

  var saveCity = function(city){
    selectedCity = city;
  };

  var getAllQuests = function(){
    return $http.get(
       '/api/quests/?city=' + selectedCity
        )
        .then(function(res){
          return res.data;
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
});
