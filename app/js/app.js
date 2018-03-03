window.dealType = "";
window.created = 0;

$(document).ready(function(){

    getVenueDetails();

    $(document).on("click", ".main-link", function(){
        var pageID = $(this).attr("id");

        var action = $("#action-container");
        action.show("fast", function(){
			$("#master-container").css("opacity", "0.5");
			setTimeout(function(){
				switch (pageID){
					case "add_voucher":
						getAddVoucherView();
						break;
					case "add_deal":
						getAddDealView();
						break;
					case "active_deal":
						getActiveView();
						break;
					case "stats":
						getStatsView();
						break;
					case "venue_details":
						getDetailsView();
						break;
					default:
						getAddVoucherView();
						break;
				}
			}, 1500);
        });
    });

    $(document).on("click", ".close-action", function(){
        var action = $("#action-container");
		action.html("<div class='loading' >LOADING</div>");
		setTimeout(function(){
			action.hide("fast");
			$("#master-container").css("opacity", "1");
			$("#ui-datepicker-div").remove();
		}, 1000);
    });

    $(document).on("click", ".deal-type", function(){
        $(".deal-type").each(function(i, o){
            $(o).removeClass("selected");
        });
        var dealType = $(this);
        window.dealType = dealType.attr("id");
        dealType.addClass("selected");

        $("#voucher-details").html("");

        $("#voucher-flow").html("").append($(this).html());

        getOffers(window.dealType);
    });

    $(document).on("click", ".voucher-type", function(){
        var voucherType = $(this);
        window.voucherType = voucherType.attr("id");
        voucherType.addClass("selected");

        $(".voucher-type").each(function(i, o){
            if($(o).attr("id") != window.voucherType){
                $(o).remove();
            }
        });

        $("#voucher-flow").append(" - " + $(this).html() + "<input type='button' class='voucher-submit-button' value='CREATE VOUCHER' />");

        var voucherDetailsView = $("#voucher-details");
        var voucherDetails = "<div class='part-title' >ENTER VOUCHER DETAILS</div>";
        voucherDetails += "<div class='voucher-details-holder' >";
        voucherDetails += "<br /><br /><label>HOW MANY VOUCHERS?</label><br /><input type='text' class='text-one-center' name='voucherCount' id='voucherCount' />";
        voucherDetails += "<br /><br /><label>VOUCHER DESCRIPTION</label><br />" +
            "<textarea class='text-two' maxlength='140' id='voucherDesc' ></textarea><br/><br />";
        voucherDetails += "<label>VOUCHER END</label>" +
            "<input type='text' name='endDate' id='endDate' />";
        voucherDetails += "</div><div class='spacer' ></div>";

        voucherDetailsView.html(voucherDetails);

        $('#endDate').timepicker({ 'timeFormat': 'H:i:s' });
    });

    $(document).on("click", ".voucher-enddate", function(e){
        e.preventDefault();
    });

    $(document).on("click", ".logout-button", function(e){
        window.location.href = "http://my.dealchasr.co.uk/app/logout.php";
    });

    $(document).on("click", ".voucher-submit-button", function(){
        var modal = $("#modal-cover");
        var modalText = $(".modal-message");

        modalText.html("CREATING VOUCHER...");

        modal.show();

        if(window.dealType == ""){
            modalText.html("NO VOUCHER TYPE WAS SELECTED<br /><br />" +
                "<input type='button' class='close-modal' value='CLOSE' />");
        } else if(window.voucherType == ""){
            modalText.html("NO OFFER WAS SELECTED<br /><br />" +
                "<input type='button' class='close-modal' value='CLOSE' />");
        } else if($("#voucherCount").val() == ""){
            modalText.html("PLEASE ENTER A VOUCHER COUNT<br /><br />" +
                "<input type='button' class='close-modal' value='CLOSE' />");
        } else if($("#voucherDesc").val() == ""){
            modalText.html("PLEASE ENTER A VOUCHER DESCRIPTION<br /><br />" +
                "<input type='button' class='close-modal' value='CLOSE' />");
        } else if($("#endDate").val() == ""){
            modalText.html("PLEASE SELECT A VOUCHER END TIME<br /><br />" +
                "<input type='button' class='close-modal' value='CLOSE' />");
        } else {
            $.ajax({
               url: "http://api.almanacmedia.co.uk/vouchers/create",
                type: "POST",
                dataType: "JSON",
                data: {
                    "userID": window.uid,
                    "venueID": window.venueID,
                    "dealID": window.dealType,
                    "voucherID": window.voucherType,
                    "voucherCount": $("#voucherCount").val(),
                    "voucherDescription": $("#voucherDesc").val(),
                    "voucherTime": $("#endDate").val()
                },
                headers: {
                    "Authorization": "DS1k1Il68_uPPoD"
                },
                success: function(json){
                    console.log(json);
                    if(json.data.created == 1){
                        modalText.html("YOUR VOUCHER HAS BEEN CREATED!<br /><br />Those with the public app can now redeem your voucher." +
                            "<br /><br />" +
                            "<input type='button' class='close-modal' value='CLOSE' />");
                        window.created = 1;
                    } else {
						modalText.html("SOMETHING WENT WRONGbr /><br />If you keep experiencing this problem please report it to " +
						"theteam@dealchasr.co.uk<br /><br />" + 
                "<input type='button' class='close-modal' value='CLOSE' />");
					}
                },
                error: function(e){

                }
            });
        }
    });

    $(document).on("click", ".close-modal", function(){

        if(window.created == 1){
            $("#modal-cover").hide();
            var action = $("#action-container");
			action.html("<div class='loading' >LOADING</div>");
			setTimeout(function(){
				action.hide("fast");
				$("#master-container").css("opacity", "1");
				$("#ui-datepicker-div").remove();
				window.created = 0;
			}, 1000);
      
        } else {
            $("#modal-cover").hide();
        }
    });
	
	$(document).on("click", ".close-modal-done", function(){

		$("#modal-cover").hide();
		var action = $("#action-container");
		action.html("<div class='loading' >LOADING</div>");
		setTimeout(function(){
			action.hide("fast");
			$("#master-container").css("opacity", "1");
			$("#ui-datepicker-div").remove();
			window.created = 0;
		}, 1000);
      
    });
});

