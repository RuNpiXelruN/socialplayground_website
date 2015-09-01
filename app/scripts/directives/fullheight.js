'use strict';

angular.module('socialPlaygroundWebsiteApp')
	.directive('fullHeight', function () {
		return {
			link: function postLink(scope, element, attrs) {
				var updateHeight = function() {
					element.css('height', scope.window.height + 'px');
				};

				updateHeight();

				scope.$watch('window.height', updateHeight);
			}
		};
	});
