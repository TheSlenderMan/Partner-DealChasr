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
        var dealDetails = "<div class='part-title' >ENTER DEAL DETAILS</div>";
        dealDetails += "<div class='deal-details-holder' >";
        dealDetails += "<br /><br /><label>DEAL TITLE</label><br />" +
            "<input type='text' class='text-one-center' name='dealTitle' id='dealTitle' />";
        dealDetails += "<br /><br /><label>DEAL DESCRIPTION</label><br />" +
            "<textarea class='text-two' maxlength='140' id='dealDesc' ></textarea>";
        dealDetails += "<br /><br /><label>DEAL START DATE</label><br />" +
            "<input type='text' class='text-one-center' name='dealDate' id='dealDate' />";
        dealDetails += "<br /><br /><br /><label>DEAL START TIME</label><br />" +
            "<input type='text' name='dealTime' id='dealTime' /><br /><br /><br />";
        dealDetails += "<label class='control control-checkbox'>" + 
        "RECURRING? (For Weekly Events)" +
        "<input type='checkbox' id='recurring' />" +
        "<div class='control_indicator'></div>" +
		"</label>";
        dealDetails += "<br /><br /><label class='control control-checkbox'>" + 
        "DAILY? (For Daily Events)" +
        "<input type='checkbox' id='daily' />" +
        "<div class='control_indicator'></div>" +
		"</label>" +
        "<div class='spacer' ></div>";
        dealDetails += "</div>";

        dealDetailsView.html(dealDetails);

        $('#dealDate').datepicker({ dateFormat: "yy-mm-dd"});
        $('#dealTime').timepicker({ 'timeFormat': 'H:i:s', 'orientation': 'tl' });
    });

    $(document).on("click", ".deal-submit-button", function(){
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
                    "Authorization": "DS1k1Il68_uPPoD"
                },
                success: function(json){
                    console.log(json);
                    if(json.data.created == 1){
                        modalText.html("YOUR DEAL HAS BEEN CREATED!<br /><br />Those with the public app can now view your deal." +
                            "<br /><br />" +
                            "<input type='button' class='close-modal-done' value='CLOSE' />");
                    } else {
                        modalText.html("ERROR CREATING DEAL. PLEASE TRY AGAIN" +
                            "<br /><br />" +
                            "<input type='button' class='close-modal-centered' value='CLOSE' />");
                    }
                },
                error: function(e){
                    modalText.html("ERROR CREATING DEAL. PLEASE TRY AGAIN" +
                        "<br /><br />" +
                        "<input type='button' class='close-modal-centered' value='CLOSE' />");
                }
            });
        }
    });
});

function getAddDealView(){
    window.dealType = "";

    var action = $("#action-container");

    var dealView = "<div id='new-deal' >";
    dealView += "<div class='new-deal-title' style='background-image:url(" + window.venueHeader + ")' >" +
        "ADD NEW DEAL<div class='close-action' >X</div></div>";

    dealView += "<div id='deal-view-types' >";
    dealView += "<div class='part-title' >CHOOSE DEAL TYPE</div>";
    dealView += "<div class='deal-view-type' id='1' >FOOD</div>";
    dealView += "<div class='deal-view-type' id='2' >DRINK</div>";
    dealView += "<div class='deal-view-type' id='3' >EVENT</div>";
    dealView += "</div>";

    dealView += "<div id='deal-details' >";
    dealView += "</div>";

    dealView += "<div id='deal-flow' ></div>";

    dealView += "</div>";

    action.html(dealView);
}
