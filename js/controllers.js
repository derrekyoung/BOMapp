'use strict';

angular.module('bomApp.controllers', []).
	controller('BundlesController', function($scope, DataService, SplitArrayService) {
		//var items = DataService.getBundles();
		var items = DataService.getData();
		
		items = items.filter(function(obj) {
			return obj.required.length > 0
				|| obj.optional.length > 0;
		});
		//console.log(items);
		
		$scope.bundles = items;
		$scope.headers = DataService.getHeaders();
		$scope.item_list = items;
		//$scope.bundles = SplitArrayService.SplitArray(items, 4);
		//console.log( $scope.bundles );
	}).
	controller('skuListController', function($scope, DataService) {
		$scope.headers = DataService.getHeaders();
		$scope.item_list = DataService.getData();
	}).
	controller('skuController', function($scope, $routeParams, DataService, CartService) {
		$scope.headers = DataService.getHeaders();
		
		//$scope.items = [];
		//$scope.items = $scope.items.push( DataService.getItemByPartNumber($routeParams.id) );
		$scope.item = DataService.getItemByPartNumber($routeParams.id);
		//$scope.items = $scope.items.concat( DataService.getRequiredByPartNumber($routeParams.id) );
		//$scope.items = $scope.items.concat( DataService.getOptionalByPartNumber($routeParams.id) );
		//$scope.required = $scope.item.required;
		//$scope.optional = $scope.item.optional;
		
		$scope.toggleItem = function($event, obj) {
			var checkbox = $event.target;
			var action = (checkbox.checked ? 'add' : 'remove');
			
			if (action === 'add') {
				CartService.addItem(obj);
			} else {
				CartService.removeItem(obj);
			}
		}
		
		//console.log('$scope.items.length FINAL',$scope.items.length);
		//console.log('$scope.items',$scope.items);
	}).
	controller('cartController', function($scope, $routeParams, DataService, CartService) {
		$scope.headers = DataService.getHeaders();
		$scope.current_sku_list = CartService.getItems();
		
		$scope.removeItem = function(obj){
			$scope.current_sku_list = CartService.removeItem(obj);
		}
	}).
	controller('menuController', function ($scope,   $location) {
	      $scope.$on('$routeChangeSuccess', function() {
	          $scope.menuActive = $location.path().split("/")[1];
	      });
	}).
	controller('footerController', function ($scope) {
	      $scope.version = '0.0.1';
	})
;