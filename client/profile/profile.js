angular.module('cityQuest.profile', [])

.controller('profileCtrl', function ($scope, $window, QuestStorage, localStorageService, Auth, InputConversion, $location){
  $scope.quests = null;
  $scope.showNoQuestsFoundMsg = false;
  $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));

  // var user = localStorageService.get('user');

  // $scope.userData = user;

  // $scope.$watch('user', function() {
  //   localStorageService.set('user', $scope.userData)
  // }, true);

  $scope.user = localStorageService.get('user');


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
      console.log('hopefully updated here..: ', res);
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
        createdQuest.time = InputConversion.minutesToHours(createdQuest.time);
      });

      localStorageService.set('user', res);
      $scope.user = localStorageService.get('user');
      console.log('user after clicking profile:', $scope.user);
    })
  };

  sessionCheck();
  fetchProfile();
});
