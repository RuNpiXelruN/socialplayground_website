'use strict';

angular.module('socialPlaygroundWebsiteApp')
	.directive('toggleForm', function () {
		return {
			link: function postLink(scope, element, attrs) {
				// Scroll to bottom when contact form is visible
				scope.$watch(attrs.toggleForm, function(visible) {
					if (visible === true) {
						var sectionTop = element[0].getBoundingClientRect().top;
						if ( sectionTop > 0 ) {
							TweenLite.to(window, 1, {
								scrollTo: scope.window.offsetY + element[0].getBoundingClientRect().top,
								ease: Quint.easeInOut
							});
						}
					}
				});
			}
		};
	});
