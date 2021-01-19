<?php
    session_start();
    unset($_SESSION["authd"]);
    session_destroy();

?>