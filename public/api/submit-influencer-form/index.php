<?php
  require('vendor/autoload.php');
  require_once('./config.php');
  require_once('./generateEmail.php');

  $allowed_origins = array(
    'http://localhost:8080',
    'http://localhost:8080/',
    'http://206.189.57.136',
    'http://206.189.57.136/',
    'http://julian-alps.com/',
    'http://julian-alps.com',
    'http://www.julian-alps.com/',
    'http://www.julian-alps.com',
    'https://www.julian-alps.com/',
    'https://www.julian-alps.com',
    'https://julian-alps.com/',
    'https://julian-alps.com'
  );

  // Handle origin authentication
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    $http_origin = $_SERVER['HTTP_ORIGIN'];
    if(in_array($http_origin, $allowed_origins)) {
      header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    } else {
      http_response_code(403);
      echo "You're not allowed to access this page... HTTP Origin: " . $http_origin;
      die();
    }
  } else {
    http_response_code(403);
    echo "You're not allowed to access this page... Http origin not set...";
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
    $message = array(
      'msg' => array(
        'en' => 'The form was submitted successfully.',
        'sl' => 'Obrazec je bil uspešno izpolnjen in poslan.'
      )
    );
    echo json_encode($message);
  } catch (Exception $e) {
    echo 'Caught exception: ', $e -> getMessage(), "\n";
  }