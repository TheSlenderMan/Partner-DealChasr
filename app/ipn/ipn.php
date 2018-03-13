<?php 
require('PaypalIPN.php');
include '../../../api.almanacmedia.co.uk/classes/email/email.php';
include "../../../api.almanacmedia.co.uk/classes/content/content.php";
include "../../../api.almanacmedia.co.uk/classes/settings/settings.php";

$content = new content();

$conn = new PDO('mysql:dbname=' . DS_DATABASE_NAME . ';host=' . DS_DATABASE_HOST, DS_DATABASE_USERNAME, DS_DATABASE_PASSWORD);

$ipn = new PaypalIPN();
// Use the sandbox endpoint during testing.
$ipn->useSandbox();
$verified = $ipn->verifyIPN();

if ($verified) {
	$item_number = $_POST['item_number'];
	$item_array = explode("-", $item_number);
	$invoice_number = $item_array[1];
	$payer_email = $_POST['payer_email'];
	$payer_id = $_POST['payer_id'];
	$gross_paid = $_POST['mc_gross'];
	$payment_date = $_POST['payment_date'];
	$status = 0;
	
	//Get the current invoice
	$getInvoice = $conn->prepare("SELECT * FROM ds_invoices WHERE id = :iid");
	$getInvoice->bindParam(":iid", $invoice_number);
	$getInvoice->execute();
	$invoice = $getInvoice->fetch();
	
	$getVenue = $conn->prepare("SELECT active, suspension FROM ds_venues WHERE id = :vid");
	$getVenue->bindParam(":vid", $invoice['venueID']);
	$getVenue->execute();
	$venue = $getVenue->fetch();
	
	//Get any payments on the invoice
	$getPayment = $conn->prepare("SELECT * FROM ds_payments WHERE invoiceID = :iid");
	$getPayment->bindParam(":iid", $invoice_number);
	$getPayment->execute();
	$payment = $getPayment->fetchAll();
	
	$total = ($invoice['amount'] + $invoice['subscription']);
	
	if($total == $gross_paid){
		$pay = $conn->prepare("UPDATE ds_invoices SET invoicePaid = 1 WHERE id = :iid");
		$pay->bindParam(":iid", $invoice_number);
		$pay->execute();
		if($venue['active'] == 0 && $venue['suspension'] == "OVERDUE"){
			$re = $conn->prepare("UPDATE ds_venues SET active = 1 AND suspension = '' AND id = :vid");
			$re->bindParam(":vid", $invoice['venueID']);
			$re->execute();
		}
		$status = 1;
	} else {
		$status = -1;
	}
	
	if(count($payment) == 0){
		$addPay = $conn->prepare("INSERT INTO ds_payments (invoiceID, payerEmail, payerID, grossPaid, paymentDate) VALUES 
								(:iid, :pye, :pyid, :gpd, :pyd)");
		$addPay->bindParam(":iid", $invoice_number);
		$addPay->bindParam(":pye", $payer_email);
		$addPay->bindParam(":pyid", $payer_id);
		$addPay->bindParam(":gpd", $gross_paid);
		$addPay->bindParam(":pyd", $payment_date);
		$addPay->execute();
	} else {
		$pTotal = 0;
		foreach($payment AS $p => $pv){
			$pTotal = ($pTotal + $pv['grossPaid']);
		}
		$totalPaid = ($gross_paid + $pTotal);
		if($totalPaid == $total){
			$addPay = $conn->prepare("UPDATE ds_invoices SET invoicePaid = 1 WHERE id = :iid");
			$addPay->bindParam(":iid", $invoice_number);
			$addPay->execute();
			
			$addPay = $conn->prepare("INSERT INTO ds_payments (invoiceID, payerEmail, payerID, grossPaid, paymentDate) VALUES 
								(:iid, :pye, :pyid, :gpd, :pyd)");
			$addPay->bindParam(":iid", $invoice_number);
			$addPay->bindParam(":pye", $payer_email);
			$addPay->bindParam(":pyid", $payer_id);
			$addPay->bindParam(":gpd", $gross_paid);
			$addPay->bindParam(":pyd", $payment_date);
			$addPay->execute();
			
			if($venue['active'] == 0 && $venue['suspension'] == "OVERDUE"){
				$re = $conn->prepare("UPDATE ds_venues SET active = 1 AND suspension = '' AND id = :vid");
				$re->bindParam(":vid", $invoice['venueID']);
				$re->execute();
			}
			
			$status = 1;
		} else {
			$addPay = $conn->prepare("INSERT INTO ds_payments (invoiceID, payerEmail, payerID, grossPaid, paymentDate) VALUES 
								(:iid, :pye, :pyid, :gpd, :pyd)");
			$addPay->bindParam(":iid", $invoice_number);
			$addPay->bindParam(":pye", $payer_email);
			$addPay->bindParam(":pyid", $payer_id);
			$addPay->bindParam(":gpd", $gross_paid);
			$addPay->bindParam(":pyd", $payment_date);
			$addPay->execute();
			
			$status = -1;
		}
	}
	
	if($status == 1){
		$cont = $content->getContent("PAYMENTCLEARED", array("amount" => $gross_paid));
	} else {
		$cont = $content->getContent("PARTPAYMENT", array("amount" => $gross_paid));
	}
	
    $email = new email($payer_email);
	$email->setSubject("Payment Received - Invoice " . $item_number);
	$email->setBody($cont);
	$email->executeMail();
}
// Reply with an empty 200 response to indicate to paypal the IPN was received correctly.
header("HTTP/1.1 200 OK");