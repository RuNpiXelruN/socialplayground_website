'use strict';

angular.module('socialPlaygroundWebsiteApp')
	.directive('menu', function () {
		return {
			link: function postLink(scope, element, attrs) {
				var links = element.find('a');

				angular.forEach(links, function(el) {
					var link = angular.element(el);
					var sectionName = link.attr('href').replace('/', '');
					sectionName = sectionName.length ? sectionName : '#home' ;

					if (sectionName === window.location.hash) {
						link.addClass('active');
					}
					else {
						link.removeClass('active');
					}

					var targetSection = document.querySelector(sectionName);

					if (targetSection !== null) {
						link.bind('click', function(event) {
							event.preventDefault();

							links.removeClass('active');
							link.addClass('active');

							TweenLite.to(window, 1, {
								scrollTo: {y: targetSection.offsetTop},
								ease: Quint.easeInOut,
								onComplete: function() {
									window.location.hash = sectionName;
								}
							});
						});
					}
				});
			}
		};
	});
