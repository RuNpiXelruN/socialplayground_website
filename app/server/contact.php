<?php
	header('Content-type: application/json');

	$errors = array(); // array to hold validation errors
	$data = array(); // array to pass back data

	// validate the variables ======================================================
	if ( empty($_POST['name']) )
		$errors['name'] = 'Name is required.';

	if ( empty($_POST['email']) ) {
		$errors['email'] = 'Email is required.';
	}
	else if ( !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ) {
		$errors['email'] = 'Email is not valid.';
	}

	if ( empty($_POST['phone']) ) {
		$errors['phone'] = 'Phone is required.';
	}

	if ( empty($_POST['message']) ) {
		$errors['message'] = 'Message is required.';
	}

	// return a response ===========================================================
	// response if there are errors
	if ( !empty($errors) ) {
		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
	}
	else {
		$to = 'hello@socialplayground.com.au';

		$subject = 'Enquiry from Social Playground Website - Contact Form';

		$headers  = "From: " . strip_tags($_POST['email']) . "\r\n";
		$headers .= "Reply-To: ". strip_tags($_POST['email']) . "\r\n";

		$message = 'Name: ' . strip_tags($_POST['name']) . "\r\n";
		$message .= 'Email: ' . strip_tags($_POST['email']) . "\r\n";
		$message .= 'Phone: ' . strip_tags($_POST['phone']) . "\r\n";
		$message .= 'Message: ' . strip_tags($_POST['message']);

		if ( @mail($to, $subject, $message, $headers) ) {
			// if there are no errors, return a response
			$data['success'] = true;
			$data['response'] = 'Message has been sent successfully!';
		}
		else {
			$data['success'] = false;
			$data['response'] = 'Failed. Please contact the site admin.';
		} 
	}

	// return all our data to an AJAX call
	echo json_encode($data);

?>