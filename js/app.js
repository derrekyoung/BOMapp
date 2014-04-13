'use strict';

// Declare app level module which depends on filters, and services
angular.module('bomApp', [
	'bomApp.controllers'
	,'bomApp.services'
	,'ngRoute'
	,'ngResource'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/bundles", {
			templateUrl: "partials/bundles.html", 
			controller: "BundlesController"
		}).
		when("/item-list", {
			templateUrl: "partials/item-list.html", 
			controller: "skuListController"
		}).
		when("/item/:id", {
			templateUrl: "partials/item.html", 
			controller: "skuController"
		}).
		when("/current-bom", {
			templateUrl: "partials/cart.html", 
			controller: "cartController"
		}).
		otherwise({
			redirectTo: '/item-list'
		});
}]);