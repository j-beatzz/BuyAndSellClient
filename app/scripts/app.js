'use strict';

/**
 * @ngdoc overview
 * @name huDeySellFrontendApp
 * @description
 * # huDeySellFrontendApp
 *
 * Main module of the application.
 */
angular.module('HuDeySell', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
]).config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/entry_point.html',
    controller: 'AppController'
  })
  .when('/create-ad', {
    templateUrl: 'views/new-d.html',
    controller: 'NewAdController'
  })
  .when('/:ad_id', {
    templateUrl: 'views/show-d.html',
    controller: 'ShowAdController'
  })
  .otherwise({
    redirectTo: '/'
  });

  $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers
      .common['X-Requested-With'];

  $locationProvider.html5Mode(false);
}).constant('APP_NAME', 'Hu Dey Sell')
  .constant('APP_VERSION', '0.1')
  .constant('NATION', 'Nigeria')
  .constant('API_URL', 'http://localhost:3000/api/');
