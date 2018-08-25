'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/listadoCasos', {
        templateUrl: 'views/listadoCasos.html',
        controller: 'ListadoCasosCtrl',
        controllerAs: 'listadoCasos'
      })
      .when('/verificacion', {
        templateUrl: 'views/verificacion.html',
        controller: 'VerificacionCtrl',
        controllerAs: 'verificacion'
      })
      .when('/detalleSeguimiento', {
        templateUrl: 'views/seguimiento.html',
        controller: 'SeguimientoCtrl',
        controllerAs: 'seguimiento'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
