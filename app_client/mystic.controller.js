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

  $scope.getNewRange = (isWithinRange) => {
    if (isWithinRange === undefined) {
      $scope.step = `askQuestions`;
      let middleNumber = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.knownRange.min, middleNumber);
    } else if (isWithinRange) {
      $scope.knownRange = $scope.askRange;
      let middleNumber = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.knownRange.min, middleNumber);
    } else {
      $scope.knownRange.min = $scope.askRange.max;
      let middleNumber = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.askRange.max, middleNumber);
    }

    if ($scope.knownRange.max - $scope.knownRange.min <= 1) {
      $scope.step = 'showFinalAnswer'
      $scope.finalAnswer = $scope.knownRange.max;
    } else {
      $scope.questionCount += 1;
    }
  }

};

export { mysticCtrl }

