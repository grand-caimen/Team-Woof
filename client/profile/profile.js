angular.module('cityQuest.profile', [])

.controller('profileCtrl', function ($scope, $window, QuestStorage, Auth, InputConversion, $location){
  $scope.quests = null;
  $scope.showNoQuestsFoundMsg = false;
  $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));
  $scope.user = QuestStorage.getUserProfile('user');
  $scope.Math = window.Math;

  $scope.signout = function() {
    Auth.signout();
  };

  var sessionCheck = function(){
    if(!Auth.isAuth()){
      $location.path('/signin')
    }
  };

  var fetchProfile = function() {
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

      QuestStorage.setUserProfile(res);
      console.log('user after signin: ', $scope.user);
    })
  };

  sessionCheck();
  fetchProfile();
});
