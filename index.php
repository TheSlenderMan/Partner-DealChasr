<?php
session_start();

if(isset($_GET['new'])){
	$vid = $_GET['new'];
	$new = 1;
	$email = $_GET['email'];
} else {
	$new = 0;
}
if(isset($_GET['validated'])){
	$val = 1;
} else {
	$val = 0;
	if(isset($_SESSION['userID'])){
		header('location: http://my.dealchasr.co.uk/app/main.php');
	}
}
if(isset($_GET['valExpired'])){
	$vid = $_GET['valExpired'];
	$email = $_GET['email'];
	$exp = 1;
} else {
	$exp = 0;
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
        <link rel="manifest" href="site.webmanifest" />
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#f9a603">
        <meta name="msapplication-TileColor" content="#f9a603">
        <meta name="theme-color" content="#f9a603">

        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" ></script>
        <script src="http://my.dealchasr.co.uk/js/tokens.js" type="text/javascript" ></script>
		<script src="http://my.dealchasr.co.uk/js/login.js" type="text/javascript" ></script>

		<script>
		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
		};

		<?
			if(isset($_GET['app_location']) && ($_GET['app_location'] == 1 || $_GET['app_location'] == '1')){
				$sa = 1;
			} else {
				$sa = 0;
			}
		?>

		var inew = <?php echo $new; ?>;
		var validated = <?php echo $val; ?>;
		var exp = <?php echo $exp; ?>;
		var appShow = <?php echo $sa; ?>;
		console.log(appShow);
            $(document).ready(function(){
			   if(appShow == 0 || appShow == '0'){
				   var i = $("#install");
				   i.show();
						
				   if(isMobile.Android()){
					   i.css('background-image', 'url(http://img.almanacmedia.co.uk/android-app.jpg)');
				   } else if(isMobile.iOS()){
					   i.css('background-image', 'url(http://img.almanacmedia.co.uk/ios-app.jpg)');
				   } else {
					   i.append("INSTALL THE APP ON YOUR PHONE.<br />Just open my.dealchasr.co.uk on your phones browser for instructions.");
					   i.css('height', '50px')
				   }
			   }
			   if(inew == 1){
				   $("#newVenue").show();
			   }
			   if(validated == 1){
				   $("#validated").show();
			   }
			   if(exp == 1){
				   $("#val-expired").show();
			   }
			   $(document).on("click", ".close-new", function(){
				   $("#newVenue").hide();
			   });
			   $(document).on("click", ".close-validated", function(){
				   $("#validated").hide();
			   });
			   $(document).on("click", ".close-val", function(){
				   $("#val-expired").hide();
			   });
			   $(document).on("click", ".close-install", function(){
				   $("#install").hide();
			   });
			   $(document).on("click", ".resend-validation, .resend-val", function(){
				   var th = $(this);
				   th.html("RESENDING...");
				   $.ajax({
					    url: 'http://api.almanacmedia.co.uk/venues/resendvalidation',
						type: 'POST',
						dataType: 'JSON',
						data: {
							"email": '<?php echo $email; ?>',
							"vid": '<?php echo $vid; ?>'
						},
						headers: {
							"Authorization": "DS1k1Il68_uPPoD"
						},
						success: function(json){
							th.html("EMAIL SENT");
						},
						error: function(e){
							console.log(e);
						}
				   });
			   });
            });
        </script>

    </head>
    <body>
		<div id="install" >
			<div class="close-install" >X</div>
		</div>
		<div id="newVenue" >
			<div class="welcome-screen" >
				<h1> WELCOME TO DEALCHASR </h1><br /><br />
				We have successfully set up your account and you can now log in and start creating vouchers and deals.<br /><br />
				Please note that your venue will not show up on our public facing app until you have validated your email address.<br /><br />
				<div class="close-new" >I'M READY</div>
				<br /><br />
				Did you not receive your validation email?<br />Emails can take up to 30 minutes to arrive and may arrive in your spam folder.<br /><br />
				<div class="resend-validation" >RESEND EMAIL</div>
			</div>
		</div>
		<div id="validated" >
			<div class="validate-screen" >
				<h1> EMAIL VALIDATED </h1><br /><br />
				We have successfully validated your email.<br /><br />
				<div class="close-validated" >LET'S GO</div>
			</div>
		</div>
		<div id="val-expired" >
			<div class="expired-screen" >
				<h1> YOUR VALIDATION EMAIL HAS EXPIRED </h1><br /><br />
				It looks like your validation link has expired. Don't worry! Click below to receive another validation email.<br /><br />
				<div class="resend-val" >RESEND EMAIL</div>
				<br /><br />
				<div class="close-val" >CLOSE</div>
			</div>
		</div>
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
					NOT A DEALCHASR PARTNER?<br /><a href="http://dealchasr.co.uk/become-a-partner" >
						CLICK HERE TO BECOME A PARTNER.
					</a>
				</span>
				<br /><br />
				<span class="forgotten-password-text" >
					<a href="http://password.dealchasr.co.uk" >FORGOTTEN YOUR PASSWORD?</a>
				</span>
            </div>
        </div>
		<div id="cookie-popup" >
			This Web App uses cookies to ensure you get the best experience. <a href="http://dealchasr.co.uk/privacy-policy" >Learn More</a>
			<div class="dismiss-cookie" >Got it!</div>
		</div>
    </body>
</html>