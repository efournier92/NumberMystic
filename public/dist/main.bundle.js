/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mysticController = __webpack_require__(1);

angular.module('numberMystic', ['ngRoute']).config(['$routeProvider', config]).controller('mysticCtrl', _mysticController.mysticCtrl);

function config($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'mystic.view.html',
    controller: 'mysticCtrl'
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mysticCtrl = function mysticCtrl($scope) {
  var Range = function Range(min, max) {
    _classCallCheck(this, Range);

    this.min = min;
    this.max = max;
  };

  function findMiddleNumber(range) {
    return Math.floor((range.max + range.min) / 2);
  }

  $scope.start = function () {
    $scope.step = 'getRangeInput';
    $scope.knownRange = new Range(0, 100);
    $scope.askingSingleNumber = false;
    $scope.upperOfThree = undefined;
    $scope.questionCount = 0;
  };

  $scope.start();

  $scope.calcMaxQuestions = function () {
    // 1 + Floor(log2( n ))
    // find the number range
    var range = $scope.knownRange.max - $scope.knownRange.min;
    // calculate log base 2 of the range
    var numLog = Math.log2(range);
    // round down to nearest integer & add 1
    $scope.maxQuestions = Math.floor(numLog) + 1;
    $scope.step = 'chooseNumber';
  };

  function checkSingleNumber() {}

  $scope.getNewRange = function (isWithinRange) {
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
      var middleNumber = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.knownRange.min, middleNumber);
    }

    // perform binary search procedure
    if (isWithinRange === undefined) {
      // start asking questions
      $scope.step = 'askQuestions';
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
  };
};

exports.mysticCtrl = mysticCtrl;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map