/* global TweenLite, Quint */

'use strict';

angular.module('socialPlaygroundWebsiteApp').controller('MainCtrl', ['$scope', '$http', 'param', function ($scope, $http, param) {
	$scope.device = {
		ios: navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
	};

	$scope.window = {
		width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
		offsetY: window.pageYOffset || document.documentElement.scrollTop,
		docHeight: document.documentElement.scrollHeight || document.body.scrollHeight
	};

	$scope.menu = {
		visible: false
	};

	// Sign up form
	$scope.signupData = {};

	$scope.signup = function(signupFields) {
		$scope.signupForm.clicked = true;

		if ( !$scope.signupForm.$invalid ) {
			$scope.signupForm.submitting = true;

			$scope.signupData = angular.copy(signupFields);

			$http({
				method: 'POST',
				url: '/server/signup.php',
				data: param($scope.signupData), // convert object to param string
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
			})
			.success(function(data) {
				$scope.signupForm.clicked = false;
				$scope.signupForm.submitting = false;

				if ( !data.success ) {
					if (typeof data.errors !== 'undefined') { // Submission field error
						// if not successful, bind errors to error variables
						$scope.signupForm.errorEmail = data.errors.email;
					}
					else { // Mailchimp error
						// bind fail response to response
						$scope.signupForm.response = data.response;
					}
				}
				else {
					// if successful, bind success response to response
					$scope.signupForm.response = data.response;

					$scope.signupFields = {};
				}
			});
		}
	};

	// Contact form
	$scope.contactData = {};

	$scope.contact = function(contactFields) {
		$scope.contactForm.clicked = true;

		if ( !$scope.contactForm.$invalid ) {
			$scope.contactForm.submitting = true;

			$scope.contactData = angular.copy(contactFields);

			$http({
				method: 'POST',
				url: '/server/contact.php',
				data: param($scope.contactData), // convert object to param string
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
			})
			.success(function(data) {
				$scope.contactForm.clicked = false;
				$scope.contactForm.submitting = false;

				if ( !data.success ) {
					// if not successful, bind errors to error variables
					$scope.contactForm.errorName = data.errors.name;
					$scope.contactForm.errorEmail = data.errors.email;
					$scope.contactForm.errorPhone = data.errors.phone;
					$scope.contactForm.errorSubject = data.errors.subject;
					$scope.contactForm.errorMessage = data.errors.message;
				}
				else {
					// if successful, bind success response to response
					$scope.contactForm.response = data.response;

					$scope.contactFields = {};
				}
			});
		}
	};

	// Book form
	$scope.bookData = {};

	$scope.book = function(bookFields) {
		$scope.bookForm.clicked = true;

		if ( !$scope.bookForm.$invalid ) {
			$scope.bookForm.submitting = true;

			$scope.bookData = angular.copy(bookFields);

			$http({
				method: 'POST',
				url: '/server/book.php',
				data: param($scope.bookData), // convert object to param string
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
			})
			.success(function(data) {
				$scope.bookForm.clicked = false;
				$scope.bookForm.submitting = false;

				if ( !data.success ) {
					// if not successful, bind errors to error variables
					$scope.bookForm.errorName = data.errors.name;
					$scope.bookForm.errorEmail = data.errors.email;
					$scope.bookForm.errorPhone = data.errors.phone;
					$scope.bookForm.errorSubject = data.errors.subject;
					$scope.bookForm.errorMessage = data.errors.message;
				}
				else {
					// if successful, bind success response to response
					$scope.bookForm.response = data.response;

					$scope.bookFields = {};
				}
			});
		}
	};
}]);
