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
  }).otherwise({ redirectTo: '/' });
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
    return Math.ceil((range.min + range.max) / 2);
  }

  $scope.start = function () {
    $scope.step = 'getRangeInput';
    $scope.knownRange = new Range(0, 100);
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

  $scope.getNewRange = function (isWithinRange) {
    if (isWithinRange === undefined) {
      $scope.step = 'askQuestions';
      var middleNumber = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.knownRange.min, middleNumber);
    } else if (isWithinRange) {
      $scope.knownRange = $scope.askRange;
      var _middleNumber = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.knownRange.min, _middleNumber);
    } else {
      $scope.knownRange.min = $scope.askRange.max;
      var _middleNumber2 = findMiddleNumber($scope.knownRange);
      $scope.askRange = new Range($scope.askRange.max, _middleNumber2);
    }

    if ($scope.knownRange.max - $scope.knownRange.min <= 1) {
      $scope.step = 'showFinalAnswer';
      $scope.finalAnswer = $scope.knownRange.max;
    } else {
      $scope.questionCount += 1;
    }
  };
};

exports.mysticCtrl = mysticCtrl;

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map