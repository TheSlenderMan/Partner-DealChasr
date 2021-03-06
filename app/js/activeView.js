$(document).ready(function(){
    $(document).on("click", ".close-modal-active", function(){
        $("#modal-cover").hide();
        var action = $("#action-container");
		action.html("<div class='loading' ><i class='fas fa-spinner'></i></div>");
		setTimeout(function(){
			$("#master-container").css("opacity", "1");
			$("#ui-datepicker-div").remove();
			getActiveView();
		}, 1000);
    });

    $(document).on("click", ".voucher-deactivate", function(){
        var vid = $(this).attr("id");
        deactivateVoucher(vid);
    });

    $(document).on("click", ".deal-deactivate", function(){
        var did = $(this).attr("id");
        deactivateDeal(did);
    });
});

function deactivateDeal(did){
	if(!getCookie("DSAT")){
		var ts = getToken(2, function(){deactivateDeal(did);});
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

	if(confirm("Are you sure you want to remove this Deal?")){
		modalText.html("ENDING DEAL...");

		modal.show();
		$.ajax({
			url: "http://api.almanacmedia.co.uk/deals/end",
			type: "POST",
			dataType: "JSON",
			headers: {
				"Authorization": "DS1k1Il68_uPPoD:" + client,
				"DSToken": token,
				"DSUid": uuid,
				"DSUtoken" : utoken
			},
			data: {
				"dealID": did,
				"venueID": window.venueID
			},
			success: function(json){
				if((json.code != undefined || json.code != 'undefined') && json.code == 8){
					refreshToken(refresh, client, function(){deactivateDeal(did);});
				} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
					window.location.href = 'http://my.dealchasr.co.uk/app/logout.php';
				} else {
					if(json.removed == 1){
						window.vend = 1;
						modalText.html("THIS DEAL HAS NOW ENDED<br /><br />Those with the public app will not be able to see this deal.<br /><br />" +
							"<input type='button' class='close-modal-active' value='CLOSE' />");
					} else {
						modalText.html("SORRY, SOMETHING WENT WRONG!<br /><br />Please try again<br /><br />" +
							"<input type='button' class='close-modal-active' value='CLOSE' />");
					}
				}
			},
			error: function (e){
				modalText.html("SORRY, SOMETHING WENT WRONG!<br /><br />Please try again<br /><br />" +
					"<input type='button' class='close-modal-active' value='CLOSE' />");
			}
		});
	}
}

function deactivateVoucher(vid){
	if(!getCookie("DSAT")){
		var ts = getToken(2, function(){deactivateVoucher(vid);});
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
	if(confirm("Are you sure you want to remove this Voucher?")){
		modalText.html("ENDING VOUCHER...");

		modal.show();
		$.ajax({
			url: "http://api.almanacmedia.co.uk/vouchers/end",
			type: "POST",
			dataType: "JSON",
			headers: {
				"Authorization": "DS1k1Il68_uPPoD:" + client,
				"DSToken": token,
				"DSUid": uuid,
				"DSUtoken" : utoken
			},
			data: {
				"voucherID": vid,
				"venueID": window.venueID
			},
			success: function(json){
				if((json.code != undefined || json.code != 'undefined') && json.code == 8){
					refreshToken(refresh, client, function(){deactivateVoucher(vid);});
				} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
					window.location.href = 'http://my.dealchasr.co.uk/app/logout.php';
				} else {
					if(json.removed == 1){
						window.vend = 1;
						modalText.html("THIS VOUCHER HAS NOW ENDED<br /><br />Those with the public app will not be able to see this voucher.<br /><br />" +
							"<input type='button' class='close-modal-active' value='CLOSE' />");
					} else {
						modalText.html("SORRY, SOMETHING WENT WRONG!<br /><br />Please try again<br /><br />" +
							"<input type='button' class='close-modal-active' value='CLOSE' />");
					}
				}
			},
			error: function (e){
				modalText.html("SORRY, SOMETHING WENT WRONG!<br /><br />Please try again<br /><br />" +
					"<input type='button' class='close-modal-active' value='CLOSE' />");
			}
		});
	}
}

