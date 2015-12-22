angular.module('cityQuest.createQuest', [])



.controller('createQuestCtrl', function($scope, $window, $location, QuestStorage, uiGmapGoogleMapApi){
   $scope.myloc = QuestStorage.getCoords();
   $scope.quest = {};
   $scope.quest.city = QuestStorage.getCity();
   $scope.quest.tags = [];
   $scope.quest.steps = [];
   $scope.quest.cost = 0;
   $scope.quest.time = 0;
   $scope.step = {};
   $scope.stepCount = 1;
   $scope.lastStep = "";

   uiGmapGoogleMapApi.then(function(maps) {
   // function placeMarkerAndPanTo(latLng, map) {
   //    console.log(latLng);
   //    var marker = new maps.Marker({
   //      position: latLng,
   //      map: map
   //    });
   //    map.panTo(latLng);
   //    console.log('marker')
   // }
    $scope.markers = [];
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
                $scope.markerErr = false;
                $scope.$apply();
            }
      },
      center: { 
         latitude: $scope.myloc.lat,
         longitude: $scope.myloc.lng
       }, 
      zoom: 13
    }
   });

   $scope.questCreate = function(){
    if($scope.requireFields()){
     //If next step has been filled out, add it to the array
     if($scope.step.description){
       $scope.pushStep(); 
     }else{
       console.log('saving', $scope.quest)
       QuestStorage.saveNewQuest($scope.quest);
       $location.path('/questList');
     }
    }
   };

   $scope.pushStep = function(){
      $scope.step.location = $scope.markers[0].coords;
      $scope.markers = [];
      $scope.step.number = $scope.quest.steps.length;
      console.log($scope.step)
      $scope.addTime($scope.step.time);
      $scope.addCost($scope.step.cost);

      $scope.quest.steps.push($scope.step);
      $scope.lastStep = $scope.step.description;
      $scope.step = {};
   };

   $scope.addStepDiv = function() {
    // Throw err if marker hasn't been set
    if($scope.markers.length===0){
      $scope.markerErr = true;
    }else{
      // add step to array and clear form for next step
      $scope.pushStep();
      $scope.markerErr = false;
      
      //Add last step to page list
      var stepList = angular.element(document.querySelector( '#step' ) );
      stepList.append('<div class="make-quest-step"><span class="make-quest-step-num">Step ' + $scope.stepCount + '.</span> ' + $scope.lastStep + '</div>');
      $scope.stepCount++;
    }
  }

  $scope.addTime = function(time){
    var newTime = timeExtraction(time);
    if(typeof newTime === "number") $scope.quest.time += newTime;
    else console.error("Time is not a valid format:", time);
  }

  $scope.addCost = function(money){
    var newMoney = moneyExtraction(money);
    if(typeof newMoney === "number") $scope.quest.cost += newMoney;
    else console.error("Cost is not a valid format:", money);
  }

  $scope.requireFields = function(){
    if(!$scope.quest.name) alert("Provide a quest title");
    else if(!$scope.quest.description)  alert("Provide a quest description");
    else if(!$scope.quest.image) alert("Provide a quest image");
    else if(!$scope.quest.steps) alert("Provide at least one step");
    else return true;
  }
});
