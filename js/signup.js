$(document).ready(function(){
	$(document).on("click", "#form-submit", function(e){
		e.preventDefault();
		if(validateForm() == true){
			var recaptcha = $("#g-recaptcha-response").val();
			if (recaptcha === "") {
			   $("#captchaError").html("PLEASE TICK THE CAPTCHA BOX ABOVE");
			} else {
				$("#venueSignupForm").submit();
			}
		}
	});
});

function validateForm(){
	var input = $(".text-box")
	input.css('border', '2px solid #F9A603');
	
	var fullName = $("#fullName");
	var email = $("#email");
	var password = $("#password");
	var password2 = $("#password2");
	
	var venueName = $("#vName");
	var venueEmail = $("#vEmail");
	var venueWebsite = $("#vWebsite");
	var venueContact = $("#vContact");
	
	var venueAOne = $("#vAddressOne");
	var venueCity = $("#vCityTown");
	var venueCounty = $("#vCounty");
	var venueCountry = $("#vCountry");
	var venuePostCode = $("#vPostCode");
	
	if(fullName.val() == ""){
		showError(fullName);
		return false;
	}
	if(email.val() == ""){
		showError(email);
		return false;
	}
	if(!validateEmail(email.val())){
		$("#emailError").html("PLEASE ENTER A VALID EMAIL ADDRESS");
		showError(email);
		return false;
	}
	if(password.val() == ""){
		showError(password);
		return false;
	}
	if(password.val() != password2.val()){
		$("#passwordError").html("PASSWORDS DO NOT MATCH");
		showError(password2);
		return false;
	}
	if(venueName.val() == ""){
		showError(venueName);
		return false;
	}
	if(venueEmail.val() == ""){
		showError(venueEmail);
		return false;
	}
	if(!validateEmail(venueEmail.val())){
		$("#vEmailError").html("PLEASE ENTER A VALID EMAIL ADDRESS");
		showError(venueEmail);
		return false;
	}
	if(venueWebsite.val() == ""){
		showError(venueWebsite);
		return false;
	}
	if(venueContact.val() == ""){
		showError(venueContact);
		return false;
	}
	if(venueAOne.val() == ""){
		showError(venueAOne);
		return false;
	}
	if(venueCity.val() == ""){
		showError(venueCity);
		return false;
	}
	if(venueCounty.val() == ""){
		showError(venueCounty);
		return false;
	}
	if(venueCountry.val() == ""){
		showError(venueCountry);
		return false;
	}
	if(venuePostCode.val() == ""){
		showError(venuePostCode);
		return false;
	}
	return true;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(d){
	d.css('border', '2px solid red');
	$('html, body').animate({
        scrollTop: d.offset().top - 20 
    }, 'slow');
}