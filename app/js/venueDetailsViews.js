$(document).ready(function(){
   $(document).on("click", ".test-image", function(){
      console.log($(".fileimage").val());
   });

    $(document).on("click", ".venue-details-submit-button", function(){
       submitDetails();
    });

    $(document).on("click", ".venue-details-validate-button", function(){
        resendEmail($(this));
    });
	
	$(document).on("click", ".venue-details-status-button", function(){
		var state = $(this).attr("data");
		if(state == 1){
			s = "DEACTIVATE";
			if(confirm("ARE YOU SURE YOU WANT TO DEACTIVATE YOUR ACCOUNT?\n\nYou will not be able to create any vouchers and deals or edit your details.\n\nIf you wish to reactivate please contact us at theteam@dealchasr.co.uk")){
				changeAccountStatus(s, window.venueID);
			}
		} else {
			s = "ACTIVATE";
			if(confirm("ARE YOU SURE YOU WANT TO ACTIVATE YOUR ACCOUNT?\n\nYour billing will continue as it was before.")){
				changeAccountStatus(s, window.venueID);
			}
		}
        
    });

    $(document).on("change", "#inputfile",function(){
        var modal = $("#modal-cover");
        var modalText = $(".modal-message");
        modal.show();

        modalText.html("UPLOADING PHOTO...<br /><br />");

        var file_data = $('#inputfile').prop('files')[0];
        var form_data = new FormData();
        form_data.append('venueheader', file_data);

        var fixedName = window.venueName.replace(/[^A-Z0-9]/ig, "_");

        $.ajax({
            url: "http://api.almanacmedia.co.uk/venues/details?id=" + window.venueID + "&venueName=" + fixedName,
            type: "POST",
            dataType: "JSON",
            data:  form_data,
            headers: {
                "Authorization": "DS1k1Il68_uPPoD"
            },
            contentType: false,
            cache: false,
            processData:false,
            success: function(data){
                console.log(data.updated);
                var venueView = $("#venue-message");
                venueView.css("background-image", "url(" + data.updated + ")");
                $(".venue-details-title").css("background-image", "url(" + data.updated + ")");
                window.venueHeader = data.updated;
                modal.hide();
            }
        });
    });
	
	$(document).on("click", ".p-upgrade-btn", function(){
		var th = $(this);
		var newTier = th.attr('id');
		th.html("UPDATING ACCOUNT...");
		if(confirm("Are you sure you want to upgrade/downgrade your account?")){
			$.ajax({
				url: 'http://api.almanacmedia.co.uk/venues/upgrade',
				type: 'POST',
				dataType: 'JSON',
				data:{
					"venueID": window.venueID,
					"oldTier": window.tier,
					"newTier": newTier,
					"email": window.venueEmail
				},
				headers:{
					"Authorization": "DS1k1Il68_uPPoD"
				},
				success: function(json){
					if(json.upgraded == 1){
						th.html("ACCOUNT UPGRADED... ");
						setTimeout(function(){
							window.location.href = "http://my.dealchasr.co.uk?upgraded=true";
						}, 2500);
					}
				},
				error: function(e){
					console.log(e);
				}
			});
		}
	});
	
	$(document).on("click", "#upgrade-account", function(){
		var modal = $("#modal-cover");
        var modalText = $(".modal-message");
        modal.show();

		if(window.tier == 1){
			var p1 = 2;
			var title1 = "PRO";
			var html1 = "<h1>&pound;0.00</h1><br /><span class='p-dur' >Per month</span>" + 
						"<div class='p-divider' ></div><br /><br />" + 
						"<span class='product-header' >Voucher Limit - </span><span class='product-info' >Unlimited</span><br /><br />" + 
						"<span class='product-header' >Voucher Cost - </span><span class='product-info' >50p Per Redeemed Voucher</span><br /><br />" + 
						"<span class='product-header' >Deals and Events - </span><span class='product-info' >Yes</span><br /><br />" + 
						"<span class='product-header' >Your location on the map - </span><span class='product-info' >All the time</span><br /><br /><br /><br />" + 
						"<div class='p-upgrade-btn' id='2' >UPGRADE NOW</div>";
			var p2 = 3;
			var title2 = "PREMIUM";
			var html2 = "<h1>&pound;5.99</h1><br /><span class='p-dur' >Per month</span>" + 
						"<div class='p-divider' ></div><br /><br />" + 
						"<span class='product-header' >Voucher Limit - </span><span class='product-info' >Unlimited</span><br /><br />" + 
						"<span class='product-header' >Voucher Cost - </span><span class='product-info' >50p Per Redeemed Voucher</span><br /><br />" + 
						"<span class='product-header' >Deals and Events - </span><span class='product-info' >Yes</span><br /><br />" + 
						"<span class='product-header' >Your location on the map - </span><span class='product-info' >All the time</span><br /><br />" + 
						"<span class='product-header' >Premium pin on map</span><span class='product-info' ></span><br /><br /><br /><br />" + 
						"<div class='p-upgrade-btn' id='3' >UPGRADE NOW</div>";
		} else if(window.tier == 2){
			var p1 = 1;
			var title1 = "FREE";
			var html1 = "<h1>&pound;0.00</h1><br /><span class='p-dur' >Per month</span>" + 
						"<div class='p-divider' ></div><br /><br />" + 
						"<span class='product-header' >Voucher Limit - </span><span class='product-info' >50 (Reddemable)</span><br /><br />" + 
						"<span class='product-header' >Voucher Cost - </span><span class='product-info' >Free</span><br /><br />" + 
						"<span class='product-header' >Deals and Events - </span><span class='product-info' >When vouchers are available</span><br /><br /><br /><br />" + 
						"<div class='p-upgrade-btn' id='1' >DOWNGRADE NOW</div>";
			var p2 = 3;
			var title2 = "PREMIUM";
			var html2 = "<h1>&pound;5.99</h1><br /><span class='p-dur' >Per month</span>" + 
						"<div class='p-divider' ></div><br /><br />" + 
						"<span class='product-header' >Voucher Limit - </span><span class='product-info' >Unlimited</span><br /><br />" + 
						"<span class='product-header' >Voucher Cost - </span><span class='product-info' >50p Per Redeemed Voucher</span><br /><br />" + 
						"<span class='product-header' >Deals and Events - </span><span class='product-info' >Yes</span><br /><br />" + 
						"<span class='product-header' >Your location on the map - </span><span class='product-info' >All the time</span><br /><br />" + 
						"<span class='product-header' >Premium pin on map</span><span class='product-info' ></span><br /><br /><br /><br />" + 
						"<div class='p-upgrade-btn' id='3' >UPGRADE NOW</div>";
		} else {
			var p1 = 1;
			var title1 = "FREE";
			var html1 = "<h1>&pound;0.00</h1><br /><span class='p-dur' >Per month</span>" + 
						"<div class='p-divider' ></div><br /><br />" + 
						"<span class='product-header' >Voucher Limit - </span><span class='product-info' >50 (Reddemable)</span><br /><br />" + 
						"<span class='product-header' >Voucher Cost - </span><span class='product-info' >Free</span><br /><br />" + 
						"<span class='product-header' >Deals and Events - </span><span class='product-info' >When vouchers are available</span><br /><br /><br /><br />" + 
						"<div class='p-upgrade-btn' id='1' >DOWNGRADE NOW</div>";
			var p2 = 2;
			var title2 = "PRO";
			var html2 = "<h1>&pound;0.00</h1><br /><span class='p-dur' >Per month</span>" + 
						"<div class='p-divider' ></div><br /><br />" + 
						"<span class='product-header' >Voucher Limit - </span><span class='product-info' >Unlimited</span><br /><br />" + 
						"<span class='product-header' >Voucher Cost - </span><span class='product-info' >50p Per Redeemed Voucher</span><br /><br />" + 
						"<span class='product-header' >Deals and Events - </span><span class='product-info' >Yes</span><br /><br />" + 
						"<span class='product-header' >Your location on the map - </span><span class='product-info' >All the time</span><br /><br /><br /><br />" + 
						"<div class='p-upgrade-btn' id='2' >DOWNGRADE NOW</div>";
		}
		
		var upgradeHTML = "<span class='p-title' >UPGRADE YOUR ACCOUNT</span><br />" + 
						  "<br />Upgrading your account is easy and instant! Just choose your package below, hit upgrade or downgrade and away you go.<br /><br />" + 
						  "Note: your invoice date will stay the same. If you are upgrading from FREE to either PRO or PREMIUM any vouchers redeemed between your upgrade and " +
						  " next invoice will be chargeable.<br /><br /><br />";
		
		upgradeHTML += "<div class='upgrade-container' >" + 
					   "<div class='product-1' >" + 
					   "<span class='p-title' >" + title1 + "</span><br /><br />" + 
					   html1 + "</div><br /><br />" +
					   "<div class='product-2' >" + 
					   "<span class='p-title' >" + title2 + "</span><br /><br />" + 
					   html2 + "</div></div><br /><br />";
					   
		upgradeHTML += "<br /><br /><div class='close-modal-centered' >CLOSE</div>";
					   
        modalText.html(upgradeHTML);
	});
});

