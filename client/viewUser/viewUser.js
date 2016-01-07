angular.module('cityQuest.viewUser', [])

.controller('ViewUserCtrl', function ($scope, $rootScope, $window, QuestStorage, Auth, InputConversion, $location){
  $scope.quests = null;
  $scope.showNoQuestsFoundMsg = false;
  $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));
  $scope.user = QuestStorage.getUserProfile('user');

  $scope.signout = function() {
    Auth.signout();
  };

  var sessionCheck = function(){
    if(!Auth.isAuth()){
      $location.path('/signin')
    }
  };

  var fetchProfile = function(user) {
    user = {username: user};
    console.log('LOOK HERE: ', user);
    QuestStorage.fetchProfile(user)
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
    })
  };

  sessionCheck();
  fetchProfile($rootScope.viewUser);
});
