<?php
if (isset($_POST)) {
    require("conexion.php");
    $cod = $_POST['cod'];
    session_start();
    $id_sala = $_SESSION['id'];
    $ocup = $_POST['ocup'];
    $num = $_POST['num'];

    if (empty($_POST['idp'])) {
        $query = $pdo->prepare("INSERT INTO mesa (codigo,sala,ocupado,num_sillas) VALUES (:cod,:sala,:ocup,:num)");
        $query->bindParam(":cod", $cod);
        $query->bindParam(":sala", $id_sala);
        $query->bindParam(":ocup", $ocup);
        $query->bindParam(":num", $num);
        $query->execute();
        $pdo = null;
        echo "ok";
    } else {
        $id = $_POST['idp'];
        $query = $pdo->prepare("UPDATE mesa SET codigo = :cod, sala = :sala, ocupado=:ocup, num_sillas=:num WHERE id_mesa = :id");
        $query->bindParam(":cod", $cod);
        $query->bindParam(":sala", $id_sala);
        $query->bindParam(":ocup", $ocup);
        $query->bindParam(":num", $num);
        $query->bindParam(":id", $id);
        $query->execute();
        $pdo = null;
        echo "modificado";
    }
}