function getActiveView(){
	if(!getCookie("DSAT")){
		var ts = getToken(2);
		var token = ts[0];
		var refresh = ts[1];
		var client = ts[2]
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
	
    var venue = window.venueID;

    var actionView = $("#action-container");
    var activeView = "";
    activeView += "<div id='new-voucher' >";
    activeView += "<div id='active-view-header' >" +
        "<div id='active-view-top-bar' >" +
		"<div class='view-title'>Active Deals &amp; Vouchers</div>" +
		"</div>" +
		"<div class='active-view-desc' >View, Remove and End Deals and Vouchers respectively here<br /><br />" +
		"Vouchers can only be cancelled before any are redeemed. Deals can be removed at anytime</div>" +
		"</div>";
    activeView += "<div class='active-deals-vouchers' >" +
		"<div id='active-view-ex-header'>Active Deals &amp; Vouchers</div>";
    activeView += "</div>";
    actionView.html(activeView);

    var vdView = $(".active-deals-vouchers");

    $.ajax({
        url: "http://api.almanacmedia.co.uk/venues/vouchers?venueID=" + window.venueID,
        type: "GET",
        dataType: "JSON",
        headers: {
            "Authorization": "DS1k1Il68_uPPoD:" + client,
			"DSToken": token,
			"DSUid": uuid,
			"DSUtoken" : utoken
        },
        success: function(json) {
			if((json.code != undefined || json.code != 'undefined') && json.code == 8){
				refreshToken(refresh, client, getActiveView);
			} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
				window.location.href = 'http://my.dealchasr.co.uk/app/logout.php';
			} else {
				$.each(json.data, function (i, o) {
					var voucher = "<div class='active-voucher' >";
					var voucherTitle = o.voucherName + " - " + o.dealName;
					var redeemed = o.redeemed;

					voucher += "<div class='voucher-title' >" + voucherTitle + "</div>";
					voucher += "<div class='voucher-expires' >VOUCHER EXPIRES<br />" + o.endDate + "</div>";
					voucher += "<div class='voucher-count' >" + o.voucherCount + " LEFT<br /><br /></div>";
					if(redeemed > 0){
						voucher += "<div class='voucher-deactivate-not' id='" + o.id + "' >REDEEMED</div>";
					} else {
						voucher += "<div class='voucher-deactivate' id='" + o.id + "' >END VOUCHER</div>";
					}

					voucher += "</div>";
					vdView.append(voucher);
				});

				$.ajax({
					url: "http://api.almanacmedia.co.uk/venues/deals?venueID=" + window.venueID,
					type: "GET",
					dataType: "JSON",
					headers: {
						"Authorization": "DS1k1Il68_uPPoD:" + client,
						"DSToken": token,
						"DSUid": uuid,
						"DSUtoken" : utoken
					},
					success: function (djson) {
						if((json.code != undefined || json.code != 'undefined') && json.code == 8){
							refreshToken(refresh, client, getActiveView);
						} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
							window.location.href = 'http://my.dealchasr.co.uk/app/logout.php';
						} else {
							var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
							var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
							"November", "December"];
							$.each(djson.data, function (i, o) {
								var deal = "<div class='active-deal' >";
								deal += "<div class='deal-title' >" + o.dealTitle + " - " + o.dealName + "</div>";
								var jsonDate = new Date(o.dealDate);
								var dateStr = "";
								if(o.recurring == 1){
									if(o.daily == 1){
										dateStr += "EVERY DAY @ " + jsonDate.getHours() + ":" + jsonDate.getMinutes() + "<br /><br />";
									} else {
										dateStr += "EVERY " + days[jsonDate.getDay()] + " @ " + jsonDate.getHours() + ":" +
											(jsonDate.getMinutes() < 10 ? '0' : '') + jsonDate.getMinutes() + "<br /><br />";
									}
								} else {
									dateStr += days[jsonDate.getDay()] + " " + jsonDate.getDate() + " @ "
										+ jsonDate.getHours() + ":" +
										(jsonDate.getMinutes() < 10 ? '0' : '') + jsonDate.getMinutes() + "<br /><br />";
								}
								deal += "<div class='deal-date' >" + dateStr + "</div>";
								deal += "<div class='deal-deactivate' id='" + o.id + "' >REMOVE DEAL</div>";
								deal += "</div>";
								vdView.append(deal);
							});
							vdView.append("<div class='spacer'></div>");
						}
					}
				});
			}
        },
        error: function (e){
			console.log(e);
        }
    });
}