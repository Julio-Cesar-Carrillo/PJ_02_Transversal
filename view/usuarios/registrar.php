<?php
if (isset($_POST)) {
    require("conexion.php");
    $user = $_POST['username'];
    $pwd = $_POST['pwd'];
    $nom = $_POST['nom'];
    $cargo = $_POST['cargo'];

    if (empty($_POST['idp'])) {
        $consulta = $pdo->prepare("SELECT * FROM user WHERE username = :user");
        $consulta->bindParam(":user", $user);
        $consulta->execute();
        $row = $consulta->fetch(PDO::FETCH_ASSOC);

        if (!$row || $row['username'] != $user) {
            $opciones = [
                'cost' => 10,
            ];
            $pwdencrip = password_hash($pwd, PASSWORD_BCRYPT, $opciones);

            $query = $pdo->prepare("INSERT INTO user (username, password, nom, cargo) VALUES (:user, :pwd, :nom, :cargo)");
            $query->bindParam(":user", $user);
            $query->bindParam(":pwd", $pwdencrip);
            $query->bindParam(":nom", $nom);
            $query->bindParam(":cargo", $cargo);
            $query->execute();

            echo "ok";
        } else {
            echo "error";
        }

        $pdo = null;
    } else {
        $id = $_POST['idp'];
        $consulta = $pdo->prepare("SELECT * FROM user WHERE id_user = :id");
        $consulta->bindParam(":id", $id);
        $consulta->execute();
        $row = $consulta->fetch(PDO::FETCH_ASSOC);
        if ($row && password_verify($pwd, $row['password'])) {
            $query = $pdo->prepare("UPDATE user SET username = :user, password = :pwd, cargo=:cargo WHERE id_user = :id");
            $query->bindParam(":user", $user);
            $query->bindParam(":pwd", $pwd);
            $query->bindParam(":cargo", $cargo);
            $query->bindParam(":id", $id);
            $query->execute();
            $pdo = null;
            echo "modificado";
        } else {
            $opciones = [
                'cost' => 10,
            ];
            $pwdencrip = password_hash($pwd, PASSWORD_BCRYPT, $opciones);

            $query = $pdo->prepare("UPDATE user SET username = :user, password = :pwd, cargo=:cargo WHERE id_user = :id");
            $query->bindParam(":user", $user);
            $query->bindParam(":pwd", $pwdencrip);
            $query->bindParam(":cargo", $cargo);
            $query->bindParam(":id", $id);
            $query->execute();
            $pdo = null;
            echo "modificado";
        }
    }
}
