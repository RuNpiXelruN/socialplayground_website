<?php
	header('Content-type: application/json');

	//include the mailchimp API
	require_once('includes/MailChimp.php');

	$errors = array(); // array to hold validation errors
	$data = array(); // array to pass back data

	// validate the variables ======================================================\
	if ( empty($_POST['email']) ) {
		$errors['email'] = 'Email is required.';
	}
	else if ( !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ) {
		$errors['email'] = 'Email is not valid.';
	}

	// return a response ===========================================================
	// response if there are errors
	if ( !empty($errors) ) {
		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
	}
	else { // if there are no errors
		$MailChimp = new \Drewm\MailChimp('09006a59052644a9d5a1720b28599c24-us7');

		$result = $MailChimp->call('lists/subscribe', array(
			'id'                => '3288966978',
			'email'             => array('email'=>$_POST['email']),
			'merge_vars'        => array(),
			'double_optin'      => false,
			'update_existing'   => true,
			'replace_interests' => false,
			'send_welcome'      => false,
		));

		if ( isset($result['status']) ) {
			if ($result['status'] == 'error') {
				$data['success'] = false;
				$data['response'] = $result['error'];
			}
		}
		else {
			// if there are no errors, return a response
			$data['success'] = true;
			$data['response'] = 'You have been signed up to our newseltter successfully!';
		}
	}

	// return all our data to an AJAX call
	echo json_encode($data);

?>