angular.module('cityQuest.profile', [])

.controller('profileCtrl', function($scope, $window, $rootScope, QuestStorage, Auth, InputConversion, $location){
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

  $scope.getProfile = function() {
    QuestStorage.getProfile($rootScope.user)
    .then(function(res) {
      res.completedQuests.forEach(function(completedQuest){
        completedQuest.time = InputConversion.minutesToHours(completedQuest.time);
        completedQuest.rating = InputConversion.ratingAverage(completedQuest.rating);
      });

      $rootScope.user = res;

      console.log('user after clicking profile:', $rootScope.user);

      // $rootScope.user.completedQuests = [{
      //   image: null,
      //   name: 'Test Quest!'
      // }];
      // console.log('completedQuests: ', $rootScope.user.completedQuests);
    })
  };

  console.log('rootScope user: ', $rootScope.user);
  $scope.getProfile();
  sessionCheck();
});
