<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$data = $_POST;
$name = $data['name'];
$number = $data['phone'];
$email = $data['mail'];
$message = $data['message'];

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
$mail->CharSet = 'UTF-8';

    //Server settings
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'mail.haiduk-art.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'contacts@haiduk-art.ru';                 // SMTP username
    $mail->Password = 'gerda0787';                           // SMTP password
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;                                    // TCP port to connect to
    $mail->SMTPOptions = array(
        'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
        )
        );
    //Recipients
    $mail->setFrom('contacts@haiduk-art.ru', 'Дмитрий Гайдук');
    $mail->addAddress('mit0787@gmail.com', 'Дмитрий Гайдук');     // Add a recipient

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Вам поступило сообщение';
    $mail->Body    = '
    Пользователь оставил свои данные <br>
    Имя: ' . $name . ' <br>
    Телефон: ' . $number . '<br>
    Почта: ' . $email . '<br>
    Сообщение: ' . $message . '';

    $mail->send();
