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

  // function run($rootScope, $location, $http, auth) {
  //   $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
  //     if ($location.path() === '/profile' && !auth.isLoggedIn()) {
  //       $location.path('/');
  //     }
  //   });
  // }

  angular
    .module('numberGuesser')
    .config(['$routeProvider', config]);
    // .run(['$location', run]);

})();
