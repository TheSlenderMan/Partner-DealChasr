<?php
session_start();
if(isset($_GET['userID'])){
    $_SESSION['userID'] = $_GET['userID'];
    header("location: http://my.dealchasr.co.uk/app/main.php");
} else {
    header("location: http://my.dealchasr.co.uk/index.php");
}