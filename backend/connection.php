<?php

$host = "localhost";
$user = "root";
$pass = "root";
$dbname = "tetris_grupo_02";
$port = "3306";

try{
    $conn = new PDO("mysql:host=$host;port=$port;dbname=" . $dbname, $user, $pass);
    header('HTTP/1.1 200 Ok');
} catch(PDOException $erro){
    header('HTTP/1.1 500 Internal Server Error');
    echo "Erro: Conexão falhou. Erro especifico: ". $erro->getMessage();
}