function getOffers(did){
    var voucherTypeView = $("#voucher-types");
    var voucherTypes = "";
    voucherTypes += "<div class='part-title' >CHOOSE YOUR OFFER</div>";
    switch(did){
        case '1':
            voucherTypes += "<div class='voucher-type' id='3' >10% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='4' >20% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='5' >30% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='6' >40% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='7' >50% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='8' >60% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='9' >70% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='10' >80% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='11' >90% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='12' >100% OFF</div>";
            break;
        case '2':
            voucherTypes += "<div class='voucher-type' id='1' >2 FOR 1</div>";
            voucherTypes += "<div class='voucher-type' id='2' style='font-size:13px !important;' >FREE DRINKS</div>";
            voucherTypes += "<div class='voucher-type' id='3' >10% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='4' >20% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='5' >30% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='6' >40% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='7' >50% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='8' >60% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='9' >70% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='10' >80% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='11' >90% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='12' >100% OFF</div>";
            break;
        case '3':
            voucherTypes += "<div class='voucher-type' id='1' style='font-size:13px !important;' >2 FOR 1</div>";
            voucherTypes += "<div class='voucher-type' id='2' style='font-size:13px !important;' >FREE DRINKS</div>";
            voucherTypes += "<div class='voucher-type' id='13' style='font-size:13px !important;' >FREE ENTRY</div>";
            break;
        default:
            voucherTypes += "<div class='voucher-type' id='3' >10% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='4' >20% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='5' >30% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='6' >40% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='7' >50% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='8' >60% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='9' >70% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='10' >80% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='11' >90% OFF</div>";
            voucherTypes += "<div class='voucher-type' id='12' >100% OFF</div>";
            break;
    }
    voucherTypeView.html(voucherTypes);
}

function getAddVoucherView(){
    window.dealType = "";

    var action = $("#action-container");

    var voucherView = "<div id='new-voucher' >";
    voucherView += "<div class='new-voucher-title' style='background-image:url(" + window.venueHeader + ")' >" +
        "ADD NEW VOUCHER<div class='close-action' >X</div></div>";

    voucherView += "<div id='deal-types' >";
    voucherView += "<div class='part-title' >CHOOSE VOUCHER TYPE</div>";
    voucherView += "<div class='deal-type' id='1' >FOOD</div>";
    voucherView += "<div class='deal-type' id='2' >DRINK</div>";
    voucherView += "<div class='deal-type' id='3' >EVENT</div>";
    voucherView += "</div>";

    voucherView += "<div id='voucher-types' >";
    voucherView += "</div>";

    voucherView += "<div id='voucher-details' >";
    voucherView += "</div>";

    voucherView += "<div id='voucher-flow' ></div>";

    voucherView += "</div>";

    action.html(voucherView);
}

function getVenueDetails(){
    $.ajax({
        url: "http://api.almanacmedia.co.uk/users/venue?userID=" + window.uid,
        type: "GET",
        dataType: "JSON",
        headers: {
            "Authorization": "DS1k1Il68_uPPoD"
        },
        success: function(json){
            if(json.data.found == 1){
                var venue = json.data.venues;
                var venueView = $("#venue-message");

                window.venueID = venue.id;
                window.venueName = venue.vName;
                window.venueHeader = venue.vHeader;
                window.venueDesc   = venue.vDescription;
                window.venueWebsite = venue.vWebsite;
                window.venueOpenHours = venue.vOpenHours;
                window.venueContact = venue.vContact;
                window.venueAddressOne = venue.vAddressOne;
                window.venueAddressTwo = venue.vAddressTwo;
                window.venueCityTown = venue.vCityTown;
                window.venueCounty = venue.vCounty;
                window.venueCountry = venue.vCountry;
                window.venuePostCode = venue.vPostCode;

                venueView.css("background-image", "url(" + window.venueHeader + ")");
                venueView.html(window.venueName.toUpperCase() + "<br /><br /><input type='button' class='logout-button' value='LOG OUT' />");
            } else {
                console.log(json.data.venues);
                $("#venue-message").val("NO VENUE SET UP YET!");
            }
        }, error: function(e){
            console.log(e);
        }
    });
}