<?php

    session_start();
    if(!isset($_SESSION["authd"]))
    {
        header("Location: /");
        exit;
    }

    $_POST = json_decode(file_get_contents("php://input"), true);

    $filename = "../../" . $_POST["name"];   

    if(file_exists($filename)) unlink($filename);    
    else                       header("HTTP/1.1 400 Bad Request"); 
    

?>