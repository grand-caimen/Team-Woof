angular.module('cityQuest.profile', [])

.controller('profileCtrl', function ($scope, $window, QuestStorage, localStorageService, Auth, InputConversion, $location){
  $scope.quests = null;
  $scope.showNoQuestsFoundMsg = false;
  $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));
  $scope.Math = window.Math;

  // var user = localStorageService.get('user');

  // $scope.userData = user;

  // $scope.$watch('user', function() {
  //   localStorageService.set('user', $scope.userData)
  // }, true);
  $scope.urlBar = false;

  $scope.toggle = function () {
    $scope.urlBar = !$scope.urlBar;
  }

  $scope.loadImage = function () {
    $scope.user.URL = $scope.imageUrl;
    var imageObj = {
      username: $scope.user.username,
      URL: $scope.user.URL
    }
    console.log('Image URL: ', imageObj)
    $scope.urlBar = false;
    QuestStorage.addImageUrl(imageObj);


  }

  $scope.user = localStorageService.get('user');
  $scope.rank = InputConversion.rankConversion(Math.floor($scope.user.xp/100));

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
  setTimeout(function() {
    fetchProfile();
  })
}, 3000);
