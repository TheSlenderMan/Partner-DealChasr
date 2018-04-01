$(document).ready(function(){
	
	getToken(2, null);
	if(!getCookie("ds_cookie")){
		$("#cookie-popup").show("fast");
	}
	
    $(document).on("focus", "#email", function(){
        var email = $(this);
        if(email.val() == "EMAIL"){
            email.css("color", "#111111");
            email.val("");
        }
    });
    $(document).on("blur", "#email", function(){
        var email = $(this);
        if(email.val() == ""){
            email.css("color", "#9d9d9d");
            email.val("EMAIL");
        }
    });
    $(document).on("focus", "#password", function(){
        var email = $(this);
        if(email.val() == "PASSWORD"){
            email.css("color", "#111111");
            email.val("");
        }
    });
    $(document).on("blur", "#password", function(){
        var email = $(this);
        if(email.val() == ""){
            email.css("color", "#9d9d9d");
            email.val("PASSWORD");
        }
    });

    $(document).on("click", "#login", function(){
		login();
    });
	
	$(document).on("click", ".dismiss-cookie", function(){
		removeCookieWarning();
	});
});

function removeCookieWarning(){
	createCookie("ds_cookie", "true", 100);
	$("#cookie-popup").hide();
}

function login(){
	if(!getCookie("DSAT")){
		var ts = getToken(2, login);
		return false;
	} else {
		var token = getCookie("DSAT");
		var refresh = getCookie("DSRT");
		var client = getCookie("DSCL");
	}
	$.ajax({
		url: "http://api.almanacmedia.co.uk/users/login",
		type: "POST",
		dataType: "JSON",
		headers: {
			"Authorization": "DS1k1Il68_uPPoD:" + client,
			"DSToken": token,
			"DSUid": "LOGIN",
			"DSUtoken": "TOKEN"
		},
		data: {
			"email": $("#email").val(),
			"password": $("#password").val(),
			"type": "venue"
		},
		success: function(json){
			if((json.code != undefined || json.code != 'undefined') && json.code == 8){
				refreshToken(refresh, 2, login);
			} else {
				if(json.loggedIn == 1){
					if(window.appShow == 1){
						var add = "&app_location=1";
					} else {
						var add = "";
					}
					createCookie("DSUID", json.userID, 7);
					createCookie("DSUTOKEN", json.token, 7);
					window.location.href = "http://my.dealchasr.co.uk/app/index.php?" + add;
				} else {
					console.log(json.message);
					$(".error-text").html(json.message);
				}
			}
			
		}, error: function(e){
			console.log(e);
		}
	});
}