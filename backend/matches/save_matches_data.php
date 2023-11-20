<?php

include_once "../database/connection.php";

session_start();

if (isset($_SESSION['username']) && isset($_SESSION['password'])) {
    $username = $_SESSION['username'];
    $password = $_SESSION['password'];

    $conn = $GLOBALS["conn"];
    $data = filter_input_array(INPUT_POST, FILTER_DEFAULT);
    $query = "INSERT INTO matches (player_id, score, level, duration, type) VALUES ((SELECT id FROM player WHERE username = :username AND password = :password), :score, :level, :duration, :type)";

    try {
        $statement = $conn->prepare($query);
        $statement->bindValue(":username", $username);
        $statement->bindValue(":password", $password);
        $statement->bindValue(":score", $data['score']);
        $statement->bindValue(":level", $data['level']);
        $statement->bindValue(":duration", $data['duration']);
        $statement->bindValue(":type", $data['type']);

        if ($statement->execute()) {
            header('HTTP/1.1 204 No Content');
            exit();
        } else {
            throw new Exception("A execução da query falhou.");
        }
    } catch (Exception $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode("Erro: " . $e->getMessage());
    }
}
?>