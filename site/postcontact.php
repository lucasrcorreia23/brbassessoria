<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];	

	$to = 'youremail@domain.com';
	$subject = 'New Signup from '.$email;
	$msg .= "Name :".$name."\r\n";
	$msg .= "Email :".$email."\r\n";
	$msg .= "Phone :".$phone."\r\n";
	$headers = 'From:'.$email. "\r\n" .
    'Reply-To: '.$email. "\r\n" .
    'X-Mailer: PHP/' . phpversion();

	// send email
	$mail = mail($to,$subject,$msg,$headers);

	if ($mail){
		echo "Thank you for contacting us!";
	}else{
		echo "Error. Something wrong happen! Ask your webmaster...";
	}
?>