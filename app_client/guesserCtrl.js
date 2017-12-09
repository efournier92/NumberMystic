angular
  .module('numberGuesser')
  .controller('guesserCtrl', guesserCtrl);

function guesserCtrl($scope) {

  function Range(min, max) {
    this.min = min;
    this.max = max;
  }

  $scope.hasBegun = false;
  $scope.testingRanges = false;

  $scope.knownRange = new Range(0, 100);
  $scope.startRange = $scope.knownRange;
  $scope.maxGuesses = undefined;
  $scope.userNum = undefined;
  $scope.guessCount = 1;

  $scope.calcMaxGuesses = function () {
    $scope.hasBegun = true;
    var range = $scope.knownRange.max - $scope.knownRange.min;
    var numLog = Math.log(range);
    var numFloor = Math.floor(numLog);
    $scope.maxGuesses = numFloor + 1;
  };

  $scope.startTestingRanges = function () {
    $scope.testingRanges = true;
    maxGuessRange = $scope.knownRange.max / 2
    $scope.guessRange = new Range($scope.knownRange.min, maxGuessRange);
  };

  $scope.getNewRange = function (isWithinRange) {
    let middleNum = Math.ceil(($scope.knownRange.max - $scope.knownRange.min) / 2);
    $scope.guessRange = new Range($scope.knownRange.min, middleNum);
    if (isWithinRange) {
      $scope.knownRange = $scope.guessRange;
    } else {
      let max = $scope.guessRange.max;
      $scope.knownRange = new Range(max, max*2);
    }
  }


  // $scope.testRange = function (isInRange) {


  // function getGuessRange(knownRange) {
  //   let numRanges = []; 
  //   let midNum = Math.ceil((knownRange.max + knownRange.min) / 2);
  //   numRanges[0] = new Range(knownRange.min, middle);
  //   numRanges[1] = new Range(middle, knownRange.max);

  //   return numRanges;
  // }

  // $scope.testRange = function (isInRange) {
  //   let middle = Math.ceil(($scope.guessRange.max + $scope.guessRange.min) / 2);
  //   $scope.guessCount += 1;
  //   if ($scope.guessRange.max === $scope.guessRange.min) {
  //     $scope.testingRanges = false;
  //     $scope.userNum = $scope.guessRange.max;
  //   } else if (isInRange) {
  //     $scope.knownRange = $scope.guessRange;
  //     $scope.guessRange.max = middle;
  //   } else {
  //     middle = Math.ceil(($scope.guessRange.max + $scope.guessRange.min) / 2);
  //     $scope.guessRange.min = $scope.guessRange.max;
  //     $scope.guessRange.max = $scope.knownRange.max - ($scope.knownRange.max / 4);
  //     // $scope.guessRange.max = $scope.knownRange.min;
  //     // $scope.guessRange.max = $scope.guessRange.min * 2;
  //     // $scope.guessRange.min = middle;
  //   }
  // }

};

