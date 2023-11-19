<?php
include_once "connection.php";

function get_user($username, $password)
{
    $conn = $GLOBALS["conn"];
    $query = "SELECT * FROM player WHERE username = :username AND password = :password"; //TODO don't retrieve the id and password from the database

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
    $dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);
    if (isset($dados['username']) && isset($dados['password'])) {
        $username = htmlspecialchars($dados['username']);
        $password = htmlspecialchars($dados['password']);

        if (get_user($username, $password)) {
            $_SESSION['username'] = $username;
            $_SESSION['password'] = $password;
            header('HTTP/1.1 200 Ok');
            $return = ['error' => false, 'msg' => "Login efetuado com sucesso"];
            echo json_encode($return);
            exit();
        } else {
            header('HTTP/1.1 401 Unauthorized');
            $return = ['error' => true, 'msg' => "Usuário ou senha incorretos"];
            echo json_encode($return);
            exit();
        }
    } else {
        header('HTTP/1.1 401 Unauthorized');
        $return = ['error' => true, 'msg' => "Usuário ou senha não informados"];
        echo json_encode($return);
        exit();
    }
} //TODO add an else case, this means that the user is already logged in
?>