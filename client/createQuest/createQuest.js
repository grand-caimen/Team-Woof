angular.module('cityQuest.createQuest', [])

.controller('createQuestCtrl', function($scope, $window, $location, QuestStorage){

   $scope.showSubmit = true; 
	 $scope.quest = {};
   $scope.step = {};

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
