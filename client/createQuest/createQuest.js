angular.module('cityQuest.createQuest', [])


.controller('createQuestCtrl', function($scope, $window, $location, QuestStorage){

   $scope.addAgenda = true; 
	 $scope.quest = {};
   $scope.step = {};
   $scope.quest.steps = [];
   // uiGmapGoogleMapApi.then(function(maps) {
   //   console.log(maps);
   //  $scope.map = {
   //    events: {
   //          tilesloaded: function (map) {
   //              $scope.$apply(function () {
   //                  $scope.mapInstance = map;
   //              });
   //          },
   //          click: function(event){
   //            console.log('clicked');
   //          }
   //      },
   //    center: { 
   //       latitude: 45,
   //       longitude: -73 }, 
   //    zoom: 8
   //  }
   //   // $scope.map.events = {'click':'dosomething'};
   //   // $scope.map.addListener('click', function(e) {
   //   //    placeMarkerAndPanTo(e.latLng, map);
   //   // });
   // });


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

    //Adds new form to the page
      var div = angular.element( document.querySelector( '#addStepDiv' ) );
      div.append('<h3>Hi</h3>'); 
    }
});
