<?php
error_reporting(E_ALL);
if(isset($_POST['fullName']) && isset($_POST['vTier'])){
	$fName = $_POST['fullName'];
	$email = $_POST['email'];
	$pass = $_POST['password'];
	$pass2 = $_POST['password2'];
	
	$vName = $_POST['vName'];
	$vEmail = $_POST['vEmail'];
	$vWeb = $_POST['vWebsite'];
	$vCont = $_POST['vContact'];
	
	$vAOne = $_POST['vAddressOne'];
	$vATwo = $_POST['vAddressTwo'];
	$vCity = $_POST['vCityTown'];
	$vCounty = $_POST['vCounty'];
	$vCountry = $_POST['vCountry'];
	$vPostCode = $_POST['vPostCode'];
	
	$tier = $_POST['vTier'];
	
	$upost = array("fullName" => $fName, "email" => $email, "password" => $pass, "type" => "venue");
	
	$ch = curl_init();
	
	curl_setopt($ch, CURLOPT_URL,"http://api.almanacmedia.co.uk/users/create");
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $upost);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: DS1k1Il68_uPPoD:2',
	'DSToken: GAIN',
	'DSUid: LOGIN',
	'DSUToken: TOKEN'
    ));
	$user_output = curl_exec ($ch);
	$user_res = json_decode($user_output, true);

	if(isset($user_res['data'])){
		if(isset($user_res['data']['created']) && $user_res['data']['created'] == 1){
			$uid = $user_res['data']['userID'];
			
			$post = "vName=" . $vName . "&vEmail=" . $vEmail . "&vWeb=" .
			$vWeb . "&vCont=" . $vCont . "&vAOne=" . $vAOne . "&vATwo=" . $vATwo . "&vCity=" . $vCity . "&vCounty=" . $vCounty .
			"&vCountry=" . $vCountry . "&vPostCode=" . $vPostCode . "&tier=" . $tier . "&owner=" . $uid;
			
			$cs = curl_init();
	
			curl_setopt($cs, CURLOPT_URL,"http://api.almanacmedia.co.uk/venues/create");
			curl_setopt($cs, CURLOPT_POST, 1);
			curl_setopt($cs, CURLOPT_POSTFIELDS, $post);
			curl_setopt($cs, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($cs, CURLOPT_HTTPHEADER, array(
			'Authorization: DS1k1Il68_uPPoD:2',
			'DSToken: GAIN',
			'DSUid: LOGIN',
			'DSUToken: TOKEN'
			));
			$ven_output = curl_exec ($cs);
			$ven_res = json_decode($ven_output, true);
			curl_close ($cs);

			if(isset($ven_res['data']['created']) && $ven_res['data']['created'] == 1){
				header("location: http://my.dealchasr.co.uk?new=" . $ven_res['data']['venueID'] . "&email=" . $vEmail);
			} else {
				header('location: index.php?error=venueerror');
			}
		} else {
			if($user_res['message'] == 'USER ALREADY REGISTERED'){
				header('location: index.php?error=userknown');
			} else if($user_res['message'] == 'PLEASE ENTER A CORRECT EMAIL ADDRESS') {
				header('location: index.php?error=emailmalformed');
			} else {
				header('location: index.php?error=emailgeneral');
			}
		}
	} else {
		header('location: index.php?error=system');
	}	
} else {
	header('location: index.php?error=fields');
}