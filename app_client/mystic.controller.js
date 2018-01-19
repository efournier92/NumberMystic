const mysticCtrl = function mysticCtrl($scope) {
  class Range {
    constructor(min, max) {
      this.min = min;
      this.max = max;
    }
  }
$scope.calcMaxQuestions
  function findMiddleNumber(range) {
    return Math.floor(
      (range.max + range.min) / 2
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

    function showFinalAnswer() {
      $scope.step = 'showFinalAnswer';
      $scope.questionCount -= 1;
    }

    if ($scope.knownRange.max === $scope.knownRange.min) {
      $scope.finalAnswer = $scope.askRange.max;
      showFinalAnswer();
      return;
    }

    if ($scope.askingSingleNumber) {
      if (isWithinRange) {
        $scope.finalAnswer = $scope.askRange.min;
      } else {
        $scope.finalAnswer = $scope.askRange.max;
      }
      showFinalAnswer();
      return;
    }

    if ($scope.upperOfThree) { 
      if (isWithinRange) {
        $scope.askingSingleNumber = true;  
      } else {
        $scope.finalAnswer = $scope.upperOfThree;
        showFinalAnswer();
      }
    }

    function adjustAskRange() {
      let middleNumber = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.knownRange.min, middleNumber);
    }
    
    // perform binary search procedure
    if (isWithinRange === undefined) {
      // start asking questions
      $scope.step = `askQuestions`;
      adjustAskRange();
    } else if (isWithinRange) {
      // user inputed TRUE
      // his/her number is within askRange
      $scope.knownRange = $scope.askRange;
      adjustAskRange();
    } else if (!isWithinRange && !$scope.askingSingleNumber) {
      // user inputed FALSE
      // his/her number is outside askRange
      $scope.knownRange.min = $scope.askRange.max + 1;
      adjustAskRange();
    }
    
    // narrow down final numbers
    if ($scope.knownRange.max === $scope.knownRange.min) {
      // knownRange min & max are the same
      // user number has been found
      $scope.finalAnswer = $scope.askRange.max;
      $scope.step = 'showFinalAnswer';
    } else if ($scope.knownRange.max - $scope.knownRange.min === 2) {
      // knownRange contains 3 potential answers
      // adjust askRange to, at max, ask 2 more questions
      $scope.upperOfThree = $scope.knownRange.max;
      $scope.askRange.max = $scope.knownRange.min + 1;
      $scope.askRange.min = $scope.knownRange.min;
    } else if ($scope.knownRange.max - $scope.knownRange.min === 1) {
      // knownRange contains 2 potential answers
      // present user with a single number
      $scope.askingSingleNumber = true;
      $scope.askRange = $scope.knownRange;
    }
  }

};

export { mysticCtrl }

