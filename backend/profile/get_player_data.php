<?php

include_once "../database/connection.php";

function get_user($username, $password)
{
    $conn = $GLOBALS["conn"];
    $query = "SELECT name, birth_date, cpf, phone, email, username, password FROM player WHERE username = :username AND password = :password";

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
if(isset($_SESSION['username']) && isset($_SESSION['password'])){
    $username = $_SESSION['username'];
    $password = $_SESSION['password'];

    $user = get_user($username, $password);
    if($user){
        header('HTTP/1.1 200 Ok');
        $return = ['error' => false, 'user' => $user];
        echo json_encode($return);
        exit();
    }else{
        header('HTTP/1.1 404 Not Found');
        $return = ['error' => true, 'msg' => "Usuário não encontrado!"];
        echo json_encode($return);
        exit();
    }
}
?>