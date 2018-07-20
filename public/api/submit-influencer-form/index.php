<?php
  require('vendor/autoload.php');
  require_once('./config.php');
  require_once('./generateEmail.php');

  // Handle origin authentication
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    $http_origin = $_SERVER['HTTP_ORIGIN'];
    if($http_origin == 'http://localhost:8080' || $http_origin == 'http://206.189.57.136/') {
      header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    } else {
      http_response_code(403);
      echo "You're not allowed to access this page...";
      die();
    }
  } else {
    http_response_code(403);
    echo "You're not allowed to access this page...";
    die();
  }

  // Check if requested method === POST
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Wrong Request Method...';
    die();
  }

  $name = strip_tags(trim($_POST['full_name']));
  $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
  $phone = strip_tags($_POST['phone_num']);
  $facebook = filter_var($_POST['facebook'], FILTER_SANITIZE_URL);
  $instagram = filter_var($_POST['instagram'], FILTER_SANITIZE_URL);
  $youtube = filter_var($_POST['youtube'], FILTER_SANITIZE_URL);
  $description = strip_tags($_POST['description']);

  function at_least_one($one, $two, $three) {
    if (!empty($one) OR !empty($two) OR !empty($three)) {
      return true;
    } else {
      return false;
    }
  }

  if (empty($name) OR empty($email) OR empty($phone) OR empty($description) OR !at_least_one($facebook, $instagram, $youtube)) {
    http_response_code(400);
    die();
  }

  $data = array(
    "name" => $name,
    "email" => $email,
    "phone" => $phone,
    "facebook" => $facebook,
    "instagram" => $instagram,
    "youtube" => $youtube,
    "description" => $description
  );

  $emailContent = generateEmail($data);
  echo $emailContent;

  $email = new \SendGrid\Mail\Mail();
  $email->setFrom("web@test.com", "Webmaster Julian Alps");
  $email->setSubject("Influencer form submission");
  $email->addTo("zkrasovec@gmail.com", "Ziga Krasovec");
  $email->addTo("info@forward.si", "Info Forward");
  $email->addContent(
    "text/html", $emailContent
  );

  $key = sendgrid_conf();
  $sendgrid = new \SendGrid($key);

  

  try {
    $response = $sendgrid->send($email);
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
  } catch (Exception $e) {
    echo 'Caught exception: ', $e -> getMessage(), "\n";
  }