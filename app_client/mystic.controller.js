const mysticCtrl = function mysticCtrl($scope) {

  class Range {
    constructor(min, max) {
      this.min = min;
      this.max = max;
    }
  }

  function findMiddleNumber(range) {
    return Math.floor(
      (range.max + range.min) / 2
    )
  }

  $scope.findMaxQuestions = () => {
    // 1 + Floor(log2( n ))
    // find the number range
    let range = $scope.knownRange.max - $scope.knownRange.min;
    // calculate log base 2 of the range
    let numLog = Math.log2(range);
    // round down to nearest integer & add 1
    $scope.maxQuestions = Math.floor(numLog) + 1;
    // validate range input
    if ($scope.maxQuestions === parseInt($scope.maxQuestions, 10)) {
      $scope.validInputRange = true; 
    } else {
      $scope.validInputRange = false; 
    }
  };

  $scope.start = () => {
    $scope.step = `getRangeInput`;
    $scope.knownRange = new Range(0, 100);
    $scope.validInputRange = true; 
    $scope.askingSingleNumber = false;
    $scope.upperOfThree = undefined;
    $scope.findMaxQuestions();
    $scope.questionCount = 0;
  }
  $scope.start();

  $scope.getNewRange = (isWithinRange) => {
    $scope.questionCount += 1;

    function showFinalAnswer() {
      $scope.step = `showFinalAnswer`;
      $scope.questionCount -= 1;
    }

    if ($scope.knownRange.max === $scope.knownRange.min) {
      // knownRange min & max are the same
      // user number has been found
      $scope.finalAnswer = $scope.askRange.max;
      showFinalAnswer();
      return;
    }

    if ($scope.askingSingleNumber) {
      // knownRange contains 2 potential answers
      if (isWithinRange) {
        // user number is the one he/she was presented
        $scope.finalAnswer = $scope.askRange.min;
      } else {
        // user number is the other one, which he/she was not presented
        $scope.finalAnswer = $scope.askRange.max;
      }
      showFinalAnswer();
      return;
    }

    if ($scope.upperOfThree) {
      // knownRange contains 3 potential answers
      if (isWithinRange) {
        // knownRange contains 2 potential answers
        $scope.askingSingleNumber = true;  
      } else {
        // user number is the 3rd potential answer
        $scope.finalAnswer = $scope.upperOfThree;
        showFinalAnswer();
      }
    }

    function adjustAskRange() {
      // adjust askRange to half of knownRange
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

    // efficiently narrow down the final numbers
    if ($scope.knownRange.max === $scope.knownRange.min) {
      // knownRange min & max are the same
      // user number has been found
      $scope.finalAnswer = $scope.askRange.max;
      $scope.step = `showFinalAnswer`;
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
