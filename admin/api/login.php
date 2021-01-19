<?php

    session_start();

    if(isset($_SESSION["authd"])) print "true"; 
    else
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if(isset($_POST["password"]))
        {
            $password = json_decode(file_get_contents("settings.json")) -> password; 
        
            if($_POST["password"] === $password)
            {
                $_SESSION["authd"] = true;
                print "true";
            }
            else print "Incorrect password";
        }
        else print "false";
        
    }
?>