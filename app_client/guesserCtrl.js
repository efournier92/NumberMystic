angular
  .module('numberGuesser')
  .controller('guesserCtrl', guesserCtrl);

function guesserCtrl($scope) {

  var $dshBrd = this;

  $scope.hasBegun = false;

  $scope.input = {
    numRange: undefined, 
  }

  $scope.numRange = undefined;
  $scope.maxGuesses = undefined;

  $scope.setNumRange = function (numRange) {
    $scope.numRange = 10000;
    console.log("numRange: " + $scope.numRange)
      // parseInt(numRange);
  };

  calcMaxGuesses = function () {
    let numLog = Math.log($scope.numRange);
    let numFloor = Math.floor(numLog);
    $scope.maxGuesses = numFloor + 1;
  }

  $scope.$watch('numRange', function() {
    calcMaxGuesses();
  });

};

