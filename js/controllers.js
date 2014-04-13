'use strict';

angular.module('bomApp.controllers', []).
	controller('BundlesController', function($scope, DataService, SplitArrayService) {
		var items = DataService.getData();
		
		items = items.filter(function(obj) {
			return obj.required.length > 0
				|| obj.optional.length > 0;
		});
		//console.log(items);
		
		$scope.bundles = items;
		$scope.headers = DataService.getHeaders();
		$scope.item_list = items;
		//console.log( $scope.bundles );
		
		$("[data-toggle='tooltip']").tooltip();
	}).
	controller('skuListController', function($scope, DataService) {
		$scope.headers = DataService.getHeaders();
		$scope.item_list = DataService.getData();
		
		$("[data-toggle='tooltip']").tooltip();
	}).
	controller('skuController', function($scope, $routeParams, DataService, CartService) {
		$scope.headers = DataService.getHeaders();
		$scope.item = DataService.getItemByPartNumber($routeParams.id);
		
		$scope.toggleItem = function($event, obj) {
			var checkbox = $event.target;
			var action = (checkbox.checked ? 'add' : 'remove');
			
			if (action === 'add') {
				CartService.addItem(obj);
			} else {
				CartService.removeItem(obj);
			}
		}
		
		// This makes the checkboxes checked but doesn't tie to the object model
		$('.checkall').on('click', function ($event, obj) {
	        $(this).closest('fieldset')
				   .find(':checkbox')
				   .prop('checked', this.checked);
	    });
		
		//console.log('$scope.item',$scope.item);
		$("[data-toggle='tooltip']").tooltip();
	}).
	controller('cartController', function($scope, $routeParams, DataService, CartService) {
		$scope.headers = DataService.getHeaders();
		$scope.current_sku_list = CartService.getItems();
		
		$scope.removeItem = function(obj){
			$scope.current_sku_list = CartService.removeItem(obj);
		}
		
		$("[data-toggle='tooltip']").tooltip();
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