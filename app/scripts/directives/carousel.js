/* global Modernizr */

'use strict';

angular.module('socialPlaygroundWebsiteApp')
	.directive('carousel', ['$swipe', function ($swipe) {
		var animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		};

		// animation end event name
		var animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

		// cssAnimation css animations
		var cssAnimation = Modernizr.cssanimations;

		return {
			restrict: 'A',
			scope: {},
			controller: function($scope) {
				$scope.carouselStatus = {
					activeIndex: 0,
					maxIndex: 0,
					animating: false,
					outgoingAnimationEnd: false,
					incomingAnimationEnd: false,
					direction: null
				};
			},
			link: function postLink(scope, element, attrs) {
				var childItems = element.children().children();
				scope.carouselStatus.maxIndex = childItems.length - 1;

				var prevItem = function() {
					if (!scope.carouselStatus.animating) {
						if ( scope.carouselStatus.activeIndex > 0 ) {
							scope.carouselStatus.activeIndex -= 1;
						}
						else {
							// Cicular back
							scope.carouselStatus.activeIndex = scope.carouselStatus.maxIndex;
						}

						scope.carouselStatus.direction = 'right';
					}

					if ( !scope.$$phase ) {
						scope.$apply();
					}
				};

				var nextItem = function() {
					if (!scope.carouselStatus.animating) {
						if ( scope.carouselStatus.activeIndex < scope.carouselStatus.maxIndex ) {
							scope.carouselStatus.activeIndex += 1;
						}
						else {
							// Cicular back
							scope.carouselStatus.activeIndex = 0;
						}

						scope.carouselStatus.direction = 'left';

						if ( !scope.$$phase ) {
							scope.$apply();
						}
					}
				};

				angular.forEach(childItems, function(childItem, key) {
					// Create angular element from dom element
					var element = angular.element(childItem);

					// Set the first item visible
					if (key === 0) {
						element.addClass('visible-item');
					}

					// Store angular element back
					childItems[key] = element;
				});

				// Add navigation controllers
				if (childItems.length > 1) {
					var navWrapper = angular.element('<div class="carousel-nav"></div>');

					// Add prev/next navigation
					if (attrs.prevNext !== 'false') {
						var prevBtn = angular.element('<button class="carousel-prev icon-arrow-left"><span class="carousel-prev-text">Prev</span></button>');
						var nextBtn = angular.element('<button class="carousel-next icon-arrow-right"><span class="carousel-next-text">Next</span></button>');

						element.append(prevBtn);
						element.append(nextBtn);

						prevBtn.bind('click', function(event) {
							prevItem();

							event.preventDefault();
						});

						nextBtn.bind('click', function(event) {
							nextItem();

							event.preventDefault();
						});
					}

					// Add Pagination
					if (attrs.page !== 'false') {
						var pageWrapper = angular.element('<span class="carousel-page"></span>');
						var triggers = [];

						angular.forEach(childItems, function(childItem, index) {
							var trigger = angular.element('<button class="carousel-page-trigger"><span class="carousel-page-trigger-text">' + (index + 1) + '</span></button>');

							if (index === scope.carouselStatus.activeIndex) {
								trigger.addClass('active');
							}

							trigger.bind('click', function(event) {
								event.preventDefault();

								if (!scope.carouselStatus.animating) {
									if (index > scope.carouselStatus.activeIndex) {
										scope.carouselStatus.direction = 'left';
									}
									else {
										scope.carouselStatus.direction = 'right';
									}

									scope.carouselStatus.activeIndex = index;

									if ( !scope.$$phase ) {
										scope.$apply();
									}
								}
							});

							pageWrapper.append(trigger);

							triggers.push(trigger);
						});

						scope.$watch('carouselStatus.activeIndex', function(activeIndex) {
							angular.forEach(triggers, function(triggerItem, index) {
								if (index === activeIndex) {
									triggerItem.addClass('active');
								}
								else {
									triggerItem.removeClass('active');
								}
							});
						});


						navWrapper.append(pageWrapper);
					}

					element.append(navWrapper);
				}

				// The maximum vertical delta for a swipe should be less than 75px.
				var MAX_VERTICAL_DISTANCE = 75;
				// Vertical distance should not be more than a fraction of the horizontal distance.
				var MAX_VERTICAL_RATIO = 0.3;
				// At least a 30px lateral motion is necessary for a swipe.
				var MIN_HORIZONTAL_DISTANCE = 30;

				var startCoords, valid;
				var validSwipe = function(coords, direction) {
					// Check that it's within the coordinates.
					// Absolute vertical distance must be within tolerances.
					// Horizontal distance, we take the current X - the starting X.
					// This is negative for leftward swipes and positive for rightward swipes.
					// After multiplying by the direction (-1 for left, +1 for right), legal swipes
					// (ie. same direction as the directive wants) will have a positive delta and
					// illegal ones a negative delta.
					// Therefore this delta must be positive, and larger than the minimum.
					if (!startCoords) return false;
					var deltaY = Math.abs(coords.y - startCoords.y);
					var deltaX = (coords.x - startCoords.x) * direction;
					return valid && // Short circuit for already-invalidated swipes.
						deltaY < MAX_VERTICAL_DISTANCE &&
						deltaX > 0 &&
						deltaX > MIN_HORIZONTAL_DISTANCE &&
						deltaY / deltaX < MAX_VERTICAL_RATIO;
				};

				$swipe.bind(element, {
					start: function(coords) {
						startCoords = coords;
						valid = true;
					},
					cancel: function() {
						valid = false;
					},
					end: function(coords) {
						if (coords.x - startCoords.x < 0) { // swipe left
							if (validSwipe(coords, -1)) {
								nextItem();
							}
						}
						else if (coords.x - startCoords.x > 0) { // swipe right
							if (validSwipe(coords, 1)) {
								prevItem();
							}
						}
					}
				});
				

				var onAnimationEnd = function(incomingItem, outgoingItem, inClass, outClass, newIndex, oldIndex) {
					scope.carouselStatus.animating = false;
					scope.carouselStatus.outgoingAnimationEnd = false;
					scope.carouselStatus.incomingAnimationEnd = false;
					
					if ( !scope.$$phase && cssAnimation ) {
						scope.$apply();
					}

					// Reset page class
					outgoingItem.removeClass(outClass + ' visible-item');
					incomingItem.removeClass(inClass).addClass('visible-item');

					if (Math.abs(newIndex - oldIndex)) {
						prevNextCarousel(scope.carouselStatus.direction, newIndex, oldIndex);
					}
				};

				var prevNextCarousel = function(direction, newIndex, oldIndex) {
					scope.carouselStatus.animating = true;

					var inClass, outClass, incomingIndex, 
						incomingIndex = newIndex;

					if (direction === 'left') {
						outClass = 'animate-slide-moveToLeft';
						inClass = 'animate-slide-moveFromRight';

						if ( newIndex > oldIndex ) {
							incomingIndex = oldIndex + 1;
						}
					}
					else {
						outClass = 'animate-slide-moveToRight';
						inClass = 'animate-slide-moveFromLeft';

						if (newIndex < oldIndex) {
							incomingIndex = oldIndex - 1;
						}
					}

					var incomingItem = childItems[incomingIndex];
					var outgoingItem = childItems[oldIndex];

					if (cssAnimation) {
						incomingItem.addClass('visible-item ' + inClass).on(animEndEventName, function() {
							incomingItem.off(animEndEventName);
							scope.carouselStatus.incomingAnimationEnd = true;

							if (scope.carouselStatus.outgoingAnimationEnd) {
								onAnimationEnd(incomingItem, outgoingItem, inClass, outClass, newIndex, incomingIndex);
							}
						});

						outgoingItem.addClass(outClass).on(animEndEventName, function() {
							outgoingItem.off(animEndEventName);
							scope.carouselStatus.outgoingAnimationEnd = true;

							if (scope.carouselStatus.incomingAnimationEnd) {
								onAnimationEnd(incomingItem, outgoingItem, inClass, outClass, newIndex, incomingIndex);
							}
						});
					}
					else {
						onAnimationEnd(incomingItem, outgoingItem, inClass, outClass, newIndex, incomingIndex);
					}
				};

				scope.$watch('carouselStatus.activeIndex', function(newIndex, oldIndex) {
					if (newIndex !== oldIndex) { // Not initial page loaded
						prevNextCarousel(scope.carouselStatus.direction, newIndex, oldIndex);
					}
				});
			}
		};
	}]);
