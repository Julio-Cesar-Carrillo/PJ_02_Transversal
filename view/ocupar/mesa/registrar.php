<?php
if (isset($_POST)) {
    require("./conexion.php");
    $id_mesa = $_POST['id_mesa'];
    $ocupado = $_POST['ocupado'];
    $reservado = $_POST['reservado'];
    session_start();
    $user = $_SESSION['id'];
    if ($ocupado == "2" || $ocupado == 3) {
        echo "error";
    } else if ($ocupado == "1") {
        $ocupado = 0;
        $query = $pdo->prepare("UPDATE mesa SET ocupado=:ocup WHERE id_mesa = :id");
        $query->bindParam(":ocup", $ocupado);
        $query->bindParam(":id", $id_mesa);
        $query->execute();
        // -------------------------------------------------------------------------------------------------------------------
        $id_ocup = $_POST['id_ocup'];
        $fin = date("Y-m-d H:i:s");
        $Consulta = $pdo->prepare("UPDATE ocupacion SET ocupacion_fin=:fin WHERE id_ocup = :id");
        $Consulta->bindParam(":id", $id_ocup);
        $Consulta->bindParam(":fin", $fin);
        $Consulta->execute();
        $pdo = null;
        echo "desocupado";
    } else {
        $ocupado = 1;
        $query = $pdo->prepare("UPDATE mesa SET ocupado=:ocup WHERE id_mesa = :id");
        $query->bindParam(":ocup", $ocupado);
        $query->bindParam(":id", $id_mesa);
        $query->execute();
        // -------------------------------------------------------------------------------------------------------------------
        $ini = date("Y-m-d H:i:s");
        $Consulta = $pdo->prepare("INSERT INTO ocupacion (user, mesa,ocupacion_ini) VALUES (:user, :mesa,:ini)");
        $Consulta->bindParam(":user", $user);
        $Consulta->bindParam(":mesa", $id_mesa);
        $Consulta->bindParam(":ini", $ini);
        $Consulta->execute();
        $pdo = null;
        echo "ocupada";
    }
}
