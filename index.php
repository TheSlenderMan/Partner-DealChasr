<?php
session_start();
if(isset($_SESSION['userID'])){
    header('location: http://my.dealchasr.co.uk/app/main.php');
}
?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>DEALCHASR - PARTNER PORTAL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="stylesheet" href="http://my.dealchasr.co.uk/css/login.css" />

        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">

        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" ></script>
        <script src="http://my.dealchasr.co.uk/js/login.js" type="text/javascript" ></script>

    </head>
    <body>
        <div id="master-container" >
            <div id="header-container" >
                <img src="http://img.almanacmedia.co.uk/dealchasrlogo.png" />
            </div>
            <div id="login-container" >
                <span class="error-text" ></span>
                <input class="text-input" type="text" name="email" id="email" value="EMAIL" /><br /><br />
                <input class="text-input" type="password" name="password" id="password" value="PASSWORD" /><br /><br /><br />
                <input class="login-button" type="button" name="login" id="login" value="LOGIN" /><br /><br /><br />
				<span class="not-a-partner-text" >
					NOT A DEALSPOTR PARTNER?<br /><a href="http://dealchasr.co.uk/becomeapartner" >
						CLICK TO FIND OUT HOW TO BECOME A PARTNER.
					</a>
				</span>
				<br /><br />
				<span class="forgotten-password-text" >
					<a href="http://password.dealchasr.co.uk" >FORGOTTEN YOUR PASSWORD?</a>
				</span>
            </div>
        </div>
    </body>
</html>