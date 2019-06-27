<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$data = $_POST;
$name = $data['name'];
$number = $data['phone'];
$mail = $data['mail'];
$message = $data['message'];

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
$mail->CharSet = 'UTF-8';

    //Server settings
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'mit0787@mail.ru';                 // SMTP username
    $mail->Password = 'x0Rm_7oPEG1xl64';                           // SMTP password
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;                                    // TCP port to connect to
    //Recipients
    $mail->setFrom('mit0787@mail.ru', 'Дмитрий Гайдук');
    $mail->addAddress('mit0787@gmail.com', 'Дмитрий Гайдук');     // Add a recipient

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Вам поступило сообщение с сайта';
    $mail->Body    = 'Пользователь оставил свои данные <br>
                        Имя: ' . $name . ' <br>
                        Телефон: ' . $number . '<br>
                        Почта: ' . $mail . '<br>
                        Сообщение: ' .$message . '';

    $mail->send();