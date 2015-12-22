angular.module('cityQuest.questView', [])

.controller('questViewCtrl', function($scope, $routeParams, QuestStorage, uiGmapGoogleMapApi){
  $scope.questId = $routeParams.questId;
  $scope.myloc = QuestStorage.getCoords();
  $scope.markers = [];
  uiGmapGoogleMapApi.then(function(maps){
    $scope.fetch();
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
  $scope.fetch = function(cb){
    QuestStorage.getSingleQuest($scope.questId).then(function(quest){
    	$scope.quest = quest;
      $scope.quest.time = minutesToHours($scope.quest.time);
      $scope.quest.steps.forEach(function(step){
        step.cost = moneyConversion(step.cost)
        step.time = minutesToHours(step.time);
        var iconNum = $scope.markers.length + 1;
        var iconUrl = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + iconNum + "|FF0000|000000";
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
})

.directive('stepViewDirective',function(){
  var stepViewTemplate = 
   '<div class="col-md-12 stepContainer">\
     <div class="col-md-12">\
        <h3 class="quest-view-title">{{step.number+1}}. {{step.description}}</h3>\
        <span style="color:#fff">..</span>\
        <span class="quest-view-step-tab margin-left">Time: {{step.time}}</span><span class="quest-view-step-tab">Cost: {{step.cost}}</span>\
      </div>\
      <div class="col-md-12 streetView">\
      </div>\
    </div>';

  function populateDirectiveWithStreetView(scope, directiveMatchedElements, attrs){
    var streetViewDomElement =
      findStreetViewDomElementInTemplate(directiveMatchedElements);
    createStreetView(scope.step, streetViewDomElement);
  };

  function findStreetViewDomElementInTemplate(directiveMatchedElements){
    var directiveElement = directiveMatchedElements[0];
    var borderDiv = directiveElement.children[0];
    var streetViewDomElement = borderDiv.children[1];
    return streetViewDomElement;
  };

  function createStreetView(questStep, streetViewDomElement){
    var stepLatLng = new google.maps.LatLng(questStep.location.latitude,
                                            questStep.location.longitude);
    new google.maps.StreetViewPanorama(
      streetViewDomElement, {
        position: stepLatLng,
        pov: {
          heading: 0,
          pitch: 0
        },
        // Hiding extra controls
        addressControl: false,
        panControl: false,
        zoomControl: false
      }
    );
  };

  var stepViewDirective =  {
    replace: false,
    template: stepViewTemplate,
    link: populateDirectiveWithStreetView
  };

  return stepViewDirective;
});



