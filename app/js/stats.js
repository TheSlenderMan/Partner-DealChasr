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

            statsView += "</div>";

            activeView.html(statsView);

			if(json.chartData.length == 0){
				$("#stats-chart").html("<br /><br />NO MONTHLY STATS AVAILABLE");
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