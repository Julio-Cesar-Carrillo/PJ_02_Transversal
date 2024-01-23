<?php
require("./conexion.php");

$id = $_POST['id_mesa'];
$ocupado = $_POST['ocupado'];

try {
    if ($ocupado == 1 || $ocupado == 3) {
        echo "error";
    } elseif ($ocupado == 2) {
        $ocupado = 0;
        $query = $pdo->prepare("UPDATE mesa SET ocupado=:ocupado WHERE id_mesa = :id");
        $query->bindParam(":ocupado", $ocupado);
        $query->bindParam(":id", $id);
        $query->execute();
        echo "oky";
    } else {
        $ocupado = 2;
        $query = $pdo->prepare("UPDATE mesa SET ocupado=:ocupado WHERE id_mesa = :id");
        $query->bindParam(":ocupado", $ocupado);
        $query->bindParam(":id", $id);
        $query->execute();
        echo "ok";
    }
} catch (PDOException $e) {
    echo "Error en la base de datos: " . $e->getMessage();
} finally {
    $pdo = null; // Cerrar la conexión después de usarla
}
