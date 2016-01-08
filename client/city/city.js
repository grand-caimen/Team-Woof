angular.module('cityQuest.city', [])

.controller('cityCtrl', function ($scope, $location, $window, QuestStorage, Auth, InputConversion, localStorageService){
  $scope.city = "";
  $scope.gPlace;
  $scope.user = localStorageService.get('user');

  $scope.signOut = function() {
    Auth.signOut();
  }

  $scope.citySelect = function(){
    if ($scope.city !== undefined && $scope.city.length > 1) {
      QuestStorage.saveCity($scope.city.split(',').splice(0,2).join());
      $location.path('/questList');
    } else {
      QuestStorage.saveCity($scope.city);
    }
  };

  var sessionCheck = function(){
    if( ! Auth.isAuth()) {
      $location.path('/signin');
    }
  }

  var fetchProfile = function() {
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
        createdQuest.time = InputConversion.minutesToHours(createdQuest.time);
      });

      localStorageService.set('user', res);
      console.log('user after signin: HERE? ', $scope.user);
    })
  };

  sessionCheck();
  fetchProfile();
})
//Google Places Autocomplete
.directive('googleplaces', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, model) {
      var options = {
        types: ['(cities)'],
        componentRestrictions: {
        }
      };
      scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

      google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
        scope.$apply(function() {
            model.$setViewValue(element.val());
        });
      });
    }
  };
});

