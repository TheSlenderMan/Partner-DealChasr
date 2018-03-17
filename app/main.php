<?php
session_start();
if(isset($_SESSION['userID'])){
    $uid = $_SESSION['userID'];
} else {
    header("location: http://my.dealchasr.co.uk/");
}
if(isset($_GET['app_location']) && $_GET['app_location'] == 1){
	$sa = 1;
} else {
	$sa = 0;
}
?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>DEALCHASR - VENUE PORTAL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../favicon-16x16.png">
        <link rel="manifest" href="../site.webmanifest" />
        <link rel="mask-icon" href="../safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">

		<link href="https://fonts.googleapis.com/css?family=Amiko" rel="stylesheet">
        <link rel="stylesheet" href="http://my.dealchasr.co.uk/app/css/app.css" />
        <link rel="stylesheet" href="http://my.dealchasr.co.uk/app/css/voucherView.css" />
        <link rel="stylesheet" href="http://my.dealchasr.co.uk/app/css/activeView.css" />
        <link rel="stylesheet" href="http://my.dealchasr.co.uk/app/css/detailsView.css" />
        <link rel="stylesheet" href="http://my.dealchasr.co.uk/app/css/dealsView.css" />
        <link rel="stylesheet" href="http://my.dealchasr.co.uk/app/css/stats.css" />
		<link rel="stylesheet" href="http://my.dealchasr.co.uk/app/css/invoices.css" />
		<link rel="stylesheet" href="http://my.dealchasr.co.uk/app/css/upgrade.css" />
        <link rel="stylesheet" href="http://my.dealchasr.co.uk/app/js/jquery.timepicker.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
        <link rel="stylesheet" type="text/css" media="all" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css"    />

        <script>
            window.uid = <? echo $uid; ?>;
			window.app = <? echo $sa; ?>;
        </script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" ></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
        <script src="http://my.dealchasr.co.uk/app/js/app.js" type="text/javascript" ></script>
        <script src="http://my.dealchasr.co.uk/app/js/jquery.timepicker.js"></script>
        <script src="http://my.dealchasr.co.uk/app/js/deals.js"></script>
        <script src="http://my.dealchasr.co.uk/app/js/activeView.js"></script>
        <script src="http://my.dealchasr.co.uk/app/js/stats.js"></script>
        <script src="http://my.dealchasr.co.uk/app/js/venueDetailsViews.js"></script>
        <script>
            $(document).ready(function(){
               $(document).on("click", ".close-modal-centered", function(){
                   closeModalCentered();
               });
            });
            function closeModalCentered(){
                $("#modal-cover").hide();
            }
        </script>
    </head>
    <body>
        <div id="master-container" >
            <div id="links-container" >
                <div class="main-link" id="add_voucher" >ADD VOUCHER</div>
                <div class="main-link" id="add_deal" >ADD DEAL/EVENT</div>
                <div class="main-link" id="active_deal" >ACTIVE DEALS &amp; VOUCHERS</div>
                <div class="main-link" id="stats" >STATISTICS/INVOICES</div>
                <div class="main-link" id="venue_details" >ACCOUNT</div>
                <div class="main-link" id="logout" class="logout-button" >LOG OUT</div>
            </div>
            <div id="venue-message" >

            </div>
        </div>
        <div id="modal-cover" >
            <div class="modal-message" >

            </div>
        </div>
		<div id="action-container" >
			<div class="loading" >LOADING</div>
		</div>
    </body>
</html>
