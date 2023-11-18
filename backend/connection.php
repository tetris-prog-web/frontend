<?php

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "tetris";
$port = "4306";

try{
    $conn = new PDO("mysql:host=$host;port=$port;dbname=" . $dbname, $user, $pass);

    echo "Conexão feita!";
} catch(PDOException $erro){
    echo "Erro: Conexão falhou. Erro especifico: ". $erro->getMessage();
}