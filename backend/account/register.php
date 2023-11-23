<?php

include_once "../database/connection.php";

$formData = filter_input_array(INPUT_POST, FILTER_DEFAULT);

$query = "SELECT count(*) FROM player WHERE username = :username";

try {
    $statement = $conn->prepare($query);
    $statement->bindParam(':username', $formData['username-input']);
    $statement->execute();

    if ($statement->fetchColumn() > 0) {
        header('HTTP/1.1 409 Conflict');
        $return = ['error' => true, 'msg' => "Username já cadastrado!"];
        echo json_encode($return);
    } else {
        $query = "INSERT INTO player (name, birth_date, cpf, phone, email, username, password) VALUES (:name, :birth_date, :cpf, :phone, :email, :username, :password) ";
        $statement = $conn->prepare($query);
        $statement->bindParam(':name', $formData['full-name-input']);
        $statement->bindParam(':birth_date', $formData['birthdate-input']);
        $statement->bindParam(':cpf', $formData['cpf-input']);
        $statement->bindParam(':phone', $formData['telephone-input']);
        $statement->bindParam(':email', $formData['email-input']);
        $statement->bindParam(':username', $formData['username-input']);
        $statement->bindParam(':password', $formData['password-input']);

        if ($statement->execute()) {
            header('HTTP/1.1 201 Created');
            $return = ['error' => false, 'msg' => "Usuário cadastrado com sucesso!"];
            echo json_encode($return);
        }
    }
} catch (PDOException $e) {
    header('HTTP/1.1 500 Internal Server Error');
    $return = ["error" => true, 'msg' => "Erro ao cadastrar usuário!"];
    echo json_encode($return);
}