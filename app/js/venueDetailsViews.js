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
        uploadFile();
    });
	
	$(document).on("click", ".p-upgrade-btn", function(){
		upgradeAccount($(this));
	});
	
	$(document).on("click", "#upgrade-account", function(){
		var modal = $("#modal-cover");
        var modalText = $(".modal-message");
        modal.show();

		if(window.tier == 2){
			var p2 = 3;
			var title2 = "PREMIUM";
			var html2 = "<h1>&pound;5.99</h1><br /><span class='p-dur' >Per month</span>" + 
						"<div class='p-divider' ></div><br /><br />" + 
						"<span class='product-header' >Voucher Limit - </span><span class='product-info' >Unlimited</span><br /><br />" + 
						"<span class='product-header' >Voucher Cost - </span><span class='product-info' >50p Per Redeemed Voucher (50 Free a month)</span><br /><br />" + 
						"<span class='product-header' >Deals and Events - </span><span class='product-info' >Unlimited</span><br /><br />" + 
						"<span class='product-header' >Your location on the map - </span><span class='product-info' >All the time</span><br /><br />" + 
						"<span class='product-header' >Premium pin on map</span><span class='product-info' ></span><br /><br /><br /><br />" + 
						"<div class='p-upgrade-btn' id='3' >UPGRADE NOW</div>";
		} else {
			var p2 = 2;
			var title2 = "PRO";
			var html2 = "<h1>&pound;0.00</h1><br /><span class='p-dur' >Per month</span>" + 
						"<div class='p-divider' ></div><br /><br />" + 
						"<span class='product-header' >Voucher Limit - </span><span class='product-info' >Unlimited</span><br /><br />" + 
						"<span class='product-header' >Voucher Cost - </span><span class='product-info' >50p Per Redeemed Voucher</span><br /><br />" + 
						"<span class='product-header' >Deals and Events - </span><span class='product-info' >1</span><br /><br />" + 
						"<span class='product-header' >Your location on the map - </span><span class='product-info' >When vouchers are available</span><br /><br /><br /><br />" + 
						"<div class='p-upgrade-btn' id='2' >DOWNGRADE NOW</div>";
		}
		
		var upgradeHTML = "<span class='p-title' >UPGRADE YOUR ACCOUNT</span><br />" + 
						  "<br />Upgrading your account is easy and instant! Just choose your package below, hit upgrade or downgrade and away you go.<br /><br />" + 
						  "Note: your invoice date will stay the same. If you are upgrading from FREE to either PRO or PREMIUM any vouchers redeemed between your upgrade and " +
						  " next invoice will be chargeable.<br /><br /><br />";
		
		upgradeHTML += "<div class='upgrade-container' >" + 
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

	if(window.tier == 1){
		var tierStr = "FREE ACCOUNT";
	} else if(window.tier == 2){
		var tierStr = "PRO ACCOUNT";
	} else {
		var tierStr = "PREMIUM ACCOUNT";
	}

	if(window.validated == 1){
		var valStr = "<span style='color:forestgreen;'><i class='fas fa-check' style='padding-right:5px;'></i>Account Verified</span>";
	} else {
		var valStr = "<span style='color:darkred;'><i class='fas fa-times' style='padding-right:5px;'></i>Account Unverified</span>";
	}

    details += "<div id='venue-details' >";
    details += "<div id='venue-view-header' >" +
		"<div id='venue-view-top-bar' >" +
		"<div class='view-title' >Your Account</div>" +
		"<div id='venue-view-image' style='background-image:url(" + window.venueHeader + ")' >" +
        "<div class='upload-button' >" +
        "<input type='file' id='inputfile' name='venueheader' />" +
        "<button class='upload-button-btn' ><i class='fas fa-edit'></i></button>" +
        "</div>" +
		"</div>" +
		"<div id='venue-view-account-details' >" +
		"<div class='venue-view-tier' >" + tierStr + "</div>" +
		"<div class='venue-view-verified'>" + valStr + "</div>" +
		"<div class='venue-view-vouchers' >" + window.venueVouchersRemaining + " vouchers remaining<br />" + window.venueVouchersUsed + " vouchers used</div>" +
		"</div>" +
        "</div>" +
		"</div>";

    details += "<div class='venue-details-container' >" +
		"<div id='venue-view-edit-header' >Edit Account Details <i class='fas fa-edit'></i></div>";


	details += "<table id='venue-view-details-table' >" +
		"<tr>" +
		"<td colspan='2' class='venue-view-table-title'>VENUE DETAILS</td></tr><tr>";
    details += "<td class='venue-view-table-label' >" +
        "<label>EDIT VENUE DESCRIPTION (The best you can with 140 characters)</label>" +
		"</td><td>" +
        "<textarea maxlength='140' class='text-two' id='venueDesc' >" + window.venueDesc + "</textarea><br />" +
        "</td></tr><tr>";

    details += "<td class='venue-view-table-label' >" +
        "<label>WEBSITE</label>" +
		"</td><td>" +
        "<input type='text' class='text-one-center' name='venue-website' id='venueWebsite' value='" + window.venueWebsite + "' />" +
        "</td></tr><tr>";

    details += "<td class='venue-view-table-label' >" +
        "<label>OPEN HOURS (E.G 12PM - 12AM)</label>" +
		"</td><td>" +
        "<input type='text' class='text-one-center' name='venue-open' id='venueOpen' value='" + window.venueOpenHours + "' />" +
        "</td></tr><tr>";

    details += "<td class='venue-view-table-label' >" +
        "<label>CONTACT NUMBER</label>" +
		"</td><td>" +
        "<input type='text' class='text-one-center' name='venue-contact' id='venueContact' value='" + window.venueContact + "' />" +
        "</td></tr><tr>";
		
	details += "<td class='venue-view-table-label' >" +
        "<label>CONTACT EMAIL</label>" +
		"</td><td>" +
        "<input type='text' class='text-one-center' name='venue-email' id='venueEmail' value='" + window.venueEmail + "' />" +
        "</td></tr><tr>";

    details += "<td class='venue-view-table-label' >" +
        "<label>ADDRESS ONE</label>" +
		"</td><td>" +
        "<input type='text' class='text-one' name='venue-address-one' id='venueAddressOne' value='" + window.venueAddressOne + "' />" +
        "</td></tr><tr><td class='venue-view-table-label' >" +
		"<label>ADDRESS TWO</label>" +
		"</td><td>" +
        "<input type='text' class='text-one' name='venue-address-two' id='venueAddressTwo' value='" + window.venueAddressTwo + "' />" +
        "</td></tr><tr><td class='venue-view-table-label' >" +
		"<label>CITY / TOWN</label>" +
		"</td><td>" +
        "<input type='text' class='text-one' name='venue-address-city' id='venueAddressCity' value='" + window.venueCityTown + "' />" +
        "</td></tr><tr><td class='venue-view-table-label' >" +
		"<label>COUNTY</label>" +
		"</td><td>" +
        "<input type='text' class='text-one' name='venue-address-county' id='venueAddressCounty' value='" + window.venueCounty + "' />" +
        "</td></tr><tr><td class='venue-view-table-label' >" +
		"<label>COUNTRY</label>" +
		"</td><td>" +
        "<input type='text' class='text-one' name='venue-address-country' id='venueAddressCountry' value='" + window.venueCountry + "' />" +
        "</td></tr><tr><td class='venue-view-table-label' >" +
		"<label>POST CODE</label>" +
		"</td><td>" +
        "<input type='text' class='text-one' name='venue-address-postcode' id='venueAddressPostcode' value='" + window.venuePostCode + "' />" +
        "</td></tr><tr>";
		
		var checked = "checked=checked";
		if(window.rEmail == 1){
			checked = "checked=checked";
		} else {
			checked = "";
		}
		
		details += "<td colspan='2' class='venue-view-table-title'>EMAILS &amp; CONTACT</td></tr><tr>" +
			"<td class='venue-view-table-label' colspan='2' >" +
			"<label class='control control-checkbox'>" +
        "RECEIVE REDEMPTION EMAILS?" +
        "<input type='checkbox' id='rEmail' " + checked + " />" +
        "<div class='control_indicator'></div>" +
		"</label>" +
			"</td></tr><tr>" +
			"<td colspan='2' class='venue-view-table-title'>&nbsp;</td></tr><tr>";

    details += "<td colspan='2' class='venue-view-table-button'>" +
        "<button type='text' class='venue-details-submit-button' id='venue-submit' >SUBMIT CHANGES</button>" +
        "</td></tr><tr>";

    if(window.validated == 0){
        details += "<td colspan='2' class='venue-view-table-button'>" +
            "<button type='text' class='venue-details-validate-button' id='venue-validate' >VALIDATE EMAIL</button>" +
            "</td></tr><tr>";
    }
		
	var statusStr = "";
	if(window.accountActive == 1){
		statusStr = "DEACTIVATE ACCOUNT";
	} else {
		statusStr = "ACTIVATE ACCOUNT";
	}
		
	details += "<td colspan='2' class='venue-view-table-button'>" +
        "<button type='text' class='venue-details-status-button' id='venue-status' data=" + window.accountActive + " >" + statusStr + "</button>" +
        "</td></tr></table>";

    details += "<br /><br /><br /></div><div class='spacer' ></div>";

    actionView.html(details);
}

function changeAccountStatus(state, id){
	if(!getCookie("DSAT")){
		var ts = getToken(2, function(){changeAccountStatus(state, id);});
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
	var modal = $("#modal-cover");
    var modalText = $(".modal-message");
    modalText.html("CLOSING ACCOUNT...<br /><br />");
    modal.show();
	$.ajax({
		url: "http://api.almanacmedia.co.uk/venues/status",
		type: "POST",
		dataType: "JSON",
		headers: {
			"Authorization": "DS1k1Il68_uPPoD:" + client,
			"DSToken": token,
			"DSUid": uuid,
			"DSUtoken" : utoken
		},
		data: {
			"state": state,
			"id": id
		},
		success: function(json){
			if((json.code != undefined || json.code != 'undefined') && json.code == 8){
				refreshToken(refresh, client, function(){changeAccountStatus(state, id)});
			} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
				window.location.href = 'http://my.dealchasr.co.uk/app/logout.php';
			} else {
				if(json.changed == 1){
					window.location.href = "logout.php";
				} else {
					console.log(e);
				}
			}
		},
		error: function(e){
			console.log(e);
		}
	});
}

function submitDetails(){
	if(!getCookie("DSAT")){
		var ts = getToken(2, submitDetails);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
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
	var r = $("#rEmail");
	
	if(r.prop("checked")){
		var rEmail = 1;
	} else {
		var rEmail = 0;
	}

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
                "Authorization": "DS1k1Il68_uPPoD:" + client,
				"DSToken": token,
				"DSUid": uuid,
				"DSUtoken" : utoken
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
                "vAddressPostCode": venueAddressPostCode,
				"vid": window.venueID,
				"rEmail": rEmail
            },
            success: function(json){
				if((json.code != undefined || json.code != 'undefined') && json.code == 8){
					refreshToken(refresh, client, submitDetails);
				} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
					window.location.href = 'http://my.dealchasr.co.uk/app/logout.php';
				} else {
					if(json.updated == 1){
						modalText.html("VENUE DETAILS WERE UPDATED SUCCESSFULLY<br /><br />" +
							"<input type='button' class='close-modal-done' value='CLOSE' />");
					} else {
						modalText.html("WHOA! SOMETHING WENT WRONG. PLEASE TRY AGAIN.<br /><br />" +
							"<input type='button' class='close-modal-centered' value='CLOSE' />");
					}
				}
            },
            error: function(e){
                modalText.html("WHOA! SOMETHING WENT WRONG. PLEASE TRY AGAIN.<br /><br />" +
                    "<input type='button' class='close-modal-centered' value='CLOSE' />");
            }
        });
    }
}

