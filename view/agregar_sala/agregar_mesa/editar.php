<?php
require "conexion.php";
$id = $_POST['id'];
$query = $pdo->prepare("SELECT * FROM mesa WHERE id_mesa = :id");
$query->bindParam(":id", $id);
$query->execute();
$resultado = $query->fetch(PDO::FETCH_ASSOC);
echo json_encode($resultado);
