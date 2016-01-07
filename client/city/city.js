angular.module('cityQuest.city', [])

.controller('cityCtrl', function ($scope, $location, $window, QuestStorage, Auth, InputConversion){
  $scope.city = "";
  $scope.gPlace;
  $scope.user = QuestStorage.getUserProfile('user');

  $scope.citySelect = function(){
    QuestStorage.saveCity($scope.city.split(',').splice(0,2).join());
    $location.path('/questList');
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

