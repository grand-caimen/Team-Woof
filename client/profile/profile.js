angular.module('cityQuest.profile', [])

.controller('profileCtrl', function ($scope, $window, $rootScope, QuestStorage, Auth, InputConversion, $location){
  $scope.quests = null;
  $scope.showNoQuestsFoundMsg = false;
  $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));

  $scope.signout = function() {
    Auth.signout();
  };

  var sessionCheck = function(){
    if(!Auth.isAuth()){
      $location.path('/signin')
    }
  };

  var user = JSON.stringify($rootScope.user);

  $scope.getProfile = function() {
    QuestStorage.getProfile(user)
    .then(function(res) {
      console.log('res after clicking profile :', res)
    })
  };

  console.log('rootScope user: ', $rootScope.user);
  $scope.getProfile();
  sessionCheck();
});
