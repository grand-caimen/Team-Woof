
angular.module('cityQuest.review', [])

.controller('ReviewCtrl', function ($scope, $rootScope, $uibModal, $log, Review) {
  $scope.items = ['item1', 'item2', 'item3', 'fuckyou'];
  $rootScope.newReview = {
    // questName: sessionStorage.questName,
    user: sessionStorage.username,
    rating: undefined,
    review: undefined,
  }

  $scope.animationsEnabled = true;

  $scope.signOut = function() {
    Auth.signOut();
  }

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

.controller('ModalInstanceCtrl', function ($scope, $http, $uibModalInstance, $rootScope, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.addReview = function () {
    $uibModalInstance.close($scope.selected.item);
    $rootScope.newReview.questName = sessionStorage.questName;
    console.log('newReview: ', $rootScope.newReview)
    return $http({
      method: 'POST',
      url: '/api/reviews',
      data: $rootScope.newReview
    })
    .then(function (res) {
      console.log('resp.body: ', res.data)
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})

.controller('RatingCtrl', function ($scope) {
  // $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
}).service("Review", function () {

})
