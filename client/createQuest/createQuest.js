angular.module('cityQuest.createQuest', [])

.controller('createQuestCtrl', function($scope, $location, QuestStorage){
	
   $scope.addAgenda = true; 
	 $scope.quest = {};

	 $scope.questCreate = function(){
			QuestStorage.saveNewQuest($scope.quest);
			$location.path('/questList');
	 };

   $scope.addStepDiv = function result() {
       var div = angular.element( document.querySelector( '#addStepDiv' ) );
       div.append('<h3>Hi</h3>'); 
   };


});
