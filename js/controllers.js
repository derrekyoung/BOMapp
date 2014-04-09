'use strict';

angular.module('bomApp.controllers', []).
	controller('skuListController', function($scope, DataService) {
		$scope.headers = DataService.getHeaders();
		$scope.sku_list = DataService.getData();
	}).
	controller('skuController', function($scope, $routeParams, DataService, CartService) {
		$scope.headers = DataService.getHeaders();
		
		$scope.current_sku_list = [];
		$scope.current_sku_list.push( DataService.getItemByPartNumber($routeParams.id) );
		$scope.current_sku_list = $scope.current_sku_list.concat( DataService.getRequiredByPartNumber($routeParams.id) );
		$scope.current_sku_list = $scope.current_sku_list.concat( DataService.getOptionalByPartNumber($routeParams.id) );
		
		$scope.toggleItem = function($event, obj) {
			var checkbox = $event.target;
			var action = (checkbox.checked ? 'add' : 'remove');
			
			if (action === 'add') {
				CartService.addItem(obj);
			} else {
				CartService.removeItem(obj);
			}
		}
		
		console.log('$scope.current_sku_list.length FINAL',$scope.current_sku_list.length);
		console.log('$scope.current_sku_list',$scope.current_sku_list);
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