<?php

function get_user($username, $password)
{
    // $db = new PDO("mysql:host=localhost;dbname=restaurant", "root", "");
    // $query = "SELECT * FROM users WHERE username = :username AND password = :password";
    // $statement = $db->prepare($query);
    // $statement->bindValue(":username", $username);
    // $statement->bindValue(":password", $password);
    // $statement->execute();
    // $user = $statement->fetch();
    // $statement->closeCursor();
    // return $user;
    if ($username == "admin" && $password == "admin") {
        return true;
    }
}

session_start();
if (!isset($_SESSION['username']) && !isset($_SESSION['password'])) {
    if (isset($_POST["username"]) && isset($_POST["password"])) {
        $username = htmlspecialchars($_POST["username"]);
        $password = htmlspecialchars($_POST["password"]);
        //TODO call database and search if user exists
        if (get_user($username, $password)) {
            $_SESSION['username'] = $username;
            $_SESSION['password'] = $password;
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