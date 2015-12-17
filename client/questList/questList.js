angular.module('cityQuest.questList', [])

.controller('questListCtrl', function($scope, QuestStorage){

  $scope.city = "";
  $scope.quests = [
  {
    "id": 0,
    "name": "Down in the park",
    "description": "The most perfect summer day",
    "tags" : "Cheap, Nature, Dogs, Park",
    "city": "Austin, TX",
    "time": 120,
    "cost": 7,
    "location": "30.267219, -97.764799",
    "image":"http://www.edwardsaquifer.net/images/barton_main_spring.jpg",
    "steps" : [  
      {
        "number":0,
        "description":"Go take a dip at Barton Springs",
        "location": "30.264439, -97.771279",
        "time": 30,
        "cost": 4,
      },
      {
        "number":1,
        "description":"Drink Watermelon Juice",
        "location": "30.264439, -97.771279",
        "time": 30,
        "cost": 3,
      },
      {
        "number":2,
        "description":"Play Frisbee",
        "location": "30.267812, -97.774069",
        "time": 60,
        "cost": 0,
      }

    ]

  },
  {
    "id": 1,
    "name": "Down the River",
    "description": "lady bird lake y'all",
    "tags" : "Cheap, Nature, Dogs, Park",
    "city": "Austin, TX",
    "time": 120,
    "cost": 3,
    "location": "30.267219, -97.764799",
    "image":"http://thingstodo.viator.com/austin/files/2013/07/4791083511_49703bb679_z.jpg",
    "steps" : [  
      {
        "number":0,
        "description":"Go take a dip at Barton Springs",
        "location": "30.264439, -97.771279",
        "time": 30,
        "cost": 4,
      },
      {
        "number":1,
        "description":"Drink Watermelon Juice",
        "location": "30.264439, -97.771279",
        "time": 30,
        "cost": 3,
      },
      {
        "number":2,
        "description":"Play Frisbee",
        "location": "30.267812, -97.774069",
        "time": 60,
        "cost": 0,
      }

    ]

  }];

  var getAllQuests = function(){
    var selectedCity = '';
    QuestStorage.getAllQuests(selectedCity)
    .then(function(quests){
      // TODO: Display quests
    })
    .catch(function(error){
      console.log(error);
    });
  }

});
