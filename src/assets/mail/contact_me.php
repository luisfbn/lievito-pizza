<?php
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }

$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));

// Create the email and send the message
$to = 'hola@pizzalievito.com'; // hola@pizzalievito.com luisfbn@gmail.com
$email_subject = "De pizzalievito.com:  $name";
$email_body = "Nuevo mensaje del formulario de pizzalievito.com:\n\n"."Datalles:\n\nNombre: $name\n\nEmail: $email_address\n\nTel: $phone\n\nMensaje:\n$message";
$headers = "From: noreply@pizzalievito.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
return true;

?>