function getDetailsView(){
    var actionView = $("#action-container");
    var details = "";
    details += "<div id='venue-details' >";
    details += "<div class='venue-details-title' style='background-image:url(" + window.venueHeader + ")' >" +
        "VENUE DETAILS<div class='close-action' >X</div>" +
        "<div class='upload-button' >" +
        "<input type='file' id='inputfile' name='venueheader' />" +
        "<button class='upload-button-btn' > UPLOAD NEW IMAGE</button>" +
        "</div>" +
        "</div>";

    details += "<div class='venue-details-container' >";

    details += "<br /><br /><div class='venue-desc' >" +
        "<label>EDIT VENUE DESCRIPTION (The best you can with 140 characters)</label><br />" +
        "<textarea maxlength='140' class='text-two' id='venueDesc' >" + window.venueDesc + "</textarea><br />" +
        "</div>";

    details += "<br /><br /><div class='venue-website' >" +
        "<label>WEBSITE</label><br />" +
        "<input type='text' class='text-one-center' name='venue-website' id='venueWebsite' value='" + window.venueWebsite + "' />" +
        "</div>";

    details += "<br /><br /><div class='venue-open' >" +
        "<label>OPEN HOURS (E.G 12PM - 12AM)</label><br />" +
        "<input type='text' class='text-one-center' name='venue-open' id='venueOpen' value='" + window.venueOpenHours + "' />" +
        "</div>";

    details += "<br /><br /><div class='venue-contact' >" +
        "<label>CONTACT NUMBER</label><br />" +
        "<input type='text' class='text-one-center' name='venue-contact' id='venueContact' value='" + window.venueContact + "' />" +
        "</div>";
		
	details += "<br /><br /><div class='venue-email' >" +
        "<label>CONTACT EMAIL</label><br />" +
        "<input type='text' class='text-one-center' name='venue-email' id='venueEmail' value='" + window.venueEmail + "' />" +
        "</div>";

    details += "<br /><br /><div class='venue-address' >" +
        "<label>ADDRESS ONE</label><br />" +
        "<input type='text' class='text-one' name='venue-address-one' id='venueAddressOne' value='" + window.venueAddressOne + "' />" +
        "<br /><br /><label>ADDRESS TWO</label>" +
        "<input type='text' class='text-one' name='venue-address-two' id='venueAddressTwo' value='" + window.venueAddressTwo + "' />" +
        "<br /><br /><label>CITY / TOWN</label>" +
        "<input type='text' class='text-one' name='venue-address-city' id='venueAddressCity' value='" + window.venueCityTown + "' />" +
        "<br /><br /><label>COUNTY</label>" +
        "<input type='text' class='text-one' name='venue-address-county' id='venueAddressCounty' value='" + window.venueCounty + "' />" +
        "<br /><br /><label>COUNTRY</label>" +
        "<input type='text' class='text-one' name='venue-address-country' id='venueAddressCountry' value='" + window.venueCountry + "' />" +
        "<br /><br /><label>POST CODE</label>" +
        "<input type='text' class='text-one' name='venue-address-postcode' id='venueAddressPostcode' value='" + window.venuePostCode + "' />" +
        "</div>";

    details += "<br /><br /><div class='venue-details-submit' >" +
        "<button type='text' class='venue-details-submit-button' id='venue-submit' >SUBMIT CHANGES</button>" +
        "</div>";

    if(window.validated == 0){
        details += "<br /><br /><div class='venue-details-status' >" +
            "<button type='text' class='venue-details-validate-button' id='venue-validate' >VALIDATE EMAIL</button>" +
            "</div>";
    }
	
	if(window.tier < 3){
		details += '<div class="ribbon" id="upgrade-account" ><div class="ribbon-stitches-top"></div><strong class="ribbon-content"><h1>UPGRADE</h1></strong><div class="ribbon-stitches-bottom"></div></div>';
	}
		
	var statusStr = "";
	if(window.accountActive == 1){
		statusStr = "DEACTIVATE ACCOUNT";
	} else {
		statusStr = "ACTIVATE ACCOUNT";
	}
		
	details += "<br /><br /><div class='venue-details-status' >" +
        "<button type='text' class='venue-details-status-button' id='venue-status' data=" + window.accountActive + " >" + statusStr + "</button>" +
        "</div>";

    details += "<div class='spacer' ></div>" +
        "</div>";

    actionView.html(details);
}

