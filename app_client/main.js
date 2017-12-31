import { mysticCtrl } from './mystic.controller.js';

angular
  .module(`numberMystic`, [`ngRoute`])
  .config([`$routeProvider`, config])
  .controller(`mysticCtrl`, mysticCtrl);

function config($routeProvider) {
  $routeProvider
    .when(`/`, {
      templateUrl: `mystic.view.html`,
      controller: `mysticCtrl`,
    })
}

