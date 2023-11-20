<?php

include_once "../database/connection.php";

session_start();

function user_exists($username, $password)
{
    $conn = $GLOBALS["conn"];
    $query = "SELECT COUNT(*) FROM player WHERE username = :username AND password = :password";

    try {
        $statement = $conn->prepare($query);
        $statement->bindValue(":username", $username);
        $statement->bindValue(":password", $password);

        if ($statement->execute()) {
            return $statement->fetchColumn() > 0;
        } else {
            throw new Exception("A execução da query falhou.");
        }
    } catch (Exception $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo "Erro: " . $e->getMessage();
        exit();
    }
}

if (!isset($_SESSION['username']) && !isset($_SESSION['password'])) {
    $formData = filter_input_array(INPUT_POST, FILTER_DEFAULT);

    if (isset($formData['username']) && isset($formData['password'])) {
        $username = $formData['username'];
        $password = $formData['password'];

        if (user_exists($username, $password)) {
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
}
?>