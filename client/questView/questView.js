angular.module('cityQuest.questView', [])

.controller('questViewCtrl', function($scope, $routeParams, $window, QuestStorage, uiGmapGoogleMapApi, Auth, InputConversion){
  $scope.questId = $routeParams.questId;
  $scope.myloc = QuestStorage.getCoords();
  $scope.markers = [];
  $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));
  uiGmapGoogleMapApi.then(function(maps){
    fetch();
    $scope.map = {
      events: {
            tilesloaded: function (map) {
                $scope.$apply(function () {
                    $scope.mapInstance = map;
                });
            },
      },
      center: { 
         latitude: $scope.myloc.lat,
         longitude: $scope.myloc.lng
      }, 
      zoom: 11
    }
  });

  var fetch = function(cb){
    QuestStorage.getSingleQuest($scope.questId).then(function(quest){
      $scope.quest = quest;
      $scope.quest.time = InputConversion.minutesToHours($scope.quest.time);
      $scope.quest.rating = InputConversion.ratingAverage($scope.quest.rating);
      $scope.quest.steps.forEach(function(step){
        step.cost = InputConversion.moneyConversion(step.cost)
        step.time = InputConversion.minutesToHours(step.time);
        var iconNum = $scope.markers.length + 1;
        var iconUrl = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + iconNum + "|a3bd29|000000";
        var newMarker = {
          id: $scope.markers.length,
          coords: step.location,
          options: {
            icon: iconUrl,
            labelClass: "marker-labels"
          }
        };
        $scope.markers.push(newMarker);
      });
    });
  };

  $scope.signout = function() {
    Auth.signout();
  };

  var sessionCheck = function(){
    if(!Auth.isAuth()){
      $location.path('/signin')
    }
  };

  sessionCheck();
});

