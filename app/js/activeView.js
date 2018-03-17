$(document).ready(function(){
    $(document).on("click", ".close-modal-active", function(){
        $("#modal-cover").hide();
        var action = $("#action-container");
		action.html("<div class='loading' >LOADING</div>");
		setTimeout(function(){
			action.hide("fast");
			$("#master-container").css("opacity", "1");
			$("#ui-datepicker-div").remove();
		}, 1000);
    });

    $(document).on("click", ".voucher-deactivate", function(){
        var vid = $(this).attr("id");
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
                    "Authorization": "DS1k1Il68_uPPoD"
                },
                data: {
                    "voucherID": vid,
                    "venueID": window.venueID
                },
                success: function(json){
                    if(json.removed == 1){
                        window.vend = 1;
                        modalText.html("THIS VOUCHER HAS NOW ENDED<br /><br />Those with the public app will not be able to see this voucher.<br /><br />" +
                            "<input type='button' class='close-modal-active' value='CLOSE' />");
                    } else {
                        modalText.html("SORRY, SOMETHING WENT WRONG!<br /><br />Please try again<br /><br />" +
                            "<input type='button' class='close-modal-active' value='CLOSE' />");
                    }
                },
                error: function (e){
                    modalText.html("SORRY, SOMETHING WENT WRONG!<br /><br />Please try again<br /><br />" +
                        "<input type='button' class='close-modal-active' value='CLOSE' />");
                }
            });
        }
    });

    $(document).on("click", ".deal-deactivate", function(){
        var did = $(this).attr("id");
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
                    "Authorization": "DS1k1Il68_uPPoD"
                },
                data: {
                    "dealID": did,
                    "venueID": window.venueID
                },
                success: function(json){
                    if(json.removed == 1){
                        window.vend = 1;
                        modalText.html("THIS DEAL HAS NOW ENDED<br /><br />Those with the public app will not be able to see this deal.<br /><br />" +
                            "<input type='button' class='close-modal-active' value='CLOSE' />");
                    } else {
                        modalText.html("SORRY, SOMETHING WENT WRONG!<br /><br />Please try again<br /><br />" +
                            "<input type='button' class='close-modal-active' value='CLOSE' />");
                    }
                },
                error: function (e){
                    modalText.html("SORRY, SOMETHING WENT WRONG!<br /><br />Please try again<br /><br />" +
                        "<input type='button' class='close-modal-active' value='CLOSE' />");
                }
            });
        }
    });
});

function getActiveView(){
    var venue = window.venueID;

    var actionView = $("#action-container");
    var activeView = "";
    activeView += "<div id='new-voucher' >";
    activeView += "<div class='new-voucher-title' style='background-image:url(" + window.venueHeader + ")' >" +
        "ACTIVE VOUCHERS<div class='close-action' >X</div></div>";
    activeView += "<div class='active-deals-vouchers' >";
    activeView += "</div>";
    actionView.html(activeView);

    var vdView = $(".active-deals-vouchers");

    $.ajax({
        url: "http://api.almanacmedia.co.uk/venues/vouchers?venueID=" + window.venueID,
        type: "GET",
        dataType: "JSON",
        headers: {
            "Authorization": "DS1k1Il68_uPPoD"
        },
        success: function(json) {
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
                    "Authorization": "DS1k1Il68_uPPoD"
                },
                success: function (djson) {
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
            });
        },
        error: function (){

        }
    });
}