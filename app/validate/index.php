<?php
include "../../../api.almanacmedia.co.uk/classes/settings/settings.php";
include "../../../api.almanacmedia.co.uk/classes/email/email.php";
include "../../../api.almanacmedia.co.uk/classes/content/content.php";

if(isset($_GET['token']) && isset($_GET['email']) && isset($_GET['vid'])){
	$content = new content();
	$conn = new PDO('mysql:dbname=' . DS_DATABASE_NAME . ';host=' . DS_DATABASE_HOST, DS_DATABASE_USERNAME, DS_DATABASE_PASSWORD);
	
	$token = $_GET['token'];
	$email = $_GET['email'];
	$vid = $_GET['vid'];
	
	$checkToken = $conn->prepare("SELECT * FROM ds_email_validation WHERE ekey = :token AND email = :email AND vid = :vid AND validated = 0 LIMIT 1");
	$checkToken->bindParam(":token", $token);
	$checkToken->bindParam(":email", $email);
	$checkToken->bindParam(":vid", $vid);
	$checkToken->execute();
	$tokens = $checkToken->fetchAll();
	
	if(!empty($tokens)){
		$time = time();
		$expires = $tokens[0]['expires'];
		if($expires < $time){
			header("location: http://my.dealchasr.co.uk?valExpired=" . $vid . "&email=" . $email);
		} else {
			$validate = $conn->prepare("UPDATE ds_venues SET validated = 1 WHERE id = :vid AND vEmail = :email");
			$validate->bindParam(":vid", $vid);
			$validate->bindParam(":email", $email);
			$validate->execute();
			
			$val = $conn->prepare("UPDATE ds_email_validation SET validated = 1 WHERE vid = :vid AND email = :email");
			$val->bindParam(":vid", $vid);
			$val->bindParam(":email", $email);
			$val->execute();
			header("location: http://my.dealchasr.co.uk?validated");
		}
	} else {
		header("location: http://my.dealchasr.co.uk");
	}
} else {
	header("location: http://my.dealchasr.co.uk");
}