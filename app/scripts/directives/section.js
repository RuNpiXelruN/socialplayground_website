'use strict';

angular.module('socialPlaygroundWebsiteApp')
	.directive('section', function () {
		return {
			link: function postLink(scope, element, attrs) {
				var top, bottom, sectionID;

				var findOffsetTop = function (elem) {
					var offsetTop = 0;

					do {
						if ( !isNaN( elem.offsetTop ) )
						{
							offsetTop += elem.offsetTop;
						}
					} while( elem = elem.offsetParent );

					return offsetTop;
				};

				var getSectionPos = function() {
					var elDom = element[0];
					var height = Math.max(
						elDom.scrollHeight, elDom.offsetHeight
					);

					top = findOffsetTop(elDom);
					bottom = top + height;
				};

				getSectionPos();

				var checkVisible = function(offsetY) {
					var link;

					sectionID = element.attr('id');
					link = angular.element(document.querySelector('#link-' + sectionID));
					
					if (offsetY + scope.window.height >= scope.window.docHeight) { // scroll to bottom
						if (sectionID === 'partners') {
							link.addClass('active');
						}
						else {
							link.removeClass('active');
						}
					}
					else {
						if ( offsetY >= top && offsetY < bottom) {
							link.addClass('active');
						}
						else {
							link.removeClass('active');
						}
					}
				};

				scope.$watch('window.height', getSectionPos);

				scope.$watch('window.offsetY', checkVisible);
			}
		};
	});
