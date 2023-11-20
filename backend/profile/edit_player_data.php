<?php

include_once "../database/connection.php";

session_start();

if (isset($_SESSION['username']) && isset($_SESSION['password'])) {
    $formData = filter_input_array(INPUT_POST, FILTER_DEFAULT);

    $query = "SELECT COUNT(*) FROM player WHERE username = :username";

    try {
        $statement = $conn->prepare($query);
        $statement->bindParam(':username', $_SESSION['username']);
        $statement->execute();

        if ($statement->fetchColumn() > 0) {
            $query = "UPDATE player SET name = :name, phone = :phone, email = :email, password = :newpassword WHERE username = :username AND password = :oldpassword";
            $statement = $conn->prepare($query);
            $statement->bindParam(':name', $formData['full-name-input']);
            $statement->bindParam(':phone', $formData['telephone-input']);
            $statement->bindParam(':email', $formData['email-input']);
            $statement->bindParam(':newpassword', $formData['password-input']);
            $statement->bindParam(':username', $_SESSION['username']);
            $statement->bindParam(':oldpassword', $_SESSION['password']);

            if ($statement->execute()) {
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
    } catch (Exception $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo "Erro: " . $e->getMessage();
        exit();
    }

    echo json_encode($return);
}