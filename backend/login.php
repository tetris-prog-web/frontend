<?php
include_once "connection.php";

function get_user($username, $password)
{
    $conn = $GLOBALS["conn"];
    $query = "SELECT * FROM player WHERE username = :username AND password = :password";
    
    try {
        $statement = $conn->prepare($query);
        $statement->bindValue(":username", $username);
        $statement->bindValue(":password", $password);
    
        if ($statement->execute()) {
            return $statement->rowCount() > 0 ? $statement->fetch(PDO::FETCH_ASSOC) : false;
        } else {
            throw new Exception("A execução da query falhou.");
        }
    } catch (Exception $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo "Erro: " . $e->getMessage();
        exit();
    }
}

session_start();
if (!isset($_SESSION['username']) && !isset($_SESSION['password'])) {
    if (isset($_POST["username"]) && isset($_POST["password"])) {
        $username = htmlspecialchars($_POST["username"]);
        $password = htmlspecialchars($_POST["password"]);

        if (get_user($username, $password)) {
            $_SESSION['username'] = $username;
            $_SESSION['password'] = $password;
            header('HTTP/1.1 200 Ok');
            echo "Logged in";
            exit();
        } else {
            header('HTTP/1.1 401 Unauthorized');
            echo "Invalid username or password";
            exit();
        }
    } else {
        echo "No username or password provided";
    }
} //TODO add an else case, this means that the user is already logged in
?>