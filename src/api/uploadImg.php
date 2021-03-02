<?php

    session_start();
    if(!isset($_SESSION["authd"]))
    {
        header("Location: /");
        exit;
    }

    if(preg_match("/image\/.*/", $_FILES["image"]["type"]))
    {
        $file_type = $_FILES["image"]["type"];
        $ext = substr($file_type, strpos($file_type, "/") + 1);
        $filename = uniqid() . "." . $ext;

        if(!is_dir("../../img")) mkdir("../../img");
    
        move_uploaded_file($_FILES["image"]["tmp_name"], "../../img/$filename");
        print $filename;
    } 
    else header("HTTP/1.1 400 Bad Request");

?>