<?php
session_start();
if (!isset($_SESSION['username']) && !isset($_SESSION['password'])) {
    header('HTTP/1.1 401 Unauthorized');
    $return = ['error' => true, 'msg' => "Jogador não autenticado"];
    echo json_encode($return);
    exit();
} else {
    header('HTTP/1.1 200 Ok');
    $return = ['error' => false, 'msg' => "Jogador autenticado"];
    echo json_encode($return);
    exit();
}
?>