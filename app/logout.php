<?php
session_start();
session_destroy();
if(isset($_GET['app_location']) && $_GET['app_location'] == 1){
	header("location: http://my.dealchasr.co.uk?app_location=1");
} else {
	header("location: http://my.dealchasr.co.uk");
}
