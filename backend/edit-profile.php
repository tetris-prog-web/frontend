<?php
include_once "connection.php";

session_start();

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT); //TODO clean with htmlspecialchars
//TODO validate if isset username and password in the session
$query_exists_user_by_username = "SELECT count(*) FROM player WHERE username = :username";
$prepared_statement = $conn->prepare($query_exists_user_by_username);
$prepared_statement->bindParam(':username', $_SESSION['username']);
$prepared_statement->execute();

if ($prepared_statement->fetchColumn() > 0) {
    $query_player = "UPDATE player SET name = :name, phone = :phone, email = :email, password = :newpassword WHERE username = :username AND password = :oldpassword";
    $reg_player = $conn->prepare($query_player);
    $reg_player->bindParam(':name', $dados['full-name-input']);
    $reg_player->bindParam(':phone', $dados['telephone-input']);
    $reg_player->bindParam(':email', $dados['email-input']);
    $reg_player->bindParam(':newpassword', $dados['password-input']);
    $reg_player->bindParam(':username', $_SESSION['username']);
    $reg_player->bindParam(':oldpassword', $_SESSION['password']);

    $execution_result = $reg_player->execute();

    if ($execution_result) {
        header('HTTP/1.1 204 No Content');
        $return = ['error' => false, 'msg' => "Jogador atualizado com sucesso"];
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        $return = ["error" => true, 'msg' => "Jogador não atualizado"];
    }
} else {
    header('HTTP/1.1 404 Not Found');
    $return = ['error' => true, 'msg' => "Jogador não encontrado"];
}

echo json_encode($return);