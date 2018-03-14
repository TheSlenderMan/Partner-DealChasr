<?php
if(isset($_GET['tier'])){
    $tier = $_GET['tier'];
} else {
    $tier = 1;
}
if(isset($_GET['error'])){
	$e = $_GET['error'];
	if($e == 'fields'){
		$error = 'THERE SEEMS TO BE A PROBLEM AT THE MOMENT. PLEASE TRY AGAIN LATER.';
	}
	if($e == 'system'){
		$error = 'THERE SEEMS TO BE A PROBLEM AT THE MOMENT. PLEASE TRY AGAIN LATER.';
	}
	if($e == 'userknown'){
		$error = 'THIS EMAIL ADDRESS IS ALREADY IN USE.';
	}
	if($e == 'emailmalformed'){
		$error = 'INVALID EMAIL ADDRESS.';
	}
	if($e == 'emailgeneral'){
		$error = 'THERE SEEMS TO BE A PROBLEM WITH YOUR EMAIL ADDRESS. PLEASE TRY AGAIN.';
	}
} else {
	$error = '';
}
?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>DEALCHASR - PARTNER PORTAL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link href="https://fonts.googleapis.com/css?family=Amiko" rel="stylesheet">
        <link rel="stylesheet" href="http://my.dealchasr.co.uk/css/signup.css" />

        <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../favicon-16x16.png">
        <link rel="manifest" href="../site.webmanifest" />
        <link rel="mask-icon" href="../safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">

        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" ></script>
        <script src="http://my.dealchasr.co.uk/js/signup.js" type="text/javascript" ></script>
		<script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <script>
            $(document).ready(function(){
                window.tier = <?php echo $tier; ?>;
				window.tierStr = "";
				if(window.tier == 1){
					window.tierStr = "Get started with your FREE account.";
				} else if(window.tier == 2) {
					window.tierStr = "Get started with your PRO account.";
				} else if(window.tier == 3){
					window.tierStr = "Get started with your PREMIUM account.";
				} else {
					window.tierStr = "Get started with your FREE account.";
				}
				$(".signup-header").html(window.tierStr);
            });
        </script>
    </head>
    <body>
        <div id="#master-container" >
            <div id="header-container" >
                <h1>Become a Partner</h1>
            </div>
            <div id="signup-container" >
				<div id="logo-container" ></div>
				<div id="signup-form" >
					<form action="process.php" id="venueSignupForm" method="post" >
						<span class="signup-header" ></span><br /><br />
						<span class="signup-chaser" >Create your account now and start adding vouchers and deals for your venue on
							our public app. Already have a DealChasr account? <a href="http://my.dealchasr.co.uk" >Log in</a></span><br /><br />
						
						<div class="error-container" id="topError" ><?php echo $error; ?></div><br /><br />
						<div class="form-header" >ABOUT YOU</div><br /><br />
						<div class="info-container" >These are the details you will log into your account with.</div><br /><br />
						<label>Full Name</label><br />
						<input type="text" id="fullName" name="fullName" class="text-box" /><br /><br />
						<label>Email</label><br />
						<input type="text" id="email" name="email" class="text-box" /><br /><br />
						<div class="error-container" id="emailError" ></div><br /><br />
						<label>Password</label><br />
						<input type="password" id="password" name="password" class="text-box" /><br /><br />
						<label>Retype Password</label><br />
						<input type="password" id="password2" name="password2" class="text-box" /><br /><br />
						<div class="error-container" id="passwordError" ></div><br /><br /><br />
						<div class="form-header" >ABOUT YOUR VENUE</div><br /><br />
						<div class="info-container" >Please enter accurate information about your venue. You can update these once you are able to log into
						 your account. <br /><br /><b>NOTE: To make sure genuine venues are signing up to use DealChasr we may contact you or match your details to publicly
						 available information. Any accounts created using false details will be terminated immediately.</b></div><br /><br />
						<label>Venue Name</label><br />
						<input type="text" id="vName" name="vName" class="text-box" /><br /><br />
						<label>Venue Email</label><br />
						<input type="text" id="vEmail" name="vEmail" class="text-box" /><br /><br />
						<div class="error-container" id="vEmailError" ></div><br /><br />
						<label>Venue Website (Please include http://)</label><br />
						<input type="text" id="vWebsite" name="vWebsite" class="text-box" /><br /><br />
						<label>Venue Contact Number</label><br />
						<input type="text" id="vContact" name="vContact" class="text-box" /><br /><br /><br />
						<div class="form-header" >VENUE ADDRESS</div><br /><br />
						<div class="info-container" >Make sure your address is accurate. You will not appear on the public app if your
						address is incorrect.</div><br /><br />
						<label>Venue Address One</label><br />
						<input type="text" id="vAddressOne" name="vAddressOne" class="text-box" /><br /><br />
						<label>Venue Address Two (Optional)</label><br />
						<input type="text" id="vAddressTwo" name="vAddressTwo" class="text-box" /><br /><br />
						<label>Venue City/Town</label><br />
						<input type="text" id="vCityTown" name="vCityTown" class="text-box" /><br /><br />
						<label>Venue County</label><br />
						<input type="text" id="vCounty" name="vCounty" class="text-box" /><br /><br />
						<label>Venue Country</label><br />
						<input type="text" id="vCountry" name="vCountry" class="text-box" /><br /><br />
						<label>Venue Post Code</label><br />
						<input type="text" id="vPostCode" name="vPostCode" class="text-box" /><br /><br />
						<div class="g-recaptcha" data-sitekey="6LfGl0wUAAAAAE7M1lZ3xxjOlQGTIQtI3eqXsX_E"></div><br />
						<div class="error-container" id="captchaError" ></div><br /><br />
						<input type="hidden" value="<?php echo $tier; ?>" name="vTier" />
						<div class="info-container" >By submitting this form you adhere to our <a href="" >Terms & Conditions</a></div><br /><br />
						<input type="submit" id="form-submit" class="submit-button" value="SUBMIT" />
					</form>
				</div>
				<div style="clear:both;" ></div>
				<br /><br />
			</div>
        </div>
    </body>
</html>