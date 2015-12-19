angular.module('cityQuest.createQuest', [])


.controller('createQuestCtrl', function($scope, $window, $location, QuestStorage){

   $scope.addAgenda = true; 
   $scope.quest = {};
   $scope.step = {};
   $scope.quest.steps = [];

   uiGmapGoogleMapApi.then(function(maps) {
   console.log(maps);
   // function placeMarkerAndPanTo(latLng, map) {
   //    console.log(latLng);
   //    // var marker = new maps.Marker({
   //    //   position: latLng,
   //    //   map: map
   //    // });
   //    // map.panTo(latLng);
   //    console.log('marker')
   // }
    $scope.markers = [null];
    // $scope.markers = [];
    $scope.map = {
      events: {
            tilesloaded: function (map) {
                $scope.$apply(function () {
                    $scope.mapInstance = map;
                });
            },
            click: function(mapModel, eventName, originalEventArgs){
                var e = originalEventArgs[0];
                var lat = e.latLng.lat(),lon = e.latLng.lng();
                var marker = {
                    id: Date.now(),
                    coords: {
                        latitude: lat,
                        longitude: lon
                    }
                };
                $scope.markers[0] = marker;
                $scope.$apply();
            }
      },
      center: { 
         latitude: 45,
         longitude: -73 }, 
      zoom: 8
    }
   });

   $scope.questCreate = function(){
      $scope.pushStep();
      console.log('saving', $scope.quest)
      QuestStorage.saveNewQuest($scope.quest);
      $location.path('/questList');
   };

   $scope.pushStep = function(){
      $scope.step.location = $scope.markers[0].coords;
      $scope.markers[0] = null;
      $scope.step.number = $scope.quest.steps.length;
      $scope.quest.steps.push($scope.step);
   };

   $scope.addStepDiv = function() {
    //Sends step fields into quest, then clears it for the next step.
      $scope.pushStep();
      $scope.step = {};

    //Adds new form to the page
      var div = angular.element( document.querySelector( '#addStepDiv' ) );
      div.append('<h3>Hi</h3>'); 
    }
});
