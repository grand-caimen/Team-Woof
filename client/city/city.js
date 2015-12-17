angular.module('cityQuest.city', [])

.controller('cityCtrl', function($scope, $location, $window){
  // $scope.selectedCity
  $scope.city = "";
  $scope.cities = [
    { "text": "Austin" },
    { "text": "Houston" },
    { "text": "Dallas" },
    { "text": "New York" },
    { "text": "Chicago" },
    { "text": "Miami" },
    { "text": "Las Vegas" },
    { "text": "Las Angeles" },
    { "text": "San Diego" },
    { "text": "Atlanta" },
    { "text": "Provo" },
    { "text": "Portland" },
    { "text": "Pheonix" },
    { "text": "Seattle" }
  ]  
});
