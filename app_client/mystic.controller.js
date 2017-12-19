const mysticCtrl = function mysticCtrl($scope) {

  class Range {
    constructor(min, max) {
      this.min = min;
      this.max = max;
    }
  }

  function findMiddleNumber(range) {
    return Math.floor(
      (range.min + range.max) / 2
    )
  }

  $scope.start = () => {
    $scope.step = `getRangeInput`;
    $scope.knownRange = new Range(0, 100);
    $scope.askingSingleNumber = false;
    $scope.upperOfThree = undefined;
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

    if ($scope.knownRange.max === $scope.knownRange.min) {
      $scope.finalAnswer = $scope.askRange.max;
      $scope.questionCount -= 1;
      $scope.step = 'showFinalAnswer';
      return;
    }

    if ($scope.askingSingleNumber) {
      if (isWithinRange) {
        $scope.finalAnswer = $scope.askRange.max;
      } else {
        $scope.finalAnswer = $scope.askRange.min;
      }
      $scope.step = 'showFinalAnswer';
      $scope.questionCount -= 1;
      return;
    }

    if ($scope.upperOfThree) { 
      if (isWithinRange) {
        $scope.askingSingleNumber = true;  
      } else {
        $scope.step = 'showFinalAnswer';
        $scope.questionCount -= 1;
        $scope.finalAnswer = $scope.upperOfThree;
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
      $scope.askRange = new Range($scope.askRange.max, middleNumber);
    }

    if ($scope.knownRange.max === $scope.knownRange.min) {
      $scope.step = 'showFinalAnswer';
      $scope.finalAnswer = $scope.askRange.max;
    } else if ($scope.knownRange.max - $scope.knownRange.min === 2) {
      $scope.upperOfThree = $scope.knownRange.max;
      $scope.askRange.max = $scope.knownRange.min + 1;
      $scope.askRange.min = $scope.knownRange.min;
    } else if ($scope.knownRange.max - $scope.knownRange.min === 1) {
        $scope.askingSingleNumber = true;
        $scope.askRange = $scope.knownRange;
    }
  }

};

export { mysticCtrl }

