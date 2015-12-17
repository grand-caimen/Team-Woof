angular.module('cityQuest.city', [])

.controller('cityCtrl', function($scope, $location, $window){
  // $scope.selectedCity
  $scope.city = "";
  $scope.quests = [{
    "name": "Down in the park",
    "city": "Austin, TX",
    "time": "120",
    "cost": "7",
    "address": ["30.267219", "-97.764799"],
    "tags" : ["Free","Nature","Dogs","Park"],
    "steps" : [
      {
        "number":0,
        "description":"Go take a dip at Barton Springs",
        "location": ["30.264439","-97.771279"],
        "time": "30",
        "cost": "4",
      },
      {
        "number":1,
        "description":"Drink Watermelon Juice",
        "location": ["30.264439","-97.771279"],
        "time": "30",
        "cost": "3",
      },
      {
        "number":2,
        "description":"Play Frisbee",
        "location": ["30.267812","-97.774069"],
        "time": "60",
        "cost": "0",
      }
    ]
  }];
});
