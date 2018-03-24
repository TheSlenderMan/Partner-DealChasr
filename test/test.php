<?php
/*$msg = array
(
	'body'  => 'test',
	'title'     => 'test',
	'vibrate'   => 1,
	'sound'     => 1,
);

$fields = array
(
	'to'  => 'egTLfOtex6M:APA91bFYLa9qshyxZwxfN_xuV3uqosf0XEQd_Xi5r-7kNpnmDdaO1jLCoIGf25EE2-c_zTHaI9S-390dLiKxd4bNVDTgGstCXUGyDvXU3lfgg_trCbb-iFxM4cAc5A-ToASjiCKdvAX7',
	'data'          => $msg
);

$headers = array
(
	'Authorization: key=' . "AIzaSyBV-1NFuEaJ5eKCl--PcPvL1XVsCvnTtGk",
	'Content-Type: application/json'
);

$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch );
curl_close( $ch );

$res = json_decode($result);
print_r($res);
if(isset($res->message_id)){
	$status = 'DELIVERED';
} else {
	$status = 'FAILED';
}*?