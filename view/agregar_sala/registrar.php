<?php
require("conexion.php");
$nom = $_POST['nom'];
$tipo = $_POST['tipo'];

if (isset($_POST['idp']) && !empty($_POST['idp'])) {
    // Actualizar sala existente
    $id = $_POST['idp'];
    $consulta = $pdo->prepare("UPDATE sala SET nom = :nom, tipo = :tipo WHERE id_sala = :id");
    $consulta->bindParam(":nom", $nom);
    $consulta->bindParam(":tipo", $tipo);
    $consulta->bindParam(":id", $id);
    $consulta->execute();
    echo "modificado";
} else if (isset($_POST['nom'], $_POST['tipo'])) {
    // Consulta preparada con parámetro de imagen binaria
    $consulta = $pdo->prepare("INSERT INTO sala (nom, tipo) VALUES (:nom, :tipo)");
    $consulta->bindParam(":nom", $nom, PDO::PARAM_STR);
    $consulta->bindParam(":tipo", $tipo, PDO::PARAM_STR);
    $consulta->execute();
    echo "ok";
} else {
    echo "error";
}

$pdo = null;
