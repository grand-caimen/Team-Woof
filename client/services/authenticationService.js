angular.module('cityQuest.authenticationService', [])

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      console.log('resp: ', resp);
      $window.localStorage.setItem('sessiontoken', resp.data.token); 
      $location.path('/');
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      console.log('resp.data.token: ', resp.data.token);
      $window.localStorage.setItem('sessiontoken', resp.data.token); 
      $location.path('/')
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('sessiontoken'); 
  };

  var signout = function () {
    $window.localStorage.removeItem('sessiontoken');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  }
});
