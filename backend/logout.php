<?php
session_start();
session_destroy();
header("location:../frontend/index.html");
exit();
?>