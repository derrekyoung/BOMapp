'use strict';

/*

Services not working yet

*/
angular.module('bomApp.services', [])
	.factory("DataService", function($rootScope, $http, $q) {
		var factory = {
			isDataLoaded: false
			,headers: data_headers
			,items: data_items
			,bundles: data_bundles
		};
		
		factory.getHeaders = function() {
			return factory.headers;
		}
		
		factory.getData = function() {
			return factory.items;
		}
		
		factory.getBundles = function() {
			return factory.bundles;
		}
		
		factory.getItemByPartNumber = function(pn) {
			var result = factory.getData().filter(function(obj) {
			    return (obj.PART_NUMBER === pn);
			});
			//console.log('getItemByPartNumber().return', result[0] );
			return result[0];
		}
		
		factory.getByPartNumber = function(pn, property) {
			var masterObj = factory.getBundles().filter(function(obj) {
			    return (obj.PART_NUMBER === pn);
			});
			
			if (!masterObj || !masterObj[0]) {
				return [];
			}
			
			var tmpArray = [];
			var requiredArray = masterObj[0][property];
			var len = requiredArray.length;
			for (var i=0; i<len; i++) {
				tmpArray.push( factory.getItemByPartNumber(requiredArray[i]) );
			}
			
			return tmpArray;
		}
		
		factory.getRequiredByPartNumber = function(pn) {
			var masterObj = factory.getBundles().filter(function(obj) {
			    return (obj.PART_NUMBER === pn);
			});
			
			if (!masterObj || !masterObj[0]) {
				return [];
			}
			
			var tmpArray = [];
			var requiredArray = masterObj[0].required;
			var len = requiredArray.length;
			for (var i=0; i<len; i++) {
				tmpArray.push( factory.getItemByPartNumber(requiredArray[i]) );
			}
			
			return tmpArray;
		}
		
		factory.getOptionalByPartNumber = function(pn) {
			var masterObj = factory.getBundles().filter(function(obj) {
			    return (obj.PART_NUMBER === pn);
			});
			
			if (!masterObj || !masterObj[0]) {
				return [];
			}
			
			var tmpArray = [];
			var requiredArray = masterObj[0].optional;
			var len = requiredArray.length;
			for (var i=0; i<len; i++) {
				tmpArray.push( factory.getItemByPartNumber(requiredArray[i]) );
			}
			
			return tmpArray;
		}
		
		function loadData() {
			//console.log('Loading data');
			
			//Set the bundles on the main items object array
			var len = factory.items.length;
			var item, required, optional;
			for (var i=0; i<len; i++) {
				item, required, optional = null;
				item = factory.items[i];
				
				//required = factory.getRequiredByPartNumber(item.PART_NUMBER);
				required = factory.getByPartNumber(item.PART_NUMBER, 'required');
				item.required = required;
				//console.log('required', required);
				
				//optional = factory.getOptionalByPartNumber(item.PART_NUMBER);
				optional = factory.getByPartNumber(item.PART_NUMBER, 'optional');
				item.optional = optional;
				//console.log('optional', optional);
			}
			
			//console.log('items', factory.items);
		}
		if (!factory.isDataLoaded) {
			// Load the data only once.
			loadData();
		}
		
		return factory;
	})
	.service("CartService", function() {
		var factory = {};
		var items = [];
		
		function arrayObjectIndexOf(myArray, searchTerm, property) {
		    for(var i = 0, len = myArray.length; i < len; i++) {
		        if (myArray[i][property] === searchTerm){
					return i;
				}
		    }
		    return -1;
		}
		
		function isUniqueItem(arr, obj){
			var result = arrayObjectIndexOf(arr, obj.PART_NUMBER, "PART_NUMBER");
			//console.log('Index of object',result);
			
			return result < 0;
		}
		
		factory.addItem = function(obj) {
			if (isUniqueItem(items, obj)) {
				console.log('Adding item to cart',obj);
				items.push(obj);
			}
		}
		
		factory.removeItem = function(obj) {
			var index=items.indexOf(obj);
			//console.log(index);
			
			items.splice(index,1);
			return factory.getItems();
		}
		
		factory.getItems = function() {
			return items;
		}
		
		return factory;
	}).service('SplitArrayService', function () {
		return {
		    SplitArray: function (array, columns) {
		        if (array.length <= columns) {
		            return [array];
		        };

		        var rowsNum = Math.ceil(array.length / columns);

		        var rowsArray = new Array(rowsNum);

		        for (var i = 0; i < rowsNum; i++) {
		            var columnsArray = new Array(columns);
		            for (var j = 0; j < columns; j++) {
		                var index = i * columns + j;

		                if (index < array.length) {
		                    columnsArray[j] = array[index];
		                } else {
		                    break;
		                }
		            }
		            rowsArray[i] = columnsArray;
		        }
		        return rowsArray;
		    }
		}
	});