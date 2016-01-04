angular.module('cityQuest.createQuest', [])

.controller('createQuestCtrl', function($scope, $location, $window, QuestStorage, uiGmapGoogleMapApi, Auth, InputConversion){
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
   $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));
   uiGmapGoogleMapApi.then(function(maps) {
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

                var marker = {
                    id: Date.now(),
                    coords: {
                        latitude: e.latLng.lat(),
                        longitude: e.latLng.lng()
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

  $scope.signout = function() {
    Auth.signout();
  };

  $scope.questCreate = function(){
    if(isRequiredQuestFieldMissing()) return;
    if($scope.step.description){
      alert("Add your last task first.");
      return;
    }

    $scope.quest.cost = $scope.quest.cost.toFixed(2);
    QuestStorage.saveNewQuestAndGoToQuestList($scope.quest);
  };

  $scope.addStep = function() {
    if(isRequiredStepFieldMissing()) return;
    if(isMarkerMissing()) return;

    addStepAndClearForm();
    addStepToDOMPageList();
  };

  var addStepAndClearForm = function(){
    $scope.step.location = $scope.markers[0].coords;
    $scope.markers = [];
    $scope.step.number = $scope.quest.steps.length;
    addTime($scope.step.time);
    addCost($scope.step.cost);

    $scope.quest.steps.push($scope.step);
    $scope.lastStep = $scope.step.description;
    $scope.step = {};
  };

  var addStepToDOMPageList = function(){
    var stepList = angular.element(document.querySelector( '#step' ) );
    stepList.append('<div class="make-quest-step"><span class="make-quest-step-num">Step ' + $scope.stepCount + '.</span> ' + $scope.lastStep + '</div>');
    $scope.stepCount++;
  }

  var addTime = function(time){
    var newTime = InputConversion.timeExtraction(time);
    $scope.quest.time += newTime;
  }

  var addCost = function(money){
    var newMoney = InputConversion.moneyExtraction(money);
    $scope.quest.cost += newMoney;
  }

  var isRequiredQuestFieldMissing = function(){
    var fieldMissing = true;
    if( ! $scope.quest.name){
      alert("Provide a quest title");
      return fieldMissing;
    }

    if( ! $scope.quest.description){
      alert("Provide a quest description");
      return fieldMissing;
    }

    if( ! $scope.quest.image){
      alert("Provide a quest image");
      return fieldMissing;
    }

    if( ! $scope.quest.steps){
      alert("Provide at least one step");
      return fieldMissing;
    }

    fieldMissing = false;
    return fieldMissing;
  };

  var isRequiredStepFieldMissing = function(){
    var fieldMissing = true;
    if( ! $scope.step.description){
      alert("Provide a task description");
      return fieldMissing;
    }

    if( ! $scope.step.time){
      alert("Provide a task time");
      return fieldMissing;
    }

    var time = InputConversion.timeExtraction($scope.step.time);
    var timeIsNaN = time !== time; // NaN is the only JavaScript value that is treated as unequal to itself.
    var timeIsNotTypeNumber = typeof time !== "number";
    if(timeIsNaN ||
       timeIsNotTypeNumber){
      alert("Minutes is not a valid format: ", $scope.step.time);
      return fieldMissing;
    }

    if( ! $scope.step.cost){
      alert("Provide a task cost");
      return fieldMissing;
    }

    var cost = InputConversion.moneyExtraction($scope.step.cost);
    var costIsNaN = cost !== cost; // NaN is the only JavaScript value that is treated as unequal to itself.
    var costIsNotTypeNumber = typeof cost !== "number";
    if(costIsNaN || costIsNotTypeNumber){
      alert("Cost is not a valid format: ", $scope.step.cost);
      return fieldMissing;
    }

    fieldMissing = false;
    return fieldMissing;
  };

  var isMarkerMissing = function(){
    if($scope.markers.length === 0){
      $scope.markerErr = true;
    } else {
      $scope.markerErr = false;
    }

    return $scope.markerErr;
  };

  var sessionCheck = function(){
    if( ! Auth.isAuth()){
      $location.path('/signin');
    }
  };

  sessionCheck();
});
