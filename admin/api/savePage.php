<?php

    session_start();
    if(!isset($_SESSION["authd"]))
    {
        header("Location: /");
        exit;
    }

    $_POST = json_decode(file_get_contents("php://input"), true);    

    $filename = $_POST["page"]; 

    if (!is_dir("../backups")) mkdir("../backups");
    
    !is_file("../backups/backup.json") ?
    $backups = []                      :
    $backups = json_decode(file_get_contents("../backups/backup.json"));     
    
    if($_POST["html"])
    {
        $backup_file = uniqid() . ".html";
        copy("../../" . $filename, "../backups/" . $backup_file);

        array_push($backups, ["page" => $filename, "file" => $backup_file, "date" => date("H:i:s d:m:Y")]);
        file_put_contents("../backups/backup.json", json_encode($backups));

        file_put_contents("../../" . $filename, $_POST["html"]);
    }
    else header("HTTP/1.1 400 Bad Request");    

?>