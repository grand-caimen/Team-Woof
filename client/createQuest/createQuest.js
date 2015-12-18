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
    $scope.map = {
      markers: [],
      events: {
            tilesloaded: function (map) {
                $scope.$apply(function () {
                    $scope.mapInstance = map;
                });
            },
            click: function(mapModel, eventName, originalEventArgs){
               $scope.$apply(function(){
                  var lat = originalEventArgs[0].latLng.lat();
                  var lng = originalEventArgs[0].latLng.lng();
                  var marker = {};
                  marker.coords = {
                     latitude: lat,
                     longtitude: lng
                  };
                  console.log(marker);
                  $scope.marker = marker;
                  // $scope.map.markers.push(marker);
               });
 
            }
      },
      center: { 
         latitude: 45,
         longitude: -73 }, 
      zoom: 8
    }
     // $scope.map.events = {'click':'dosomething'};
     // $scope.map.addListener('click', function(e) {
     //    placeMarkerAndPanTo(e.latLng, map);
     // });
   });

   $scope.questCreate = function(){
      $scope.pushStep();
      QuestStorage.saveNewQuest($scope.quest);
      $location.path('/questList');
   };

   $scope.pushStep = function(){
      $scope.step.number = $scope.quest.steps.length;
      $scope.quest.steps.push($scope.step);
   };

   $scope.addStepDiv = function() {
    //Sends step fields into quest, then clears it for the next step.
      $scope.pushStep();
      $scope.step = {};
      $scope.marker = {};

    //Adds new form to the page
      var div = angular.element( document.querySelector( '#addStepDiv' ) );
      div.append('<h3>Hi</h3>'); 
    }
});