function closeDetailsModal(url){
    var venueView = $("#venue-message");
    venueView.css("background-image", "url(" + url + ")");
    $(".venue-details-title").css("background-image", "url(" + url + ")");
    window.venueHeader = url;
    $("#modal-cover").hide();
}

function uploadFile() {
	if(!getCookie("DSAT")){
		var ts = getToken(2, uploadFile);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
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
			"Authorization": "DS1k1Il68_uPPoD:" + client,
			"DSToken": token,
			"DSUid": uuid,
			"DSUtoken" : utoken
		},
		contentType: false,
		cache: false,
		processData:false,
		success: function(data){
			if((json.code != undefined || json.code != 'undefined') && json.code == 8){
				refreshToken(refresh, client, uploadFile);
			} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
				window.location.href = 'http://my.dealchasr.co.uk/app/logout.php';
			} else {
				console.log(data.updated);
				var venueView = $("#venue-message");
				venueView.css("background-image", "url(" + data.updated + ")");
				$(".venue-details-title").css("background-image", "url(" + data.updated + ")");
				window.venueHeader = data.updated;
				modal.hide();
			}
		}
	});
}

function upgradeAccount(th){
	if(!getCookie("DSAT")){
		var ts = getToken(2, function(){upgradeAccount(th);});
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	
	if(!getCookie("DSUID") || !getCookie("DSUTOKEN")){
		window.location.href = 'http://admin.dealchasr.co.uk/app/logout.php';
	} else {
		var utoken = getCookie("DSUTOKEN");
		var uuid = getCookie("DSUID");
	}
	
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
				"Authorization": "DS1k1Il68_uPPoD:" + client,
				"DSToken": token,
				"DSUid": uuid,
				"DSUtoken" : utoken
			},
			success: function(json){
				if((json.code != undefined || json.code != 'undefined') && json.code == 8){
					refreshToken(refresh, client, function(){upgradeAccount(th);});
				} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
					window.location.href = 'http://my.dealchasr.co.uk/app/logout.php';
				} else {
					if(json.upgraded == 1){
						th.html("ACCOUNT UPGRADED... ");
						setTimeout(function(){
							window.location.href = "http://my.dealchasr.co.uk?upgraded=true";
						}, 2500);
					}
				}
			},
			error: function(e){
				console.log(e);
			}
		});
	}
}
