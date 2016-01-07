angular.module('cityQuest.createQuest', [])

.controller('createQuestCtrl', function ($scope,
                                        $location,
                                        $window,
                                        QuestStorage,
                                        uiGmapGoogleMapApi,
                                        Auth,
                                        InputConversion,
                                        FormValidation){
  $scope.currCity = InputConversion.capitalizeFirstLetter($window.localStorage.getItem('city'));
  $scope.userLocation = QuestStorage.getCoords();

  $scope.quest = {
   city:  null,
   name:  null,
   tags:    [],
   steps:   [],
   cost:     0,
   time:     0,
   creator: $window.localStorage.user.username
  };

  $scope.quest.city = QuestStorage.getCity();

  $scope.currentStep = {
   description: null,
   time:        null,
   cost:        null,
   location:    null,
   number:      null
  };
  $scope.stepCount = 0;
  $scope.lastStepDescription = "";

  $scope.addStep = function() {
    if(FormValidation.isRequiredStepFieldMissing($scope.currentStep)) return;
    $scope.markerErr = FormValidation.isMarkerMissing($scope.markers);
    if($scope.markerErr) return;

    addStepAndClearForm();
    addStepToDOMPageList();
  };

  $scope.questCreate = function(){
    if(FormValidation.isRequiredQuestFieldMissing($scope.quest)) return;
    if($scope.stepCount === 0){
      alert("Add a quest task first.");
      return;
    }
    if($scope.currentStep.description){
      alert("Add your last task first.");
      return;
    }

    $scope.quest.cost = $scope.quest.cost.toFixed(2);
    console.log('$scope.user : ', $scope.quest)
    QuestStorage.saveNewQuestAndGoToQuestList($scope.quest);
  };

  $scope.signout = function() {
    Auth.signout();
  };

  var addStepAndClearForm = function(){
    $scope.currentStep.location = $scope.markers[0].coords;
    $scope.markers = [];
    $scope.currentStep.number = $scope.quest.steps.length;
    addTime($scope.currentStep.time);
    addCost($scope.currentStep.cost);

    $scope.quest.steps.push($scope.currentStep);
    $scope.lastStepDescription = $scope.currentStep.description;
    $scope.currentStep = {};
  };

  var addStepToDOMPageList = function(){
    $scope.stepCount++;
    var stepList = angular.element(document.querySelector( '#step' ) );
    stepList.append('<div class="make-quest-step"><span class="make-quest-step-num">Step ' + $scope.stepCount + '.</span> ' + $scope.lastStepDescription + '</div>');
  }

  var addTime = function(time){
    var newTime = InputConversion.timeExtraction(time);
    $scope.quest.time += newTime;
  }

  var addCost = function(money){
    var newMoney = InputConversion.moneyExtraction(money);
    $scope.quest.cost += newMoney;
  }

  var sessionCheck = function(){
    if( ! Auth.isAuth()){
      $location.path('/signin');
    }
  };

  var loadGoogleMapAndListenForMarkerClicks = function(){
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
         latitude: $scope.userLocation.lat,
         longitude: $scope.userLocation.lng
       },
      zoom: 13
    }
    });
  };

  sessionCheck();
  loadGoogleMapAndListenForMarkerClicks();
});
