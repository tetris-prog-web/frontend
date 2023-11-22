<?php

include_once "../database/connection.php";

function get_username_ranking()
{
    $conn = $GLOBALS["conn"];
    $query = "SELECT p.username, MAX(m.score) AS max_score, MAX(m.level) AS max_level
              FROM player p
              INNER JOIN matches m ON p.id = m.player_id
              WHERE m.type = :type
              GROUP BY p.username
              ORDER BY max_score DESC, max_level DESC
              LIMIT 10";

    try {
        $statement = $conn->prepare($query);
        $statement->bindValue(":type", $_GET['type']);

        if ($statement->execute()) {
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } else {
            throw new Exception("A execução da query falhou.");
        }
    } catch (Exception $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo "Erro: " . $e->getMessage();
        exit();
    }
}

function get_user_position($username)
{
    $conn = $GLOBALS["conn"];
    $query = "SELECT position, username, max_score, max_level FROM (
                SELECT *,
                (SELECT COUNT(*) + 1
                    FROM (
                        SELECT p.username, MAX(m.score) AS max_score, MAX(m.level) AS max_level
                        FROM player p
                        INNER JOIN matches m ON p.id = m.player_id
                        WHERE m.type = :type
                        GROUP BY p.username
                        ORDER BY max_score DESC, max_level DESC
                    ) AS sub
                    WHERE sub.max_score > ranking.max_score) AS position
                FROM (
                    SELECT p.username, MAX(m.score) AS max_score, MAX(m.level) AS max_level
                    FROM player p
                    INNER JOIN matches m ON p.id = m.player_id
                    WHERE m.type = :type
                    GROUP BY p.username
                    ORDER BY max_score DESC
                ) AS ranking
              ) AS user_ranking
              WHERE username = :username";

    try {
        $statement = $conn->prepare($query);
        $statement->bindParam(':username', $username);
        $statement->bindValue(':type', $_GET['type']);
        if ($statement->execute()) {
            return $statement->fetch(PDO::FETCH_ASSOC);
        } else {
            throw new Exception("A execução da query falhou.");
        }
    } catch (PDOException $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo "Erro: " . $e->getMessage();
        exit();
    }
}

session_start();
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $username_ranking = get_username_ranking();
    $user_data = get_user_position($username);

    $data = [
        'username_ranking' => $username_ranking ? $username_ranking : [],
        'user_data' => $user_data
    ];

    header('HTTP/1.1 200 Ok');
    echo json_encode(['error' => false, 'data' => $data]);
} else {
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode(['error' => true, 'message' => 'Usuário não autenticado']);
}
?>