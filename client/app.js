var cityQuestApp = angular.module('cityQuestApp',[
                                 'ngRoute',
                                 'cityQuest.services',
                                 'cityQuest.city',
                                 'cityQuest.questList',
                                 'cityQuest.questView',
                                 'cityQuest.createQuest',
                                 'cityQuest.auth',
                                 'ngTagsInput',
                                 'auth0',
                                 'angular-storage',
                                 'angular-jwt'
                                 ]);

cityQuestApp.config(function($routeProvider, authProvider, jwtInterceptorProvider, $locationProvider){
  routeDefinition($routeProvider);
  authConfig(authProvider);
  // tokenGetter(jwtInterceptorProvider);
  prefixHash($locationProvider);
  

});

cityQuestApp.run(function($rootScope, auth, store, jwtHelper, $location){
  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();
   // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  $rootScope.$on('$locationChangeStart', function(){
    if(!auth.isAuthenticated()){
      var token = store.get('token');
      if(token){
        if(!jwtHelper.isTokenExpired(token)){
          auth.authenticate(store.get('userProfile'), token);
        }else {
          $location.path('/login');
        }
      }
    }
  })
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

function authConfig(authProvider){
  authProvider.init({
    domain: 'cityQuest.auth0.com',
    clientID: 'eteqIOCFZ5fX4aE6Dms8Bi8lvxvBEgUG'
  });
};

// function tokenGetter(store) {
//   return store.get('token');
// };

function prefixHash($locationProvider){
  $locationProvider.hashPrefix('!');
};


