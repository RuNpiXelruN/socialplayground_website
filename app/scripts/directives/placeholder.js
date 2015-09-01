'use strict';

angular.module('socialPlaygroundWebsiteApp')
	.directive('placeholder', ['$timeout', function($timeout) {
		'use strict';

		var placeholderColor = '#fff';
		var placeholderFont = "20px/20px 'gotham_bookregular', sans-serif";
		var placeholdertextTransform = 'uppercase';

		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				var doc = window.document,
					domElement = element[0];

				if (domElement.nodeName !== 'TEXTAREA' &&
					domElement.nodeName !== 'INPUT' ||
					attrs.type === 'password') {
					return;
				}

				var isInputSupported = 'placeholder' in doc.createElement('input'),
					isTextareaSupported = 'placeholder' in doc.createElement('textarea');

				if (isInputSupported && isTextareaSupported) {
					$timeout(function(){
					element.attr('placeholder', attrs.placeholderFallback);
					});
					return;
				}

				function init(value){
					if (doc.activeElement === domElement) {
					return;
					}

					if (value === '' || value === attrs.placeholderFallback) {
						domElement.value = attrs.placeholderFallback;
						domElement.style.color = placeholderColor;
						domElement.style.font = placeholderFont;
						domElement.style.textTransform = placeholdertextTransform;
					}
				}

				function focus(){
					if (domElement.value == attrs.placeholderFallback) {
						domElement.value = '';
						domElement.style.color = '';
						domElement.style.textTransform = 'none';
					}
				}

				function blur(){
					if (domElement.value === '') {
						domElement.value = attrs.placeholderFallback;
						domElement.style.color = placeholderColor;
						domElement.style.font = placeholderFont;
						domElement.style.textTransform = placeholdertextTransform;
					}
				}

				$timeout(function(){
					init(domElement.value);
				});

				scope.$watch(function(){
					return ngModel.$modelValue;
				}, function(newValue){
					init(newValue);
				});

				element.bind('focus', focus);
				element.bind('blur', blur);

				/*
				 * destroy
				 */

				scope.$on('$destroy', function(){
					element.unbind('focus', focus);
					element.unbind('blur', blur);
				});
			}
		};
	}]);
