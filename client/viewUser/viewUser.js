angular.module('cityQuest.viewUser', [])

.controller('ViewUserCtrl', function ($scope, $rootScope, $window, QuestStorage, Auth, InputConversion, $location, localStorageService){
  $scope.quests = null;
  $scope.showNoQuestsFoundMsg = false;
  $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));
  $scope.user = localStorageService.get('viewUser');
  $scope.ogUser = localStorageService.get('user');
  $scope.Math = window.Math;

  $scope.signout = function() {
    Auth.signout();
  };

  var sessionCheck = function(){
    if(!Auth.isAuth()){
      $location.path('/signin')
    }
  };

  var fetchProfile = function(user) {

    console.log('LOOK HERE: ', $scope.user);
    QuestStorage.fetchProfile($scope.user)
    .then(function(res) {
      res.completedQuests.forEach(function(completedQuest){
        completedQuest.time = InputConversion.minutesToHours(completedQuest.time);
        completedQuest.rating = InputConversion.ratingAverage(completedQuest.rating);
        if (completedQuest.reviews !== undefined) {
          completedQuest.reviews.forEach(function(review) {
            if (review.username === res.username) {
              completedQuest.userReview = review.review;
            }
          });
        }
      });
      res.createdQuests.forEach(function(createdQuest) {
        createdQuest.rating = InputConversion.ratingAverage(createdQuest.rating);
      });

      localStorageService.set('viewUser', res);
      $scope.user = localStorageService.get('viewUser');
    })
  };

  sessionCheck();
  fetchProfile();
});
