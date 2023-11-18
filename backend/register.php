<?php
include_once "connection.php";

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

$query_player = "INSERT INTO player (name, birth_date, cpf, phone, email, username, password) VALUES (:name, :birth_date, :cpf, :phone, :email, :username, :password) ";
$reg_player = $conn->prepare($query_player);
$reg_player->bindParam(':name', $dados['full-name-input']);
$reg_player->bindParam(':birth_date', $dados['birthdate-input']);
$reg_player->bindParam(':cpf', $dados['cpf-input']);
$reg_player->bindParam(':phone', $dados['telephone-input']);
$reg_player->bindParam(':email', $dados['email-input']);
$reg_player->bindParam(':username', $dados['username-input']);
$reg_player->bindParam(':password', $dados['password-input']);

$reg_player->execute();

if($reg_player->rowCount()){
    $return = ['error' => false, 'msg' => "Jogador cadastrado"];
}else{
    $return = ["error" => true,'msg' => "Jogador não cadastrado"];
}

echo json_encode($return);