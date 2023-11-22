<?php

include_once "../database/connection.php";

session_start();

function get_matches($username, $password)
{
    $conn = $GLOBALS["conn"];
    $query = "  SELECT m.score, m.level, m.duration
                FROM matches m
                LEFT JOIN player p ON m.player_id = p.id
                WHERE p.username = :username
                AND p.password = :password
                AND m.type = :type
                ORDER BY m.score DESC, m.level DESC, m.duration ASC
            ";

    try {
        $statement = $conn->prepare($query);
        $statement->bindValue(":username", $username);
        $statement->bindValue(":password", $password);
        $statement->bindValue(":type", $_GET['type']);

        if ($statement->execute()) {
            return $statement->rowCount() > 0 ? $statement->fetchAll(PDO::FETCH_ASSOC) : false;
        } else {
            throw new Exception("A execução da query falhou.");
        }
    } catch (Exception $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo "Erro: " . $e->getMessage();
        exit();
    }
}

if (isset($_SESSION['username']) && isset($_SESSION['password'])) {
    $username = $_SESSION['username'];
    $password = $_SESSION['password'];
    $matches = get_matches($username, $password);

    $data = [
        'username' => $username,
        'matches' => $matches ? $matches : []
    ];

    header('HTTP/1.1 200 Ok');
    $return = ['error' => false, 'data' => $data];
    echo json_encode($return);
}
?>