/**********************************************************
Converted from
http://benalman.com/projects/jquery-throttle-debounce-plugin/
**********************************************************/
'use strict';

angular.module('socialPlaygroundWebsiteApp')
	.factory('throttle', ['$timeout', function ($timeout) {
		var timeoutID;
		var lastExec = 0;

		return function (delay, noTrailing, callback, debounceMode) {
			if (typeof noTrailing !== 'boolean') {
				debounceMode = callback;
				callback = noTrailing;
				noTrailing = undefined;
			}

			var that = this;
			var elapsed = +new Date() - lastExec;
			var args = arguments;
			var exec = function () {
				lastExec = +new Date();
				callback.apply(that, args);
			};
			var clear = function () {
				timeoutID = undefined;
			};

			if (debounceMode && !timeoutID) {
				exec();
			}

			if (timeoutID) {
				$timeout.cancel(timeoutID);
			}

			if (debounceMode === undefined && elapsed > delay) {
				exec();
			}
			else if (noTrailing !== true) {
				timeoutID = $timeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
			}
		};
	}]);
