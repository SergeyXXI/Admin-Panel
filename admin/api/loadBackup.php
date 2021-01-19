<?php

    session_start();
    if(!isset($_SESSION["authd"]))
    {
        header("Location: /");
        exit;
    }

    $_POST = json_decode(file_get_contents("php://input"), true);

    $filename = $_POST["filename"];
    $page = $_POST["page"]; 
    
    file_exists("../backups/" . $filename)            ? 

    copy("../backups/" . $filename, "../../" . $page) :

    header("HTTP/1.1 500 File is not exist");    

?>