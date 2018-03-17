$(document).ready(function(){
	$(document).on("click", ".invoice-view", function(){
		var id = $(this).attr('id');
		getInvoice(id);
	});
	
	$(document).on("click", ".close-modal-invoice", function(){
		var modal = $("#modal-cover");
		var modalText = $(".modal-message");
		
		modalText.html("");
		modal.hide();
	});
});

function getInvoice(id){
	var modal = $("#modal-cover");
    var modalText = $(".modal-message");
	
	modalText.html("LOADING...");
	modal.show();
	
	$.ajax({
		url: "http://api.almanacmedia.co.uk/invoices/get?iid=" + id,
		type: "GET",
		dataType: "JSON",
		headers: {
			"Authorization": "DS1k1Il68_uPPoD"
		},
		success: function(json){
			var invoice = "";
			
			if(json.data.invoice != undefined && json.data.invoice != 'undefined'){
				var j = json.data.invoice;
				var vactive = j.active;
				var iamount = j.amount;
				var icancelDate = j.cancelDate;
				var icancelled = j.cancelled;
				var iinvoiceDate = j.invoiceDate;
				var iinvoicePaid = j.invoicePaid;
				var iinvoiceSent = j.invoiceSent;
				var inote = j.note;
				var iredemptions = j.redemptions;
				var vtier = j.tier;
				var vaone = j.vAddressOne;
				var vatwo = j.vAddressTwo;
				var vcity = j.vCityTown;
				var vcounty = j.vCounty;
				var vcountry = j.vCountry;
				var vemail = j.vEmail;
				var vname = j.vName;
				var vpostcode = j.vPostCode;
				var venueID = j.venueID;
				var invoiceID = j.id;
				var payments = j.payments;
				var tierString = "";
				var subAmount = 0.00;
				var promo = j.promo;
			
				if(vtier == 1){
					tierString = "FREE ACCOUNT";
					subAmount  = 0.00;
				} else if(vtier == 2) {
					tierString = "PRO ACCOUNT";
					subAmount  = 0.00;
				} else {
					tierString = "PREMIUM ACCOUNT";
					subAmount = 5.99;
				}
				
				var paymentsTotal = 0;
				var paymentItems = "";
				
				if(payments.length > 0){
					$.each(payments, function(i, o){
						var thisAmount = o.grossPaid;
						paymentItems += "<br /><br /><br />" +
						   "<div class='invoice-item-name' >" +
						   "" + "Payment (Thank You)" + 
						   "</div>" + 
						   "<div class='invoice-item-amount' >" + 
						   "&pound;" + thisAmount + " - " +
						   "</div>";
						   
						   paymentsTotal = parseFloat(paymentsTotal) + parseFloat(o.grossPaid);
					});
				}

				if(promo == '1'){
					var total = 0.00;
					var t = (parseFloat(iamount) + parseFloat(subAmount)) - paymentsTotal;
					paymentItems += "<br /><br /><br />" +
						"<div class='invoice-item-name' >" +
						"" + "Introduction Promo" +
						"</div>" +
						"<div class='invoice-item-amount' >" +
						"&pound;" + t + " - " +
						"</div>";
				} else {
					var total = (parseFloat(iamount) + parseFloat(subAmount)) - paymentsTotal;
				}
				
				invoice += "<div id='invoice-container' >";
				invoice += "<div class='invoice-dealchasr-logo' >&nbsp;</div>";
				invoice += "<div class='invoice-customer-details' >";
				invoice += "<span class='large-header' >INVOICE DS-" + invoiceID + "</span><br /><br />" + 
				"<span class='black-label'>INVOICE DATE: </span> <span class='small-header' >" + iinvoiceDate + "</span><br /><br />" +
				"<span class='black-label'>CUSTOMER: </span> <span class='small-header' >" + vname + "</span><br /><br />" + 
				"<span class='black-label'>ADDRESS: </span> <span class='small-header' >" + vaone + "</span><br />" +
				"<span class='small-header' >" + vatwo + "</span><br />" +
				"<span class='small-header' >" + vcity + "</span><br />" +
				"<span class='small-header' >" + vcounty + "</span><br />" + 
				"<span class='small-header' >" + vcountry + "</span><br />" +
				"<span class='small-header' >" + vpostcode + "</span><br />";
				invoice += "</div>";
				invoice += "<div style='clear:both;' ></div>";
				invoice += "<div class='tier-container' >" + tierString + "</div>";
				invoice += "<div class='invoice-items' >";
				invoice += "<div class='invoice-item' >" + 
						   "<div class='invoice-item-name' >" +
						   "" + "Monthly Redemptions" + 
						   "</div>" + 
						   "<div class='invoice-item-amount' >" + 
						   "&pound;" + iamount +
						   "</div><br /><br /><br />" +
						   "<div class='invoice-item-name' >" +
						   "" + "Subscription (Premium only)" + 
						   "</div>" + 
						   "<div class='invoice-item-amount' >" + 
						   "&pound;" + subAmount +
						   "</div>" + 
						   paymentItems + 
						   "<br /><br />" +
						   "</div>";
				invoice += "<div class='invoice-total' >TOTAL &pound;" + total.toFixed(2) +
				"</div>";
				invoice += "<div style='clear:both;' ></div>";
				invoice += "</div>";
				if(total == 0 || total == 0.00 || iinvoicePaid == 1 || icancelled == 1){
					invoice += "<div class='invoice-nothing' >NOTHING TO PAY<br /><br />" + 
					"<input type='button' class='close-modal-invoice' value='CLOSE' /><br /><br /></div>";
				} else {
					invoice +=  "<br /><br /><br /><form action='https://www.sandbox.paypal.com/cgi-bin/webscr' method='post'>" +
								"<input type='hidden' name='cmd' value='_xclick'>" +
								"<input type='hidden' name='business' value='theteam@dealchasr.co.uk'>" +
								"<input type='hidden' name='item_name' value='DealChasr Invoice'>" +
								"<input type='hidden' name='item_number' value='DS-" + invoiceID + "'>" +
								"<input type='hidden' name='amount' value='" + total + "'>" +
								"<input type='hidden' name='currency_code' value='GBP'>" +
								"<input type='hidden' name='notify_url' value='http://my.dealchasr.co.uk/app/ipn/ipn.php'>" +
								"<input type='hidden' name='return' value='http://my.dealchasr.co.uk/thankyou/?'>" +
								"<input type='hidden' name='cancel' value='http://my.dealchasr.co.uk/'>" +
								"<input type='image' name='submit' border='0'" +
								"src='http://img.almanacmedia.co.uk/pp_btn.png'" +
								"alt='PayPal - The safer, easier way to pay online'>" +
								"</form><br /><br />" +
								"<input type='button' class='close-modal-invoice' value='CLOSE' /><br /><br />";
				}
				invoice += "</div><br /><br /><br /><br />";
			
				modalText.html(invoice);
			} else {
				modalText.html(json.message + "<br /><br />" +
                    "<input type='button' class='close-modal-centered' value='CLOSE' />");
			}
			
		}, 
		error: function(e){
			console.log(e);
		}
	});
}

