var cityQuestApp = angular.module('cityQuestApp',[
                         'ngRoute',
                         'cityQuest.services',
                         'cityQuest.city',
                         'cityQuest.questList',
                         'cityQuest.questView',
                         'cityQuest.createQuest']);

cityQuestApp.config(['$routeProvider',
                    routeDefinition]);

cityQuestApp.run(function($rootScope){});

function routeDefinition($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'city/city.html',
    controller: 'cityCtrl'
  })
  .when('/city', {
    templateUrl: 'city/city.html',
    controller: 'cityCtrl'
  })
  .when('/questList', {
    templateUrl: 'questList/questList.html',
    controller: 'questListCtrl'
  })
  .when('/questView', {
    templateUrl: 'questView/questView.html',
    controller: 'questViewCtrl'
  })
  .when('/createView', {
    templateUrl: 'createView/createView.html',
    controller: 'createViewCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}

