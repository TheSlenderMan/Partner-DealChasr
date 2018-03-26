<?php
session_start();
if(isset($_COOKIE['DSUID'])){
    $_SESSION['userID'] = $_COOKIE['DSUID'];
	if(isset($_GET['app_location']) && $_GET['app_location'] == 1){
		header("location: http://my.dealchasr.co.uk/app/main.php?app_location=1");
	} else {
		header("location: http://my.dealchasr.co.uk/app/main.php");
	}
} else {
    header("location: http://my.dealchasr.co.uk/index.php");
}