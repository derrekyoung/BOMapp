'use strict';

/*

Services not working yet

*/
angular.module('bomApp.services', [])
	.factory("DataService", function($rootScope, $http, $q) {
		var factory = {
			headers: data_headers
			,items: data_items
			,rules: data_rules
		};
		
		factory.getHeaders = function() {
			return factory.headers;
		}
		
		factory.getData = function() {
			return factory.items;
		}
		
		factory.getRules = function() {
			return factory.rules;
		}
		
		factory.getItemByPartNumber = function(pn) {
			var result = factory.getData().filter(function(obj) {
			    return (obj.PART_NUMBER === pn);
			});
			//console.log('getItemByPartNumber().return', result[0] );
			return result[0];
		}
		
		factory.getRequiredByPartNumber = function(pn) {
			var masterObj = factory.getRules().filter(function(obj) {
			    return (obj.PART_NUMBER === pn);
			});
			
			var tmpArray = [];
			var requiredArray = masterObj[0].required;
			var len = requiredArray.length;
			for (var i=0; i<len; i++) {
				tmpArray.push( factory.getItemByPartNumber(requiredArray[i]) );
			}
			
			return tmpArray;
		}
		
		factory.getOptionalByPartNumber = function(pn) {
			var masterObj = factory.getRules().filter(function(obj) {
			    return (obj.PART_NUMBER === pn);
			});
			
			var tmpArray = [];
			var requiredArray = masterObj[0].optional;
			var len = requiredArray.length;
			for (var i=0; i<len; i++) {
				tmpArray.push( factory.getItemByPartNumber(requiredArray[i]) );
			}
			
			return tmpArray;
		}
		
		return factory;
	})
	.service("CartService", function() {
		var factory = {};
		var items = [];
		
		factory.addItem = function(obj) {
			items.push(obj);
		}
		
		factory.removeItem = function(obj) {
			var index=items.indexOf(obj);
			console.log(index);
			
			items.splice(index,1);
			
			return factory.getItems();
		}
		
		factory.getItems = function() {
			return items;
		}
		
		return factory;
	});