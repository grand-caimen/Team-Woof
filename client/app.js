var cityQuestApp = angular.module('cityQuestApp',[
                                 'ngRoute',
                                 'cityQuest.profile',
                                 'cityQuest.formValidationService',
                                 'cityQuest.inputConversionService',
                                 'cityQuest.authenticationService',
                                 'cityQuest.questStorageService',
                                 'cityQuest.city',
                                 'cityQuest.questList',
                                 'cityQuest.stepViewDirective',
                                 'cityQuest.questView',
                                 'cityQuest.createQuest',
                                 'cityQuest.auth',
                                 'ngTagsInput',
                                 'uiGmapgoogle-maps',
                                 'angular.filter'
                                 ]);

cityQuestApp.config(['$routeProvider',
                    routeDefinition]);
cityQuestApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyB_EZ_1pgc_Ig9iVlXNTRkIN_4y7VFax3s',
        v: '3.20',
        libraries: 'places,weather,geometry,visualization'
    });
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
  .when('/questView/:questId', {
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
  .when('/profile', {
    templateUrl: 'client/profile/profile.html',
    controller: 'profileCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
};


