angular.module('cityQuest.createQuest', [])


.controller('createQuestCtrl', function($scope, $window, $location, QuestStorage){

   $scope.addAgenda = true; 
   $scope.quest = {};
   $scope.step = {};
   $scope.quest.steps = [];
   $scope.stepCount = 1;
   $scope.lastStep = "";

   uiGmapGoogleMapApi.then(function(maps) {
   // function placeMarkerAndPanTo(latLng, map) {
   //    console.log(latLng);
   //    // var marker = new maps.Marker({
   //    //   position: latLng,
   //    //   map: map
   //    // });
   //    // map.panTo(latLng);
   //    console.log('marker')
   // }
    $scope.markers = [];
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
      // center: { 
      //    latitude: 45,
      //    longitude: -73 }, 
      center: { 
         latitude: 45,
         longitude: -73 }, 
      zoom: 8
    }
   });

   $scope.questCreate = function(){
      if($scope.step.description.length>0){
        $scope.pushStep();
      }
      console.log('saving', $scope.quest)
      QuestStorage.saveNewQuest($scope.quest);
      $location.path('/questList');
   };

   $scope.pushStep = function(){
      $scope.step.location = $scope.markers[0].coords;
      $scope.markers = [];
      $scope.step.number = $scope.quest.steps.length;
      $scope.quest.steps.push($scope.step);
      $scope.lastStep = $scope.step.description;
      $scope.step = {};
   };

   $scope.addStepDiv = function() {
    //Sends step fields into quest, then clears it for the next step.
    if($scope.markers.length===0){
      console.log("need marker");
      $scope.markerErr = true;
    }else{
      $scope.pushStep();
      $scope.markerErr = false;
      

      var stepList = angular.element(document.querySelector( '#step' ) );
      stepList.append('<div class="make-quest-step"><span class="make-quest-step-num">Step ' + $scope.stepCount + '.</span> ' + $scope.lastStep + '</div>');
      $scope.stepCount++;
    //Adds new form to the page
      //var stepDiv = angular.element(document.querySelector( '#addStepDiv' ) );
      //stepDiv.append('<div ng-hide="hideStep' + $scope.stepCount + '" id="step' + $scope.stepCount + '"><div class="row"><div class="col-md-6"><div class="input-group"><span class="input-group-addon">Task</span><input ng-model="step.description" type="text" class="form-control"></div><div class="row"><div class="col-md-6"><div class="input-group no-margin"><span class="input-group-addon">Cost</span></div></div><div class="col-md-6"><div class="input-group no-margin"><span class="input-group-addon">Minutes</span><input ng-model="step.time" type="text" class="form-control"></div></div></div></div><div class="col-md-6"><ui-gmap-google-map center="map.center" zoom="map.zoom" events="map.events"><ui-gmap-marker ng-repeat="marker in markers" coords="marker.coords" idkey="marker.id" ></ui-gmap-marker></ui-gmap-google-map></div><div class="col-md-12 clean"></div><div class="col-md-12 clean"></div>'); 
    }
  }
});
