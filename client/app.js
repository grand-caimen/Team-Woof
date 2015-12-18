var cityQuestApp = angular.module('cityQuestApp',[
                                 'ngRoute',
                                 'cityQuest.services',
                                 'cityQuest.city',
                                 'cityQuest.questList',
                                 'cityQuest.questView',
                                 'cityQuest.createQuest',
                                 'cityQuest.auth',
                                 'ngTagsInput',
                                 'angular-storage',
                                 'angular-jwt'
                                 ]);

cityQuestApp.config(function($routeProvider, $locationProvider){
  routeDefinition($routeProvider);

});

cityQuestApp.run(function($rootScope, $location){
  

});

function routeDefinition($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'client/city/city.html',
    controller: 'cityCtrl'
  })
  .when('/questList', {
    templateUrl: 'client/questList/questList.html',
    controller: 'questListCtrl'
  })
  .when('/questView', {
    templateUrl: 'client/questView/questView.html',
    controller: 'questViewCtrl'
  })
  .when('/createQuest', {
    templateUrl: 'client/createQuest/createQuest.html',
    controller: 'createQuestCtrl'
  })
  .when('/signin', {
      templateUrl: 'client/auth/signin.html',
      controller: 'authController'
    })
  .when('/signup', {
      templateUrl: 'client/auth/signup.html',
      controller: 'authController'
    })
  .otherwise({
    redirectTo: '/'
  });
};




