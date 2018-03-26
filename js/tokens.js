$(document).ready(function(){
	
});

function refreshToken(r, c, callback){
	$.ajax({
		url: "http://api.almanacmedia.co.uk/tokens/refresh",
		type: "POST",
		dataType: "JSON",
		headers: {
			"Authorization": "DS1k1Il68_uPPoD",
			"DSToken": "REFRESH",
			"DSRefresh": true,
			"DSUid": "LOGIN",
			"DSUtoken": "TOKEN"
		},
		data: {
			"refreshToken": r,
			"client": c
		},
		success: function(json){
			if(json.token != undefined || json.token != 'undefined'){
				var token = json.token;
				var expires = json.expires;
				var refresh = json.refresh;
				createCookie("DSAT", token, 1);
				createCookie("DSTE", Date.parse(expires), 1);
				createCookie("DSRT", refresh, 1);
				if(callback != null){
					callback();
				}
				return [token, refresh, c];
			} else {
				console.log(json.message);
			}
		}, error: function(e){
			console.log(e);
		}
	});
}

function getToken(c, callback){
	if(!getCookie("DSAT")){
		$.ajax({
			url: "http://api.almanacmedia.co.uk/tokens/api?client=" + c,
			type: "GET",
			dataType: "JSON",
			headers: {
				"Authorization": "DS1k1Il68_uPPoD",
				"DSToken": "GAIN",
				"DSUid": "LOGIN",
				"DSUtoken": "TOKEN"
			},
			success: function(json){
				if(json.token != undefined || json.token != 'undefined'){
					var token = json.token;
					var expires = json.expires;
					var refresh = json.refresh;
					var client = json.client;
					createCookie("DSAT", token, 1);
					createCookie("DSTE", Date.parse(expires), 1);
					createCookie("DSRT", refresh, 1);
					createCookie("DSCL", client, 1);
					if(callback != null){
						callback();
					}
				} else {
					console.log(json.message);
				}
			}, error: function(e){
				console.log(e);
			}
		});
	}
}

var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return false;
}