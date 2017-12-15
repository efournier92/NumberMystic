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


var _guesserCtrl = __webpack_require__(1);

function config($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'guesser.view.html',
    controller: 'guesserCtrl'
  }).otherwise({ redirectTo: '/' });
}

angular.module('numberGuesser').config(['$routeProvider', config]).controller('guesserCtrl', _guesserCtrl.guesserCtrl);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var guesserCtrl = function guesserCtrl($scope) {
  var Range = function Range(min, max) {
    _classCallCheck(this, Range);

    this.min = min;
    this.max = max;
  };

  function findMiddleNumber(range) {
    return Math.ceil((range.min + range.max) / 2);
  }

  $scope.start = function () {
    $scope.step = 'getRangeInput';
    $scope.knownRange = new Range(0, 100);
    $scope.maxGuesses = undefined;
    $scope.finalAnswer = undefined;
    $scope.guessCount = 0;
  };

  $scope.start();

  $scope.calcMaxGuesses = function () {
    var range = $scope.knownRange.max - $scope.knownRange.min;
    var numLog = Math.log(range);
    var numFloor = Math.floor(numLog);
    $scope.maxGuesses = numFloor + 1;
    $scope.step = 'chooseNumber';
  };

  $scope.getNewRange = function (isWithinRange) {
    $scope.guessCount += 1;
    if (isWithinRange === undefined) {
      $scope.step = 'guessRanges';
      var middleNumber = findMiddleNumber($scope.knownRange);
      $scope.guessRange = new Range($scope.knownRange.min, middleNumber);
    } else if (isWithinRange) {
      $scope.knownRange = $scope.guessRange;
      var _middleNumber = findMiddleNumber($scope.knownRange);
      $scope.guessRange = new Range($scope.knownRange.min, _middleNumber);
    } else {
      $scope.knownRange.min = $scope.guessRange.max;
      var _middleNumber2 = findMiddleNumber($scope.knownRange);
      $scope.guessRange = new Range($scope.guessRange.max, _middleNumber2);
    }
    if ($scope.knownRange.max - $scope.knownRange.min <= 1) {
      $scope.step = 'showFinalAnswer';
      $scope.finalAnswer = $scope.knownRange.max;
    }
  };
};

exports.guesserCtrl = guesserCtrl;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map