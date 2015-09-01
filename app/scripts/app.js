'use strict';

angular
.module('socialPlaygroundWebsiteApp', ['ngTouch', 'svg-fallback'])
.config(['$interpolateProvider', function ($interpolateProvider) {
	$interpolateProvider.startSymbol('{%');
	$interpolateProvider.endSymbol('%}');
}]);