function getStatsView(){
    $.ajax({
        url: "http://api.almanacmedia.co.uk/venues/stats?vid=" + window.venueID,
        type: "GET",
        dataType: "JSON",
        headers: {
            "Authorization": "DS1k1Il68_uPPoD"
        },
        success: function(json){
            var voucherCount = json.voucherCount;
            var dealCount    = json.dealCount;

            var activeView = $("#action-container");

            var statsView = "<div id='new-voucher' >";
            statsView += "<div class='new-voucher-title' style='background-image:url(" + window.venueHeader + ")' >" +
                "STATISTICS<div class='close-action' >X</div></div>";

            statsView += "<div class='stats-view' >";

            statsView += "<div class='redeemed-vouchers' id='' >TOTAL REDEEMED<br />" +
                "<span class='v-count-text' >" + voucherCount + "</span><br /><br /><br /><br /></div>";

            statsView += "<div class='redeemed-deals' id='' >TOTAL INTERESTS<br />" +
                "<span class='d-count-text' >" + dealCount + "</span><br /><br /><br /><br /></div>" +
                "<div style='clear:both;' ></div>";

            statsView += "<div class='chart-title' >REDEMPTIONS THIS MONTH</div><div id='stats-chart' style='height: 250px;'></div>";
            
			statsView += "<br /><br /><br /><div class='chart-title' >INVOICES (LAST 5)</div><br /><br />";
			statsView += "<div id='invoices-container' >";
			if(json.invoices.length == 0){
				statsView += "<br /><br />NO INVOICES TO SHOW";
			} else {
				$.each(json.invoices, function(k, v){
					if(v.invoicePaid == 1 && v.cancelled == 0){
						var paid = "<span style='color:green;' >CLEARED</span>";
					} else if(v.invoicePaid == 0 && v.cancelled == 0) {
						var paid = "<span style='color:red;' >OD - PAY NOW</span>";
					} else if(v.invoicePaid == 0 && v.cancelled == 1){
						var paid = "<span style='color:brown;' >CANCELLED</span>";
					} else {
						var paid = "<span style='color:green;' >CLEARED</span>";
					}
					
					var date = v.invoiceDate.split(" ");
					var justDate = date[0];
					
					var total = parseFloat(v.amount) + parseFloat(v.subscription);
					
					statsView += "<div id='invoice' >" + 
					"<div class='invoice-date' >" + justDate + "</div>" + 
					"<div class='invoice-amount' >£" + total + "</div>" + 
					"<div class='invoice-status' >" + paid + "</div>" + 
					"<div class='invoice-view' id='" + v.id + "' >VIEW/PAY</div>" + 
					"</div><br /><br />";
				});
			}
			statsView += "</div><br /><br />";
			
			statsView += "</div>";

            activeView.html(statsView);

			if(json.chartData.length == 0){
				$("#stats-chart").html("<br /><br />NO MONTHLY STATS AVAILABLE");
				$("#stats-chart").css('height', '40px');
			} else {
				var arr = [];
				$.each(json.chartData, function(i, o){
					var ar = {"day": i, "redemptions": o};
					arr.push(ar);
				});

				console.log(arr);

				new Morris.Line({
					// ID of the element in which to draw the chart.
					element: 'stats-chart',
					// Chart data records -- each entry in this array corresponds to a point on
					// the chart.
					data: arr,
					// The name of the data record attribute that contains x-values.
					xkey: 'day',
					// A list of names of data record attributes that contain y-values.
					ykeys: ['redemptions'],
					// Labels for the ykeys -- will be displayed when you hover over the
					// chart.
					labels: ['Redemptions'],
					xLabels: "day",
					lineColors: ['#F9A603'],
					ymin: [1],
					ymax: [10]
				});
			}
        },
        error: function(e){
            modalText.html("ERROR GETTING STATISTICS. PLEASE TRY AGAIN." +
                "<br /><br />" +
                "<input type='button' class='close-modal-centered' value='CLOSE' />");
        }
    });
}