'use strict';

angular.module('socialPlaygroundWebsiteApp')
	.directive('page', ['$timeout', 'throttle', function ($timeout, throttle) {
		return {
			link: function postLink(scope, element, attrs) {
				var winEl = angular.element(window);

				var resizeCallback = function() {
					scope.window.width = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth,
					scope.window.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
					scope.window.docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

					if (!scope.$$phase) {
						scope.$apply();
					}
				};

				var scrollCallback = function() {
					scope.window.offsetY = window.pageYOffset || document.documentElement.scrollTop;

					if (scope.window.height > 430) {
						scope.menu.visible = false;
					}

					if (!scope.$$phase) {
						scope.$apply();
					}
				};

				var updateDocHeight = function() {
					$timeout(function() {
						scope.window.docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

						if (!scope.$$phase) {
							scope.$apply();
						}
					}, 0);
				};

				winEl.bind('resize', resizeCallback);

				winEl.bind('scroll', scrollCallback);

				scope.$watch('contactFormStatus.visible', updateDocHeight);
			}
		};
	}]);
