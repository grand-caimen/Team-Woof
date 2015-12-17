angular.module('cityQuest.createQuest', [])

.controller('createQuestCtrl', function($scope, $location, QuestStorage){

	 $scope.quest = {};

	 $scope.questCreate = function(){
			QuestStorage.saveNewQuest($scope.quest);
			$location.path('/questList');
	 };



});
