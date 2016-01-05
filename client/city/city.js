angular.module('cityQuest.city', [])

.controller('cityCtrl', function($scope, $location, $window, QuestStorage, Auth){
  $scope.city = "";
  $scope.gPlace;

  $scope.citySelect = function(){
    QuestStorage.saveCity($scope.city.toLowerCase());
    $location.path('/questList');
  };

  var sessionCheck = function(){
    if( ! Auth.isAuth()) {
      $location.path('/signin');
    }
  }

  sessionCheck();
})
//Google Places Autocomplete
.directive('googleplaces', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, model) {
      var options = {
        types: [],
        componentRestrictions: {
          country: 'US'
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

