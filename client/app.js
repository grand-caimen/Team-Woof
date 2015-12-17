var app = angular.module('cityQuestApp',[
                         'cityQuest.services',
                         'cityQuest.city',
                         'cityQuest.questList',
                         'cityQuest.questView',
                         'cityQuest.createQuest']);

app.config(function(){});

app.run(function($rootScope){});


app.controller('MyController', function ($scope, $location, $window) {
  $scope.city = "";
  $scope.quests = [{
    "id": 0,
    "name": "Down in the park",
    "description": "The most perfect summer day",
    "tags" : "Cheap, Nature, Dogs, Park",
    "city": "Austin, TX",
    "time": 120,
    "cost": 7,
    "location": "30.267219, -97.764799",
    "steps" : [  

      {
        "quest_id":0,
        "number":0,
        "description":"Go take a dip at Barton Springs",
        "location": "30.264439, -97.771279",
        "time": "30",
        "cost": "4",
      },
      {
        "quest_id":0,
        "number":1,
        "description":"Drink Watermelon Juice",
        "location": "30.264439, -97.771279",
        "time": "30",
        "cost": "3",
      },
      {
        "quest_id":0,
        "number":2,
        "description":"Play Frisbee",
        "location": "30.267812, -97.774069",
        "time": "60",
        "cost": "0",
      }
    ]

  }];
});