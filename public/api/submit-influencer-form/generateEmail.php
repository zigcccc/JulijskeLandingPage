<?php
  function generateEmail($args) {
    $output = '<html><head><link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css" /></head><body>';
    $output .= '<div class="container" style="max-width: 600px;margin: 20px auto;display: block;padding: 20px;background: white;min-height: 600px;border-radius: 10px;box-shadow: 0 5px 10px rgba(0,0,0,.2);color: rgba(7, 30, 34, 1);font-family: sans-serif;font-size: 14px;">';
      $output .= '<h1 style="font-weight: bold;margin: 0;">JulianAlps<span style="color: rgba(38, 196, 133, 1);">.</span></h1>';
      $output .= '<h2 style="font-weight: 300;">Influencers form submitted</h2>';
      $output .= '<hr />';
      $output .= '<div class="content" style="padding: 10px;">';
        $output .= '<p><strong>Ime in priimek: </strong> '.$args['name'].'</p>';
        $output .= '<p><strong>Email: </strong><a href="mailto:';
          $output .= $args['email'];
        $output .='" style="color: rgba(38, 196, 133, 1);font-weight: bold;text-decoration: none;"> '.$args['email'].'</a></p>';
        $output .= '<p><strong>Telefonska številka: </strong><a href="tel:'.$args['phone'].'" style="color: rgba(38, 196, 133, 1);font-weight: bold;text-decoration: none;">'.$args['phone'].'</a></p>';
        $output .= '<hr style="max-width: 100px;display: block;margin: 20px auto 20px 0;" />';
        if ($args['facebook']) {
          $output .= '<p><strong>Facebook: </strong><a href="'.$args['facebook'].'" style="color: rgba(38, 196, 133, 1);font-weight: bold;text-decoration: none;">'.$args['facebook'].'</a></p>';
        }
        if ($args['instagram']) {
          $output .= '<p><strong>Instagram: </strong><a href="'.$args['instagram'].'" style="color: rgba(38, 196, 133, 1);font-weight: bold;text-decoration: none;">'.$args['instagram'].'</a></p>';
        }
        if ($args['youtube']) {
          $output .= '<p><strong>Youtube: </strong><a href="'.$args['youtube'].'" style="color: rgba(38, 196, 133, 1);font-weight: bold;text-decoration: none;">'.$args['youtube'].'</a></p>';
        }
        $output .= '<hr style="max-width: 100px;display: block;margin: 20px auto 20px 0;" />';
        $output .= '<strong>Predstavitev osebe:</strong>';
        $output .= '<p class="long" style="line-height: 1.618;">'.$args['description'].'</p>';
        $output .= '<br />';
        $output .= '<div class="reply-now" style="display: block;margin: 20px auto;text-align: center;">';
          $output .= '<a href="mailto:'.$args['email'].'" style="color: white;font-weight: bold;text-decoration: none;background: rgba(38, 196, 133, 1);padding: 10px 15px;text-align: center;border-radius: 200px;display: inline;box-shadow: 0 3px 6px rgba(0,0,0,.2);transition: 300ms ease-in-out all;">Kontaktiraj osebo</a>';
        $output .= '</div>';
      $output .= '</div>';
    $output .= '</div>';
    $output .= '</body></html>';
    return $output;
  }