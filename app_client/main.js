(function () {

  angular.module('numberGuesser', ['ngRoute']);

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
    .config(['$routeProvider', config]);

})();
