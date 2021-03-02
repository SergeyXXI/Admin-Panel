<?php

    session_start();
    if(!isset($_SESSION["authd"]))
    {
        header("Location: /");
        exit;
    }

    $_POST = json_decode(file_get_contents("php://input"), true);    

    $filename = "../../temp_sdjfhj734_dhghery7234.html"; 
    
    $_POST["html"] ?
    file_put_contents($filename, $_POST["html"]) :
    header("HTTP/1.1 400 Bad Request");    

?>