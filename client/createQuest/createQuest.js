angular.module('cityQuest.createQuest', [])

.controller('createQuestCtrl', function($scope, $window, QuestStorage){

    $scope.addAgenda = true;
    $scope.tags = [
      ];


    $scope.addStepDiv = function result() {
       var div = angular.element( document.querySelector( '#addStepDiv' ) );
       div.append('<h3>Hi</h3>'); 
    }


});
