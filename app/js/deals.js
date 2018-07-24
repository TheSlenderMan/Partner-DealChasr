$(document).ready(function(){
    $(document).on("click", ".deal-view-type", function(){
        $(".deal-view-type").each(function(i, o){
            $(o).removeClass("selected");
        });
        var dealType = $(this);
        window.dealType = dealType.attr("id");
        dealType.addClass("selected");

        $("#deal-details").html("");

        $("#deal-flow").html("").append($(this).html() + "<input type='button' class='deal-submit-button' value='CREATE DEAL' />");

        var dealDetailsView = $("#deal-details");
        var dealDetails = "<div id='deal-view-create-header' >Deal Details</div>";
        dealDetails += "<table id='deal-view-details-table'>" +
			"<tr>";
        dealDetails += "<td class='deal-view-table-label'>" +
			"<label>Deal Title</label>" +
			"</td><td>" +
            "<input type='text' class='text-one' name='dealTitle' id='dealTitle' />" +
			"</td></tr><tr>";
        dealDetails += "<td class='deal-view-table-label'>" +
			"<label>Deal Description</label>" +
			"</td><td>" +
            "<textarea class='text-two' maxlength='140' id='dealDesc' ></textarea>" +
			"</td></tr><tr>";
        dealDetails += "<td class='deal-view-table-label'>" +
			"<label>Deal Start Date</label>" +
			"</td><td>" +
            "<input type='text' class='text-one-center' name='dealDate' id='dealDate' />" +
			"</td></tr><tr>";
        dealDetails += "<td class='deal-view-table-label'>" +
			"<label>Deal Start Time</label>" +
			"</td><td>" +
            "<input type='text' name='dealTime' id='dealTime' />" +
			"</td></tr><tr>";
        dealDetails += "<td colspan='2' class='deal-view-table-label'>" +
			"<label class='control control-checkbox'>" +
        "Recurs Weekly?" +
        "<input type='checkbox' id='recurring' />" +
        "<div class='control_indicator'></div>" +
		"</label>" +
			"</td></tr><tr>";
        dealDetails += "<td colspan='2' class='deal-view-table-label'>" +
			"<label class='control control-checkbox'>" +
        "Recurs Daily?" +
        "<input type='checkbox' id='daily' />" +
        "<div class='control_indicator'></div>" +
		"</label>" +
			"</td></tr></table>" +
        "<br /><br />";

        dealDetailsView.html(dealDetails);

        $('#dealDate').datepicker({ dateFormat: "yy-mm-dd"});
        $('#dealTime').timepicker({ 'timeFormat': 'H:i:s', 'orientation': 'tl' });
    });

    $(document).on("click", ".deal-submit-button", function(){
        createDeal();
    });
});

function getAddDealView(){
    window.dealType = "";

    var action = $("#action-container");

    var dealView = "<div id='new-deal' >";
    dealView += "<div id='deal-view-header' >" +
        "<div id='deal-view-top-bar' >" +
		"<div class='view-title'>Create a new Deal</div>" +
		"</div>";

		dealView += "<div id='deal-view-types' >";
		dealView += "<div class='part-title' >Deal</div>" +
			"<div class='deal-view-desc' >Select the type of deal you wish to create below</div><br /><br />";
		dealView += "<div class='deal-view-type' id='1' >FOOD</div>";
		dealView += "<div class='deal-view-type' id='2' >DRINK</div>";
		dealView += "<div class='deal-view-type' id='3' >EVENT</div>";
		dealView += "</div>";

	dealView += "</div>";

    dealView += "<div id='deal-details' >";
    dealView += "</div><div class='spacer' ></div>";

    dealView += "<div id='deal-flow' ></div>";

    dealView += "</div>";

    action.html(dealView);
}

function createDeal(){
	if(!getCookie("DSAT")){
		var ts = getToken(2, createDeal());
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

	modalText.html("CREATING DEAL...");

	modal.show();

	var rec = 0;
	var daily = 0;

	if($("#recurring").prop('checked')){
		rec = 1;
	}

	if($("#daily").prop('checked')){
		daily = 1;
	}

	if(window.dealType == ""){
		modalText.html("NO VOUCHER TYPE WAS SELECTED<br /><br />" +
			"<input type='button' class='close-modal-centered' value='CLOSE' />");
	} else if($("#dealTitle").val() == ""){
		modalText.html("PLEASE ENTER A DEAL TITLE<br /><br />" +
			"<input type='button' class='close-modal-centered' value='CLOSE' />");
	} else if($("#dealDesc").val() == ""){
		modalText.html("PLEASE ENTER A DESCRIPTION<br /><br />" +
			"<input type='button' class='close-modal-centered' value='CLOSE' />");
	} else if($("#dealDate").val() == ""){
		modalText.html("PLEASE SELECT A START DATE<br /><br />" +
			"<input type='button' class='close-modal-centered' value='CLOSE' />");
	} else if($("#dealTime").val() == ""){
		modalText.html("PLEASE SELECT A START TIME<br /><br />" +
			"<input type='button' class='close-modal-centered' value='CLOSE' />");
	} else {
		$.ajax({
			url: "http://api.almanacmedia.co.uk/deals/create",
			type: "POST",
			dataType: "JSON",
			data: {
				"userID": window.uid,
				"venueID": window.venueID,
				"dealID": window.dealType,
				"dealTitle": $("#dealTitle").val(),
				"dealDescription": $("#dealDesc").val(),
				"dealTime": $("#dealTime").val(),
				"dealDate": $("#dealDate").val(),
				"recurring": rec,
				"daily": daily
			},
			headers: {
				"Authorization": "DS1k1Il68_uPPoD:" + client,
				"DSToken": token,
				"DSUid": uuid,
				"DSUtoken" : utoken
			},
			success: function(json){
				if((json.code != undefined || json.code != 'undefined') && json.code == 8){
					refreshToken(refresh, client, createDeal);
				} else if((json.code != undefined || json.code != 'undefined') && json.code == 9) {
					window.location.href = 'http://my.dealchasr.co.uk/app/logout.php';
				} else {
					if(json.data.created == 1){
						modalText.html("YOUR DEAL HAS BEEN CREATED!<br /><br />Those with the public app can now view your deal." +
							"<br /><br />" +
							"<input type='button' class='close-modal-done' value='CLOSE' />");
					} else {
						modalText.html("ERROR CREATING DEAL. PLEASE TRY AGAIN" +
							"<br /><br />" +
							"<input type='button' class='close-modal-centered' value='CLOSE' />");
					}
				}
			},
			error: function(e){
				modalText.html("ERROR CREATING DEAL. PLEASE TRY AGAIN" +
					"<br /><br />" +
					"<input type='button' class='close-modal-centered' value='CLOSE' />");
			}
		});
	}
}
