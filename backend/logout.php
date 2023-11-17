<?php
session_start();
session_destroy();
header("location:../frontend/index.html");
header('HTTP/1.1 200 Ok');
exit();
?>