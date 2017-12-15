import {guesserCtrl} from "./guesserCtrl.js"

function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'guesser.view.html',
      controller: 'guesserCtrl',
    })
    .otherwise({redirectTo: '/'});
}

angular
  .module('numberGuesser')
  .config(['$routeProvider', config])
  .controller('guesserCtrl', guesserCtrl);

