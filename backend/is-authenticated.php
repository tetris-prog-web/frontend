<?php
session_start();
if (!isset($_SESSION['username']) && !isset($_SESSION['password'])) {
    header('HTTP/1.1 401 Unauthorized');
    echo "You are not logged in";
    exit();
} else {
    echo "You are logged in";
    exit();
}
?>