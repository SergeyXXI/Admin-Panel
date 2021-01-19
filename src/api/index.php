<?php

    session_start();
    if(!isset($_SESSION["authd"]))
    {
        header("Location: /");
        exit;
    }
    
    $htmlfiles = glob("../../*.html");
    $response = [];

    foreach($htmlfiles as $file)
    {
        array_push($response, basename($file));
    }
    
    print json_encode($response);

?>