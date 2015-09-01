'use strict';

angular.module('socialPlaygroundWebsiteApp')
	.factory('param', function () {
		// Service logic
		var s = [];
		var class2type = {};
		var r20 = /%20/g;
		var toString = class2type.toString;

		var type = function(obj) {
			if ( obj === null ) {
				return obj + '';
			}
			return typeof obj === 'object' || typeof obj === 'function' ?
			class2type[ toString.call(obj) ] || 'object' :
			typeof obj;
		};

		var isFunction = function( obj ) {
			return type(obj) === 'function';
		};

		var add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = isFunction(value) ? value() : value;
			s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		};

		// Public API here
		return function(obj) {
			angular.forEach( obj, function(value, key) {
				add( key, value );
			});

			// Return the resulting serialization
			return s.join('&').replace(r20, '+');
		};
	});