function changeAccountStatus(state, id){
	var modal = $("#modal-cover");
    var modalText = $(".modal-message");
    modalText.html("CLOSING ACCOUNT...<br /><br />");
    modal.show();
	$.ajax({
		url: "http://api.almanacmedia.co.uk/venues/status",
		type: "POST",
		dataType: "JSON",
		headers: {
			"Authorization": "DS1k1Il68_uPPoD"
		},
		data: {
			"state": state,
			"id": id
		},
		success: function(json){
			if(json.changed == 1){
				window.location.href = "logout.php";
			} else {
				console.log(e);
			}
		},
		error: function(e){
			console.log(e);
		}
	});
}

function submitDetails(){
    var modal = $("#modal-cover");
    var modalText = $(".modal-message");
    modalText.html("UPDATING VENUE DETAILS...<br /><br />");
    modal.show();

    var venueDescription = $("#venueDesc").val();
    var venueWebsite     = $("#venueWebsite").val();
    var venueOpenHours   = $("#venueOpen").val();
    var venueContact     = $("#venueContact").val();
	var venueEmail     = $("#venueEmail").val();
    var venueAddressOne  = $("#venueAddressOne").val();
    var venueAddressTwo  = $("#venueAddressTwo").val();
    var venueAddressCity = $("#venueAddressCity").val();
    var venueAddressCounty = $("#venueAddressCounty").val();
    var venueAddressCountry= $("#venueAddressCountry").val();
    var venueAddressPostCode = $("#venueAddressPostcode").val();

    if(venueDescription == ""){
        modalText.html("YOU MUST ENTER A DESCRIPTION<br /><br />" +
            "<input type='button' class='close-modal-centered' value='CLOSE' />");
    } else if(venueWebsite == ""){
        modalText.html("YOU MUST ENTER A WEBSITE ADDRESS<br /><br />" +
            "<input type='button' class='close-modal-centered' value='CLOSE' />");
    } else if(venueOpenHours == ""){
        modalText.html("YOU MUST ENTER YOUR OPEN HOURS<br /><br />" +
            "<input type='button' class='close-modal-centered' value='CLOSE' />");
    } else if(venueContact == ""){
        modalText.html("YOU MUST ENTER A CONTACT NUMBER<br /><br />" +
            "<input type='button' class='close-modal-centered' value='CLOSE' />");
    } else if(venueEmail == ""){
        modalText.html("YOU MUST ENTER AN EMAIL ADDRESS<br /><br />" +
            "<input type='button' class='close-modal-centered' value='CLOSE' />");
    } else if(venueAddressOne == ""){
        modalText.html("YOU MUST ENTER THE FIRST LINE OF YOUR ADDRESS<br /><br />" +
            "<input type='button' class='close-modal-centered' value='CLOSE' />");
    } else if(venueAddressCity == ""){
        modalText.html("YOU MUST ENTER A CITY<br /><br />" +
            "<input type='button' class='close-modal-centered' value='CLOSE' />");
    } else if(venueAddressCountry == ""){
        modalText.html("YOU MUST ENTER A COUNTRY<br /><br />" +
            "<input type='button' class='close-modal-centered' value='CLOSE' />");
    } else if(venueAddressPostCode == ""){
        modalText.html("YOU MUST ENTER A POST CODE<br /><br />" +
            "<input type='button' class='close-modal-centered' value='CLOSE' />");
    } else {
        $.ajax({
            url: "http://api.almanacmedia.co.uk/venues/details",
            type: "POST",
            dataType: "JSON",
            headers: {
                "Authorization": "DS1k1Il68_uPPoD"
            },
            data: {
                "vDescription": venueDescription,
                "vWebsite": venueWebsite,
                "vOpenHours": venueOpenHours,
                "vContact": venueContact,
				"vEmail": venueEmail,
                "vAddressOne": venueAddressOne,
                "vAddressTwo": venueAddressTwo,
                "vAddressCity": venueAddressCity,
                "vAddressCounty": venueAddressCounty,
                "vAddressCountry": venueAddressCountry,
                "vAddressPostCode": venueAddressPostCode
            },
            success: function(json){
                if(json.updated == 1){
                    modalText.html("VENUE DETAILS WERE UPDATED SUCCESSFULLY<br /><br />" +
                        "<input type='button' class='close-modal-done' value='CLOSE' />");
                } else {
                    modalText.html("WHOA! SOMETHING WENT WRONG. PLEASE TRY AGAIN.<br /><br />" +
                        "<input type='button' class='close-modal-centered' value='CLOSE' />");
                }
            },
            error: function(e){
                modalText.html("WHOA! SOMETHING WENT WRONG. PLEASE TRY AGAIN.<br /><br />" +
                    "<input type='button' class='close-modal-centered' value='CLOSE' />");
            }
        });
    }
}

function uploadImage() {
    var modal = $("#modal-cover");
    var modalText = $(".modal-message");
    modal.show();
    if(typeof Android !== "undefined" && Android !== null) {
        modalText.html("UPLOADING PHOTO...<br /><br />");
        console.log(window.venueID);
        Android.uploadImage(window.venueName, window.venueID);
    } else {

    }
}

function closeDetailsModal(url){
    var venueView = $("#venue-message");
    venueView.css("background-image", "url(" + url + ")");
    $(".venue-details-title").css("background-image", "url(" + url + ")");
    window.venueHeader = url;
    $("#modal-cover").hide();
}
