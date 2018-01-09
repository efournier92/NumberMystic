const mysticCtrl = function mysticCtrl($scope) {

  class Range {
    constructor(min, max) {
      this.min = min;
      this.max = max;
    }
  }

  function findMiddleNumber(range) {
    return Math.ceil(
      (range.min + range.max) / 2
    )
  }

  $scope.start = () => {
    $scope.step = `getRangeInput`;
    $scope.knownRange = new Range(0, 100);
    $scope.askingSingleNumber = false;
    $scope.questionCount = 0;
  }

  $scope.start();

  $scope.calcMaxQuestions = () => {
    // 1 + Floor(log2( n ))
    // find the number range
    let range = $scope.knownRange.max - $scope.knownRange.min;
    // calculate log base 2 of the range
    let numLog = Math.log2(range);
    // round down to nearest integer & add 1
    $scope.maxQuestions = Math.floor(numLog) + 1;
    $scope.step = `chooseNumber`;
  };

  function checkSingleNumber() {
  }

  $scope.getNewRange = (isWithinRange) => {
    $scope.questionCount += 1;
    if ($scope.threeNumbersRemaining) {
      if (isWithinRange) {
        $scope.askingSingleNumber = true;
      } else if (isWithinRange) {
        $scope.finalAnswer = $scope.upperNumberRemaining;
        $scope.step = 'showFinalAnswer';
      }
    }
    if (isWithinRange === undefined) {
      $scope.step = `askQuestions`;
      let middleNumber = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.knownRange.min, middleNumber);
    } else if (isWithinRange) {
      $scope.knownRange = $scope.askRange;
      let middleNumber = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.knownRange.min, middleNumber);
    } else if (!isWithinRange && !$scope.askingSingleNumber) {
      $scope.knownRange.min = $scope.askRange.max;
      let middleNumber = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.askRange.max + 1, middleNumber);
    }

    if ($scope.askingSingleNumber) {
      $scope.questionCount -= 1;
      $scope.step = 'showFinalAnswer';
      if (isWithinRange) {
        $scope.finalAnswer = $scope.upperNumberRemaining;
      } else {
        $scope.finalAnswer = $scope.askRange.min;
      }
    }

    if ($scope.askRange.max - $scope.askRange.min === 2) {
      $scope.threeNumbersRemaining = true;
      $scope.upperNumberRemaining = $scope.askRange.max;
      $scope.askRange.max = $scope.askRange.min + 1;
    } else if ($scope.askRange.max - $scope.askRange.min == 1) {
      $scope.askingSingleNumber = true;
    }

  }
};

export { mysticCtrl }

